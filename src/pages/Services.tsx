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
  Phone,
  CheckCircle,
  Search,
  Headset,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { submitToWhatsApp } from "../utils/whatsapp";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    icon: Wrench,
    title: "Монтаж и установка приборов учета",
    desc: "Профессиональный монтаж систем воды, тепла и газа под ключ.",
    image: "/images/service-installation.jpg",
  },
  {
    icon: Stethoscope,
    title: "Поверка счетчиков воды и тепла",
    desc: "Официальная поверка приборов учета с выдачей необходимых документов.",
    image: "/images/product-kazmeter-15c.jpg",
  },
  {
    icon: Settings,
    title: "Техническое обслуживание",
    desc: "Регулярное ТО для надежной и бесперебойной работы измерительных систем.",
    image: "",
  },
  {
    icon: Flame,
    title: "Монтаж АТП и теплопунктов",
    desc: "Проектирование и монтаж автоматизированных тепловых пунктов любой сложности.",
    image: "",
  },
  {
    icon: Wifi,
    title: "Диспетчеризация и удаленный контроль",
    desc: "Онлайн-мониторинг и управление системами учета в реальном времени.",
    image: "/images/smart-dashboard.png",
  },
  {
    icon: Thermometer,
    title: "Тепловизионные обследования",
    desc: "Выявление утечек тепла, оценка энергоэффективности зданий и тепловых сетей с помощью тепловизоров.",
    image: "/images/service-thermal.jpg",
  },
  {
    icon: Sparkles,
    title: "Промывка теплообменников",
    desc: "Очистка и восстановление работоспособности теплообменного оборудования.",
    image: "",
  },
  {
    icon: ClipboardList,
    title: "Проектирование",
    desc: "Разработка проектной документации для систем учета и теплопотребления.",
    image: "",
  },
  {
    icon: MoreHorizontal,
    title: "Дополнительные услуги",
    desc: "Консультации, обучение персонала, пусконаладочные работы, сервисная поддержка и другие сопутствующие услуги.",
    image: "",
  },
];

