"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { leaderboard, marketCategories, markets, tickerItems } from "../data/markets";
import { traderProfiles } from "../data/traders";
import { useDemoAppState } from "./DemoAppState";
import { localeOptions, localizeMarket, localizeTickerItem, t } from "./i18n";
import { MarketChartCard, ProbabilityLineChart } from "./MarketChart";

function pickLocale(locale, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && (value.zh || value.en)) {
    return value[locale] ?? value.zh ?? value.en;
  }
  return value;
}

function WalletModal({ open, onClose }) {
  const { locale } = useDemoAppState();
  if (!open) return null;

  return (
    <div className="wallet-modal-root" onClick={onClose}>
      <div className="wallet-modal" onClick={(event) => event.stopPropagation()}>
        <div className="wallet-modal-header">
          <div>
            <p className="eyebrow">{t(locale, "wallet")}</p>
            <h3>{t(locale, "connectDemoWallet")}</h3>
          </div>
          <button className="icon-button" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className="wallet-options">
          {["Pulse Wallet", "MetaMask Demo", "OKX Demo"].map((name) => (
            <button className="wallet-option" key={name} onClick={onClose} type="button">
              <span className="wallet-badge" />
              <div>
                <strong>{name}</strong>
                <span>{t(locale, "mockOnly")}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsDrawer({ open, onClose }) {
  const { locale, notifications, markNotificationsRead, alerts, toggleAlert } = useDemoAppState();
  if (!open) return null;

  return (
    <div className="wallet-modal-root" onClick={onClose}>
      <div className="wallet-modal notifications-modal" onClick={(event) => event.stopPropagation()}>
        <div className="wallet-modal-header">
          <div>
            <p className="eyebrow">{t(locale, "notifications")}</p>
            <h3>{t(locale, "alertsAndUpdates")}</h3>
          </div>
          <div className="price-row">
            <button className="ghost-button small-button" onClick={markNotificationsRead} type="button">
              {t(locale, "markAllRead")}
            </button>
            <button className="icon-button" onClick={onClose} type="button">
              ×
            </button>
          </div>
        </div>
        <div className="notifications-grid">
          <div className="stack-list">
            {notifications.map((item) => (
              <div className={`stack-item notification-item ${item.read ? "notification-read" : ""}`} key={item.id}>
                <div className="panel-header">
                  <strong>{pickLocale(locale, item.title)}</strong>
                  <span className="muted-text">{pickLocale(locale, item.time)}</span>
                </div>
                <span>{pickLocale(locale, item.body)}</span>
              </div>
            ))}
          </div>
          <div className="stack-list">
            {alerts.map((alert) => (
              <div className="stack-item" key={alert.id}>
                <div className="panel-header">
                  <strong>{pickLocale(locale, alert.label)}</strong>
                  <button className="ghost-button small-button" onClick={() => toggleAlert(alert.id)} type="button">
                    {alert.active ? "On" : "Off"}
                  </button>
                </div>
                <span className="muted-text">{alert.threshold}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopTicker() {
  const { locale } = useDemoAppState();
  const content = [...tickerItems, ...tickerItems];
  return (
    <section className="ticker">
      <div className="ticker-track">
        {content.map((item, index) => (
          <span key={`${item}-${index}`}>{localizeTickerItem(item, locale)}</span>
        ))}
      </div>
    </section>
  );
}

function LanguageToggle() {
  const { locale, setLocale } = useDemoAppState();
  return (
    <div className="chart-toolbar locale-toggle">
      {localeOptions.map((item) => (
        <button className={`pill chart-pill ${locale === item.id ? "active" : ""}`} key={item.id} onClick={() => setLocale(item.id)} type="button">
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Sidebar({ onWalletClick }) {
  const { locale, user, walletConnected, walletAddress, signIn, signOut } = useDemoAppState();
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark" />
        <div>
          <strong>Pulse Market</strong>
          <span>Prediction Demo</span>
        </div>
      </div>
      <LanguageToggle />
      <nav className="sidebar-nav">
        <Link href="/">{t(locale, "home")}</Link>
        <Link href="/search">{t(locale, "search")}</Link>
        <Link href="/explore">{t(locale, "explore")}</Link>
        <Link href="/portfolio">{t(locale, "portfolio")}</Link>
        <Link href="/leaderboard">{locale === "zh" ? "排行榜" : "Leaderboard"}</Link>
        <Link href="/notifications">{locale === "zh" ? "通知中心" : "Notifications"}</Link>
        <Link href="/profile">{locale === "zh" ? "个人资料" : "Profile"}</Link>
        <Link href="/settings">{locale === "zh" ? "设置" : "Settings"}</Link>
        <Link href="/category/crypto">{t(locale, "crypto")}</Link>
        <Link href="/category/macro">{t(locale, "macro")}</Link>
      </nav>
      <div className="sidebar-card">
        <p className="eyebrow">{t(locale, "account")}</p>
        <h3>{user ? user.handle : t(locale, "guestMode")}</h3>
        <p>{walletConnected ? walletAddress : user ? t(locale, "signedInWalletOff") : t(locale, "signInHint")}</p>
        <button className="solid-button wide-button" onClick={onWalletClick} type="button">
          {walletConnected ? t(locale, "switchWallet") : t(locale, "connectWallet")}
        </button>
        <button className="ghost-button wide-button" onClick={user ? signOut : () => signIn()} type="button">
          {user ? t(locale, "signOut") : t(locale, "mockSignIn")}
        </button>
      </div>
      <div className="sidebar-card">
        <p className="eyebrow">{t(locale, "hotTags")}</p>
        <div className="tag-list">
          <span>BTC</span>
          <span>Macro</span>
          <span>Sports</span>
          <span>ETF</span>
          <span>Box Office</span>
        </div>
      </div>
    </aside>
  );
}

function Header({ onWalletClick, onNotificationsClick }) {
  const { locale, portfolioSummary, user, walletConnected, toast, clearToast, notifications } = useDemoAppState();
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <header className="header">
      <div>
        <p className="eyebrow">{t(locale, "productShell")}</p>
        <h1>{t(locale, "shellTitle")}</h1>
      </div>
      <div className="header-actions">
        <div className="header-balance">
          <span>{walletConnected ? t(locale, "portfolioValue") : user ? t(locale, "availableCash") : t(locale, "demoBalance")}</span>
          <strong>{walletConnected ? portfolioSummary.totalValue : user ? portfolioSummary.availableCash : "--"}</strong>
        </div>
        <button className="ghost-button notification-button" onClick={onNotificationsClick} type="button">
          {t(locale, "notifications")}
          {unread ? <span className="notification-count">{unread}</span> : null}
        </button>
        <button className="ghost-button" onClick={onWalletClick} type="button">
          {walletConnected ? t(locale, "walletConnected") : t(locale, "connectWallet")}
        </button>
        <Link className="ghost-button header-link" href="/portfolio">
          {t(locale, "portfolio")}
        </Link>
        <Link className="ghost-button header-link" href="/leaderboard">
          {locale === "zh" ? "排行榜" : "Leaderboard"}
        </Link>
        <Link className="ghost-button header-link" href="/notifications">
          {locale === "zh" ? "通知" : "Notifications"}
        </Link>
        <Link className="ghost-button header-link" href="/settings">
          {locale === "zh" ? "设置" : "Settings"}
        </Link>
      </div>
      {toast ? (
        <div className={`toast toast-${toast.kind}`} onClick={clearToast} role="status">
          {pickLocale(locale, toast.message)}
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  const { locale } = useDemoAppState();
  const heroMarket = localizeMarket(markets.find((market) => market.hot) ?? markets[0], locale);
  return (
    <section className="hero-grid">
      <div className="hero-copy panel">
        <p className="eyebrow">{t(locale, "playableDemo")}</p>
        <h2>{t(locale, "heroTitle")}</h2>
        <p>{t(locale, "heroBody")}</p>
        <div className="hero-metrics">
          <div>
            <span>{t(locale, "monthlyVolume")}</span>
            <strong>¥328M</strong>
          </div>
          <div>
            <span>{t(locale, "activeTraders")}</span>
            <strong>42,891</strong>
          </div>
          <div>
            <span>{t(locale, "liveMarkets")}</span>
            <strong>126</strong>
          </div>
        </div>
      </div>
      <div className="hero-highlight panel">
        <div className="panel-header">
          <span>{t(locale, "featuredContract")}</span>
          <span className="mini-badge">{t(locale, "live")}</span>
        </div>
        <h3>{heroMarket.title}</h3>
        <ProbabilityLineChart points={heroMarket.chart} />
        <div className="price-row">
          <button className="yes-button" type="button">
            <span>{t(locale, "buyYes")}</span>
            <strong>{heroMarket.yesPrice}¢</strong>
          </button>
          <button className="no-button" type="button">
            <span>{t(locale, "buyNo")}</span>
            <strong>{heroMarket.noPrice}¢</strong>
          </button>
        </div>
        <div className="stats-grid compact">
          <div>
            <span>24h</span>
            <strong>{heroMarket.change}</strong>
          </div>
          <div>
            <span>{t(locale, "liquidity")}</span>
            <strong>{heroMarket.volume}</strong>
          </div>
          <div>
            <span>{t(locale, "activeTraders")}</span>
            <strong>{heroMarket.traders}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketList() {
  const { locale } = useDemoAppState();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    return markets.filter((market) => {
      const localized = localizeMarket(market, locale);
      const categoryMatch = filter === "all" || market.category === filter;
      const text = `${localized.title} ${localized.summary} ${localized.categoryLabel}`.toLowerCase();
      const queryMatch = !query || text.includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [filter, locale, query]);

  return (
    <section className="panel section-panel" id="markets">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "markets")}</p>
          <h2>{t(locale, "marketListTitle")}</h2>
        </div>
        <div className="market-toolbar">
          <input className="search-input" placeholder={t(locale, "searchPlaceholder")} value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>
      <div className="chart-toolbar">
        {marketCategories.map((category) => (
          <button className={`pill chart-pill ${filter === category.id ? "active" : ""}`} key={category.id} onClick={() => setFilter(category.id)} type="button">
            {category.id === "all"
              ? t(locale, "all")
              : category.id === "crypto"
                ? t(locale, "crypto")
                : category.id === "macro"
                  ? t(locale, "macro")
                  : locale === "zh"
                    ? category.label
                    : category.id === "sports"
                      ? "Sports"
                      : "Culture"}
          </button>
        ))}
      </div>

      <div className="market-grid">
        {filtered.map((market) => {
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
  );
}

function WatchlistPanel() {
  const { locale, watchlist } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "watchlist")}</p>
          <h2>{t(locale, "watchlistTitle")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {watchlist.map((item) => {
          const market = item.marketSlug ? markets.find((entry) => entry.slug === item.marketSlug) : null;
          const localized = market ? localizeMarket(market, locale) : null;
          return (
            <div className="stack-item" key={item.marketSlug ?? item.name}>
              <div className="panel-header">
                <strong>{localized?.shortName ?? item.name}</strong>
                <span>{item.price}</span>
              </div>
              <span className="muted-text">{localized?.summary ?? item.note}</span>
              <span className={item.change.startsWith("+") ? "positive" : "negative"}>{item.change}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LeaderboardPanel() {
  const { locale } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "leaderboard")}</p>
          <h2>{t(locale, "leaderboardTitle")}</h2>
        </div>
        <Link className="ghost-button small-button" href="/leaderboard">
          {locale === "zh" ? "查看全部" : "View all"}
        </Link>
      </div>
      <div className="stack-list">
        {leaderboard.map((item) => (
          <Link className="leader-row" href={`/traders/${traderProfiles[Number(item.rank) - 1]?.slug ?? "macro_liu"}`} key={item.rank}>
            <strong>{item.rank}</strong>
            <div className="leader-copy">
              <strong>{item.name}</strong>
              <span className="muted-text">{item.winRate}</span>
            </div>
            <strong className="positive">{item.profit}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MarketShell({ children }) {
  const [walletOpen, setWalletOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { connectWallet } = useDemoAppState();

  useEffect(() => {
    if (!walletOpen) return;
    const timer = setTimeout(() => connectWallet(), 500);
    return () => clearTimeout(timer);
  }, [connectWallet, walletOpen]);

  return (
    <>
      <TopTicker />
      <div className="app-frame">
        <div className="content-grid">
          <Sidebar onWalletClick={() => setWalletOpen(true)} />
          <main className="main-column">
            <Header onNotificationsClick={() => setNotificationsOpen(true)} onWalletClick={() => setWalletOpen(true)} />
            {children}
          </main>
        </div>
      </div>
      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
      <NotificationsDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  );
}

export function HomePageClient() {
  const { locale } = useDemoAppState();

  return (
    <MarketShell>
      <HeroSection />
      <MarketList />
      <section className="dashboard-grid">
        <WatchlistPanel />
        <LeaderboardPanel />
      </section>
      <MarketChartCard locale={locale} />
    </MarketShell>
  );
}
