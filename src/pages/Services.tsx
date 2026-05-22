import { Link } from "react-router-dom";
import {
  Wrench,
  Stethoscope,
  Settings,
  Flame,
  Wifi,
  Thermometer,
  Sparkles,
  ClipboardList,
  MoreHorizontal,
  ArrowRight,
  ChevronRight,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Wrench,
    title: "Монтаж и установка приборов учета",
    desc: "Профессиональная установка счетчиков воды, тепла и газа любой сложности. Работаем с оборудованием всех типов и производителей.",
    features: ["Ультразвуковые счетчики", "Механические счетчики", "Электромагнитные расходомеры", "Теплосчетчики"],
    image: "/images/service-installation.jpg",
  },
  {
    icon: Stethoscope,
    title: "Поверка счетчиков воды и тепла",
    desc: "Официальная поверка приборов учета с выдачей всех необходимых документов. Выездная и стационарная поверка.",
    features: ["Первичная поверка", "Периодическая поверка", "Выдача свидетельства", "Регистрация в гос. реестре"],
    image: "/images/product-kazmeter-15c.jpg",
  },
  {
    icon: Settings,
    title: "Техническое обслуживание",
    desc: "Регулярное техническое обслуживание, диагностика и ремонт оборудования. Гарантийное и постгарантийное обслуживание.",
    features: ["Плановое ТО", "Аварийный выезд", "Замена комплектующих", "Диагностика работоспособности"],
    image: "/images/service-thermal.jpg",
  },
  {
    icon: Flame,
    title: "Монтаж АТП и теплопунктов",
    desc: "Проектирование и монтаж автоматизированных тепловых пунктов. Энергоаудит и оптимизация теплоснабжения.",
    features: ["Проектирование АТП", "Монтаж оборудования", "Пусконаладка", "Обучение персонала"],
    image: "/images/solution-heat-point.jpg",
  },
  {
    icon: Wifi,
    title: "Диспетчеризация и удаленный контроль",
    desc: "Внедрение систем удаленного сбора показаний и диспетчеризации на базе платформы Smart Metrix.",
    features: ["Удаленный сбор данных", "Мониторинг 24/7", "Автоматические отчеты", "Интеграция с учетными системами"],
    image: "/images/smart-dashboard.png",
  },
  {
    icon: Thermometer,
    title: "Тепловизионные обследования",
    desc: "Выявление утечек тепла, оценка энергоэффективности зданий и тепловых сетей с помощью тепловизора.",
    features: ["Обследование зданий", "Диагностика теплосетей", "Выявление мостиков холода", "Отчет с рекомендациями"],
    image: "/images/service-thermal.jpg",
  },
  {
    icon: Sparkles,
    title: "Промывка теплообменников",
    desc: "Очистка теплообменного оборудования от накипи, загрязнений и отложений. Восстановление эффективности работы.",
    features: ["Химическая промывка", "Гидродинамическая очистка", "Диагностика после промывки", "Гарантия результата"],
    image: "/images/solution-heat-point.jpg",
  },
  {
    icon: ClipboardList,
    title: "Проектирование",
    desc: "Разработка проектной документации для систем учета воды, тепла и электроэнергии.",
    features: ["Техническое задание", "Проектная документация", "Сметы", "Согласование в органах"],
    image: "/images/about-office.jpg",
  },
  {
    icon: MoreHorizontal,
    title: "Еще услуги",
    desc: "Консультации, обучение персонала, пусконаладочные работы, юридическая поддержка.",
    features: ["Технические консультации", "Обучение персонала", "Пусконаладка", "Юридическая поддержка"],
    image: "/images/solution-smart-home.jpg",
  },
];

const processSteps = [
  { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или по телефону. Бесплатная консультация." },
  { step: "02", title: "Обследование", desc: "Выезд инженера на объект, оценка задачи, подготовка КП." },
  { step: "03", title: "Реализация", desc: "Поставка оборудования, монтаж, пусконаладка, сдача объекта." },
  { step: "04", title: "Поддержка", desc: "Техническое обслуживание, гарантийный ремонт, консультирование." },
];

const faqItems = [
  {
    question: "Сколько стоит установка счетчика воды?",
    answer: "Стоимость установки зависит от типа счетчика, сложности монтажа и условий на объекте. Базовая установка бытового счетчика начинается от 15 000 тенге. Для получения точной стоимости оставьте заявку — мы бесплатно выедем на объект и подготовим смету.",
  },
  {
    question: "Как часто нужно проверять счетчики?",
    answer: "Сроки поверки зависят от типа прибора. Для бытовых счетчиков воды — каждые 4-6 лет, для теплосчетчиков — каждые 3-4 года. Мы отслеживаем сроки и напоминаем клиентам о приближающейся поверке.",
  },
  {
    question: "Работаете ли вы в регионах Казахстана?",
    answer: "Да, мы работаем по всему Казахстану. У нас есть представительства в Астане и Алматы, а также сеть сертифицированных партнеров в других регионах. Для крупных проектов выезжаем в любой город.",
  },
  {
    question: "Какие гарантии вы предоставляете?",
    answer: "Мы предоставляем гарантию на монтажные работы до 2 лет и на оборудование — согласно условиям производителя (обычно 1-3 года). Также заключаем договор на постгарантийное обслуживание.",
  },
  {
    question: "Можно ли интегрировать ваши решения с 1С?",
    answer: "Да, наша платформа Smart Metrix поддерживает экспорт данных в форматах, совместимых с 1С и другими учетными системами. Мы также предоставляем API для интеграции.",
  },
];

export default function Services() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-[#8BA89B] hover:text-[#1B4332]">Главная</Link>
            <span className="text-[#8BA89B]">/</span>
            <span className="text-[#1B4332] font-medium">Услуги</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">Услуги</h1>
            <p className="text-lg text-[#5C7A6B] leading-relaxed">
              Полный комплекс услуг по установке, обслуживанию и диспетчеризации
              приборов учета воды, тепла и газа. Работаем под ключ — от проекта
              до сервисного обслуживания.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card-base p-6 group">
                <div className="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B4332] transition-colors">
                  <service.icon size={22} className="text-[#1B4332] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#1B4332] mb-2">{service.title}</h3>
                <p className="text-sm text-[#5C7A6B] mb-4">{service.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#5C7A6B]">
                      <CheckCircle size={12} className="text-[#52B788]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setConsultOpen(true)}
                  className="text-[#1B4332] text-sm font-medium inline-flex items-center gap-1 hover:text-[#2D6A4F] transition-colors"
                >
                  Заказать услугу <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-12">
            Процесс работы
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-[#D8E8DE] relative z-10">
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

      {/* FAQ */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-[#D8E8DE] rounded-xl px-6 data-[state=open]:border-[#52B788]"
                >
                  <AccordionTrigger className="text-left text-[#1B4332] font-medium hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5C7A6B] pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B4332] py-16">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужна консультация специалиста?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Оставьте заявку и мы свяжемся с вами в течение 30 минут
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setConsultOpen(true)} className="btn-primary bg-[#52B788] hover:bg-[#40916C] gap-2">
              Оставить заявку <ArrowRight size={16} />
            </button>
            <a href="tel:+77472075179" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1B4332] gap-2">
              <Phone size={16} /> +7 747 207 51 79
            </a>
          </div>
        </div>
      </section>

      {consultOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConsultOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#1B4332] mb-6">Заказать услугу</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="tel" placeholder="Телефон" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <input type="email" placeholder="Email" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
              <textarea placeholder="Опишите задачу" rows={3} className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none" />
              <button onClick={() => setConsultOpen(false)} className="w-full btn-primary">Отправить заявку</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
