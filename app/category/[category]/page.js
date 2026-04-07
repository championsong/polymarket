"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketShell } from "../../../components/ClientShell";
import { useDemoAppState } from "../../../components/DemoAppState";
import { localizeMarket, t } from "../../../components/i18n";
import { marketCategories, markets } from "../../../data/markets";

export default function CategoryPage({ params }) {
  const { locale } = useDemoAppState();
  const { category } = params;
  const meta = marketCategories.find((item) => item.id === category && item.id !== "all");

  if (!meta) notFound();

  const items = markets.filter((market) => market.category === category);
  const label = locale === "zh" ? meta.label : category === "sports" ? "Sports" : category === "culture" ? "Culture" : category[0].toUpperCase() + category.slice(1);

  return (
    <MarketShell>
      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "category")}</p>
            <h2>{label}</h2>
          </div>
          <Link className="ghost-button small-button" href="/explore">
            {t(locale, "backToExplore")}
          </Link>
        </div>

        <div className="discovery-grid">
          {items.map((market) => {
            const localized = localizeMarket(market, locale);
            return (
              <Link className="market-card" href={`/markets/${market.slug}`} key={market.slug}>
                <div className="panel-header">
                  <span className="category-tag">{localized.categoryLabel}</span>
                  <span className="volume-tag">{market.volume}</span>
                </div>
                <h3>{localized.title}</h3>
                <p>{localized.summary}</p>
                <div className="market-meta">
                  <span>{market.probability}%</span>
                  <span>{market.change}</span>
                  <span>{market.expiresAt}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </MarketShell>
  );
}
