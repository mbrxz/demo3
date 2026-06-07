"use client";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "Услуги",  href: "#services",     id: "services"     },
  { label: "Кейсы",  href: "#cases",         id: "cases"        },
  { label: "Отзывы", href: "#testimonials",  id: "testimonials" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const navRef  = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = NAV.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  // Move pill to active link
  useEffect(() => {
    const idx = NAV.findIndex(n => n.id === active);
    if (idx < 0) { setPill(p => ({ ...p, visible: false })); return; }
    const link = linkRefs.current[idx];
    const nav  = navRef.current;
    if (!link || !nav) return;
    const navRect  = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setPill({ left: linkRect.left - navRect.left, width: linkRect.width, visible: true });
  }, [active]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/75 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-indigo-400" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">ContentPro</span>
          </div>

          {/* Desktop nav with moving pill */}
          <nav className="hidden md:flex items-center">
            <div ref={navRef} className="relative flex items-center gap-1 p-1">

              {/* Gliding pill indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 pointer-events-none"
                style={{
                  left:    pill.left,
                  width:   pill.width,
                  opacity: pill.visible ? 1 : 0,
                  transition: pill.visible
                    ? "left 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.18s"
                    : "opacity 0.18s",
                }}
              />

              {NAV.map((link, i) => (
                <a
                  key={link.id}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-lg z-10 transition-colors duration-200 ${
                    active === link.id
                      ? "text-indigo-300"
                      : "text-white/50 hover:text-white/90"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.18] text-white text-sm font-medium rounded-xl transition-all duration-200"
            >
              Получить предложение
            </a>
            <button className="md:hidden p-2 text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
