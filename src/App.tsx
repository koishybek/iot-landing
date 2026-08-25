import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection";
import { COLLECTIONS } from "./lib/collections";
import Solutions from "./pages/Solutions";
import Projects from "./pages/Projects";
import Partners from "./pages/Partners";
import Contacts from "./pages/Contacts";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

/**
 * Всё содержимое приложения без роутера.
 *
 * Вынесено отдельно, чтобы пререндер при сборке мог обернуть это в StaticRouter,
 * а браузер — в BrowserRouter. См. src/entry-ssr.tsx.
 */
export function AppShell() {
  return (
    <CartProvider>
      <Seo />
      <ScrollToTop />
      <CartDrawer />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/catalog" element={<Catalog />} />
            {/* Подборки объявлены статическими адресами, поэтому выигрывают
                у динамического /catalog/:productId при совпадении сегмента. */}
            {COLLECTIONS.map((c) => (
              <Route
                key={c.slug}
                path={`/catalog/${c.slug}`}
                element={<Collection slug={c.slug} />}
              />
            ))}
            <Route path="/catalog/:productId" element={<ProductDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
