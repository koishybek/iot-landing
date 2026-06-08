import { Link } from "react-router-dom";
import { CheckCircle, Users, Briefcase, Clock, Shield, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { submitToWhatsApp } from "../utils/whatsapp";

const stats = [
  { value: "20+", label: "лет опыта", icon: Clock },
  { value: "500+", label: "выполненных проектов", icon: Briefcase },
  { value: "2000+", label: "установленных приборов", icon: Shield },
  { value: "24/7", label: "техническая поддержка", icon: Users },
];

const partners = [
  "АО «Матен петролеум»",
  "АО «СНПС-Актобемунайгаз»",
  "ТОО «Казахстан Темир Жолы»",
  "АО «Самрук-Энерго»",
  "ТОО «Астана ЭС»",
  "АО «КазТрансОйл»",
];

const advantages = [
  "Собственный штат сертифицированных инженеров",
  "Прямые контракты с производителями оборудования",
  "Лицензия на монтаж и обслуживание приборов учета",
  "Гарантия на все виды работ до 3 лет",
  "Интеграция с любыми учетными системами",
  "Бесплатная консультация и выезд на объект",
];

export default function About() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-20">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-[#8BA89B] hover:text-[#1B4332]">Главная</Link>
            <span className="text-[#8BA89B]">/</span>
            <span className="text-[#1B4332] font-medium">О компании</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6">
              О компании
            </h1>
            <p className="text-lg text-[#5C7A6B] leading-relaxed">
              IoT-Exponenta — ведущий интегратор IoT-решений для учета энергоресурсов
              в Казахстане. Мы проектируем, внедряем и обслуживаем системы умного
              учета воды, тепла и газа.
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1B4332] mb-6">
                Инженерная компания с фокусом на IoT
              </h2>
              <p className="text-[#5C7A6B] mb-4 leading-relaxed">
                С 2005 года мы специализируемся на создании комплексных решений для
                автоматизации учета энергоресурсов. Наша команда объединяет опыт
                инженеров-теплотехников, электронщиков и программистов для создания
                надежных систем учета.
              </p>
              <p className="text-[#5C7A6B] mb-6 leading-relaxed">
                Мы являемся официальными партнерами ведущих производителей
                приборов учета в Казахстане и СНГ. Наши решения работают в более
                чем 500 объектах по всей стране — от частных квартир до крупных
                промышленных предприятий.
              </p>
              <ul className="space-y-3">
                {advantages.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#52B788] flex-shrink-0 mt-0.5" />
                    <span className="text-[#5C7A6B]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/about-office.jpg"
                alt="Офис IoT-Exponenta"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Metrix */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/smart-dashboard.png"
                alt="Smart Metrix Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-[#D8F3DC] text-[#1B4332] px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-[#52B788] rounded-full"></span>
                Наша платформа
              </div>
              <h2 className="text-3xl font-bold text-[#1B4332] mb-6">
                Smart Metrix — система диспетчеризации
              </h2>
              <p className="text-[#5C7A6B] mb-4 leading-relaxed">
                Smart Metrix — собственная разработка IoT-Exponenta, облачная
                платформа для сбора, хранения и анализа данных с приборов учета.
                Система позволяет в реальном времени мониторить потребление
                ресурсов, выявлять аномалии и формировать отчеты.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  "Сбор данных в реальном времени",
                  "Автоматические отчеты",
                  "Оповещения об утечках",
                  "API для интеграции",
                  "Мобильное приложение",
                  "Экспорт в 1С и другие системы",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#52B788]" />
                    <span className="text-sm text-[#5C7A6B]">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/solutions" className="btn-primary gap-2">
                Узнать больше <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-[#1B4332] py-16 md:py-20">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-[#52B788]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Clients */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-[#1B4332] text-center mb-4">
            Нам доверяют
          </h2>
          <p className="text-[#5C7A6B] text-center mb-12 max-w-2xl mx-auto">
            Среди наших клиентов — крупнейшие промышленные предприятия,
            строительные компании и управляющие организации Казахстана
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="bg-[#F8FBF9] rounded-xl p-6 flex items-center justify-center h-24 border border-[#D8E8DE] hover:border-[#52B788] transition-colors"
              >
                <span className="text-[#8BA89B] text-sm font-medium text-center">
                  {partner}
                </span>
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
              Готовы начать сотрудничество?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Свяжитесь с нами для получения бесплатной консультации и
              коммерческого предложения
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setConsultOpen(true)} className="btn-primary bg-[#52B788] hover:bg-[#40916C] gap-2">
                Получить консультацию <ArrowRight size={16} />
              </button>
              <Link to="/contacts" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1B4332] gap-2">
                Связаться с нами <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1B4332]">Получить консультацию</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 pt-4" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
            <input type="text" name="Имя" required placeholder="Ваше имя" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
            <input type="tel" name="Телефон" required placeholder="Телефон" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
            <input type="email" name="Email" placeholder="Email" className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788]" />
            <textarea name="Ваш вопрос" placeholder="Ваш вопрос" rows={3} className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 focus:outline-none focus:border-[#52B788] resize-none" />
            <button type="submit"  className="w-full btn-primary">Отправить</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
