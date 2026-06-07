"use client";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    initials: "АВ",
    color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/20",
    name: "Алексей Воронов",
    role: "CEO, FinStart",
    text: "За полгода работы органический трафик вырос в 4 раза. Команда погрузилась в нашу нишу и пишет тексты так, будто работает в финтехе давно.",
  },
  {
    initials: "МК",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
    name: "Марина Кузнецова",
    role: "Маркетолог, CoffeePoint",
    text: "Наконец нашли подрядчика, который понимает с первого слова. Визуал и тексты теперь в едином стиле, вовлечённость выросла кратно.",
  },
  {
    initials: "ДП",
    color: "bg-violet-500/20 text-violet-300 border-violet-500/20",
    name: "Дмитрий Павлов",
    role: "Основатель, LegalPro",
    text: "Скептически относился к контент-маркетингу для юридической фирмы. Через 4 месяца блог приносит 120+ квалифицированных лидов в месяц.",
  },
  {
    initials: "ОС",
    color: "bg-sky-500/20 text-sky-300 border-sky-500/20",
    name: "Ольга Смирнова",
    role: "Head of Marketing, EduPlatform",
    text: "Стоимость лида снизилась на 45%. Email-воронка, которую они выстроили, работает лучше любой рекламы, которую мы запускали раньше.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-indigo-400/80 uppercase tracking-widest mb-3">Отзывы</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Что говорят клиенты</h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl leading-relaxed">
            Нас рекомендуют — это наш главный показатель качества.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="glass card-testimonial rounded-[20px] p-7 flex flex-col"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-white/60 leading-relaxed flex-1 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
