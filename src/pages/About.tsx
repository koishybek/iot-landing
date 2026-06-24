import { Link } from "react-router-dom";
import { CheckCircle, Users, Briefcase, Shield, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { submitToWhatsApp } from "../utils/whatsapp";
import { motion, type Variants } from "framer-motion";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";

const stats = [
  { value: 500, suffix: "+", label: "выполненных проектов", icon: Briefcase },
  { value: 2000, suffix: "+", label: "установленных приборов", icon: Shield },
  { value: 24, suffix: "/7", label: "техническая поддержка", icon: Users },
];

const partners = [
  { name: "BI Group", img: "images/partners/bi-group.png" },
  { name: "ТОО «Сат НС»", img: "images/partners/images (1).png" },
  { name: "ТОО «Sensata Group»", img: "images/partners/images.png" },
  { name: "ТОО «Свой дом»", img: "images/partners/Без названия.jpg" },
  { name: "ТОО «SAT-NS» (JPG)", img: "images/partners/images (1).jpg" },
  { name: "Sensata Group (JPG)", img: "images/partners/images.jpg" },
  { name: "Orda Invest", img: "images/partners/images (2).png" },
  { name: "BAZIS-A", img: "images/partners/images1.png" },
  { name: "Sembol Construction", img: "images/partners/1024_2dc41f67ac666a9c92f2f84c1e6f841a.png" },
];

const advantages = [
  "Собственный штат сертифицированных инженеров",
  "Прямые контракты с производителями оборудования",
  "Лицензия на монтаж и обслуживание приборов учета",
  "Гарантия на все виды работ до 3 лет",
  "Интеграция с любыми учетными системами",
  "Бесплатная консультация и выезд на объект",
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

export default function About() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Dynamic Hero */}
      <section className="relative bg-[#0d2119] py-24 md:py-32 flex items-center min-h-[60vh]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[#52B788] rounded-full blur-[120px] mix-blend-screen"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1B4332] rounded-full blur-[150px] mix-blend-screen"
          />
        </div>
        
        <div className="container-main relative z-10">
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm mb-8 text-white/60"
          >
            <Link to="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-white font-medium">О компании</span>
          </motion.nav>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Формируем будущее <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52B788] to-[#95D5B2]">
                интеллектуального учета
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#8BA89B] leading-relaxed max-w-2xl">
              Мы проектируем, внедряем и обслуживаем передовые IoT-решения для энергоресурсов, делая их прозрачными и эффективными.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Description */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
          >


            {/* Block 3: Advantages Marquee / List */}
            <motion.div variants={itemVariants} className="md:col-span-3 bg-[#1B4332] rounded-3xl p-8 md:p-10 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-8 text-center">Почему выбирают нас?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {advantages.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="bg-[#52B788]/20 p-2 rounded-lg flex-shrink-0">
                      <CheckCircle size={24} className="text-[#52B788]" />
                    </div>
                    <span className="text-white/90 leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Interactive Counter */}
      <section className="bg-white pb-20 relative z-10">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-[#D8E8DE] rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:border-[#52B788]/50 transition-all group"
              >
                <div className="w-16 h-16 bg-[#F8FBF9] group-hover:bg-[#52B788]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
                  <stat.icon size={28} className="text-[#52B788]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-3">
                  <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy={true} scrollSpyOnce={true} duration={2.5} />
                </div>
                <div className="text-[#5C7A6B] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Metrix Section (Glassmorphism & Float) */}
      <section className="bg-[#F8FBF9] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#D8F3DC]/40 to-transparent rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#52B788]/20 to-transparent rounded-3xl transform -rotate-3 scale-105 blur-lg z-0"></div>
              <img
                src="images/solution_smart_metrix.png"
                alt="Smart Metrix Dashboard"
                className="w-full h-auto object-cover rounded-3xl shadow-2xl relative z-10 border border-white/50"
              />
              {/* Floating element removed */}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-white text-[#1B4332] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm border border-[#D8E8DE]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#52B788]"></span>
                </span>
                Наша платформа
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-6 leading-tight">
                Smart Metrix <br/> <span className="text-[#8BA89B]">Система диспетчеризации</span>
              </h2>
              <p className="text-lg text-[#5C7A6B] mb-8 leading-relaxed">
                Собственная разработка IoT-Exponenta. Облачная платформа для сбора, хранения и анализа данных с приборов учета. В реальном времени мониторит потребление, выявляет аномалии и формирует отчеты.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Сбор данных в реальном времени",
                  "Автоматические отчеты",
                  "Оповещения об утечках",
                  "API для интеграции",
                  "Мобильное приложение",
                  "Экспорт в 1С и ERP",
                ].map((feature, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={feature} 
                    className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#D8E8DE] shadow-sm"
                  >
                    <CheckCircle size={18} className="text-[#52B788] flex-shrink-0" />
                    <span className="text-sm font-medium text-[#1B4332]">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/solutions" className="btn-primary gap-2 shadow-lg shadow-[#52B788]/30 hover:shadow-[#52B788]/50 transition-all text-lg px-8 py-4">
                Узнать возможности <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Partners Marquee */}
      <section className="bg-white py-20 border-t border-[#D8E8DE]">
        <div className="container-main mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">
              Нам доверяют лидеры
            </h2>
            <p className="text-[#5C7A6B]">
              Крупнейшие промышленные предприятия, строительные компании и управляющие организации Казахстана выбирают нас.
            </p>
          </motion.div>
        </div>
        
        <Marquee speed={40} gradient={true} gradientColor="white" gradientWidth={100} className="py-4">
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="mx-4 md:mx-8 bg-white rounded-2xl p-6 flex items-center justify-center w-[200px] h-[120px] border border-[#D8E8DE] hover:border-[#52B788] hover:shadow-xl transition-all duration-300 group cursor-pointer"
              title={partner.name}
            >
              <img 
                src={partner.img} 
                alt={partner.name}
                className="max-w-full max-h-full object-contain transition-all duration-500 transform group-hover:scale-110" 
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA / Contact Section */}
      <section className="bg-[#F8FBF9] py-20">
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#1B4332] to-[#0A1F16] rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#52B788] rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D8F3DC] rounded-full blur-[100px] opacity-10 mix-blend-screen"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Готовы начать сотрудничество?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Оставьте заявку, и наши инженеры подготовят для вас оптимальное коммерческое предложение.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => setConsultOpen(true)} 
                  className="bg-[#52B788] hover:bg-[#40916C] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#52B788]/30"
                >
                  Получить консультацию <ArrowRight size={20} />
                </button>
                <Link 
                  to="/contacts" 
                  className="bg-white/10 hover:bg-white text-white hover:text-[#1B4332] backdrop-blur-md border border-white/20 font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
                  Связаться с нами
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0 border-none">
          <div className="bg-[#1B4332] p-6 text-center">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Оставьте заявку</DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-sm mt-2">Наш менеджер свяжется с вами в течение 15 минут.</p>
          </div>
          <div className="p-8 bg-white">
            <form className="space-y-5" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
              <input type="text" name="Имя" required placeholder="Как к вам обращаться?" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              <input type="tel" name="Телефон" required placeholder="Ваш номер телефона" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              <select
                name="Город"
                required
                className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all text-gray-700"
              >
                <option value="Астана">Астана</option>
                <option value="Алматы">Алматы</option>
                <option value="Шымкент">Шымкент</option>
                <option value="Туркестан">Туркестан</option>
                <option value="Другой">Другой</option>
              </select>
              <input type="email" name="Email" placeholder="Email (необязательно)" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              <textarea name="Ваш вопрос" placeholder="Опишите вашу задачу..." rows={3} className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all resize-none" />
              <button type="submit" className="w-full bg-[#52B788] hover:bg-[#40916C] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#52B788]/30 transition-transform hover:-translate-y-1 active:translate-y-0">
                Отправить заявку
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
