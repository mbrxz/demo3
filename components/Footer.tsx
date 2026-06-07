const links = {
  Услуги: ["Контент-стратегия", "SEO и блог", "SMM", "Email-маркетинг", "Видео"],
  Компания: ["О нас", "Кейсы", "Команда", "Вакансии", "Блог"],
  Контакты: ["hello@contentpro.ru", "+7 499 123-45-67", "Москва"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-indigo-400" />
              </div>
              <span className="text-[15px] font-semibold text-white tracking-tight">ContentPro</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-[200px]">
              Контент-маркетинг под ключ для бизнеса. Стратегия, тексты, SMM и реклама.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/35 hover:text-white/70 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2025 ContentPro. Все права защищены.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors duration-200">
              Конфиденциальность
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors duration-200">
              Оферта
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
