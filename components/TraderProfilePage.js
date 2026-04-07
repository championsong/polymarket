"use client";

import Link from "next/link";
import { MarketShell } from "./ClientShell";
import { useDemoAppState } from "./DemoAppState";
import { TraderActionPanel, TraderActivityFeed, TraderFavoriteMarkets } from "./TraderPanels";
import { getTraderBySlug } from "../data/traders";

export default function TraderProfilePage({ handle }) {
  const { locale } = useDemoAppState();
  const trader = getTraderBySlug(handle);

  if (!trader) {
    return (
      <MarketShell>
        <section className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">{locale === "zh" ? "交易员" : "Trader"}</p>
              <h2>{locale === "zh" ? "未找到该交易员" : "Trader not found"}</h2>
            </div>
            <Link className="ghost-button small-button" href="/leaderboard">
              {locale === "zh" ? "返回排行榜" : "Back to Leaderboard"}
            </Link>
          </div>
        </section>
      </MarketShell>
    );
  }
  return (
    <MarketShell>
      <section className="profile-hero panel">
        <div className="profile-avatar-large">{trader.avatar}</div>
        <div className="profile-copy">
          <div className="panel-header">
            <div>
              <p className="eyebrow">{locale === "zh" ? "交易员" : "Trader"}</p>
              <h2>{trader.name}</h2>
            </div>
            <Link className="ghost-button small-button" href="/leaderboard">
              {locale === "zh" ? "返回排行榜" : "Back to Leaderboard"}
            </Link>
          </div>
          <p className="muted-text">{trader.handle}</p>
          <div className="comment-badges">
            {trader.badges.map((badge) => (
              <span className="comment-badge" key={badge}>
                {badge}
              </span>
            ))}
            <span className="comment-pnl">{trader.pnl}</span>
          </div>
          <p>{locale === "zh" ? trader.bioZh : trader.bioEn}</p>
        </div>
      </section>

      <section className="profile-summary-grid">
        <div className="panel">
          <div className="stats-grid portfolio-stats">
            <div>
              <span>{locale === "zh" ? "关注者" : "Followers"}</span>
              <strong>{trader.followers}</strong>
            </div>
            <div>
              <span>{locale === "zh" ? "关注中" : "Following"}</span>
              <strong>{trader.following}</strong>
            </div>
            <div>
              <span>{locale === "zh" ? "成交量" : "Volume"}</span>
              <strong>{trader.volume}</strong>
            </div>
            <div>
              <span>{locale === "zh" ? "胜率" : "Win rate"}</span>
              <strong>{trader.winRate}</strong>
            </div>
          </div>
        </div>

        <TraderActionPanel trader={trader} />
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <TraderActivityFeed trader={trader} />
        </div>
        <div className="detail-side">
          <TraderFavoriteMarkets trader={trader} />
        </div>
      </section>
    </MarketShell>
  );
}
