"use client";

import Link from "next/link";
import { MarketShell } from "../../components/ClientShell";
import { useDemoAppState } from "../../components/DemoAppState";
import { localizeMarket, t } from "../../components/i18n";
import { markets } from "../../data/markets";

function pickLocale(locale, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && (value.zh || value.en)) {
    return value[locale] ?? value.zh ?? value.en;
  }
  return value;
}

function resolvePositionTitle(item, locale) {
  return locale === "en" && item.titleEn ? item.titleEn : item.title;
}

function resolveAvg(item, locale) {
  return locale === "en" && item.avgEn ? item.avgEn : item.avg;
}

function resolveWatchItem(item, locale) {
  const market = item.marketSlug ? markets.find((entry) => entry.slug === item.marketSlug) : null;
  return market ? localizeMarket(market, locale) : null;
}

function SummaryPanel() {
  const { locale, portfolioSummary } = useDemoAppState();

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "portfolio")}</p>
          <h2>{t(locale, "accountOverview")}</h2>
        </div>
        <span className="mini-badge">{t(locale, "persisted")}</span>
      </div>

      <div className="stats-grid portfolio-stats">
        <div>
          <span>{t(locale, "totalValue")}</span>
          <strong>{portfolioSummary.totalValue}</strong>
        </div>
        <div>
          <span>{t(locale, "availableCash")}</span>
          <strong>{portfolioSummary.availableCash}</strong>
        </div>
        <div>
          <span>{t(locale, "todayPnl")}</span>
          <strong className="positive">{portfolioSummary.todayPnl}</strong>
        </div>
        <div>
          <span>{t(locale, "unrealized")}</span>
          <strong className="positive">{portfolioSummary.unrealizedPnl}</strong>
        </div>
        <div>
          <span>{t(locale, "winRate")}</span>
          <strong>{portfolioSummary.winRate}</strong>
        </div>
      </div>
    </section>
  );
}

function PositionsPanel() {
  const { locale, positions } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "positions")}</p>
          <h2>{t(locale, "currentHoldings")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {positions.map((item) => (
          <div className="stack-item" key={item.id ?? item.title}>
            <div className="panel-header">
              <strong>{resolvePositionTitle(item, locale)}</strong>
              <span className={String(item.pnl).startsWith("+") ? "positive" : "negative"}>{item.pnl}</span>
            </div>
            <span className="muted-text">
              {item.shares} · {resolveAvg(item, locale)} · Mark {item.mark ?? item.avg.replace("均价", "").trim()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityPanel() {
  const { locale, activities } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "activity")}</p>
          <h2>{t(locale, "recentFillsActions")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {activities.map((item, index) => (
          <div className="stack-item activity-item" key={`${index}-${pickLocale(locale, item.market)}-${pickLocale(locale, item.type)}`}>
            <div className="panel-header">
              <strong>{pickLocale(locale, item.type)}</strong>
              <span className="muted-text">{pickLocale(locale, item.time)}</span>
            </div>
            <span>{pickLocale(locale, item.market)}</span>
            <span className="muted-text">{pickLocale(locale, item.detail)}</span>
            <span className="mini-badge neutral-badge">{pickLocale(locale, item.status)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WatchPanel() {
  const { locale, portfolioWatch } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "watchlist")}</p>
          <h2>{t(locale, "savedMarkets")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {portfolioWatch.map((item) => {
          const market = resolveWatchItem(item, locale);
          return (
            <div className="stack-item" key={item.marketSlug ?? item.name}>
              <div className="panel-header">
                <strong>{market?.shortName ?? item.name}</strong>
                <span>{item.price}</span>
              </div>
              <span className="muted-text">{market?.summary ?? item.note}</span>
              <span className={String(item.change).startsWith("+") ? "positive" : "negative"}>{item.change}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  const { locale } = useDemoAppState();

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{t(locale, "portfolio")}</span>
            <Link className="ghost-button small-button" href="/">
              {t(locale, "backHome")}
            </Link>
          </div>
          <h2>{t(locale, "portfolioHeroTitle")}</h2>
          <p>{t(locale, "portfolioHeroBody")}</p>
        </div>
      </section>

      <SummaryPanel />
      <section className="detail-grid">
        <div className="detail-main">
          <PositionsPanel />
          <ActivityPanel />
        </div>
        <div className="detail-side">
          <WatchPanel />
        </div>
      </section>
    </MarketShell>
  );
}
