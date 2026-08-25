import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppShell } from "./App";

/**
 * Точка входа для пререндера при сборке (scripts/prerender.mjs).
 *
 * В браузер не попадает: вызывается только из Node, чтобы получить готовую
 * разметку каждой страницы и положить её в HTML — иначе поисковик видит
 * пустой <div id="root">.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  );
}

// Пререндеру нужны и маршруты, и метаданные — отдаём их из этой же сборки,
// чтобы не поднимать второй раз весь модульный граф.
export { getAllRoutes, getPageSeo, SITE_URL } from "./lib/seo";
export { getStructuredData, serializeStructuredData } from "./lib/structuredData";
