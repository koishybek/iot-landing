/**
 * Пререндер страниц после сборки.
 *
 * Vite собирает обычный SPA: в dist/index.html лежит пустой <div id="root">,
 * а весь текст рисует JavaScript. Поисковику такую страницу нужно сначала
 * выполнить, и до этого доходят не все роботы. Скрипт прогоняет каждый маршрут
 * через React на стороне Node и кладёт готовую разметку прямо в HTML,
 * а заодно проставляет свой title и description на каждую страницу.
 *
 * Запускается из npm run build после vite build.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Подменяет один тег в шаблоне; если тега нет — оставляет HTML нетронутым. */
function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, () => replacement) : html;
}

function applySeo(template, seo, body, structuredJson) {
  let html = template;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:image" content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeAttr(seo.image)}" />`,
  );

  html = replaceTag(
    html,
    /<meta name="twitter:image" content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeAttr(seo.image)}" />`,
  );

  if (structuredJson) {
    const tag = `<script type="application/ld+json" data-seo>${structuredJson}</script>`;
    const before = html;
    html = html.replace("</head>", () => `  ${tag}
  </head>`);
    if (html === before) throw new Error("не удалось вставить микроразметку: в шаблоне нет </head>");
  }

  if (body) {
    // Функция-замена, а не строка: в разметке встречаются $-последовательности,
    // которые String.replace иначе трактует как спецсимволы.
    const before = html;
    html = html.replace(ROOT_EMPTY, () => `${ROOT_OPEN}${body}</div>`);
    if (html === before) {
      throw new Error("не удалось вставить разметку: в шаблоне нет пустого " + ROOT_EMPTY);
    }
  }
  return html;
}

const ROOT_OPEN = '<div id="root">';
const ROOT_EMPTY = '<div id="root"></div>';

/**
 * Возвращает шаблон с гарантированно пустым корневым div.
 *
 * Скрипт перезаписывает dist/index.html — тот самый файл, из которого читает
 * шаблон. Без этой нормализации повторный запуск взял бы за основу уже
 * отрендеренную главную, разложил бы её по всем страницам и добавил второй
 * блок микроразметки поверх первого.
 */
function cleanTemplate(html) {
  html = html.replace(/\s*<script type="application\/ld\+json" data-seo>[\s\S]*?<\/script>/g, "");

  const start = html.indexOf(ROOT_OPEN);
  if (start === -1) throw new Error('в dist/index.html не найден <div id="root">');

  const contentStart = start + ROOT_OPEN.length;
  const bodyEnd = html.lastIndexOf("</body>");
  const close = html.lastIndexOf("</div>", bodyEnd === -1 ? html.length : bodyEnd);
  if (close < contentStart) throw new Error("в dist/index.html не найден закрывающий тег корневого div");

  return html.slice(0, contentStart) + html.slice(close);
}

