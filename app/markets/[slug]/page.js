"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketShell } from "../../../components/ClientShell";
import { CommentsFeedPanel, OrderEntryPanel } from "../../../components/MarketDetailClientPanels";
import { ProbabilityLineChart } from "../../../components/MarketChart";
import { RealtimeOrderBook } from "../../../components/RealtimeMarketPanels";
import { useDemoAppState } from "../../../components/DemoAppState";
import { localizeMarket, t } from "../../../components/i18n";
import { depthBySlug, getMarketBySlug, tradeHistoryBySlug } from "../../../data/markets";

function localizeTradeSide(side, locale) {
  if (locale === "zh") return side;
  return side.replace("买入 是", "Buy Yes").replace("买入 否", "Buy No").replace("最新成交", "Last Trade");
}

function DepthPanel({ market, locale }) {
  const depth = depthBySlug[market.slug] ?? { yes: [], no: [] };

  return (
    <div className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "depth")}</p>
          <h2>{t(locale, "marketDepth")}</h2>
        </div>
      </div>

      <div className="depth-columns">
        <div className="depth-column">
          <div className="depth-header">
            <span>{t(locale, "buyYes")}</span>
            <span>Price / Size</span>
          </div>
          {depth.yes.map((row) => (
            <div className="depth-row depth-row-yes" key={`yes-${row.price}-${row.shares}`}>
              <strong>{row.price}</strong>
              <span>{row.shares}</span>
              <span>{row.total}</span>
            </div>
          ))}
        </div>

        <div className="depth-column">
          <div className="depth-header">
            <span>{t(locale, "buyNo")}</span>
            <span>Price / Size</span>
          </div>
          {depth.no.map((row) => (
            <div className="depth-row depth-row-no" key={`no-${row.price}-${row.shares}`}>
              <strong>{row.price}</strong>
              <span>{row.shares}</span>
              <span>{row.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TradeHistoryPanel({ market, locale }) {
  const trades = tradeHistoryBySlug[market.slug] ?? [];

  return (
    <div className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "history")}</p>
          <h2>{t(locale, "recentFills")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {trades.map((trade, index) => (
          <div className="stack-item" key={`${trade.time}-${trade.side}-${trade.price}-${index}`}>
            <div className="panel-header">
              <strong>{localizeTradeSide(trade.side, locale)}</strong>
              <span>{trade.price}</span>
            </div>
            <span className="muted-text">
              {trade.time} · {trade.shares}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderbookPanel({ market, locale }) {
  return (
    <div className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "rules")}</p>
          <h2>{t(locale, "settlement")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {market.orderbook.map((row) => (
          <div className="stack-item" key={row.side}>
            <div className="panel-header">
              <strong>{localizeTradeSide(row.side, locale)}</strong>
              <span>{row.price}</span>
            </div>
            <span className="muted-text">
              {t(locale, "depth")} {row.size}
            </span>
          </div>
        ))}
      </div>
      <div className="rules-block">
        <h3>{t(locale, "settlementRules")}</h3>
        <ul>
          {market.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NewsPanel({ market, locale }) {
  return (
    <div className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "news")}</p>
          <h2>{t(locale, "marketMoving")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {market.news.map((item) => (
          <div className="stack-item" key={item}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketDetailPage({ params }) {
  const { locale } = useDemoAppState();
  const sourceMarket = getMarketBySlug(params.slug);
  if (!sourceMarket) notFound();
  const market = localizeMarket(sourceMarket, locale);

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{market.categoryLabel}</span>
            <Link className="ghost-button small-button" href="/">
              {t(locale, "backToMarkets")}
            </Link>
          </div>
          <h2>{market.title}</h2>
          <p>{market.description}</p>
          <div className="stats-grid">
            <div>
              <span>{t(locale, "probability")}</span>
              <strong>{market.probability}%</strong>
            </div>
            <div>
              <span>{t(locale, "move24h")}</span>
              <strong>{market.change}</strong>
            </div>
            <div>
              <span>{t(locale, "expiry")}</span>
              <strong>{market.expiresAt}</strong>
            </div>
          </div>
        </div>
        <div className="detail-chart">
          <ProbabilityLineChart points={market.chart} />
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <NewsPanel market={market} locale={locale} />
          <RealtimeOrderBook depth={depthBySlug[sourceMarket.slug]} trades={tradeHistoryBySlug[sourceMarket.slug] ?? []} />
          <CommentsFeedPanel slug={sourceMarket.slug} />
        </div>
        <div className="detail-side">
          <OrderEntryPanel market={market} />
          <DepthPanel market={sourceMarket} locale={locale} />
          <TradeHistoryPanel market={sourceMarket} locale={locale} />
          <OrderbookPanel market={market} locale={locale} />
        </div>
      </section>
    </MarketShell>
  );
}
