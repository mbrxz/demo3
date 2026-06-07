"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "Контент" | "Воронка" | "Аналитика";
type Answer   = "да" | "нет";

interface Question {
  id:       number;
  text:     string;
  category: Category;
  points:   number;
}

// ── Static data ───────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  { id: 1, text: "Есть ли у вас CRM?",                    category: "Воронка",   points: 20 },
  { id: 2, text: "Есть ли контент-план?",                 category: "Контент",   points: 20 },
  { id: 3, text: "Есть ли регулярные кейсы / отзывы?",   category: "Контент",   points: 20 },
  { id: 4, text: "Есть ли аналитика по заявкам?",         category: "Аналитика", points: 20 },
  { id: 5, text: "Есть ли отдел продаж или менеджер?",   category: "Воронка",   points: 20 },
];

const CAT_MAX: Record<Category, number> = { Контент: 40, Воронка: 40, Аналитика: 20 };
const CATEGORIES: Category[]            = ["Контент", "Воронка", "Аналитика"];

const CAT_DOT: Record<Category, string> = {
  Контент:   "bg-indigo-400",
  Воронка:   "bg-violet-400",
  Аналитика: "bg-blue-400",
};
const CAT_BAR: Record<Category, string> = {
  Контент:   "bg-indigo-500",
  Воронка:   "bg-violet-500",
  Аналитика: "bg-blue-400",
};

// ── Score helpers ─────────────────────────────────────────────────────────────
function getLevel(score: number, hasAnswers: boolean) {
  if (!hasAnswers) return { label: "—",       textColor: "text-white/25",    ringStroke: "#6366f1" };
  if (score <= 40) return { label: "Слабый",  textColor: "text-red-400",     ringStroke: "#f87171" };
  if (score <= 70) return { label: "Средний", textColor: "text-amber-400",   ringStroke: "#fbbf24" };
  return                   { label: "Высокий", textColor: "text-emerald-400", ringStroke: "#34d399" };
}