const processSteps = [
  { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или по телефону. Бесплатная консультация.", icon: ClipboardList },
  { step: "02", title: "Обследование", desc: "Выезд инженера на объект, оценка задачи, подготовка КП.", icon: Search },
  { step: "03", title: "Реализация", desc: "Поставка оборудования, монтаж, пусконаладка, сдача объекта.", icon: Wrench },
  { step: "04", title: "Поддержка", desc: "Техническое обслуживание, гарантийный ремонт, консультирование.", icon: Headset },
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const ImageCard = ({ service, className = "", onClick }: { service: any, className?: string, onClick: () => void }) => (
  <motion.div variants={itemVariants} className={`relative rounded-3xl overflow-hidden group min-h-[300px] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${className}`} onClick={onClick}>
    <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F16]/90 via-[#0A1F16]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
    <div className="absolute inset-x-6 bottom-6 z-10 flex flex-col justify-end">
      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-snug">{service.title}</h3>
      <p className="text-white/80 text-sm leading-relaxed max-w-[90%] mb-4">{service.desc}</p>
      <div className="flex items-center text-white text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        Подробнее <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  </motion.div>
);

const IconCard = ({ service, className = "", onClick }: { service: any, className?: string, onClick: () => void }) => (
  <motion.div variants={itemVariants} className={`bg-white border border-[#D8E8DE] rounded-3xl p-6 hover:shadow-xl hover:border-[#52B788]/50 transition-all group flex flex-col cursor-pointer ${className}`} onClick={onClick}>
    <div className="w-14 h-14 bg-[#F8FBF9] rounded-full flex items-center justify-center mb-5 group-hover:bg-[#E8F7ED] group-hover:scale-110 transition-all duration-300 border border-[#D8E8DE]/50 shadow-sm">
      <service.icon className="text-[#52B788]" size={24} />
    </div>
    <h3 className="text-lg font-bold text-[#1B4332] mb-3">{service.title}</h3>
    <p className="text-[#5C7A6B] text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
    <div className="flex items-center text-[#52B788] text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all mt-auto">
      Подробнее <ArrowRight size={16} className="ml-1" />
    </div>
  </motion.div>
);

export default function Services() {
  const [consultOpen, setConsultOpen] = useState(false);

  const topImageServices = [services[0], services[1], services[4]]; // Монтаж, Поверка, Диспетчеризация
  const bottomIconServices = [
    services[2], // ТО
    services[3], // Монтаж АТП
    services[6], // Промывка
    services[7], // Проектирование
    services[5], // Тепловизионные обследования
    services[8], // Доп. услуги
  ];

  return (
    <div className="overflow-hidden">
      {/* Dynamic Hero */}
      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 flex items-center">
        {/* Background Overlay showing industrial theme fading into white */}
        <div className="absolute inset-0 z-0">
          <img src="/images/service-installation.jpg" alt="Фон услуг" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-white/90" />
        </div>
        
        <div className="container-main relative z-10">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm mb-6 text-[#5C7A6B]"
          >
            <Link to="/" className="hover:text-[#1B4332] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[#1B4332] font-medium">Услуги</span>
          </motion.nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#1B4332] mb-6 tracking-tight">
              Услуги
            </h1>
            <p className="text-lg md:text-xl text-[#5C7A6B] leading-relaxed max-w-2xl">
              Полный комплекс услуг по установке, обслуживанию и диспетчеризации
              приборов учета воды, тепла и газа. Работаем под ключ — от проекта
              до сервисного обслуживания.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Services */}
      <section className="bg-white pb-24 relative z-10">
        <div className="container-main">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6"
          >
            {/* Top Row: 3 Large Image Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topImageServices.map(service => (
                <ImageCard key={service.title} service={service} className="md:h-[380px]" onClick={() => setConsultOpen(true)} />
              ))}
            </div>

            {/* Bottom Section: Regular Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bottomIconServices.map(service => (
                <IconCard key={service.title} service={service} className="h-full" onClick={() => setConsultOpen(true)} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-[#F8FBF9] py-24 relative">
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">
              Процесс работы
            </h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto px-4 md:px-0">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[27px] left-[12.5%] right-[12.5%] h-[2px] bg-[#D8E8DE] z-0">
               <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-[#52B788]" 
               />
            </div>

            {/* Connecting Line (Mobile) */}
            <div className="block md:hidden absolute left-[43px] top-[27px] bottom-[27px] w-[2px] bg-[#D8E8DE] z-0">
               <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="w-full bg-[#52B788]" 
               />
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col md:grid md:grid-cols-4 gap-10 relative z-10"
            >
              {processSteps.map((step, idx) => (
                <motion.div variants={itemVariants} key={idx} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center group gap-6 md:gap-0">
                   <div className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#D8E8DE] group-hover:border-[#52B788] flex items-center justify-center md:mb-6 shadow-[0_0_0_6px_#F8FBF9] transition-colors duration-300 relative z-10 ml-4 md:ml-0">
                      <step.icon className="text-[#1B4332] group-hover:text-[#52B788] transition-colors" size={24} />
                   </div>
                   <div className="flex flex-col md:items-center">
                     <div className="text-4xl font-bold text-[#52B788] mb-2">{step.step}</div>
                     <h3 className="text-lg font-bold text-[#1B4332] mb-2">{step.title}</h3>
                     <p className="text-sm text-[#5C7A6B] leading-relaxed md:max-w-[200px]">{step.desc}</p>
                   </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">
              Часто задаваемые вопросы
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-[#D8E8DE] rounded-2xl px-6 data-[state=open]:border-[#52B788] data-[state=open]:shadow-md transition-all bg-white"
                >
                  <AccordionTrigger className="text-left text-[#1B4332] font-semibold hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5C7A6B] pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B4332] py-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#52B788] rounded-full blur-[120px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container-main relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Нужна консультация специалиста?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Оставьте заявку и мы свяжемся с вами в течение 30 минут для обсуждения вашего проекта.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setConsultOpen(true)} className="bg-[#52B788] hover:bg-[#40916C] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#52B788]/30">
                  Оставить заявку <ArrowRight size={18} />
                </button>
                <a href="tel:+77073134050" className="bg-white/10 hover:bg-white border border-white/20 text-white hover:text-[#1B4332] font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                  <Phone size={18} /> +7 707 313 4050
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:pl-12"
            >
              <div className="space-y-6">
                {[
                  "Бесплатная консультация и подбор оборудования",
                  "Индивидуальный подход к каждому проекту",
                  "Оперативный выезд инженера на объект",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#52B788]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-[#52B788]" size={20} />
                    </div>
                    <span className="text-white/90 font-medium text-lg">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal Dialog for Contact */}
      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0 border-none">
          <div className="bg-[#1B4332] p-6 text-center">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Оставьте заявку</DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-sm mt-2">Опишите вашу задачу, и наш инженер свяжется с вами.</p>
          </div>
          <div className="p-8 bg-white">
            <form className="space-y-5" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
              <input type="text" name="Имя" required placeholder="Ваше имя" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              <input type="tel" name="Телефон" required placeholder="Номер телефона" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              <input type="email" name="Email" placeholder="Email (необязательно)" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              <textarea name="Сообщение" placeholder="Какая услуга вас интересует?" rows={3} className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all resize-none" />
              <button type="submit" className="w-full bg-[#52B788] hover:bg-[#40916C] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#52B788]/30 transition-transform hover:-translate-y-1 active:translate-y-0">
                Заказать услугу
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
