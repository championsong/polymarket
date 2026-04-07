"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDemoAppState } from "./DemoAppState";
import { localizeMarket, t } from "./i18n";
import { marketCategories, markets } from "../data/markets";

export function SearchPageClient() {
  const [query, setQuery] = useState("");
  const { locale, saveSearch, savedSearches, removeSavedSearch } = useDemoAppState();

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return markets;
    return markets.filter((market) => {
      const localized = localizeMarket(market, locale);
      const text = `${localized.title} ${localized.summary} ${localized.categoryLabel}`.toLowerCase();
      return text.includes(keyword);
    });
  }, [locale, query]);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "search")}</p>
          <h2>{t(locale, "searchMarkets")}</h2>
        </div>
        <button className="solid-button" onClick={() => saveSearch(query)} type="button">
          {t(locale, "saveSearch")}
        </button>
      </div>

      <input className="search-input search-input-wide" placeholder={t(locale, "searchPlaceholder")} value={query} onChange={(event) => setQuery(event.target.value)} />

      <div className="saved-searches">
        {savedSearches.map((item) => (
          <div className="saved-search-chip" key={item}>
            <button className="ghost-button small-button" onClick={() => setQuery(item)} type="button">
              {item}
            </button>
            <button className="icon-button small-icon" onClick={() => removeSavedSearch(item)} type="button">
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="discovery-grid">
        {results.map((market) => {
          const localized = localizeMarket(market, locale);
          return (
            <Link className="market-card" href={`/markets/${market.slug}`} key={market.slug}>
              <div className="panel-header">
                <span className="category-tag">{localized.categoryLabel}</span>
                <span className="volume-tag">{market.volume}</span>
              </div>
              <h3>{localized.title}</h3>
              <p>{localized.summary}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function ExplorePageClient() {
  const { locale } = useDemoAppState();
  const hot = markets.filter((market) => market.hot);
  const categories = marketCategories.filter((category) => category.id !== "all");

  return (
    <div className="main-column">
      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "explore")}</p>
            <h2>{t(locale, "discoverByNarrative")}</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="stack-item">
            <strong>{locale === "zh" ? "宏观观察" : "Macro Watch"}</strong>
            <span className="muted-text">{locale === "zh" ? "政策、利率、黄金与风险偏好" : "Policy, rates, gold, and risk appetite"}</span>
          </div>
          <div className="stack-item">
            <strong>{locale === "zh" ? "加密动量" : "Crypto Momentum"}</strong>
            <span className="muted-text">{locale === "zh" ? "ETF 资金流、突破位与热门链" : "ETF flow, breakout levels, and hot chains"}</span>
          </div>
          <div className="stack-item">
            <strong>{locale === "zh" ? "体育直播" : "Live Sports"}</strong>
            <span className="muted-text">{locale === "zh" ? "系列赛路径、伤病影响与赛前重定价" : "Series paths, injuries, and pregame repricing"}</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "top")}</p>
            <h2>{t(locale, "hotContracts")}</h2>
          </div>
        </div>
        <div className="discovery-grid">
          {hot.map((market) => {
            const localized = localizeMarket(market, locale);
            return (
              <Link className="market-card" href={`/markets/${market.slug}`} key={market.slug}>
                <div className="panel-header">
                  <span className="category-tag">{localized.categoryLabel}</span>
                  <span className="volume-tag">{market.change}</span>
                </div>
                <h3>{localized.title}</h3>
                <p>{localized.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "browseCategories")}</p>
            <h2>{t(locale, "categoryPages")}</h2>
          </div>
        </div>
        <div className="category-link-grid">
          {categories.map((category) => (
            <Link className="stack-item category-link-card" href={`/category/${category.id}`} key={category.id}>
              <strong>{locale === "zh" ? category.label : category.id === "sports" ? "Sports" : category.id === "culture" ? "Culture" : category.id[0].toUpperCase() + category.id.slice(1)}</strong>
              <span className="muted-text">{locale === "zh" ? `查看 ${category.label} 市场` : `Open ${category.id} markets`}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
