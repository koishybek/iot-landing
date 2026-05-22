import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Phone,
} from "lucide-react";

const filters = [
  { id: "all", label: "Все проекты" },
  { id: "oil", label: "Нефтегаз" },
  { id: "residential", label: "Жилые комплексы" },
  { id: "commercial", label: "Коммерческая недвижимость" },
  { id: "industrial", label: "Промышленность" },
];

const projects = [
  {
    id: "maten",
    name: "АО «Матен петролеум»",
    category: "oil",
    description: "Внедрение системы IoT-учета воды и тепла на промышленном объекте. Установка 150+ ультразвуковых счетчиков воды с LoRaWAN-модулями, интеграция с платформой Smart Metrix.",
    results: [
      "Установлено 150+ IoT счетчиков",
      "Организован удаленный сбор показаний",
      "Сокращение потерь воды на 25%",
      "Автоматическая генерация отчетов",
    ],
    metrics: { devices: "150+", period: "3 мес.", savings: "25%", status: "Завершен" },
    image: "/images/project-oil-refinery.jpg",
    year: "2024",
  },
  {
    id: "snps",
    name: "АО «СНПС-Актобемунайгаз»",
    category: "oil",
    description: "Комплексная модернизация системы учета энергоресурсов. Диспетчеризация и автоматический контроль потребления воды, тепла и электроэнергии на 12 объектах.",
    results: [
      "Охвачено 12 объектов компании",
      "Внедрена система 24/7 мониторинга",
      "Снижение потребления на 30%",
      "Интеграция с учетной системой заказчика",
    ],
    metrics: { devices: "200+", period: "4 мес.", savings: "30%", status: "Завершен" },
    image: "/images/service-thermal.jpg",
    year: "2024",
  },
  {
    id: "astana-tower",
    name: "БЦ «Astana Tower»",
    category: "commercial",
    description: "Установка системы автоматического учета воды и тепла в бизнес-центре класса А. Интеграция с BMS системой здания.",
    results: [
      "Установлено 85 IoT счетчиков",
      "Интеграция с BMS",
      "Снижение эксплуатационных расходов на 18%",
      "Мониторинг в реальном времени",
    ],
    metrics: { devices: "85", period: "2 мес.", savings: "18%", status: "Завершен" },
    image: "/images/solution-building.jpg",
    year: "2023",
  },
  {
    id: "zhks-nova",
    name: "ЖК «Nova City»",
    category: "residential",
    description: "Комплексное оснащение жилого комплекса из 4 зданий системами умного учета воды и тепла. Платформа Smart Metrix для КСК.",
    results: [
      "480 квартир оснащено IoT счетчиками",
      "Автоматический сбор показаний",
      "Мобильное приложение для жителей",
      "Сокращение споров на 90%",
    ],
    metrics: { devices: "480", period: "5 мес.", savings: "22%", status: "Завершен" },
    image: "/images/solution-smart-home.jpg",
    year: "2023",
  },
  {
    id: "temirzhol",
    name: "ТОО «Казахстан Темир Жолы»",
    category: "industrial",
    description: "Модернизация системы учета воды на железнодорожных объектах. Установка промышленных расходомеров и диспетчеризация.",
    results: [
      "8 железнодорожных станций оснащены",
      "Установлены промышленные расходомеры ВВТ",
      "Централизованный мониторинг",
      "Выявлены и устранены утечки",
    ],
    metrics: { devices: "45", period: "6 мес.", savings: "35%", status: "Завершен" },
    image: "/images/solution-heat-point.jpg",
    year: "2023",
  },
  {
    id: "samruk",
    name: "АО «Самрук-Энерго»",
    category: "industrial",
    description: "Внедрение системы диспетчеризации тепловых пунктов. Автоматизация контроля и управления энергопотреблением.",
    results: [
      "15 тепловых пунктов автоматизированы",
      "Внедрена система АТП",
      "Снижение энергопотребления на 28%",
      "Прогнозное обслуживание",
    ],
    metrics: { devices: "120", period: "8 мес.", savings: "28%", status: "Завершен" },
    image: "/images/solution-heat-point.jpg",
    year: "2022",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [consultOpen, setConsultOpen] = useState(false);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">Проекты</h1>
          <p className="text-lg text-[#5C7A6B] max-w-3xl">
            Портфолио реализованных проектов по внедрению IoT-решений для учета
            энергоресурсов в Казахстане.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-[#1B4332] py-12">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">12+</div>
              <div className="text-white/60 text-sm">Лет на рынке</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60 text-sm">Поддержка проектов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/60 text-sm">Выполнение сроков</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#52B788] mb-2">-30%</div>
              <div className="text-white/60 text-sm">Средняя экономия</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 border-b border-[#D8E8DE]">
        <div className="container-main">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-[#1B4332] text-white"
                    : "bg-[#F8FBF9] text-[#5C7A6B] hover:bg-[#D8F3DC] hover:text-[#1B4332]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card-base overflow-hidden group">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-[#1B4332]">
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#1B4332] text-lg mb-2">{project.name}</h3>
                  <p className="text-sm text-[#5C7A6B] mb-4">{project.description}</p>
                  <div className="space-y-2 mb-6">
                    {project.results.map((r) => (
                      <div key={r} className="flex items-center gap-2 text-sm text-[#5C7A6B]">
                        <CheckCircle size={14} className="text-[#52B788] flex-shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-3 pt-4 border-t border-[#D8E8DE]">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#1B4332]">{project.metrics.devices}</div>
                      <div className="text-xs text-[#8BA89B]">Приборов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#1B4332]">{project.metrics.period}</div>
                      <div className="text-xs text-[#8BA89B]">Срок</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#52B788]">{project.metrics.savings}</div>
                      <div className="text-xs text-[#8BA89B]">Экономия</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#1B4332]">{project.metrics.status}</div>
                      <div className="text-xs text-[#8BA89B]">Статус</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <div className="bg-[#1B4332] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Хотите такой же результат?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта. Первичная
              консультация и выезд на объект — бесплатно.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setConsultOpen(true)} className="btn-primary bg-[#52B788] hover:bg-[#40916C] gap-2">
                Обсудить проект <ArrowRight size={16} />
              </button>
              <a href="tel:+77472075179" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1B4332] gap-2">
                <Phone size={16} /> +7 747 207 51 79
              </a>
            </div>
          </div>
        </div>
      </section>

      {consultOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConsultOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#1B4332] mb-6">Обсудить проект</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="tel" placeholder="Телефон" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="email" placeholder="Email" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="text" placeholder="Название компании" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <textarea placeholder="Опишите ваш проект" rows={3} className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none" />
              <button onClick={() => setConsultOpen(false)} className="w-full btn-primary">Отправить заявку</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
