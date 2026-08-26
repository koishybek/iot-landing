import { Phone } from "lucide-react";
import { submitToWhatsApp } from "../utils/whatsapp";

interface LeadBlockProps {
  title?: string;
  text?: string;
  /** Попадает в заявку, чтобы было видно, с какой страницы пришёл человек. */
  source: string;
}

/**
 * Блок заявки для страниц каталога.
 *
 * Посадочные подборки — точка входа поискового трафика, но до этого на них
 * не было ни формы, ни телефона: страница 19 раз писала «Запросить цену»
 * и не давала ни одного способа это сделать.
 *
 * Форма встроенная, а не в модальном окне: так её текст попадает в HTML
 * и не требует лишнего клика.
 */
export default function LeadBlock({ title, text, source }: LeadBlockProps) {
  return (
    <section className="bg-[#1B4332] py-10 md:py-14">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {title || "Подберём модель под ваш объект"}
            </h2>
            <p className="text-[#B7D5C4] leading-relaxed mb-6 max-w-lg">
              {text ||
                "Пришлите диаметр трубы, тип воды и количество точек учёта — вернёмся с подбором и ценой. Если нужно, посчитаем и монтаж."}
            </p>
            <a
              href="tel:+77711731722"
              className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-[#74C69D] transition-colors"
            >
              <Phone size={20} />
              +7 771 173 1722
            </a>
          </div>

          <form onSubmit={submitToWhatsApp} className="bg-white rounded-2xl p-5 md:p-6">
            <input type="hidden" name="Страница" value={source} />
            <div className="flex flex-col gap-3">
              <input
                name="Имя"
                required
                placeholder="Как к вам обращаться"
                className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-[#8BA89B] focus:outline-none focus:border-[#52B788]"
              />
              <input
                name="Телефон"
                type="tel"
                required
                placeholder="+7 ___ ___ __ __"
                className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-[#8BA89B] focus:outline-none focus:border-[#52B788]"
              />
              <textarea
                name="Задача"
                rows={2}
                placeholder="Диаметр, тип воды, количество точек"
                className="w-full border border-[#D8E8DE] rounded-lg px-4 py-3 text-[#1B4332] placeholder:text-[#8BA89B] focus:outline-none focus:border-[#52B788] resize-none"
              />
              <button type="submit" className="btn-primary w-full py-3">
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