function getRecommendation(score: number, hasAnswers: boolean): string {
  if (!hasAnswers) return "";
  if (score <= 40) return "Маркетинг построен фрагментарно. Начните с аналитики и базовой контент-системы.";
  if (score <= 70) return "Фундамент есть, но часть заявок теряется. Стоит усилить прогрев, контент и путь до заявки.";
  return "Система уже работает. Можно масштабировать через контент, аналитику и автоматизацию.";
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const rafRef  = useRef<number>(0);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    const start    = performance.now();
    const duration = 550;

    const tick = (now: number) => {
      const t     = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3; // ease-out cubic
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else       fromRef.current = value;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <>{display}</>;
}

// ── SVG ring ──────────────────────────────────────────────────────────────────
const RING_R    = 54;
const RING_SW   = 4.5;
const CIRCUMF   = 2 * Math.PI * RING_R; // ≈ 339.3

function ScoreRing({ score, stroke }: { score: number; stroke: string }) {
  return (
    <svg width="144" height="144" viewBox="0 0 144 144" className="block">
      {/* Track */}
      <circle cx="72" cy="72" r={RING_R}
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={RING_SW}
      />
      {/* Progress */}
      <circle cx="72" cy="72" r={RING_R}
        fill="none"
        stroke={stroke}
        strokeWidth={RING_SW}
        strokeLinecap="round"
        strokeDasharray={CIRCUMF}
        strokeDashoffset={CIRCUMF * (1 - score / 100)}
        style={{
          transform:       "rotate(-90deg)",
          transformOrigin: "center",
          transition:      "stroke-dashoffset 0.65s cubic-bezier(0.4,0,0.2,1), stroke 0.4s ease",
        }}
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function InteractiveAudit() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const toggle = (id: number, ans: Answer) =>
    setAnswers(prev => {
      if (prev[id] === ans) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: ans };
    });

  const score         = QUESTIONS.reduce((s, q) => answers[q.id] === "да" ? s + q.points : s, 0);
  const answeredCount = Object.keys(answers).length;
  const yesCount      = QUESTIONS.filter(q => answers[q.id] === "да").length;
  const hasAnswers    = answeredCount > 0;

  const catScore = (cat: Category) =>
    QUESTIONS
      .filter(q => q.category === cat && answers[q.id] === "да")
      .reduce((s, q) => s + q.points, 0);

  const catPct = (cat: Category) =>
    Math.round((catScore(cat) / CAT_MAX[cat]) * 100);

  const level     = getLevel(score, hasAnswers);
  const recommend = getRecommendation(score, hasAnswers);

  return (
    <section id="audit" className="py-24 bg-[#0B0F19] relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-indigo-600/[0.06] blur-[90px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full bg-violet-600/[0.05] blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs text-indigo-300/80 font-medium tracking-wide">Бесплатный аудит</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.15]">
            Оцените ваш маркетинг{" "}
            <span className="gradient-text">за 30 секунд</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            Ответьте на 5 вопросов — и узнайте, где теряются заявки
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* ── Left: Questions ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="glass rounded-[24px] p-6 sm:p-7"
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white/80">5 вопросов</span>
              </div>
              <AnimatePresence>
                {hasAnswers && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-white/30 tabular-nums"
                  >
                    Ответов «Да»: {yesCount} / 5
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Question rows */}
            <div>
              {QUESTIONS.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
                  className={`flex items-center justify-between gap-4 py-4 ${
                    i < QUESTIONS.length - 1 ? "border-b border-white/[0.05]" : ""
                  }`}
                >
                  {/* Text side */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${CAT_DOT[q.category]}`} />
                      <span className="text-[10px] font-medium uppercase tracking-widest text-white/25">
                        {q.category}
                      </span>
                    </span>
                    <span className="text-sm text-white/80 leading-snug mt-0.5">{q.text}</span>
                  </div>

                  {/* Да / Нет buttons */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    {(["да", "нет"] as Answer[]).map((ans) => {
                      const active = answers[q.id] === ans;
                      return (
                        <button
                          key={ans}
                          onClick={() => toggle(q.id, ans)}
                          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                            active
                              ? ans === "да"
                                ? "bg-indigo-500/80 border-indigo-500/50 text-white shadow-sm shadow-indigo-500/20"
                                : "bg-white/[0.1] border-white/20 text-white/70"
                              : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/75 hover:bg-white/[0.06]"
                          }`}
                        >
                          {ans === "да" ? "Да" : "Нет"}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Score ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-[24px] p-6 sm:p-7 flex flex-col gap-6"
          >
            {/* Ring + score label */}
            <div className="flex flex-col items-center pt-1">
              <div className="relative">
                <ScoreRing score={score} stroke={level.ringStroke} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[40px] font-bold text-white leading-none tabular-nums">
                    <AnimatedNumber value={score} />
                  </span>
                  <span className="text-xs text-white/30 mt-1">из 100</span>
                </div>
              </div>
              <div className="mt-3 flex flex-col items-center gap-1">
                <motion.span
                  key={level.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`text-sm font-semibold ${level.textColor}`}
                >
                  {level.label}
                </motion.span>
                <span className="text-[11px] text-white/20 uppercase tracking-widest">
                  Marketing Score
                </span>
              </div>
            </div>

            {/* Category progress bars */}
            <div className="space-y-3.5 px-1">
              {CATEGORIES.map((cat) => {
                const pct = catPct(cat);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${CAT_DOT[cat]}`} />
                        <span className="text-xs text-white/50">{cat}</span>
                      </div>
                      <span className="text-xs text-white/35 tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${CAT_BAR[cat]}`}
                        style={{
                          width:      `${pct}%`,
                          opacity:    0.8,
                          transition: "width 0.65s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommendation */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-start gap-3 min-h-[96px]">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={recommend || "empty"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.28 }}
                  className={`text-sm leading-relaxed ${recommend ? "text-white/50" : "text-white/20"}`}
                >
                  {recommend || "Ответьте на вопросы — и получите персональную рекомендацию"}
                </motion.p>
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
