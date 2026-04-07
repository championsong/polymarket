"use client";

import { MarketShell } from "../../components/ClientShell";
import { useDemoAppState } from "../../components/DemoAppState";

function pickLocale(locale, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && (value.zh || value.en)) {
    return value[locale] ?? value.zh ?? value.en;
  }
  return value;
}

export default function ProfilePage() {
  const { locale, user, walletConnected, walletAddress, portfolioSummary, positions, activities, watchlist, signIn } = useDemoAppState();
  const profile = user ?? { name: "Demo Trader", handle: "@pulse_demo", avatar: "PD", badges: ["Verified", "Demo"], pnl: "+1.2k" };

  return (
    <MarketShell>
      <section className="profile-hero panel">
        <div className="profile-avatar-large">{profile.avatar}</div>
        <div className="profile-copy">
          <div className="panel-header">
            <div>
              <p className="eyebrow">{locale === "zh" ? "个人资料" : "Profile"}</p>
              <h2>{profile.name}</h2>
            </div>
            {!user ? (
              <button className="solid-button small-button" onClick={() => signIn()} type="button">
                {locale === "zh" ? "启用演示账户" : "Enable demo account"}
              </button>
            ) : null}
          </div>
          <p className="muted-text">{profile.handle}</p>
          <div className="comment-badges">
            {profile.badges.map((badge) => (
              <span className="comment-badge" key={badge}>
                {badge}
              </span>
            ))}
            <span className="comment-pnl">{profile.pnl}</span>
          </div>
          <p>
            {locale === "zh"
              ? "这是一个可试玩的模拟交易员档案页，展示持仓、活动、关注市场和钱包状态。"
              : "This is a playable demo trader profile showing positions, activity, watched markets, and wallet state."}
          </p>
        </div>
      </section>

      <section className="profile-summary-grid">
        <div className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">{locale === "zh" ? "账户" : "Account"}</p>
              <h2>{locale === "zh" ? "状态概览" : "Status overview"}</h2>
            </div>
          </div>
          <div className="stack-list">
            <div className="stack-item">
              <strong>{locale === "zh" ? "钱包状态" : "Wallet status"}</strong>
              <span className="muted-text">{walletConnected ? walletAddress : locale === "zh" ? "未连接" : "Not connected"}</span>
            </div>
            <div className="stack-item">
              <strong>{locale === "zh" ? "总资产" : "Portfolio value"}</strong>
              <span className="muted-text">{portfolioSummary.totalValue}</span>
            </div>
            <div className="stack-item">
              <strong>{locale === "zh" ? "可用现金" : "Available cash"}</strong>
              <span className="muted-text">{portfolioSummary.availableCash}</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">{locale === "zh" ? "统计" : "Stats"}</p>
              <h2>{locale === "zh" ? "交易数据" : "Trading stats"}</h2>
            </div>
          </div>
          <div className="stats-grid portfolio-stats">
            <div>
              <span>{locale === "zh" ? "持仓数" : "Positions"}</span>
              <strong>{positions.length}</strong>
            </div>
            <div>
              <span>{locale === "zh" ? "活动数" : "Activity"}</span>
              <strong>{activities.length}</strong>
            </div>
            <div>
              <span>{locale === "zh" ? "观察市场" : "Watchlist"}</span>
              <strong>{watchlist.length}</strong>
            </div>
            <div>
              <span>{locale === "zh" ? "胜率" : "Win rate"}</span>
              <strong>{portfolioSummary.winRate}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "最近活动" : "Recent activity"}</p>
                <h2>{locale === "zh" ? "时间线" : "Timeline"}</h2>
              </div>
            </div>
            <div className="stack-list">
              {activities.slice(0, 8).map((item, index) => (
                <div className="stack-item activity-item" key={`${index}-${pickLocale(locale, item.market)}`}>
                  <div className="panel-header">
                    <strong>{pickLocale(locale, item.type)}</strong>
                    <span className="muted-text">{pickLocale(locale, item.time)}</span>
                  </div>
                  <span>{pickLocale(locale, item.market)}</span>
                  <span className="muted-text">{pickLocale(locale, item.detail)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-side">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "关注" : "Watchlist"}</p>
                <h2>{locale === "zh" ? "已保存市场" : "Saved markets"}</h2>
              </div>
            </div>
            <div className="stack-list">
              {watchlist.map((item) => (
                <div className="stack-item" key={item.marketSlug ?? item.name}>
                  <div className="panel-header">
                    <strong>{item.name}</strong>
                    <span>{item.price}</span>
                  </div>
                  <span className="muted-text">{item.note}</span>
                  <span className={String(item.change).startsWith("+") ? "positive" : "negative"}>{item.change}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </MarketShell>
  );
}
