import { useState } from "react";
import { submitToWhatsApp } from "../utils/whatsapp";
import {
  Home,
  Building2,
  Users,
  Factory,
  Wifi,
  CheckCircle,
  X,
  ArrowRight,
  Phone,
} from "lucide-react";

const solutions = [
  {
    icon: Home,
    title: "Для частных клиентов",
    description: "Комплект умного учета для квартиры или частного дома. Установка IoT-счетчиков воды с удаленным снятием показаний.",
    image: "images/solution_private.png",
    features: [
      "Ультразвуковые счетчики воды",
      "Автоматический сбор показаний",
      "Мобильное приложение",
      "Оповещения об утечках",
      "Поверка и обслуживание",
    ],
    price: "Цена по запросу",
  },
  {
    icon: Building2,
    title: "Для строительных компаний",
    description: "Комплексное оснащение новостроек системами автоматического учета воды и тепла. Проектирование под ключ.",
    image: "images/solution_builders.png",
    features: [
      "Проектирование систем учета",
      "Поставка оборудования",
      "Монтаж и пусконаладка",
      "Интеграция с диспетчеризацией",
      "Обучение персонала",
    ],
    price: "Цена по запросу",
  },
  {
    icon: Users,
    title: "Для КСК и управляющих компаний",
    description: "Автоматизация сбора показаний и диспетчеризация инженерных систем многоквартирных домов.",
    image: "images/solution_ksk.png",
    features: [
      "Автоматический сбор показаний",
      "Веб-панель управления",
      "Формирование отчетов",
      "Оповещения об авариях",
      "Юридическая поддержка",
    ],
    price: "Цена по запросу",
  },
  {
    icon: Factory,
    title: "Тепловые пункты / АТП",
    description: "Модернизация и строительство индивидуальных тепловых пунктов с автоматизацией и диспетчеризацией.",
    image: "images/solution_heat_points.png",
    features: [
      "Проектирование ИТП",
      "Поставка оборудования",
      "Автоматика и КИПиА",
      "Диспетчеризация",
      "Энергоаудит",
    ],
    price: "Цена по запросу",
  },
  {
    icon: Wifi,
    title: "Диспетчеризация и Smart Metrix",
    description: "Внедрение облачной платформы Smart Metrix для удаленного мониторинга всех инженерных систем объекта.",
    image: "images/solution_smart_metrix.png",
    features: [
      "Облачная платформа",
      "Мониторинг 24/7",
      "Мобильное приложение",
      "API интеграция",
      "Аналитика и отчеты",
    ],
    price: "Цена по запросу",
  },
];

const comparisonData = [
  { feature: "Удаленный сбор показаний", private: true, construction: true, ksk: true, heat: true, dispatch: true },
  { feature: "Мобильное приложение", private: true, construction: true, ksk: true, heat: false, dispatch: true },
  { feature: "Оповещения об утечках", private: true, construction: true, ksk: true, heat: true, dispatch: true },
  { feature: "Диспетчеризация 24/7", private: false, construction: false, ksk: true, heat: true, dispatch: true },
  { feature: "Формирование отчетов", private: true, construction: true, ksk: true, heat: true, dispatch: true },
  { feature: "API интеграция", private: false, construction: true, ksk: true, heat: true, dispatch: true },
  { feature: "Энергоаудит", private: false, construction: true, ksk: false, heat: true, dispatch: false },
  { feature: "Проектирование", private: false, construction: true, ksk: false, heat: true, dispatch: false },
  { feature: "Обучение персонала", private: false, construction: true, ksk: true, heat: true, dispatch: true },
  { feature: "Гарантийное обслуживание", private: true, construction: true, ksk: true, heat: true, dispatch: true },
];

