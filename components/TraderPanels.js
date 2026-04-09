"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useDemoAppState } from "./DemoAppState";
import { localizeMarket } from "./i18n";
import { markets } from "../data/markets";
import { traderPositionsBySlug } from "../data/traders";

function buildTraderActivity(trader, locale) {
  const activities = [
    {
      id: `${trader.slug}-1`,
      title: locale === "zh" ? "增加 BTC 相关仓位" : "Added BTC exposure",
      body:
        locale === "zh"
          ? `${trader.name} 提高了比特币主题市场的观察权重，重点关注突破与 ETF 资金流。`
          : `${trader.name} increased focus on BTC-linked markets, leaning into breakout and ETF flow setups.`,
      time: locale === "zh" ? "8 分钟前" : "8m ago",
    },
    {
      id: `${trader.slug}-2`,
      title: locale === "zh" ? "切换到宏观事件" : "Rotated into macro events",
      body:
        locale === "zh"
          ? `${trader.name} 把部分注意力从短线波动切到联储与黄金相关市场。`
          : `${trader.name} shifted part of the focus from pure momentum into Fed and gold event markets.`,
      time: locale === "zh" ? "34 分钟前" : "34m ago",
    },
    {
      id: `${trader.slug}-3`,
      title: locale === "zh" ? "更新关注列表" : "Updated watchlist",
      body:
        locale === "zh"
          ? `新增 ${trader.favoriteMarkets.length} 个重点市场到个人观察列表。`
          : `Added ${trader.favoriteMarkets.length} focus markets to the personal watchlist.`,
      time: locale === "zh" ? "1 小时前" : "1h ago",
    },
  ];

  return activities;
}

export function TraderActionPanel({ trader }) {
  const { locale, followedTraders, copiedTraderWatchlists, toggleFollowTrader, copyTraderWatchlist } = useDemoAppState();
  const isFollowed = followedTraders.includes(trader.handle);
  const copied = copiedTraderWatchlists.includes(trader.handle);
  const favoriteMarkets = trader.favoriteMarkets.map((slug) => markets.find((item) => item.slug === slug)).filter(Boolean);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "互动" : "Actions"}</p>
          <h2>{locale === "zh" ? "跟随这个交易员" : "Follow this trader"}</h2>
        </div>
      </div>
      <div className="stack-list">
        <button className="solid-button wide-button" onClick={() => toggleFollowTrader(trader)} type="button">
          {isFollowed ? (locale === "zh" ? "取消关注" : "Unfollow") : locale === "zh" ? "关注交易员" : "Follow trader"}
        </button>
        <button className="ghost-button wide-button" onClick={() => copyTraderWatchlist(trader, favoriteMarkets)} type="button">
          {copied ? (locale === "zh" ? "已复制观察列表" : "Watchlist copied") : locale === "zh" ? "复制观察列表" : "Copy watchlist"}
        </button>
      </div>
    </section>
  );
}

export function TraderActivityFeed({ trader }) {
  const { locale } = useDemoAppState();
  const items = useMemo(() => buildTraderActivity(trader, locale), [locale, trader]);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "动态" : "Feed"}</p>
          <h2>{locale === "zh" ? "交易员活动" : "Trader activity"}</h2>
        </div>
      </div>
      <div className="stack-list">
        {items.map((item) => (
          <div className="stack-item activity-item" key={item.id}>
            <div className="panel-header">
              <strong>{item.title}</strong>
              <span className="muted-text">{item.time}</span>
            </div>
            <span className="muted-text">{item.body}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TraderFavoriteMarkets({ trader }) {
  const { locale } = useDemoAppState();
  const favorites = trader.favoriteMarkets.map((slug) => markets.find((market) => market.slug === slug)).filter(Boolean);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "关注市场" : "Markets"}</p>
          <h2>{locale === "zh" ? "交易员常看" : "Trader favorites"}</h2>
        </div>
      </div>
      <div className="stack-list">
        {favorites.map((market) => {
          const localized = localizeMarket(market, locale);
          return (
            <Link className="stack-item" href={`/markets/${market.slug}`} key={market.slug}>
              <div className="panel-header">
                <strong>{localized.shortName}</strong>
                <span>{market.yesPrice}¢</span>
              </div>
              <span className="muted-text">{localized.summary}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function TraderPositionsPanel({ trader }) {
  const { locale } = useDemoAppState();
  const rows = traderPositionsBySlug[trader.slug] ?? [];

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "仓位" : "Positions"}</p>
          <h2>{locale === "zh" ? "交易员持仓与盈亏" : "Positions and PnL"}</h2>
        </div>
      </div>
      <div className="stack-list">
        {rows.map((row) => {
          const market = markets.find((item) => item.slug === row.marketSlug);
          const localized = market ? localizeMarket(market, locale) : null;
          return (
            <div className="stack-item" key={`${trader.slug}-${row.marketSlug}-${row.side}`}>
              <div className="panel-header">
                <strong>{localized?.shortName ?? row.marketSlug}</strong>
                <span className={row.pnl.startsWith("+") ? "positive" : "negative"}>{row.pnl}</span>
              </div>
              <span className="muted-text">
                {row.side} · Avg {row.avg} · Mark {row.mark} · {row.shares} shares
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
