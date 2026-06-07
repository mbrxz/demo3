"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

interface Values { name: string; telegram: string; company: string; }
interface Errors { name?: string; telegram?: string; }

export default function CTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values,    setValues]    = useState<Values>({ name: "", telegram: "", company: "" });
  const [errors,    setErrors]    = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (name === "name" || name === "telegram") {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (formState === "error") setFormState("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim())     next.name     = "Укажите имя";
    if (!values.telegram.trim()) next.telegram  = "Укажите Telegram";
    if (Object.keys(next).length) { setErrors(next); return; }
    setErrors({});
    setFormState("submitting");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     values.name.trim(),
          telegram: values.telegram.trim(),
          company:  values.company.trim(),
        }),
      });
      if (!res.ok) throw new Error("server");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="cta" className="py-24 bg-[#0B0F19] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/[0.07] blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[24px] p-8 sm:p-12 border-white/[0.08] max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">

            {/* ── Success ── */}
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1,  scale: 1   }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Заявка отправлена</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                  Мы свяжемся с вами в Telegram в&nbsp;течение 24&nbsp;часов.
                </p>
              </motion.div>

            ) : (

              /* ── Form (idle + submitting) ── */
              <motion.div key="form" exit={{ opacity: 0 }}>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-xs text-indigo-300/80 font-medium tracking-wide">Бесплатная консультация</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 leading-[1.15]">
                  Готовы запустить контент,{" "}
                  <br className="hidden sm:block" />
                  <span className="gradient-text">который продаёт?</span>
                </h2>

                <p className="text-sm text-white/45 mb-7 max-w-md leading-relaxed">
                  Оставьте заявку — подготовим персональную стратегию и расчёт бюджета. Бесплатно.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-3">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Name */}
                    <Field
                      label="Имя"
                      required
                      name="name"
                      value={values.name}
                      placeholder="Алексей"
                      error={errors.name}
                      disabled={formState === "submitting"}
                      onChange={handleChange}
                    />
                    {/* Telegram */}
                    <Field
                      label="Telegram"
                      required
                      name="telegram"
                      value={values.telegram}
                      placeholder="@username"
                      error={errors.telegram}
                      disabled={formState === "submitting"}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Company */}
                  <Field
                    label="Компания"
                    optional
                    name="company"
                    value={values.company}
                    placeholder="Название компании"
                    disabled={formState === "submitting"}
                    onChange={handleChange}
                  />

                  {/* Submit */}
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-indigo-500/90 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 text-sm w-full sm:w-auto"
                      >
                        {formState === "submitting" ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Отправляем…
                          </>
                        ) : (
                          <>
                            Получить аудит
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-white/25">
                        Без обязательств · Ответ в течение 24 часов
                      </p>
                    </div>

                    {/* Server error message */}
                    <AnimatePresence>
                      {formState === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y:  0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2 text-sm text-red-400/80"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Не удалось отправить заявку. Попробуйте позже.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── Reusable field ─────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  optional?: boolean;
  error?: string;
}

function Field({ label, name, value, placeholder, onChange, disabled, required, optional, error }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
        {label}
        {required && <span className="text-indigo-400/60 ml-0.5">*</span>}
        {optional && <span className="text-white/20 normal-case tracking-normal font-normal ml-1">· необязательно</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={[
          "w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.04]",
          "placeholder:text-white/25 border outline-none",
          "transition-all duration-200",
          "focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed",
          error
            ? "border-red-500/40 hover:border-red-500/50 focus:border-red-500/55 focus:ring-red-500/10"
            : "border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/50 focus:ring-indigo-500/10",
        ].join(" ")}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400/80"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
