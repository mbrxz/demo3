"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

// ── SVG line chart ────────────────────────────────────────────────────────────
const CHART_DATA = [38, 52, 44, 68, 57, 76, 65, 88, 74, 95];
const SVG_W = 270, SVG_H = 68, PAD_Y = 5;

function buildPts(data: number[]) {
  const min = Math.min(...data), max = Math.max(...data), n = data.length;
  return data.map((v, i) => ({
    x: (i / (n - 1)) * SVG_W,
    y: PAD_Y + (1 - (v - min) / (max - min)) * (SVG_H - PAD_Y * 2),
  }));
}

// Cardinal spline → cubic bezier (t = tension)
function smoothPath(pts: { x: number; y: number }[], t = 0.38): string {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    const c1x = (p1.x + (p2.x - p0.x) * t).toFixed(1);
    const c1y = (p1.y + (p2.y - p0.y) * t).toFixed(1);
    const c2x = (p2.x - (p3.x - p1.x) * t).toFixed(1);
    const c2y = (p2.y - (p3.y - p1.y) * t).toFixed(1);
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

const CHART_PTS = buildPts(CHART_DATA);
const LINE_D    = smoothPath(CHART_PTS);
const AREA_D    = `${LINE_D} L ${SVG_W},${SVG_H} L 0,${SVG_H} Z`;
// Notable points: Авг, Окт, Дек — show upward trend
const KEY_IDXS  = [5, 7, 9];

// ── Static content ────────────────────────────────────────────────────────────
const MONTHS = ["Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
const ACTIVITY = [
  { dot: "bg-indigo-400",  name: "FinStart",    action: "SEO статья опубликована", time: "2ч" },
  { dot: "bg-emerald-400", name: "EduPlatform", action: "Email-кампания запущена", time: "5ч" },
  { dot: "bg-violet-400",  name: "CoffeePoint", action: "Reels набрал 80K просм.", time: "1д" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 700);
    return () => clearTimeout(t);
  }, []);

  const c150 = useCountUp(150, 1600, started);
  const c12  = useCountUp(12,  1800, started);
  const c7   = useCountUp(7,   1200, started);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 grid-bg">

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-[8%]  left-[5%]  w-[560px] h-[560px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="orb-2 absolute bottom-[8%] right-[2%] w-[420px] h-[420px] rounded-full bg-violet-600/[0.06] blur-[100px]" />
        <div className="orb-3 absolute top-[55%]  left-[45%] w-[280px] h-[280px] rounded-full bg-blue-600/[0.04]   blur-[80px]"  />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT ── */}
          <div className="flex-1 max-w-xl w-full">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/[0.1] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/60 font-medium tracking-wide">Контент-маркетинг под ключ</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-white">Контент, который</span>
              <br />
              <span className="gradient-text">приводит клиентов</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 max-w-lg"
            >
              Создаём стратегию, тексты, SMM и рекламу — всё в одном месте.
              Вы занимаетесь бизнесом, мы берём на себя весь контент.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#cases"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500/90 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 text-sm"
              >
                Смотреть кейсы
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center px-6 py-3 glass border-white/[0.1] text-white/80 font-medium rounded-xl text-sm hover:bg-white/[0.06] hover:border-white/[0.18] transition-all duration-200"
              >
                Получить предложение
              </a>
            </motion.div>

            {/* Count-up stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-8 mt-12 pt-10 border-t border-white/[0.06]"
            >
              {[
                { val: `${c150}+`,  label: "проектов" },
                { val: `${c12}M+`, label: "охватов"  },
                { val: `${c7}`,    label: "стран"    },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white tabular-nums">{s.val}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Dashboard + floating cards ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative flex-shrink-0 w-full max-w-[380px] lg:max-w-[410px]"
          >

            {/* Floating card — top (+124 лида) */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1,  y: 0 }}
              transition={{ duration: 0.45, delay: 0.95 }}
              className="float-a hidden sm:flex absolute -top-6 left-4 items-center gap-3 glass px-4 py-2.5 rounded-xl border-emerald-500/30 bg-emerald-500/10 z-10 shadow-xl shadow-black/50"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none whitespace-nowrap">+124 лида</p>
                <p className="text-[10px] text-white/45 mt-0.5 whitespace-nowrap">за месяц</p>
              </div>
            </motion.div>

            {/* Floating card — right (+38% CTR) */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1,  x: 0 }}
              transition={{ duration: 0.45, delay: 1.05 }}
              className="float-b hidden lg:flex absolute top-[38%] -right-16 flex-col items-center glass px-4 py-3 rounded-xl border-indigo-500/30 bg-indigo-500/10 z-10 shadow-xl shadow-black/50 gap-0.5"
            >
              <span className="text-base font-bold text-indigo-300 whitespace-nowrap leading-none">+38%</span>
              <span className="text-[10px] text-white/50 whitespace-nowrap">CTR</span>
            </motion.div>

            {/* Floating card — bottom (ROI ×4.2) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1,  y: 0 }}
              transition={{ duration: 0.45, delay: 1.15 }}
              className="float-c hidden sm:flex absolute -bottom-6 right-4 items-center gap-3 glass px-4 py-2.5 rounded-xl border-violet-500/30 bg-violet-500/10 z-10 shadow-xl shadow-black/50"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none whitespace-nowrap">ROI ×4.2</p>
                <p className="text-[10px] text-white/45 mt-0.5 whitespace-nowrap">рост</p>
              </div>
            </motion.div>

            {/* Main analytics card */}
            <div className="glass rounded-[20px] p-5 shadow-2xl shadow-black/40 relative z-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[11px] text-white/35 uppercase tracking-wider mb-1">Охват аудитории</p>
                  <p className="text-sm font-semibold text-white">за последние 10 мес.</p>
                </div>
                <span className="flex items-center gap-1 text-[11px] px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">
                  ↑ 24%
                </span>
              </div>

              {/* ── SVG Line Chart ── */}
              <div className="mb-1">
                <svg
                  viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                  style={{ width: "100%", height: 80, overflow: "visible" }}
                >
                  <defs>
                    {/* Horizontal gradient indigo → violet */}
                    <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="#6366F1" stopOpacity="0.7" />
                      <stop offset="55%"  stopColor="#818CF8" stopOpacity="1"   />
                      <stop offset="100%" stopColor="#A78BFA" stopOpacity="1"   />
                    </linearGradient>
                    {/* Vertical gradient for area fill */}
                    <linearGradient id="heroAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%"   stopColor="#818CF8" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity="0"    />
                    </linearGradient>
                    {/* Clip area fill to chart bounds */}
                    <clipPath id="heroChartClip">
                      <rect x="0" y="0" width={SVG_W} height={SVG_H} />
                    </clipPath>
                  </defs>

                  {/* Area fill — fades in after line is drawn */}
                  <motion.path
                    d={AREA_D}
                    fill="url(#heroAreaGrad)"
                    clipPath="url(#heroChartClip)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 1.1 }}
                  />

                  {/* Glow halo — wider, low opacity version of the line */}
                  <motion.path
                    d={LINE_D}
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth={8}
                    strokeOpacity={0.11}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.65, ease: "easeOut" }}
                  />

                  {/* Main line */}
                  <motion.path
                    d={LINE_D}
                    fill="none"
                    stroke="url(#heroLineGrad)"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.65, ease: "easeOut" }}
                  />

                  {/* Key dots — pop in as line reaches each point */}
                  {KEY_IDXS.map((idx) => {
                    const pt     = CHART_PTS[idx];
                    const isTip  = idx === 9;
                    const radius = isTip ? 3.5 : 2.5;
                    const delay  = 0.65 + 1.4 * (pt.x / SVG_W) * 0.82;
                    return (
                      <motion.circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        fill={isTip ? "#A78BFA" : "#818CF8"}
                        stroke={isTip ? "rgba(167,139,250,0.3)" : "rgba(129,140,248,0.25)"}
                        strokeWidth={isTip ? 5 : 4}
                        initial={{ r: 0, opacity: 0 }}
                        animate={{ r: radius, opacity: 1 }}
                        transition={{ duration: 0.3, delay, ease: "easeOut" }}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Month labels */}
              <div className="flex justify-between mb-4">
                {MONTHS.map((m) => (
                  <span key={m} className="text-[9px] text-white/25 flex-1 text-center">{m}</span>
                ))}
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
                {[
                  { val: "12.4M", sub: "охватов"     },
                  { val: "×3.2",  sub: "рост трафика" },
                  { val: "94%",   sub: "удержание"   },
                ].map((m) => (
                  <div key={m.val}>
                    <p className="text-base font-bold text-white">{m.val}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity card */}
            <div className="glass rounded-[16px] p-4 mt-3 relative z-0">
              <p className="text-[11px] text-white/35 uppercase tracking-wider mb-3">Последние активности</p>
              <div className="space-y-3">
                {ACTIVITY.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.dot} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-white/70">{item.name}</span>
                      <span className="text-xs text-white/35"> · {item.action}</span>
                    </div>
                    <span className="text-[10px] text-white/25 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
