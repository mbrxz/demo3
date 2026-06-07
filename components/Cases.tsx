"use client";
import { motion } from "framer-motion";

const CASES = [
  {
    company: "ФинТех стартап",
    niche: "B2B финансы",
    metric: "+340%",
    metricLabel: "органического трафика",
    period: "за 6 месяцев",
    description: "Выстроили контент-стратегию, запустили корпоративный блог и оптимизировали посадочные страницы.",
    tags: ["SEO", "Блог", "B2B"],
    accent: "text-indigo-400",
  },
  {
    company: "Сеть кофеен",
    niche: "HoReCa",
    metric: "×4",
    metricLabel: "вовлечённость",
    period: "в Instagram",
    description: "Переработали визуальный стиль, наладили регулярные публикации и запустили UGC-кампанию.",
    tags: ["SMM", "Instagram", "Visual"],
    accent: "text-emerald-400",
  },
  {
    company: "EdTech платформа",
    niche: "Онлайн-образование",
    metric: "−45%",
    metricLabel: "стоимость лида",
    period: "через контент",
    description: "Создали серию экспертных статей и email-воронку, которая прогревала аудиторию до покупки.",
    tags: ["Email", "SEO", "Воронка"],
    accent: "text-violet-400",
  },
  {
    company: "Юридическая фирма",
    niche: "B2B услуги",
    metric: "+180",
    metricLabel: "лидов в месяц",
    period: "из блога",
    description: "Запустили экспертный блог с кейсами и чек-листами, настроили лидогенерацию через контент.",
    tags: ["Блог", "Лидген", "B2B"],
    accent: "text-sky-400",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-20 bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-indigo-400/80 uppercase tracking-widest mb-3">Результаты</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Кейсы</h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl leading-relaxed">
            Реальные результаты клиентов, которые доверили нам свой контент-маркетинг.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CASES.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="glass card-case rounded-[20px] p-7"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-white">{c.company}</p>
                  <p className="text-xs text-white/40 mt-0.5">{c.niche}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end max-w-[160px]">
                  {c.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-medium text-white/40 bg-white/[0.04] border border-white/[0.07] rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className={`text-4xl font-bold ${c.accent}`}>{c.metric}</span>
                <p className="text-sm text-white/60 mt-1">
                  {c.metricLabel} <span className="text-white/30">{c.period}</span>
                </p>
              </div>

              <p className="text-sm text-white/45 leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