export default function Solutions() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">
            Готовые решения
          </h1>
          <p className="text-lg text-[#5C7A6B] max-w-3xl">
            Создаем надежную интеллектуальную инфраструктуру для автоматизации, мониторинга и сбережения ресурсов — от умных домов до масштабных промышленных предприятий.
          </p>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {solutions.map((solution, index) => {
              // Top 3 cards span 2 columns (3x2=6), Bottom 2 cards span 3 columns (2x3=6) to balance
              const spanClass = index < 3 ? "lg:col-span-2" : "lg:col-span-3";
              return (
                <div key={solution.title} className={`card-base overflow-hidden flex flex-col md:col-span-1 ${spanClass}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center mb-4">
                      <solution.icon size={22} className="text-[#1B4332]" />
                    </div>
                    <h3 className="font-semibold text-[#1B4332] text-lg mb-2">{solution.title}</h3>
                    <p className="text-sm text-[#5C7A6B] mb-4 flex-1">{solution.description}</p>
                    <ul className="space-y-2 mb-6 mt-auto">
                      {solution.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#5C7A6B]">
                          <CheckCircle size={14} className="text-[#52B788]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-[#D8E8DE]">
                      <span className="font-bold text-[#1B4332]">{solution.price}</span>
                      <button
                        onClick={() => setConsultOpen(true)}
                        className="text-sm text-[#52B788] font-medium hover:text-[#1B4332] transition-colors"
                      >
                        Подробнее →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-4">
            Сравнение решений
          </h2>
          <p className="text-[#5C7A6B] text-center mb-12 max-w-2xl mx-auto">
            Выберите подходящее решение в зависимости от типа объекта и требований
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-[#D8E8DE] overflow-hidden">
              <thead>
                <tr className="bg-[#1B4332] text-white">
                  <th className="text-left px-6 py-4 font-semibold text-sm">Функция</th>
                  <th className="px-4 py-4 font-semibold text-sm text-center w-36">Частные клиенты</th>
                  <th className="px-4 py-4 font-semibold text-sm text-center w-36">Строительные компании</th>
                  <th className="px-4 py-4 font-semibold text-sm text-center w-36">КСК</th>
                  <th className="px-4 py-4 font-semibold text-sm text-center w-36">Тепловые пункты</th>
                  <th className="px-4 py-4 font-semibold text-sm text-center w-36">Диспетчеризация</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FBF9]"}>
                    <td className="px-6 py-3.5 text-sm text-[#5C7A6B]">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center">
                      {row.private ? <CheckCircle size={18} className="text-[#52B788] mx-auto" /> : <X size={18} className="text-[#D8E8DE] mx-auto" />}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.construction ? <CheckCircle size={18} className="text-[#52B788] mx-auto" /> : <X size={18} className="text-[#D8E8DE] mx-auto" />}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.ksk ? <CheckCircle size={18} className="text-[#52B788] mx-auto" /> : <X size={18} className="text-[#D8E8DE] mx-auto" />}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.heat ? <CheckCircle size={18} className="text-[#52B788] mx-auto" /> : <X size={18} className="text-[#D8E8DE] mx-auto" />}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {row.dispatch ? <CheckCircle size={18} className="text-[#52B788] mx-auto" /> : <X size={18} className="text-[#D8E8DE] mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B4332] py-16">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Подберем решение под ваши задачи
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Оставьте заявку и наши инженеры подготовят индивидуальное
            коммерческое предложение
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setConsultOpen(true)} className="btn-primary bg-[#52B788] hover:bg-[#40916C] gap-2">
              Получить консультацию <ArrowRight size={16} />
            </button>
            <a href="tel:+7 707 313 4050" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1B4332] gap-2">
              <Phone size={16} /> +7 707 313 4050
            </a>
          </div>
        </div>
      </section>

      {consultOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConsultOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#1B4332] mb-6">Получить консультацию</h3>
            <form className="space-y-4" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
              <input type="text" name="Имя" required placeholder="Ваше имя" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="tel" name="Телефон" required placeholder="Телефон" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="email" name="Email" placeholder="Email" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <textarea name="Сообщение" placeholder="Опишите вашу задачу" rows={3} className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none" />
              <button type="submit" className="w-full btn-primary">Отправить заявку</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
