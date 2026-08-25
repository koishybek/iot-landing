import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSeo } from "../lib/seo";
import { getStructuredData, serializeStructuredData } from "../lib/structuredData";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Скрипт с микроразметкой помечаем атрибутом, чтобы обновлять свой, а не чужой. */
function upsertStructuredData(json: string) {
  const selector = 'script[type="application/ld+json"][data-seo]';
  let el = document.head.querySelector<HTMLScriptElement>(selector);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  el.textContent = json;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getPageSeo(pathname);

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:image", seo.image);
    upsertMeta("name", "twitter:image", seo.image);
    upsertCanonical(seo.canonical);

    const structured = getStructuredData(pathname);
    if (structured) upsertStructuredData(serializeStructuredData(structured));
  }, [pathname]);

  return null;
}
