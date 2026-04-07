"use client";

import Link from "next/link";
import { MarketShell } from "../../components/ClientShell";
import { useDemoAppState } from "../../components/DemoAppState";
import { TraderActionPanel } from "../../components/TraderPanels";
import { traderProfiles } from "../../data/traders";

export default function LeaderboardPage() {
  const { locale } = useDemoAppState();

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{locale === "zh" ? "排行榜" : "Leaderboard"}</span>
          </div>
          <h2>{locale === "zh" ? "本周表现最好的模拟交易员" : "Top demo traders this week"}</h2>
          <p>
            {locale === "zh"
              ? "排行榜现在可以点进每个交易员主页，评论区身份、个人资料页和榜单展示会互相连通。"
              : "Leaderboard entries now connect to dedicated trader pages, linking identity across comments, profiles, and rankings."}
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="stack-list">
          {traderProfiles.map((trader, index) => (
            <Link className="leader-row trader-row-link" href={`/traders/${trader.slug}`} key={trader.handle}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <div className="profile-inline">
                <div className="comment-avatar">{trader.avatar}</div>
                <div className="leader-copy">
                  <strong>{trader.name}</strong>
                  <span className="muted-text">
                    {trader.handle} · {locale === "zh" ? `胜率 ${trader.winRate}` : `Win rate ${trader.winRate}`}
                  </span>
                </div>
              </div>
              <strong className="positive">{trader.pnl}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "精选交易员" : "Featured trader"}</p>
                <h2>{locale === "zh" ? "快速关注与复制" : "Quick follow and copy"}</h2>
              </div>
            </div>
            <TraderActionPanel trader={traderProfiles[0]} />
          </section>
        </div>
        <div className="detail-side">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "说明" : "Notes"}</p>
                <h2>{locale === "zh" ? "如何使用榜单" : "How to use the board"}</h2>
              </div>
            </div>
            <div className="stack-list">
              <div className="stack-item">
                <strong>{locale === "zh" ? "点进交易员主页" : "Open a trader page"}</strong>
                <span className="muted-text">{locale === "zh" ? "查看个人资料、常看市场和模拟动态。" : "Inspect the profile, favorite markets, and simulated activity feed."}</span>
              </div>
              <div className="stack-item">
                <strong>{locale === "zh" ? "复制观察列表" : "Copy a watchlist"}</strong>
                <span className="muted-text">{locale === "zh" ? "把该交易员关注的市场一键导入自己的观察列表。" : "Import the trader's favorite markets into your own watchlist."}</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </MarketShell>
  );
}
