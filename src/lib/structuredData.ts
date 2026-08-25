import productsData from "../data/products.json";
import { SITE_URL, SITE_NAME, BRAND, BRAND_CYRILLIC, normalizePath } from "./seo";

/**
 * Микроразметка Schema.org.
 *
 * Отсюда поисковик берёт адрес и телефон компании для локальной выдачи и
 * понимает, что страница каталога — это товар, а не просто текст.
 *
 * Как и seo.ts, модуль читают и браузер, и сборка: никаких window/document.
 */

interface ProductLike {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  manufacturer?: string;
}

const products = productsData as ProductLike[];

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Карточка организации в справочниках.
 *
 * sameAs связывает сайт с уже существующей записью в 2ГИС: поисковик понимает,
 * что это одна и та же организация, и переносит доверие с карточки на сайт.
 * Появятся Google Business Profile и Яндекс.Бизнес — добавить их сюда же.
 */
const SAME_AS = ["https://2gis.kz/astana/firm/70000001117123870"];

/** Телефон в формате E.164 — его ждёт Schema.org. */
const PHONE = "+77711731722";

const ORGANIZATION = {
  "@type": "LocalBusiness",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  // Все написания, которыми компанию и её марку ищут. Без кириллического
  // «Казметер» запрос «казметер» не связывается с этим сайтом.
  alternateName: [BRAND, BRAND_CYRILLIC, "КазМетер", "IoT Exponenta", "Ай-Оу-Ти Экспонента"],
  brand: {
    "@type": "Brand",
    name: BRAND,
    alternateName: BRAND_CYRILLIC,
  },
  url: SITE_URL,
  sameAs: SAME_AS,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  email: "info@iot-exp.kz",
  telephone: PHONE,
  description:
    "Поставка, монтаж и диспетчеризация приборов учёта воды, тепла, газа и электроэнергии в Астане и по Казахстану.",
  address: {
    "@type": "PostalAddress",
    // Официальное написание — такое же, как в карточке 2ГИС. Расхождение
    // «Петрова» / «Алексея Петрова» поисковик читает как два разных адреса.
    streetAddress: "улица Алексея Петрова, 18/1",
    addressLocality: "Астана",
    postalCode: "Z00T5H2",
    addressCountry: "KZ",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: { "@type": "City", name: "Астана" },
};

/**
 * Определяет марку по названию товара: поле manufacturer в данных заполнено
 * значением "other" почти везде и для разметки бесполезно.
 *
 * Кириллический вариант указываем только там, где написание однозначное.
 */
function brandOf(name: string): object | undefined {
  const upper = name.toUpperCase();
  if (upper.includes("KAZMETER")) {
    return { "@type": "Brand", name: BRAND, alternateName: BRAND_CYRILLIC };
  }
  if (upper.includes("PULSAR")) {
    return { "@type": "Brand", name: "Pulsar", alternateName: "Пульсар" };
  }
  if (upper.includes("YOMTEY")) return { "@type": "Brand", name: "YomteY" };
  if (upper.includes("EXPDEVICE")) return { "@type": "Brand", name: "ExpDevice" };
  return undefined;
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Возвращает graph микроразметки для маршрута.
 *
 * Цены в каталоге не заданы («Запросить цену»), поэтому Offer идёт без поля
 * price — придумывать цену нельзя, а без неё Google просто не покажет её
 * в сниппете. Появятся реальные цены — добавить сюда price и priceCurrency.
 */
export function getStructuredData(pathname: string): object | null {
  const path = normalizePath(pathname);
  const graph: object[] = [ORGANIZATION];

  const productMatch = path.match(/^\/catalog\/(.+)$/);
  if (productMatch) {
    const product = products.find((p) => p.id === productMatch[1]);
    if (!product) return { "@context": "https://schema.org", "@graph": graph };

    graph.push({
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.image ? `${SITE_URL}${product.image}` : undefined,
      category: product.category,
      brand: brandOf(product.name),
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}${path}`,
        priceCurrency: "KZT",
        availability: "https://schema.org/InStock",
        seller: { "@id": ORGANIZATION_ID },
      },
    });
    graph.push(
      breadcrumb([
        { name: "Главная", path: "/" },
        { name: "Каталог", path: "/catalog" },
        { name: product.name, path },
      ]),
    );
  } else if (path === "/catalog") {
    graph.push(breadcrumb([{ name: "Главная", path: "/" }, { name: "Каталог", path: "/catalog" }]));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * Сериализует graph для вставки в <script type="application/ld+json">.
 *
 * Экранируем "<", иначе последовательность вроде "</script>" внутри описания
 * товара закрыла бы тег и сломала страницу.
 */
export function serializeStructuredData(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
