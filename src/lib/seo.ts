import productsData from "../data/products.json";
import { COLLECTIONS, getCollection } from "./collections";

/**
 * Единственный источник правды по метаданным страниц.
 *
 * Модуль читают двое: компонент Seo в браузере и скрипт пререндера при сборке
 * (через SSR-бандл src/entry-ssr.tsx). Поэтому здесь не должно быть обращений
 * к window/document — только чистые данные.
 */

/**
 * Основной домен — с www: апекс iot-exp.kz отдаёт 308 на www.iot-exp.kz.
 * Канонические адреса, карта сайта и микроразметка должны указывать на тот
 * адрес, который реально отвечает, иначе Search Console помечает страницы
 * как «страница с редиректом», а сигналы размываются между двумя версиями.
 * Если основным доменом в Netlify сделают апекс — поменять здесь.
 */
export const SITE_URL = "https://www.iot-exp.kz";
export const SITE_NAME = "IoT-Exponenta";
/**
 * Собственная марка приборов. Кириллическое написание обязательно: в Казахстане
 * бренд ищут как «казметер», а латинского Kazmeter на страницах для такого
 * запроса поисковику недостаточно.
 */
export const BRAND = "Kazmeter";
export const BRAND_CYRILLIC = "Казметер";
/** Именительный падеж — для перечислений: «IoT-Exponenta, Астана». */
export const CITY = "Астана";
/** Предложный падеж — для оборота «в Астане». */
export const CITY_IN = "Астане";

export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  /** Абсолютный адрес картинки для превью ссылки в мессенджерах и соцсетях. */
  image: string;
}

interface ProductLike {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

const products = productsData as ProductLike[];

const DEFAULT_IMAGE = `${SITE_URL}/images/logo.png`;

const DEFAULT_DESCRIPTION =
  "Поставка и монтаж приборов учёта воды, тепла и электроэнергии с дистанционной передачей показаний. Проектирование и диспетчеризация под ключ в Астане.";

const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${BRAND} — счётчики воды в ${CITY_IN} | ${SITE_NAME}`,
    description: `Счётчики воды, тепла и электроэнергии ${BRAND} (${BRAND_CYRILLIC}) с дистанционной передачей показаний. Поставка, монтаж и диспетчеризация под ключ в ${CITY_IN}.`,
  },
  "/about": {
    title: `О компании — ${SITE_NAME}, производитель ${BRAND}`,
    description: `${SITE_NAME} — поставка и внедрение систем автоматизированного учёта ресурсов в Казахстане и собственная марка приборов ${BRAND} (${BRAND_CYRILLIC}).`,
  },
  "/services": {
    title: `Монтаж и поверка приборов учёта в ${CITY_IN} — ${SITE_NAME}`,
    description:
      "Установка счётчиков воды, тепла и электроэнергии, пусконаладка систем диспетчеризации, поверка и техническое обслуживание приборов учёта в Астане.",
  },
  "/catalog": {
    title: `Каталог счётчиков воды и тепла — купить в ${CITY_IN}`,
    description: `Счётчики ${BRAND} (${BRAND_CYRILLIC}), YOMTEY и Goldcard с импульсным выходом, LoRaWAN и NB-IoT. Подбор по диаметру и протоколу, поставка по Казахстану.`,
  },
  "/solutions": {
    title: `Готовые решения для учёта ресурсов — КСК, застройщики, ИТП`,
    description:
      "Типовые решения автоматизированного учёта для жилых комплексов, КСК, тепловых пунктов и частных домов: оборудование, монтаж и передача данных.",
  },
  "/projects": {
    title: `Реализованные проекты — ${SITE_NAME}`,
    description:
      "Внедрённые системы учёта и диспетчеризации на жилых комплексах и промышленных объектах Казахстана: состав работ и применённое оборудование.",
  },
  "/partners": {
    title: `Партнёрам и дилерам — ${SITE_NAME}`,
    description:
      "Условия сотрудничества для монтажных организаций, застройщиков и дилеров приборов учёта. Оптовые поставки и техническая поддержка партнёров.",
  },
  "/contacts": {
    title: `Контакты — ${SITE_NAME}, ${CITY}`,
    description:
      "Адрес, телефон и почта IoT-Exponenta в Астане: г. Астана, ул. Алексея Петрова, 18/1. Консультация по подбору приборов учёта и расчёт стоимости.",
  },
};

/** Обрезает текст по границе слова — чтобы описание не обрывалось на середине. */
function clamp(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "") + "…";
}

/** Нормализует путь: убирает хвостовой слэш, оставляя корень как "/". */
export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

export function getPageSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;

  const collectionMatch = path.match(/^\/catalog\/(.+)$/);
  if (collectionMatch) {
    const collection = getCollection(collectionMatch[1]);
    if (collection) {
      return {
        title: collection.title,
        description: collection.description,
        canonical,
        image: DEFAULT_IMAGE,
      };
    }
  }

  const productMatch = path.match(/^\/catalog\/(.+)$/);
  if (productMatch) {
    const product = products.find((p) => p.id === productMatch[1]);
    if (product) {
      return {
        title: `${product.name} — купить в ${CITY_IN} | ${SITE_NAME}`,
        description: clamp(product.description || DEFAULT_DESCRIPTION),
        canonical,
        // Фото прибора вместо логотипа: именно оно попадёт в превью ссылки,
        // когда карточку отправляют клиенту в WhatsApp или Telegram.
        image: product.image ? `${SITE_URL}${product.image}` : DEFAULT_IMAGE,
      };
    }
  }

  const page = STATIC_PAGES[path];
  if (page) return { ...page, canonical, image: DEFAULT_IMAGE };

  return {
    title: STATIC_PAGES["/"].title,
    description: DEFAULT_DESCRIPTION,
    canonical,
    image: DEFAULT_IMAGE,
  };
}

/** Все адреса сайта — для карты сайта и пререндера. */
export function getAllRoutes(): string[] {
  return [
    ...Object.keys(STATIC_PAGES),
    ...COLLECTIONS.map((c) => `/catalog/${c.slug}`),
    ...products.map((p) => `/catalog/${p.id}`),
  ];
}
