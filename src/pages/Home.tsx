import { Link } from "react-router-dom";
import {
  Wrench,
  Clock,
  Home as HomeIcon,
  Building2,
  Factory,
  Users,
  ArrowRight,
  CheckCircle,
  Settings,
  ChevronRight,
  Phone,
  Stethoscope,
  ShieldCheck,
  Router,
  Radio,
  Target,
  BarChart2,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { submitToWhatsApp } from "../utils/whatsapp";




const categories = [
  { icon: HomeIcon, title: "Частные клиенты", desc: "Установка и обслуживание счетчиков в квартирах и частных домах", link: "/solutions" },
  { icon: Building2, title: "Строительные компании", desc: "Комплексное оснащение новостроек системами учета", link: "/solutions" },
  { icon: Users, title: "КСК и управляющие компании", desc: "Автоматизация сбора показаний и диспетчеризация", link: "/solutions" },
  { icon: Factory, title: "Промышленные предприятия", desc: "Промышленные системы учета и мониторинга", link: "/solutions" },
];

const services = [
  { icon: Wrench, title: "Монтаж и установка приборов учета", desc: "Профессиональная установка счетчиков воды, тепла и газа любой сложности" },
  { icon: Stethoscope, title: "Поверка счетчиков воды и тепла", desc: "Официальная поверка приборов учета с выдачей документов" },
  { icon: Settings, title: "Техническое обслуживание", desc: "Регулярное ТО, диагностика и ремонт оборудования" },
];

const popularProducts = [
  { name: "KAZMETER 15C", price: "40 000 ₸", image: "/images/product-kazmeter-15c.jpg" },
  { name: "KAZMETER 15C-LRW", price: "Цена по запросу", image: "/images/product-kazmeter-lrw.jpg" },
  { name: "KAZMETER 15Н-LRW", price: "Цена по запросу", image: "/images/product-kazmeter-lrw.jpg" },
  { name: "PULSAR IoT-CW15", price: "Цена по запросу", image: "/images/product-pulsar-cw15.jpg" },
  { name: "PULSAR IoT-UW15", price: "Цена по запросу", image: "/images/product-pulsar-uw15.jpg" },
];


const solutions = [
  { title: "Умный учет воды", features: ["Ультразвуковые счетчики", "Автоматический сбор данных", "Мобильное приложение"], image: "/images/solution-smart-home.jpg" },
  { title: "Учет тепла и тепловые пункты", features: ["Теплосчетчики", "АТП под ключ", "Энергоаудит"], image: "/images/solution-heat-point.jpg" },
  { title: "Диспетчеризация", features: ["Smart Metrix", "Удаленный контроль", "Оповещения"], image: "/images/smart-dashboard.png" },
  { title: "Решения для КСК", features: ["Автоматизация", "Снижение затрат", "Отчетность"], image: "/images/solution-building.jpg" },
];

const projects = [
  {
    name: "АО «Матен петролеум»",
    description: "Внедрение системы IoT-учета воды и тепла на промышленном объекте. Установка 150+ приборов учета с удаленным сбором показаний.",
    metrics: { devices: "150+", savings: "25%", period: "3 мес." },
    image: "/images/project-oil-refinery.jpg",
  },
  {
    name: "АО «СНПС-Актобемунайгаз»",
    description: "Комплексная модернизация системы учета энергоресурсов. Диспетчеризация и автоматический контроль потребления.",
    metrics: { devices: "200+", savings: "30%", period: "4 мес." },
    image: "/images/service-thermal.jpg",
  },
];

export default function Home() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#F5F6F5] overflow-hidden">
        <div className="container-main py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              {/* Warranty Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#40916C]/10 border border-[#40916C]/20 rounded-full text-[#1B4332] font-semibold text-sm mb-6">
                <ShieldCheck size={16} className="text-[#40916C]" />
                <span>Гарантия на оборудование до 6 лет</span>
              </div>

              <h1 className="text-[48px] md:text-[64px] font-bold leading-[1.05] mb-3 tracking-tight">
                <span className="text-[#40916C]">Kazmeter —</span> <br />
                <span className="text-[#1B4332]">счетчики будущего</span>
              </h1>
              <p className="text-2xl md:text-[28px] font-bold text-[#1F2937] mb-3">
                со встроенным модемом
              </p>
              <p className="text-base md:text-lg text-[#40916C] mb-10 font-semibold">
                Автоматический учет данных
              </p>

              {/* Feature icons row */}
              <div className="flex flex-wrap gap-x-8 gap-y-6 mb-12">
                <div className="flex items-center gap-3.5">
                  <Router size={32} className="text-[#374151] stroke-[1.5] flex-shrink-0" />
                  <span className="text-sm text-[#374151] font-semibold leading-tight">
                    Встроенный<br />NB-IoT модем
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <ShieldCheck size={32} className="text-[#374151] stroke-[1.5] flex-shrink-0" />
                  <span className="text-sm text-[#374151] font-semibold leading-tight">
                    Надежность<br />и точность
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Clock size={32} className="text-[#374151] stroke-[1.5] flex-shrink-0" />
                  <span className="text-sm text-[#374151] font-semibold leading-tight">
                    Автоматическая<br />передача данных
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setConsultOpen(true)}
                  className="px-10 py-3.5 bg-[#1B4332] text-white font-semibold rounded-lg hover:bg-[#122E22] transition-colors text-base shadow-sm"
                >
                  Подробнее
                </button>
                <a
                  href="https://kaspi.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-3.5 bg-[#F14635] text-white font-semibold rounded-lg hover:bg-[#D93A2B] transition-colors text-base shadow-sm flex items-center justify-center"
                >
                  Заказать на Kaspi
                </a>
              </div>
            </div>

            {/* Right: Product Image with Callouts */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
                {/* Background glowing effects to fill empty space */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#52B788]/15 blur-3xl rounded-full z-0 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] bg-[#1B4332]/10 blur-2xl rounded-full z-0 pointer-events-none" />

                {/* Center Image */}
                <img
                  src="/images/kazmeter.png"
                  alt="KAZMETER — счетчики будущего со встроенным модемом"
                  className="w-[85%] h-[85%] object-contain z-10 relative drop-shadow-2xl"
                />

                {/* Interactive Dots & Lines - Desktop only */}
                <div className="absolute inset-0 hidden md:block pointer-events-none z-20">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none">
                    {/* Line 1: Top-Left */}
                    <path d="M 115 115 L 90 70 L 10 70" stroke="#52B788" strokeWidth="1.5" />
                    {/* Line 2: Top-Right */}
                    <path d="M 385 115 L 410 70 L 490 70" stroke="#52B788" strokeWidth="1.5" />
                    {/* Line 3: Bottom-Right */}
                    <path d="M 250 440 L 290 480 L 490 480" stroke="#52B788" strokeWidth="1.5" />
                  </svg>

                  {/* Hotspots */}
                  <div className="absolute left-[23%] top-[23%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#52B788] rounded-full border-2 border-white shadow-md animate-pulse" />
                  <div className="absolute left-[77%] top-[23%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#52B788] rounded-full border-2 border-white shadow-md animate-pulse" />
                  <div className="absolute left-[50%] top-[88%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#52B788] rounded-full border-2 border-white shadow-md animate-pulse" />

                  {/* Callout Texts */}
                  <div className="absolute left-0 top-[15px] text-left max-w-[155px]">
                    <h4 className="text-sm font-bold text-[#1B4332] mb-1">Быстрая установка</h4>
                    <p className="text-[11px] text-[#5C7A6B] leading-tight">Монтаж за несколько минут без сложной настройки</p>
                  </div>

                  <div className="absolute right-0 top-[15px] text-left max-w-[155px]">
                    <h4 className="text-sm font-bold text-[#1B4332] mb-1">Онлайн-интеграция</h4>
                    <p className="text-[11px] text-[#5C7A6B] leading-tight">Передача показаний в систему учета и мобильное приложение</p>
                  </div>

                  <div className="absolute right-0 bottom-[-5px] text-left max-w-[155px]">
                    <h4 className="text-sm font-bold text-[#1B4332] mb-1">Без лишних проводов</h4>
                    <p className="text-[11px] text-[#5C7A6B] leading-tight">Встроенный NB-IoT модем работает через сеть оператора</p>
                  </div>
                </div>
              </div>

              {/* Mobile list of features */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:hidden w-full px-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#52B788] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1B4332]">Быстрая установка</h4>
                    <p className="text-xs text-[#5C7A6B] mt-0.5">Монтаж за несколько минут без сложной настройки</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#52B788] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1B4332]">Онлайн-интеграция</h4>
                    <p className="text-xs text-[#5C7A6B] mt-0.5">Передача показаний в систему учета и мобильное приложение</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#52B788] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1B4332]">Без лишних проводов</h4>
                    <p className="text-xs text-[#5C7A6B] mt-0.5">Встроенный NB-IoT модем работает через сеть оператора</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] text-center mb-12">
            Для кого мы работаем
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="card-base p-8 text-center group hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-[#F8FBF9] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D8F3DC] transition-colors">
                  <cat.icon size={28} className="text-[#1B4332]" />
                </div>
                <h3 className="font-semibold text-[#1B4332] mb-2">{cat.title}</h3>
                <p className="text-sm text-[#5C7A6B]">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">Наши услуги</h2>
            <Link to="/services" className="btn-secondary text-sm gap-1">
              Все услуги <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card-base p-6 group">
                <div className="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B4332] transition-colors">
                  <service.icon size={22} className="text-[#1B4332] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#1B4332] mb-2">{service.title}</h3>
                <p className="text-sm text-[#5C7A6B] mb-4">{service.desc}</p>
                <Link
                  to="/services"
                  className="text-[#1B4332] text-sm font-medium inline-flex items-center gap-1 hover:text-[#2D6A4F] transition-colors"
                >
                  Подробнее <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">Популярные товары</h2>
            <Link to="/catalog" className="btn-secondary text-sm gap-1">
              Смотреть все <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularProducts.map((product) => (
              <Link
                key={product.name}
                to={`/catalog/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="card-base overflow-hidden group"
              >
                <div className="bg-[#F8FBF9] p-4 flex items-center justify-center aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1B4332] text-sm mb-1 group-hover:text-[#2D6A4F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#52B788] font-bold text-sm">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages of Smart Meters Section */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#D8E8DE] rounded-full text-[#40916C] font-medium text-sm mb-6 shadow-sm">
                <Radio size={16} />
                <span>Умный учёт</span>
              </div>
              <h2 className="text-[32px] md:text-[42px] font-bold text-[#1B4332] leading-[1.1] mb-4">
                Преимущества <br className="hidden md:block" />
                счётчиков с радиомодулем
              </h2>
              <p className="text-[#5C7A6B] text-lg">
                Автоматическая передача показаний, точный учёт<br className="hidden md:block" /> 
                и удобный контроль расходов.
              </p>
            </div>
            
            <Link to="/catalog" className="shrink-0 self-start lg:self-auto px-6 py-3 bg-[#1B4332] hover:bg-[#122E22] text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2 shadow-sm">
              Подробнее <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-[24px] overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <img src="/images/service-installation.jpg" alt="Экономия времени" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="text-[#40916C]" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#1B4332] mb-3">Экономия времени</h3>
                <p className="text-[#5C7A6B] text-sm leading-relaxed">
                  Показания передаются автоматически — без ежемесячного обхода и ручной отправки данных.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[24px] overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <img src="/images/product-kazmeter-15c.jpg" alt="Точные данные" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6">
                  <Target className="text-[#40916C]" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#1B4332] mb-3">Точные данные</h3>
                <p className="text-[#5C7A6B] text-sm leading-relaxed">
                  Стабильный сбор показаний без ошибок и человеческого фактора.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[24px] overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <img src="/images/solution-smart-home.jpg" alt="Контроль расходов" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6">
                  <BarChart2 className="text-[#40916C]" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#1B4332] mb-3">Контроль расходов</h3>
                <p className="text-[#5C7A6B] text-sm leading-relaxed">
                  Легко отслеживайте потребление и быстрее замечайте перерасход ресурсов.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm font-medium text-[#5C7A6B] text-center sm:text-left">
            <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center shrink-0">
              <Shield className="text-[#40916C]" size={20} strokeWidth={1.5} />
            </div>
            <span>Надёжная работа. Прозрачный учёт. Умные решения для дома и бизнеса.</span>
          </div>

        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] text-center mb-12">
            Готовые решения
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <div key={solution.title} className="card-base overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#1B4332] mb-3">{solution.title}</h3>
                  <ul className="space-y-2 mb-4">
                    {solution.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#5C7A6B]">
                        <CheckCircle size={14} className="text-[#52B788]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/solutions"
                    className="text-[#1B4332] text-sm font-medium inline-flex items-center gap-1 hover:text-[#2D6A4F] transition-colors"
                  >
                    Подробнее <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] text-center mb-12">
            Наши проекты
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.name} className="card-base overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#1B4332] text-lg mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#5C7A6B] mb-4">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D8E8DE]">
                    <div>
                      <div className="text-lg font-bold text-[#1B4332]">{project.metrics.devices}</div>
                      <div className="text-xs text-[#8BA89B]">Приборов</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#1B4332]">{project.metrics.savings}</div>
                      <div className="text-xs text-[#8BA89B]">Экономия</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#1B4332]">{project.metrics.period}</div>
                      <div className="text-xs text-[#8BA89B]">Срок</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/projects" className="btn-secondary gap-2">
              Все проекты <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="bg-white py-16 md:py-24 border-t border-[#D8E8DE]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-4">
                Получите инженерное решение под ваш объект
              </h2>
              <p className="text-[#5C7A6B] mb-6 text-base leading-relaxed">
                Оставьте заявку и наши специалисты подготовят коммерческое
                предложение в течение 24 часов. Бесплатный выезд на объект.
              </p>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#1B4332]" />
                <a href="tel:+7 707 313 4050" className="text-[#1B4332] font-semibold text-xl hover:text-[#2D6A4F] transition-colors">
                  +7 707 313 4050
                </a>
              </div>
            </div>
            <form className="bg-[#F8FBF9] rounded-2xl p-8 border border-[#D8E8DE] shadow-sm" onSubmit={submitToWhatsApp}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[#1B4332] text-sm font-semibold mb-1 block">Имя</label>
                  <input
                    type="text"
                    name="Имя"
                    required
                    placeholder="Ваше имя"
                    className="w-full bg-white border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-gray-400 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
                <div>
                  <label className="text-[#1B4332] text-sm font-semibold mb-1 block">Телефон</label>
                  <input
                    type="tel"
                    name="Телефон"
                    required
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-gray-400 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-[#1B4332] text-sm font-semibold mb-1 block">Email</label>
                <input
                  type="email"
                  name="Email"
                  placeholder="example@mail.com"
                  className="w-full bg-white border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-gray-400 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
              <div className="mb-6">
                <label className="text-[#1B4332] text-sm font-semibold mb-1 block">Сообщение</label>
                <textarea
                  name="Сообщение"
                  placeholder="Опишите вашу задачу..."
                  rows={4}
                  className="w-full bg-white border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-gray-400 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] resize-none"
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#1B4332] hover:bg-[#122E22] text-white font-semibold rounded-lg transition-all duration-200 shadow-sm">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Consultation Dialog */}
      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1B4332]">Получить консультацию</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 pt-4" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
            <input
              type="text"
              name="Имя"
              required
              placeholder="Ваше имя"
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
            />
            <input
              type="tel"
              name="Телефон"
              required
              placeholder="Телефон"
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
            />
            <textarea
              name="Вопрос"
              placeholder="Ваш вопрос"
              rows={3}
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none"
            />
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Отправить
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