function outputPathFor(route) {
  return route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.replace(/^\//, ""), "index.html");
}

async function main() {
  const template = cleanTemplate(await readFile(path.join(distDir, "index.html"), "utf-8"));

  // Собранный SSR-бандл: Rollup уже разобрался с CommonJS-зависимостями,
  // поэтому здесь достаточно обычного динамического импорта.
  const bundle = pathToFileURL(path.join(root, "dist-ssr", "entry-ssr.js")).href;
  const {
    render, getAllRoutes, getPageSeo, SITE_URL,
    getStructuredData, serializeStructuredData,
    COLLECTIONS, PRODUCTS,
  } = await import(bundle);

  let rendered = 0;
  const failed = [];
  const bodyHashes = new Set();

  const routes = getAllRoutes();

  // Подборки и карточки товаров делят пространство /catalog/*. Совпадение
  // slug подборки с id товара сделало бы карточку недостижимой — и заметить
  // это по внешнему виду сайта нельзя, поэтому проверяем на сборке.
  const seen = new Set();
  const clashes = routes.filter((r) => (seen.has(r) ? true : (seen.add(r), false)));
  if (clashes.length) {
    throw new Error(`адреса конфликтуют друг с другом: ${[...new Set(clashes)].join(", ")}`);
  }

  for (const route of routes) {
    const seo = getPageSeo(route);

    let body = "";
    try {
      body = render(route);
      rendered++;
    } catch (err) {
      // Страница осталась на клиентском рендеринге: title и description всё
      // равно проставим, но текста в HTML не будет — это важно знать.
      failed.push(`${route} — ${err.message.split("\n")[0]}`);
    }

    bodyHashes.add(createHash("md5").update(body).digest("hex"));

    const structured = getStructuredData(route);
    const structuredJson = structured ? serializeStructuredData(structured) : "";

    const page = applySeo(template, seo, body, structuredJson);
    const ldCount = (page.match(/application\/ld\+json/g) || []).length;
    if (ldCount !== 1) {
      throw new Error(`на ${route} оказалось ${ldCount} блоков микроразметки вместо одного`);
    }

    const out = outputPathFor(route);
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, page, "utf-8");
  }

  // Все страницы с одинаковым телом означают, что маршрут не подставился и по
  // всем адресам разложена одна и та же страница. Молча такое выпускать нельзя.
  if (rendered > 1 && bodyHashes.size === 1) {
    throw new Error(
      `все ${rendered} страниц отрендерились одинаково — проверьте шаблон и StaticRouter`,
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${escapeHtml(SITE_URL + route)}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <priority>${route === "/" ? "1.0" : route.startsWith("/catalog/") ? "0.7" : "0.8"}</priority>\n  </url>`,
    )
    .join("\n");

  await writeFile(
    path.join(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf-8",
  );

  // llms.txt — короткая машиночитаемая карта сайта для ИИ-ассистентов.
  // Они читают HTML без выполнения JavaScript, и такой обзор повышает шанс,
  // что в ответе сошлются на нас, а не на конкурента.
  const llms = [
    "# IoT-Exponenta (Kazmeter / Казметер)",
    "",
    "> Поставка, монтаж и диспетчеризация приборов учёта воды, тепла, газа и",
    "> электроэнергии в Астане и по Казахстану. Собственная марка приборов Kazmeter.",
    "",
    "Адрес: г. Астана, ул. Алексея Петрова 18/1. Телефон: +7 771 173 1722.",
    "Приборы поддерживают импульсный выход, LoRaWAN и NB-IoT для дистанционной",
    "передачи показаний.",
    "",
    "## Подборки каталога",
    ...COLLECTIONS.map((c) => `- [${c.h1}](${SITE_URL}/catalog/${c.slug}): ${c.intro.split(".")[0]}.`),
    "",
    "## Товары",
    ...PRODUCTS.map((p) => `- [${p.name}](${SITE_URL}/catalog/${p.id})`),
    "",
    "## Разделы",
    `- [О компании](${SITE_URL}/about)`,
    `- [Услуги](${SITE_URL}/services)`,
    `- [Готовые решения](${SITE_URL}/solutions)`,
    `- [Проекты](${SITE_URL}/projects)`,
    `- [Контакты](${SITE_URL}/contacts)`,
    "",
  ].join("\n");
  await writeFile(path.join(distDir, "llms.txt"), llms, "utf-8");
  console.log(`Карта для ИИ-ассистентов: dist/llms.txt (${COLLECTIONS.length} подборок, ${PRODUCTS.length} товаров)`);

  console.log(`\nПререндер: ${rendered}/${routes.length} страниц с разметкой в HTML`);
  console.log(`Карта сайта: ${routes.length} адресов → dist/sitemap.xml`);
  if (failed.length) {
    console.log(`\nНе отрендерились (остались на клиентском рендеринге):`);
    for (const f of failed) console.log(`  - ${f}`);
  }

  if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error("Пререндер упал:", err);
  process.exit(1);
});
