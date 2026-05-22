import { Link } from "react-router-dom";
import {
  Wrench,
  Shield,
  Clock,
  MapPin,
  Home as HomeIcon,
  Building2,
  Factory,
  Users,
  ArrowRight,
  CheckCircle,
  Flame,
  Wifi,
  Settings,
  ChevronRight,
  Phone,
  Thermometer,
  Sparkles,
  ClipboardList,
  Stethoscope,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const trustPoints = [
  { icon: Clock, text: "20+ лет опыта" },
  { icon: Shield, text: "Сертифицированное оборудование" },
  { icon: Settings, text: "Сервис 24/7" },
  { icon: MapPin, text: "Работаем по всему Казахстану" },
];

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
  { icon: Flame, title: "Монтаж АТП и теплопунктов", desc: "Проектирование и монтаж автоматизированных тепловых пунктов" },
  { icon: Wifi, title: "Диспетчеризация и удаленный контроль", desc: "Удаленный сбор показаний и мониторинг в реальном времени" },
  { icon: Thermometer, title: "Тепловизионные обследования", desc: "Выявление утечек тепла и оценка энергоэффективности" },
  { icon: Sparkles, title: "Промывка теплообменников", desc: "Очистка теплообменного оборудования от накипи и загрязнений" },
  { icon: ClipboardList, title: "Проектирование", desc: "Разработка проектной документации для систем учета" },
  { icon: MoreHorizontal, title: "Еще услуги", desc: "Консультации, обучение, пусконаладочные работы" },
];

const popularProducts = [
  { name: "KAZMETER 15C", price: "40 000 ₸", image: "/images/product-kazmeter-15c.jpg" },
  { name: "KAZMETER 15C-LRW", price: "Цена по запросу", image: "/images/product-kazmeter-lrw.jpg" },
  { name: "KAZMETER 15Н-LRW", price: "Цена по запросу", image: "/images/product-kazmeter-lrw.jpg" },
  { name: "PULSAR IoT-CW15", price: "Цена по запросу", image: "/images/product-pulsar-cw15.jpg" },
  { name: "PULSAR IoT-UW15", price: "Цена по запросу", image: "/images/product-pulsar-uw15.jpg" },
];

const benefits = [
  {
    title: "Частным клиентам",
    items: [
      "Бесплатный выезд инженера",
      "Гарантия до 3 лет на оборудование",
      "Помощь в оформлении документов",
      "Рассрочка на 12 месяцев",
    ],
  },
  {
    title: "Строительным компаниям",
    items: [
      "Специальные оптовые цены",
      "Проектирование под ключ",
      "Гибкие сроки поставки",
      "Шеф-монтаж и пусконаладка",
    ],
  },
  {
    title: "КСК и управляющим",
    items: [
      "Автоматический сбор показаний",
      "Снижение коммунальных потерь",
      "Диспетчеризация 24/7",
      "Юридическая поддержка",
    ],
  },
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
      <section className="bg-[#F8FBF9] overflow-hidden">
        <div className="container-main py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] leading-tight mb-6">
                IoT-решения для учета воды, тепла, газа и диспетчеризации
              </h1>
              <p className="text-lg text-[#5C7A6B] mb-8 leading-relaxed">
                Комплексные решения для точного учета, удаленного контроля и
                автоматизации инженерных систем. От проекта до сервисного
                обслуживания — работаем под ключ.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setConsultOpen(true)} className="btn-primary gap-2">
                  Получить консультацию
                  <ArrowRight size={18} />
                </button>
                <Link to="/catalog" className="btn-secondary gap-2">
                  Смотреть каталог
                  <ChevronRight size={18} />
                </Link>
              </div>
              <div className="flex items-center gap-2 mb-8">
                <Phone size={18} className="text-[#52B788]" />
                <a href="tel:+77472075179" className="text-[#1B4332] font-semibold text-lg hover:text-[#2D6A4F] transition-colors">
                  +7 747 207 51 79
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trustPoints.map((point) => (
                  <div key={point.text} className="flex items-center gap-2">
                    <point.icon size={18} className="text-[#52B788] flex-shrink-0" />
                    <span className="text-sm text-[#5C7A6B] font-medium">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-meter.jpg"
                  alt="IoT счетчик воды"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="text-xs text-[#8BA89B]">Расход воды</div>
                  <div className="text-xl font-bold text-[#1B4332]">125.4 м³</div>
                  <div className="text-xs text-[#52B788]">Статус: Онлайн</div>
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

      {/* Benefits Section */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] text-center mb-12">
            С нами работать выгодно
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="font-semibold text-[#1B4332] text-lg mb-5">
                  {benefit.title}
                </h3>
                <ul className="space-y-3">
                  {benefit.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-[#52B788] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-[#5C7A6B] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
      <section className="bg-[#1B4332] py-16 md:py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Получите инженерное решение под ваш объект
              </h2>
              <p className="text-white/70 mb-6">
                Оставьте заявку и наши специалисты подготовят коммерческое
                предложение в течение 24 часов. Бесплатный выезд на объект.
              </p>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#52B788]" />
                <a href="tel:+77472075179" className="text-white font-semibold text-xl hover:text-[#52B788] transition-colors">
                  +7 747 207 51 79
                </a>
              </div>
            </div>
            <form className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#52B788]"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#52B788]"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-white/70 text-sm mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#52B788]"
                />
              </div>
              <div className="mb-6">
                <label className="text-white/70 text-sm mb-1 block">Сообщение</label>
                <textarea
                  placeholder="Опишите вашу задачу..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#52B788] resize-none"
                />
              </div>
              <button type="button" className="w-full btn-primary bg-[#52B788] hover:bg-[#40916C]">
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
          <div className="space-y-4 pt-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
            />
            <textarea
              placeholder="Ваш вопрос"
              rows={3}
              className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none"
            />
            <button
              onClick={() => setConsultOpen(false)}
              className="w-full btn-primary"
            >
              Отправить
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
