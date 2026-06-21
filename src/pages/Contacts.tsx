import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Wrench,
  FileText,
  Users,
  ChevronDown,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { submitToWhatsApp } from "../utils/whatsapp";

const offices = [
  {
    city: "Астана",
    address: "ул. Петрова, 18/1",
    phones: ["8 771 173 1722"],
    email: "info@iot-exp.kz",
    hours: "Пн-Пт: 09:00 - 18:00",
    isMain: true,
  },
  {
    city: "Алматы",
    address: "просп. Назарбаева, 50, офис 412",
    phones: ["+7 707 313 4050", "+7 705 705 5051"],
    email: "info@iot-exp.kz",
    hours: "Пн-Пт: 09:00 - 18:00",
    isMain: false,
  },
];

const inquiryTypes = [
  { icon: Wrench, title: "Заказать услугу", desc: "Монтаж, поверка, обслуживание" },
  { icon: FileText, title: "Запросить КП", desc: "Коммерческое предложение" },
  { icon: Users, title: "Стать партнером", desc: "Партнерская программа" },
  { icon: MessageSquare, title: "Техподдержка", desc: "Помощь с оборудованием" },
];

const faqItems = [
  {
    question: "Какой срок поставки оборудования?",
    answer: "Стандартный срок поставки — 1-3 рабочих дня по Астане и Алматы, 3-7 дней в другие регионы Казахстана. Для крупных партий и специальных заказов сроки обсуждаются индивидуально.",
  },
  {
    question: "Предоставляете ли вы рассрочку?",
    answer: "Да, мы предоставляем рассрочку платежа до 12 месяцев для юридических лиц. Для физических лиц доступны программы партнерских банков.",
  },
  {
    question: "Какие гарантии на оборудование?",
    answer: "Гарантия на оборудование составляет от 1 до 3 лет в зависимости от производителя. На монтажные работы мы предоставляем гарантию 2 года.",
  },
  {
    question: "Работаете ли вы по Казахстану?",
    answer: "Да, мы работаем по всему Казахстану. У нас есть собственные бригады в Астане и Алматы, а в других регионах сотрудничаем с сертифицированными партнерами.",
  },
  {
    question: "Как связаться с техподдержкой?",
    answer: "Техническая поддержка доступна круглосуточно по телефону 8 771 173 1722 или через WhatsApp. Также можно написать на info@iot-exp.kz — среднее время ответа 30 минут.",
  },
];

