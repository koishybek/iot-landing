import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  MapPin
} from "lucide-react";
import { submitToWhatsApp } from "../utils/whatsapp";

const filters = [
  { id: "all", label: "Все города" },
  { id: "almaty", label: "Алматы" },
  { id: "astana", label: "Астана" },
  { id: "shymkent", label: "Шымкент" },
  { id: "turkestan", label: "Туркестан" },
];

const projects = [
  // Алматы
  {
    id: "muz-tau",
    name: "ЖК Муз Тау (Алматы)",
    city: "almaty",
    description: "Комплексное оснащение жилого комплекса приборами учета с дистанционной передачей данных. Интеграция с платформой Smart Metrix.",
    results: [
      "Интеллектуальные приборы учета воды и тепла",
      "Организован удаленный сбор показаний через LoRaWAN",
      "Снижение споров и потерь ресурсов",
      "Автоматическая передача данных в сервисный центр"
    ],
    metrics: { devices: "250+", period: "3 мес.", savings: "20%", status: "Завершен" },
    image: "images/projects/muz_tau.png",
    year: "2024"
  },
  {
    id: "iunar-tau",
    name: "ЖК Иунар Тау (Алматы)",
    city: "almaty",
    description: "Поставка и внедрение приборов учета с дистанционной передачей данных для премиального жилого комплекса.",
    results: [
      "100% покрытие приборами учета воды и тепла",
      "Интеграция с диспетчерской системой управляющей компании",
      "Автономность работы приборов более 6 лет",
      "Мобильное приложение для жителей дома"
    ],
    metrics: { devices: "320+", period: "4 мес.", savings: "22%", status: "Завершен" },
    image: "images/projects/iunar_tau.png",
    year: "2024"
  },
  {
    id: "esentai-city",
    name: "ЖК Esentai City (Алматы)",
    city: "almaty",
    description: "Внедрение интеллектуальных приборов учета с возможностью дистанционного снятия показаний.",
    results: [
      "Установлено более 400 приборов учета воды",
      "Интеграция с системой LoRaWAN",
      "Автоматический импорт показаний в 1С",
      "Мониторинг параметров в реальном времени"
    ],
    metrics: { devices: "400+", period: "5 мес.", savings: "25%", status: "Завершен" },
    image: "images/solution-smart-home.jpg",
    year: "2023"
  },
  {
    id: "rams-luxury",
    name: "ЖК RAMS Luxury (Алматы)",
    city: "almaty",
    description: "Поставка приборов учета с дистанционной передачей данных для нового жилого комплекса.",
    results: [
      "Интеллектуальный прибор учета воды с дистанционной передачей данных",
      "Беспроводной сбор данных",
      "Личный кабинет для управляющей компании",
      "Высокая степень защиты IP68"
    ],
    metrics: { devices: "180+", period: "3 мес.", savings: "18%", status: "Завершен" },
    image: "images/solution-building.jpg",
    year: "2023"
  },
  // Астана
  {
    id: "kemenger",
    name: "ЖК Кеменгер (Астана)",
    city: "astana",
    description: "Полный цикл работ по автоматизации сбора данных с интеллектуальных приборов учета тепла и воды.",
    results: [
      "Установлено 520+ приборов учета",
      "Внедрена технология NB-IoT",
      "Личный кабинет для ОСИ",
      "Своевременное оповещение об утечках"
    ],
    metrics: { devices: "520+", period: "5 мес.", savings: "24%", status: "Завершен" },
    image: "images/projects/kemenger.png",
    year: "2024"
  },
  {
    id: "daulpaz",
    name: "ЖК Даулпаз (Астана)",
    city: "astana",
    description: "Монтаж и пусконаладка приборов учета тепла и воды в современном жилом комплексе.",
    results: [
      "Комплексное оснащение квартир и коммерческих помещений",
      "Автоматизированная диспетчеризация ресурсов",
      "Межповерочный интервал приборов 6 лет",
      "Высокая стабильность связи"
    ],
    metrics: { devices: "380+", period: "4 мес.", savings: "20%", status: "Завершен" },
    image: "images/projects/daulpaz.png",
    year: "2024"
  },
  {
    id: "sensata-plaza",
    name: "ЖК Sensata Plaza (Астана)",
    city: "astana",
    description: "Интеграция цифровых приборов учета воды и тепла в систему диспетчеризации Smart Metrix.",
    results: [
      "Поставка приборов учета воды",
      "Облачный мониторинг 24/7",
      "Снижение ОДН расходов на 28%",
      "Интеграция с биллингом"
    ],
    metrics: { devices: "290+", period: "3 мес.", savings: "28%", status: "Завершен" },
    image: "images/solution_builders.png",
    year: "2023"
  },
  {
    id: "bi-city-seoul",
    name: "ЖК BI City Seoul (Астана)",
    city: "astana",
    description: "Модернизация общедомовых узлов учета с установкой цифровых расходомеров.",
    results: [
      "Поставка приборов учета высокого диаметра",
      "Подключение к LoRaWAN сети",
      "Мгновенный контроль аварийных ситуаций",
      "Снижение эксплуатационных потерь"
    ],
    metrics: { devices: "120+", period: "2 мес.", savings: "15%", status: "Завершен" },
    image: "images/solution_ksk.png",
    year: "2023"
  },
  // Шымкент
  {
    id: "shymkent-city",
    name: "ЖК Shymkent City (Шымкент)",
    city: "shymkent",
    description: "Внедрение автоматизированной системы учета воды в новом микрорайоне Шымкента.",
    results: [
      "600+ квартирных приборов учета",
      "Автоматический сбор через радиомодем ExpDevice",
      "Сокращение времени сбора показаний до 1 минуты",
      "Полный контроль баланса потребления"
    ],
    metrics: { devices: "600+", period: "6 мес.", savings: "25%", status: "Завершен" },
    image: "images/projects/shymkent_city.png",
    year: "2024"
  },
  {
    id: "tumar-shymkent",
    name: "ЖК Tumar (Шымкент)",
    city: "shymkent",
    description: "Оснащение элитного жилого комплекса интеллектуальными приборами учета с дистанционной передачей данных.",
    results: [
      "Индивидуальные приборы учета тепла и воды",
      "Поддержка NB-IoT каналов связи",
      "Личный кабинет для управляющей компании",
      "Высокая степень защиты IP68"
    ],
    metrics: { devices: "210+", period: "3 мес.", savings: "21%", status: "Завершен" },
    image: "images/service-installation.jpg",
    year: "2024"
  },
  {
    id: "otau-shymkent",
    name: "ЖК Otau (Шымкент)",
    city: "shymkent",
    description: "Поставка оборудования учета ресурсов для жилого комплекса комфорт-класса.",
    results: [
      "Интеллектуальные приборы учета с импульсным выходом",
      "Подключение к радиомодемам",
      "Сведение баланса по всему объекту",
      "Интеграция с городскими коммунальными службами"
    ],
    metrics: { devices: "450+", period: "5 мес.", savings: "19%", status: "Завершен" },
    image: "images/about-office.jpg",
    year: "2023"
  },
  // Туркестан
  {
    id: "turkistan-arena",
    name: "ЖК Turkistan Arena (Туркестан)",
    city: "turkestan",
    description: "Уникальный проект по автоматизации учета водопотребления в новом административном центре.",
    results: [
      "Установка современных приборов учета воды",
      "Дальность передачи данных до 10 км",
      "Облачный мониторинг через Smart Metrix",
      "Защита от внешних воздействий и магнитных полей"
    ],
    metrics: { devices: "340+", period: "4 мес.", savings: "23%", status: "Завершен" },
    image: "images/projects/turkestan_arena.png",
    year: "2024"
  },
  {
    id: "caravan-saray",
    name: "ЖК Caravan Saray (Туркестан)",
    city: "turkestan",
    description: "Оснащение туристических и жилых объектов цифровыми системами диспетчеризации воды и тепла.",
    results: [
      "Интеграция в общую экосистему умного города",
      "Контроль утечек и аварий в реальном времени",
      "Прочный латунный корпус приборов",
      "Высокая энергоэффективность приборов"
    ],
    metrics: { devices: "280+", period: "3 мес.", savings: "25%", status: "Завершен" },
    image: "images/service-thermal.jpg",
    year: "2024"
  },
  {
    id: "khan-arna",
    name: "ЖК Khan Arna (Туркестан)",
    city: "turkestan",
    description: "Комплексное решение для мониторинга и учета воды в жилом квартале.",
    results: [
      "Приборы учета с дистанционной передачей данных",
      "Подключение к единому серверу диспетчеризации",
      "Снижение потерь воды на 22%",
      "Межповерочный интервал 6 лет"
    ],
    metrics: { devices: "190+", period: "3 мес.", savings: "22%", status: "Завершен" },
    image: "images/solution_private.png",
    year: "2023"
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [consultOpen, setConsultOpen] = useState(false);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.city === activeFilter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">Реализованные проекты</h1>
          <p className="text-lg text-[#5C7A6B] max-w-3xl leading-relaxed">
            Компания реализует проекты по поставке и внедрению интеллектуальных приборов учета воды, тепла и электроэнергии для жилых, коммерческих и промышленных объектов по всему Казахстану.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-[#1B4332] py-12">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/60 text-sm">Реализованных проектов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60 text-sm">Поддержка и диспетчеризация</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/60 text-sm">Выполнение сроков</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#52B788] mb-2">-25%</div>
              <div className="text-white/60 text-sm">Средняя экономия ресурсов</div>
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
              <div key={project.id} className="card-base overflow-hidden group flex flex-col justify-between">
                <div>
                  <div className="aspect-video overflow-hidden relative bg-[#F8FBF9]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-[#1B4332] flex items-center gap-1">
                      <MapPin size={12} className="text-[#52B788]" />
                      {project.city === "almaty" ? "Алматы" : project.city === "astana" ? "Астана" : project.city === "shymkent" ? "Шымкент" : "Туркестан"} · {project.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#1B4332] text-lg mb-2">{project.name}</h3>
                    <p className="text-sm text-[#5C7A6B] mb-4 leading-relaxed">{project.description}</p>
                    <div className="space-y-2 mb-6">
                      {project.results.map((r) => (
                        <div key={r} className="flex items-start gap-2 text-sm text-[#5C7A6B]">
                          <CheckCircle size={14} className="text-[#52B788] flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
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
              <a href="tel:87711731722" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1B4332] gap-2">
                <Phone size={16} /> 8 771 173 1722
              </a>
            </div>
          </div>
        </div>
      </section>

      {consultOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConsultOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#1B4332] mb-6">Обсудить проект</h3>
            <form className="space-y-4" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
              <input type="text" name="Имя" required placeholder="Ваше имя" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="tel" name="Телефон" required placeholder="Телефон" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <div className="w-full">
                <select name="Город" required className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] bg-white">
                  <option value="Астана">Астана</option>
                  <option value="Алматы">Алматы</option>
                  <option value="Шымкент">Шымкент</option>
                  <option value="Туркестан">Туркестан</option>
                  <option value="Другой">Другой</option>
                </select>
              </div>
              <input type="email" name="Email" placeholder="Email" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="text" name="Компания" placeholder="Название компании" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <textarea name="Сообщение" placeholder="Опишите ваш проект" rows={3} className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none" />
              <button type="submit" className="w-full btn-primary">Отправить заявку</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
