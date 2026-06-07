const packages = [
  {
    name: "Старт",
    price: "от 30 000 ₽/мес",
    description: "Для малого бизнеса, который делает первые шаги в контент-маркетинге.",
    includes: [
      "Контент-стратегия",
      "8 постов в соцсети",
      "2 SEO-статьи в блог",
      "Ежемесячный отчёт",
    ],
    highlighted: false,
  },
  {
    name: "Рост",
    price: "от 65 000 ₽/мес",
    description: "Для бизнеса, который хочет системного роста трафика и лидов.",
    includes: [
      "Контент-стратегия",
      "20 постов в соцсети",
      "6 SEO-статей в блог",
      "Email-рассылка",
      "Таргетированная реклама",
      "Еженедельный отчёт",
    ],
    highlighted: true,
  },
  {
    name: "Максимум",
    price: "от 120 000 ₽/мес",
    description: "Полный аутсорс контент-маркетинга для среднего и крупного бизнеса.",
    includes: [
      "Всё из пакета Рост",
      "Видео-контент (Reels/Shorts)",
      "PR-публикации",
      "Подкаст",
      "Выделенный менеджер",
    ],
    highlighted: false,
  },
];

export default function Calculator() {
  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Стоимость</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Тарифы</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Прозрачное ценообразование. Выберите пакет или соберите индивидуальное предложение через квиз.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6 rounded-xl border-2 flex flex-col ${
                pkg.highlighted
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-900"
              }`}
            >
              {pkg.highlighted && (
                <span className="inline-block mb-3 px-2 py-1 bg-white text-gray-900 text-xs font-medium rounded-md self-start">
                  Популярный
                </span>
              )}

              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className={`mt-1 text-sm ${pkg.highlighted ? "text-gray-300" : "text-gray-500"}`}>
                {pkg.description}
              </p>

              <p className="mt-4 text-2xl font-bold">{pkg.price}</p>

              <ul className="mt-6 space-y-2 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className={pkg.highlighted ? "text-gray-300" : "text-gray-400"}>✓</span>
                    <span className={pkg.highlighted ? "text-gray-200" : "text-gray-700"}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#quiz"
                className={`mt-8 block text-center px-4 py-3 rounded-lg font-medium text-sm ${
                  pkg.highlighted
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                Выбрать пакет
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