export default function Contacts() {
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">Контакты</h1>
          <p className="text-lg text-[#5C7A6B] max-w-3xl">
            Свяжитесь с нами удобным способом. Мы всегда на связи и готовы
            ответить на все ваши вопросы.
          </p>
        </div>
      </section>

      {/* Telegram Support Banner */}
      <section className="bg-white py-12 border-b border-[#D8E8DE]">
        <div className="container-main">
          <div className="bg-gradient-to-br from-[#1B4332] to-[#0A1F16] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#52B788]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block bg-[#52B788]/20 text-[#52B788] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                Сервисная поддержка
              </span>
              <h2 className="text-3xl font-bold mb-4">Техническая поддержка и консультации</h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                В Telegram отвечает сервисный бот и специалисты компании.
              </p>
              <a
                href="https://t.me/iot_exponenta_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#52B788] hover:bg-[#40916C] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#52B788]/20 hover:scale-105 active:scale-95"
              >
                Открыть Telegram
              </a>
            </div>
            <div className="relative z-10 flex flex-col items-center bg-white p-6 rounded-2xl border border-white/10 shadow-lg shrink-0">
              <img
                src="images/telegram_qr.png"
                alt="Telegram QR Code"
                className="w-36 h-36 object-contain"
              />
              <span className="text-xs text-[#1B4332] font-semibold mt-3">@iot_exponenta_bot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Office Cards */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            {offices.map((office) => (
              <div
                key={office.city}
                className={`rounded-2xl p-8 border ${
                  office.isMain
                    ? "border-[#1B4332] bg-[#F8FBF9]"
                    : "border-[#D8E8DE] bg-white"
                }`}
              >
                {office.isMain && (
                  <span className="inline-block bg-[#1B4332] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                    Головной офис
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#1B4332] mb-6">{office.city}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#52B788] flex-shrink-0 mt-0.5" />
                    <span className="text-[#5C7A6B]">{office.address}</span>
                  </div>
                  <div className="space-y-2">
                    {office.phones.map((phoneNum) => (
                      <div key={phoneNum} className="flex items-center gap-3">
                        <Phone size={20} className="text-[#52B788] flex-shrink-0" />
                        <a href={`tel:${phoneNum.replace(/\s/g, "")}`} className="text-[#1B4332] font-medium hover:text-[#52B788] transition-colors">
                          {phoneNum}
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-[#52B788] flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-[#1B4332] font-medium hover:text-[#52B788] transition-colors">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-[#52B788] flex-shrink-0" />
                    <span className="text-[#5C7A6B]">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Inquiry Type Cards */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-4">
            Чем мы можем помочь?
          </h2>
          <p className="text-[#5C7A6B] text-center mb-12">
            Выберите тип обращения, и мы подготовим для вас лучшее решение
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inquiryTypes.map((type) => (
              <button
                key={type.title}
                onClick={() => setSelectedInquiry(type.title)}
                className={`card-base p-6 text-left transition-all ${
                  selectedInquiry === type.title
                    ? "border-[#52B788] shadow-md"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center mb-4">
                  <type.icon size={22} className="text-[#1B4332]" />
                </div>
                <h3 className="font-semibold text-[#1B4332] mb-1">{type.title}</h3>
                <p className="text-sm text-[#5C7A6B]">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 border border-[#D8E8DE]">
              <h2 className="text-2xl font-bold text-[#1B4332] mb-2">Напишите нам</h2>
              <p className="text-[#5C7A6B] mb-8">
                Заполните форму и мы ответим в течение 30 минут
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
                      className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#5C7A6B] mb-1 block">Телефон *</label>
                    <input
                      type="tel"
                      name="Телефон"
                      required
                      placeholder="+7 (___) ___-__-__"
                      className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#5C7A6B] mb-1 block">Email</label>
                  <input
                    type="email"
                    name="Email"
                    placeholder="example@mail.com"
                    className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#5C7A6B] mb-1 block">Город *</label>
                    <select
                      name="Город"
                      required
                      className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]"
                    >
                      <option value="Астана">Астана</option>
                      <option value="Алматы">Алматы</option>
                      <option value="Шымкент">Шымкент</option>
                      <option value="Туркестан">Туркестан</option>
                      <option value="Другой">Другой</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-[#5C7A6B] mb-1 block">Тема обращения</label>
                    <select name="Тема обращения" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#52B788]">
                      <option>Выберите тему</option>
                      <option>Заказать услугу</option>
                      <option>Запросить КП</option>
                      <option>Стать партнером</option>
                      <option>Техподдержка</option>
                      <option>Другое</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#5C7A6B] mb-1 block">Сообщение</label>
                  <textarea
                    name="Сообщение"
                    placeholder="Опишите ваш вопрос..."
                    rows={4}
                    className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none"
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-3.5">
                  Отправить сообщение
                </button>
                <p className="text-xs text-[#8BA89B] text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-[#D8E8DE] overflow-hidden flex-1 min-h-[400px] relative">
                <div className="absolute inset-0 bg-[#E8F0EB] flex flex-col items-center justify-center">
                  <Navigation size={48} className="text-[#52B788] mb-4" />
                  <p className="text-[#1B4332] font-semibold mb-2">IoT-Exponenta</p>
                  <p className="text-[#5C7A6B] text-sm text-center max-w-xs">
                    г. Астана, ул. Петрова, 18/1
                  </p>
                  <a
                    href="https://2gis.kz/astana/search/ул.%20Петрова%2018%2F1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 btn-secondary text-sm gap-1"
                  >
                    Открыть в 2GIS <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#D8E8DE]">
                <h3 className="font-semibold text-[#1B4332] mb-4">Реквизиты</h3>
                <div className="space-y-2 text-sm text-[#5C7A6B]">
                  <p>ТОО «IoT-Exponenta»</p>
                  <p>БИН: 940440001234</p>
                  <p>ИИК: KZ86125KZT5001300000</p>
                  <p>Банк: АО «Народный Банк Казахстана»</p>
                  <p>БИК: HSBKKZKX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className={`border rounded-xl transition-colors ${
                  openFaq === idx ? "border-[#52B788]" : "border-[#D8E8DE]"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-[#1B4332] pr-4">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#8BA89B] flex-shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-[#5C7A6B] text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
