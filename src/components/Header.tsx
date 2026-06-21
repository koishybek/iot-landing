import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Search,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "О компании", path: "/about" },
  { label: "Услуги", path: "/services" },
  { label: "Готовые решения", path: "/solutions" },
  { label: "Каталог", path: "/catalog" },
  { label: "Проекты", path: "/projects" },
  { label: "Партнерам", path: "/partners" },
  { label: "Контакты", path: "/contacts" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { cart, setCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1B4332] text-white text-sm py-2">
        <div className="container-main flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:87711731722" className="flex items-center gap-1.5 hover:text-[#52B788] transition-colors">
              <Phone size={14} />
              <span>8 771 173 1722</span>
            </a>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin size={14} />
              <span>г. Астана, ул. Петрова, 18/1</span>
            </span>
            <a href="mailto:info@iot-exp.kz" className="flex items-center gap-1.5 hover:text-[#52B788] transition-colors">
              <Mail size={14} />
              <span>info@iot-exp.kz</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className={`transition-all duration-300 ${isHome ? "bg-[#F5F6F5]" : "bg-white shadow-sm border-b border-[#D8E8DE]"}`}>
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="images/logo.png" alt="IoT-Exponenta" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-[15px] font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-[#1B4332] bg-[#D8F3DC]"
                      : isHome
                      ? "text-[#1B4332] hover:bg-[#E5E7E5]"
                      : "text-[#1B4332] hover:bg-[#F8FBF9]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button className={`hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-colors text-[#1B4332] ${isHome ? "hover:bg-[#E5E7E5]" : "hover:bg-[#F8FBF9]"}`}>
                <Search size={20} />
              </button>
              
              <button
                onClick={() => setCartOpen(true)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors text-[#1B4332] ${isHome ? "hover:bg-[#E5E7E5]" : "hover:bg-[#F8FBF9]"}`}
                title="Корзина"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                to="/contacts"
                className="hidden md:inline-flex btn-outline-green text-sm"
              >
                Заказать звонок
              </Link>
              <button
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isHome ? "hover:bg-[#E5E7E5]" : "hover:bg-[#F8FBF9]"}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-[#1B4332]" />
                ) : (
                  <Menu size={24} className="text-[#1B4332]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#D8E8DE]">
            <div className="container-main py-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-[#1B4332] bg-[#D8F3DC]"
                        : "text-[#1B4332] hover:bg-[#F8FBF9]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contacts"
                  className="btn-primary mt-3 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Заказать звонок
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
