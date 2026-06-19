import {
  TrendingUp,
  Headphones,
  GraduationCap,
  Wrench,
  Truck,
  FileText,
  CheckCircle,
  Building2,
  Users,
  Factory,
} from "lucide-react";
import { submitToWhatsApp } from "../utils/whatsapp";

const benefits = [
  {
    icon: TrendingUp,
    title: "Высокая маржинальность",
    description: "Специальные партнерские цены позволяют получать маржу до 35% на оборудование и услуги.",
  },
  {
    icon: Headphones,
    title: "Техническая поддержка",
    description: "Бесплатные консультации, удаленная диагностика и помощь в сложных установках.",
  },
  {
    icon: GraduationCap,
    title: "Обучение и сертификация",
    description: "Регулярные тренинги, вебинары и сертификация инженеров вашей компании.",
  },
  {
    icon: Wrench,
    title: "Гарантийное обслуживание",
    description: "Мы берем на себя все гарантийные обязательства — вы聚焦 на продажах.",
  },
  {
    icon: Truck,
    title: "Быстрая логистика",
    description: "Склад в Астане, доставка по всему Казахстану в течение 1-3 рабочих дней.",
  },
  {
    icon: FileText,
    title: "Маркетинговые материалы",
    description: "Каталоги, презентации, кейсы и техническая документация на русском языке.",
  },
];

const capabilities = [
  "Собственное производство и сборка оборудования",
  "Лицензия на монтаж и обслуживание приборов учета",
  "Сертифицированная лаборатория поверки",
  "Штат из 50+ инженеров по всему Казахстану",
  "Облачная платформа Smart Metrix",
  "Партнерства с KAZMETER, PULSAR, ВВТ, МУР",
];

const processSteps = [
  { step: "01", title: "Заявка", desc: "Заполните форму партнера на сайте или свяжитесь с нашим отделом развития." },
  { step: "02", title: "Встреча", desc: "Личная встреча или видеоконференция для обсуждения условий сотрудничества." },
  { step: "03", title: "Договор", desc: "Подписание партнерского договора с индивидуальными условиями." },
  { step: "04", title: "Обучение", desc: "Техническое обучение ваших специалистов, предоставление материалов." },
  { step: "05", title: "Старт продаж", desc: "Начало совместной работы, лидогенерация и поддержка сделок." },
];

const partnerTypes = [
  { icon: Building2, name: "Строительные компании", desc: "Оснащение объектов системами учета" },
  { icon: Users, name: "КСК и УК", desc: "Автоматизация сбора показаний" },
  { icon: Factory, name: "Промышленные предприятия", desc: "Комплексные системы мониторинга" },
  { icon: Wrench, name: "Сервисные компании", desc: "Совместное обслуживание клиентов" },
];

export default function Partners() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">
            Партнерам
          </h1>
          <p className="text-lg text-[#5C7A6B] max-w-3xl">
            Станьте партнером IoT-Exponenta и зарабатывайте на продаже и внедрении
            IoT-решений для учета энергоресурсов. Предоставляем полную техническую
            и маркетинговую поддержку.
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-12">
            Кто может стать партнером
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((pt) => (
              <div key={pt.name} className="card-base p-6 text-center">
                <div className="w-14 h-14 bg-[#D8F3DC] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <pt.icon size={24} className="text-[#1B4332]" />
                </div>
                <h3 className="font-semibold text-[#1B4332] mb-1">{pt.name}</h3>
                <p className="text-sm text-[#5C7A6B]">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-4">
            Преимущества партнерства
          </h2>
          <p className="text-[#5C7A6B] text-center mb-12 max-w-2xl mx-auto">
            Мы создали программу партнерства, которая позволяет вам сфокусироваться
            на продажах, а всю техническую работу берем на себя
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-[#D8E8DE]">
                <div className="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center mb-4">
                  <b.icon size={22} className="text-[#1B4332]" />
                </div>
                <h3 className="font-semibold text-[#1B4332] mb-2">{b.title}</h3>
                <p className="text-sm text-[#5C7A6B]">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1B4332] mb-6">
                Технические возможности
              </h2>
              <p className="text-[#5C7A6B] mb-8 leading-relaxed">
                IoT-Exponenta обладает всеми необходимыми компетенциями и ресурсами
                для реализации проектов любой сложности — от частной квартиры до
                крупного промышленного объекта.
              </p>
              <ul className="space-y-4">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#52B788] flex-shrink-0 mt-0.5" />
                    <span className="text-[#5C7A6B]">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="images/about-office.jpg"
                alt="Технические возможности"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation Process */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-12">
            Как стать партнером
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-[#D8E8DE] text-center relative z-10">
                  <div className="text-4xl font-bold text-[#D8F3DC] mb-3">{step.step}</div>
                  <h3 className="font-semibold text-[#1B4332] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5C7A6B]">{step.desc}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#D8E8DE] z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="max-w-2xl mx-auto bg-[#F8FBF9] rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#1B4332] text-center mb-2">
              Стать партнером
            </h2>
            <p className="text-[#5C7A6B] text-center mb-8">
              Заполните форму и мы свяжемся с вами в течение рабочего дня
            </p>
            <form className="space-y-4" onSubmit={submitToWhatsApp}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#5C7A6B] mb-1 block">Имя *</label>
                  <input
                    type="text"
                    name="Имя"
                    required
                    placeholder="Ваше имя"
                    className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#5C7A6B] mb-1 block">Телефон *</label>
                  <input
                    type="tel"
                    name="Телефон"
                    required
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#5C7A6B] mb-1 block">Email *</label>
                  <input
                    type="email"
                    name="Email"
                    required
                    placeholder="example@mail.com"
                    className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#5C7A6B] mb-1 block">Компания</label>
                  <input
                    type="text"
                    name="Компания"
                    placeholder="Название компании"
                    className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Город</label>
                <input
                  type="text"
                  name="Город"
                  placeholder="Город"
                  className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]"
                />
              </div>
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Тип партнерства</label>
                <select name="Тип партнерства" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]">
                  <option>Дилер</option>
                  <option>Инсталлятор</option>
                  <option>Интегратор</option>
                  <option>Другое</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Комментарий</label>
                <textarea
                  name="Комментарий"
                  placeholder="Расскажите о вашей компании и планах..."
                  rows={4}
                  className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788] resize-none"
                />
              </div>
              <button type="submit" className="w-full btn-primary py-3.5">
                Отправить заявку
              </button>
              <p className="text-xs text-[#8BA89B] text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
