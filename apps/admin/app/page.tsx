import { mainCategories } from "../../../packages/db/src/seed-data.js";
import { t } from "../../../packages/i18n/src/index.js";
import { adminSurface } from "../src/admin-surface.js";
import "./styles.css";

export default function AdminDashboard() {
  return (
    <main className="admin-shell">
      <aside>
        <strong>Mirasly</strong>
        {adminSurface.tools.map((tool) => (
          <a href={`#${tool}`} key={tool}>{tool.replaceAll("_", " ")}</a>
        ))}
      </aside>
      <section>
        <header>
          <h1>{t("en", "admin.dashboard")}</h1>
          <button>{t("en", "admin.needsReview")}</button>
        </header>
        <div className="queue-grid">
          {adminSurface.moderationQueues.map((queue) => (
            <article key={queue}>
              <span>{queue}</span>
              <strong>{queue === "listings" ? 12 : 3}</strong>
            </article>
          ))}
        </div>
        <section className="table">
          <h2>{t("en", "admin.listings")}</h2>
          {mainCategories.slice(0, 8).map((category) => (
            <div className="row" key={category.code}>
              <span>{category.name.en}</span>
              <span>{category.code}</span>
              <button>{t("en", "admin.approve")}</button>
              <button>{t("en", "admin.reject")}</button>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
