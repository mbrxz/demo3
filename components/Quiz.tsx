const steps = [
  { step: "01", title: "Расскажите о бизнесе", description: "Ниша, размер команды, текущие каналы продвижения" },
  { step: "02", title: "Определите цели", description: "Трафик, лиды, узнаваемость или продажи" },
  { step: "03", title: "Выберите каналы", description: "Блог, соцсети, email, видео или всё вместе" },
  { step: "04", title: "Получите предложение", description: "Персональная стратегия и расчёт бюджета в течение 24 часов" },
];

export default function Quiz() {
  return (
    <section id="quiz" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Быстрый старт</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Квиз: узнайте стоимость за 2 минуты
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ответьте на 4 вопроса — получите персональное предложение и план контент-маркетинга для вашего бизнеса.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <span className="text-3xl font-bold text-gray-200">{item.step}</span>
              <h3 className="mt-2 font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-700 text-lg">
            Начать квиз
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="mt-3 text-sm text-gray-500">Без обязательств · Ответ в течение 24 часов</p>
        </div>
      </div>
    </section>
  );
}
