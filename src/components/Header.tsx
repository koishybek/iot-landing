import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Search,
} from "lucide-react";

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

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1B4332] text-white text-sm py-2">
        <div className="container-main flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+77472075179" className="flex items-center gap-1.5 hover:text-[#52B788] transition-colors">
              <Phone size={14} />
              <span>+7 747 207 51 79</span>
            </a>
            <a href="tel:+77057055051" className="flex items-center gap-1.5 hover:text-[#52B788] transition-colors">
              <Phone size={14} />
              <span>+7 705 705 50 51</span>
            </a>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin size={14} />
              <span>г. Астана, ул. Кабанбай батыра, 11</span>
            </span>
            <a href="mailto:info@iot-exp.kz" className="flex items-center gap-1.5 hover:text-[#52B788] transition-colors">
              <Mail size={14} />
              <span>info@iot-exp.kz</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white shadow-sm">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" alt="IoT-Exponenta" className="h-10 w-auto object-contain" />
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
                      : "text-[#1B4332] hover:bg-[#F8FBF9]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F8FBF9] transition-colors text-[#1B4332]">
                <Search size={20} />
              </button>
              <Link
                to="/contacts"
                className="hidden md:inline-flex btn-outline-green text-sm"
              >
                Заказать звонок
              </Link>
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F8FBF9] transition-colors"
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
