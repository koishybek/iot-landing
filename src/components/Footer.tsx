import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const footerColumns = [
  {
    title: "Компания",
    links: [
      { label: "О компании", path: "/about" },
      { label: "Проекты", path: "/projects" },
      { label: "Партнерам", path: "/partners" },
      { label: "Контакты", path: "/contacts" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { label: "Монтаж приборов учета", path: "/services" },
      { label: "Поверка счетчиков", path: "/services" },
      { label: "Техническое обслуживание", path: "/services" },
      { label: "Диспетчеризация", path: "/services" },
    ],
  },
  {
    title: "Каталог",
    links: [
      { label: "Счетчики воды", path: "/catalog" },
      { label: "Теплосчетчики", path: "/catalog" },
      { label: "IoT устройства", path: "/catalog" },
      { label: "Пульсар", path: "/catalog" },
    ],
  },
  {
    title: "Решения",
    links: [
      { label: "Для частных клиентов", path: "/solutions" },
      { label: "Для строительных компаний", path: "/solutions" },
      { label: "Для КСК", path: "/solutions" },
      { label: "Диспетчеризация", path: "/solutions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white">
      {/* Main footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src="/images/logo.png" alt="IoT-Exponenta" className="h-10 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Комплексные IoT-решения для учета воды, тепла, газа и
              диспетчеризации инженерных систем в Казахстане.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/77472075179"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#52B788] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#52B788] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#52B788] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/60 text-sm hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Phone size={18} className="text-[#52B788]" />
            </div>
            <div>
              <div className="text-white/50 text-xs">Телефон</div>
              <a href="tel:+7 707 313 4050" className="text-white hover:text-[#52B788] transition-colors">
                +7 707 313 4050
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Mail size={18} className="text-[#52B788]" />
            </div>
            <div>
              <div className="text-white/50 text-xs">Email</div>
              <a href="mailto:info@iot-exp.kz" className="text-white hover:text-[#52B788] transition-colors">
                info@iot-exp.kz
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <MapPin size={18} className="text-[#52B788]" />
            </div>
            <div>
              <div className="text-white/50 text-xs">Адрес</div>
              <span className="text-white">г. Астана, ул. Кабанбай батыра, 11</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-main py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/50 text-sm">
            © 2025 IoT-Exponenta. Все права защищены.
          </p>
          <p className="text-white/40 text-xs">
            IoT-решения для учета воды, тепла, газа и диспетчеризации
          </p>
        </div>
      </div>
    </footer>
  );
}
