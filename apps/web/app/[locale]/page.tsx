import { mainCategories, seedHomepageTiles } from "../../../../packages/db/src/seed-data.js";
import { t } from "../../../../packages/i18n/src/index.js";

export default function HomePage({ params }: { params: { locale: "tk" | "ru" | "en" } }) {
  const locale = params.locale ?? "tk";
  const featured = mainCategories.filter((category) => category.featured).slice(0, 12);

  return (
    <main className="mirasly-page">
      <header className="mirasly-header">
        <a className="brand" href={`/${locale}`}>Mirasly</a>
        <nav>
          {["categories", "places", "stories", "shops", "business360"].map((key) => (
            <a key={key} href={`/${locale}/${key}`}>{t(locale, `nav.${key}`)}</a>
          ))}
        </nav>
        <a className="add-button" href={`/${locale}/listings/new`}>{t(locale, "nav.add")}</a>
      </header>

      <section className="hero">
        <div>
          <p className="city">Ashgabat · Turkmenistan</p>
          <h1>Mirasly</h1>
          <form className="search-shell" action={`/${locale}/search`}>
            <input name="q" aria-label={t(locale, "search.placeholder")} placeholder={t(locale, "search.placeholder")} />
            <button type="button" aria-label={t(locale, "search.voice")}>●</button>
            <button type="button" aria-label={t(locale, "search.image")}>▣</button>
            <button type="submit">{t(locale, "buttons.continue")}</button>
          </form>
        </div>
        <div className="trust-panel">
          <strong>{t(locale, "safety.meetPublic")}</strong>
          <span>{t(locale, "safety.noPrepay")}</span>
        </div>
      </section>

      <section className="quick-grid" aria-label={t(locale, "categories.featured")}>
        {seedHomepageTiles.map((tile) => (
          <a href={`/${locale}/c/${tile.categoryCode}`} key={tile.code} className="service-tile">
            <span className="service-mark" />
            <strong>{tile.title[locale]}</strong>
          </a>
        ))}
      </section>

      <section className="category-band">
        {featured.map((category) => (
          <a href={`/${locale}/c/${category.slug[locale]}`} key={category.code}>
            <span>{category.icon}</span>
            {category.name[locale]}
          </a>
        ))}
      </section>
    </main>
  );
}
