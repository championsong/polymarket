"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  activities as seedActivities,
  commentsBySlug,
  markets,
  portfolioSummary as seedSummary,
  portfolioWatch as seedPortfolioWatch,
  positions as seedPositions,
  watchlist as seedWatchlist,
} from "../data/markets";
import { getSeedCommentText, localizeMarket, t } from "./i18n";

const STORAGE_KEY = "pulse-market-demo-state-v5";
const DemoAppContext = createContext(null);

function parseCurrency(value) {
  return Number.parseInt(String(value).replace(/[^\d-]/g, ""), 10) || 0;
}

function formatCurrency(value) {
  return `¥${value.toLocaleString("en-US")}`;
}

function formatCents(value) {
  return `${value}¢`;
}

function makeAddress() {
  const chars = "ABCDEF0123456789";
  let body = "";
  for (let index = 0; index < 8; index += 1) body += chars[Math.floor(Math.random() * chars.length)];
  return `0x${body}...91C`;
}

function createInitialMarks() {
  return Object.fromEntries(markets.map((market) => [market.slug, market.yesPrice]));
}

function createInitialNotifications() {
  return [
    {
      id: "n1",
      title: { zh: "BTC 市场异动", en: "BTC market moved" },
      body: { zh: "Yes 价格升至 62¢。", en: "Yes price moved to 62¢." },
      read: false,
      time: { zh: "刚刚", en: "Just now" },
    },
    {
      id: "n2",
      title: { zh: "宏观提醒", en: "Macro alert" },
      body: { zh: "联储信号市场今日变动 2%。", en: "Fed signal market changed by 2% today." },
      read: false,
      time: { zh: "12 分钟前", en: "12m" },
    },
  ];
}

function createInitialAlerts() {
  return [
    { id: "a1", marketSlug: "btc-above-750k", label: { zh: "BTC > 64¢", en: "BTC > 64¢" }, threshold: "64¢", active: true },
    { id: "a2", marketSlug: "fed-june-signal", label: { zh: "Fed Yes < 42¢", en: "Fed Yes < 42¢" }, threshold: "42¢", active: true },
  ];
}

function seedCommentFeed() {
  const badges = [["Top", "Macro"], ["Whale", "BTC"], ["Early"], ["Entertainment"]];
  const handles = ["@macro_liu", "@delta_cat", "@aster_flow", "@boxoffice_lab"];
  const avatars = ["ML", "DC", "AF", "BL"];
  const pnls = ["+12.4k", "+8.1k", "+3.4k", "+5.7k"];

  return Object.fromEntries(
    Object.entries(commentsBySlug).map(([slug, items]) => [
      slug,
      items.map((comment, index) => ({
        id: `${slug}-${index}`,
        user: comment.user,
        handle: handles[index % handles.length],
        avatar: avatars[index % avatars.length],
        badges: badges[index % badges.length],
        pnl: pnls[index % pnls.length],
        time: { zh: comment.time, en: `${(index + 1) * 7}m ago` },
        text: {
          zh: comment.text,
          en: getSeedCommentText(slug, index, "en", comment.text),
        },
        replies: [],
        likes: 3 + index * 2,
        pinned: index === 0,
      })),
    ]),
  );
}

const defaultState = {
  locale: "zh",
  user: null,
  walletConnected: false,
  walletAddress: null,
  watchlist: seedWatchlist,
  portfolioWatch: seedPortfolioWatch,
  positions: seedPositions.map((position, index) => ({ ...position, id: `p-${index}`, mark: position.avg.replace("均价 ", "") })),
  activities: seedActivities,
  portfolioSummary: seedSummary,
  comments: seedCommentFeed(),
  marketMarks: createInitialMarks(),
  notifications: createInitialNotifications(),
  alerts: createInitialAlerts(),
  savedSearches: ["BTC", "ETF", "Macro", "Sports"],
  toast: null,
};

function normalizePersistedState(parsed) {
  return {
    ...defaultState,
    ...parsed,
    locale: parsed.locale ?? "zh",
    marketMarks: { ...createInitialMarks(), ...(parsed.marketMarks ?? {}) },
    notifications: parsed.notifications ?? createInitialNotifications(),
    alerts: parsed.alerts ?? createInitialAlerts(),
    savedSearches: parsed.savedSearches ?? defaultState.savedSearches,
  };
}

function getMarketShortName(market, locale = "zh") {
  return localizeMarket(market, locale).shortName;
}

function findMarketByPosition(position) {
  return markets.find((market) => position.title.includes(getMarketShortName(market, "zh")) || position.title.includes(getMarketShortName(market, "en")));
}

function makeToast(kind, zh, en) {
  return { kind, message: { zh, en } };
}

function makeActivity({ time, typeZh, typeEn, marketZh, marketEn, detailZh, detailEn, statusZh, statusEn }) {
  return {
    time: { zh: time, en: time === "刚刚" ? "Just now" : time },
    type: { zh: typeZh, en: typeEn },
    market: { zh: marketZh, en: marketEn },
    detail: { zh: detailZh, en: detailEn },
    status: { zh: statusZh, en: statusEn },
  };
}

export function DemoAppProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(normalizePersistedState(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((current) => {
        const nextMarks = { ...current.marketMarks };
        for (const market of markets) {
          const currentMark = nextMarks[market.slug] ?? market.yesPrice;
          const delta = Math.floor(Math.random() * 3) - 1;
          nextMarks[market.slug] = Math.max(1, Math.min(99, currentMark + delta));
        }

        const positions = current.positions.map((position) => {
          const market = findMarketByPosition(position);
          if (!market) return position;
          const avg = Number.parseInt(String(position.avg).replace(/[^\d]/g, ""), 10) || market.yesPrice;
          const shares = Number.parseInt(String(position.shares).replace(/[^\d]/g, ""), 10) || 0;
          const yesLike = String(position.title).includes("买入 是") || String(position.title).includes("Buy Yes");
          const mark = yesLike ? nextMarks[market.slug] : 100 - nextMarks[market.slug];
          const pnlValue = Math.round(((mark - avg) * shares) / 100);
          return {
            ...position,
            mark: formatCents(mark),
            pnl: `${pnlValue >= 0 ? "+" : "-"}${formatCurrency(Math.abs(pnlValue))}`,
          };
        });

        const totalValue =
          parseCurrency(current.portfolioSummary.availableCash) +
          positions.reduce((sum, position) => {
            const shares = Number.parseInt(String(position.shares).replace(/[^\d]/g, ""), 10) || 0;
            const mark = Number.parseInt(String(position.mark ?? position.avg).replace(/[^\d]/g, ""), 10) || 0;
            return sum + Math.round((shares * mark) / 100);
          }, 0);

        const unrealized = positions.reduce((sum, position) => sum + parseCurrency(position.pnl), 0);

        return {
          ...current,
          marketMarks: nextMarks,
          positions,
          portfolioSummary: {
            ...current.portfolioSummary,
            totalValue: formatCurrency(totalValue),
            unrealizedPnl: `${unrealized >= 0 ? "+" : "-"}${formatCurrency(Math.abs(unrealized))}`,
          },
        };
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!state.toast) return;
    const timer = window.setTimeout(() => setState((current) => ({ ...current, toast: null })), 2400);
    return () => window.clearTimeout(timer);
  }, [state.toast]);

  const actions = useMemo(
    () => ({
      setLocale(locale) {
        setState((current) => ({ ...current, locale }));
      },
      signIn(name = "Demo Trader") {
        setState((current) => ({
          ...current,
          user: { name, handle: "@pulse_demo", avatar: "PD", badges: ["Verified", "Demo"], pnl: "+1.2k" },
          toast: makeToast("success", t("zh", "signedIn"), t("en", "signedIn")),
        }));
      },
      signOut() {
        setState((current) => ({
          ...current,
          user: null,
          walletConnected: false,
          walletAddress: null,
          toast: makeToast("info", t("zh", "signedOut"), t("en", "signedOut")),
        }));
      },
      connectWallet() {
        setState((current) => ({
          ...current,
          walletConnected: true,
          walletAddress: current.walletAddress ?? makeAddress(),
          toast: makeToast("success", t("zh", "walletConnectedToast"), t("en", "walletConnectedToast")),
        }));
      },
      toggleWatchlist(market) {
        setState((current) => {
          const zhName = getMarketShortName(market, "zh");
          const enName = getMarketShortName(market, "en");
          const exists = current.watchlist.some((item) => item.name === zhName || item.name === enName);
          const nextItem = {
            marketSlug: market.slug,
            name: zhName,
            note: localizeMarket(market, "zh").summary,
            price: formatCents(market.yesPrice),
            change: market.change,
          };
          return {
            ...current,
            watchlist: exists ? current.watchlist.filter((item) => item.name !== zhName && item.name !== enName) : [nextItem, ...current.watchlist].slice(0, 8),
            portfolioWatch: exists ? current.portfolioWatch.filter((item) => item.name !== zhName && item.name !== enName) : [nextItem, ...current.portfolioWatch].slice(0, 8),
            toast: exists
              ? makeToast("info", t("zh", "removedWatchlist"), t("en", "removedWatchlist"))
              : makeToast("info", t("zh", "addedWatchlist"), t("en", "addedWatchlist")),
          };
        });
      },
      placeOrder({ market, side, amount, mode = "buy" }) {
        setState((current) => {
          const marketMark = current.marketMarks[market.slug] ?? market.yesPrice;
          const price = side === "yes" ? marketMark : 100 - marketMark;
          const shares = Math.max(1, Math.floor((amount / price) * 100));
          const sideZh = side === "yes" ? t("zh", "yes") : t("zh", "no");
          const sideEn = side === "yes" ? t("en", "yes") : t("en", "no");
          const actionZh = mode === "sell" ? t("zh", "sellAction") : t("zh", "buyAction");
          const actionEn = mode === "sell" ? t("en", "sellAction") : t("en", "buyAction");
          const marketZh = localizeMarket(market, "zh");
          const marketEn = localizeMarket(market, "en");

          const positions =
            mode === "sell"
              ? current.positions
              : [
                  {
                    id: `p-${Date.now()}`,
                    marketSlug: market.slug,
                    title: `${actionZh} ${sideZh} | ${marketZh.shortName}`,
                    titleEn: `${actionEn} ${sideEn} | ${marketEn.shortName}`,
                    shares: `${shares} 份`,
                    avg: `均价 ${formatCents(price)}`,
                    avgEn: `Avg ${formatCents(price)}`,
                    mark: formatCents(price),
                    pnl: "+¥0",
                  },
                  ...current.positions,
                ].slice(0, 10);

          const cashDelta = mode === "sell" ? amount : -amount;
          const availableCash = Math.max(0, parseCurrency(current.portfolioSummary.availableCash) + cashDelta);

          return {
            ...current,
            positions,
            activities: [
              makeActivity({
                time: "刚刚",
                typeZh: `${actionZh} ${sideZh}`,
                typeEn: `${actionEn} ${sideEn}`,
                marketZh: marketZh.title,
                marketEn: marketEn.title,
                detailZh: `成交 ${shares} 份 · 均价 ${formatCents(price)}`,
                detailEn: `Filled ${shares} shares at ${formatCents(price)}`,
                statusZh: t("zh", "filled"),
                statusEn: t("en", "filled"),
              }),
              ...current.activities,
            ].slice(0, 12),
            portfolioSummary: {
              ...current.portfolioSummary,
              availableCash: formatCurrency(availableCash),
            },
            notifications: [
              {
                id: `n-${Date.now()}`,
                title: { zh: `${actionZh} ${sideZh}`, en: `${actionEn} ${sideEn}` },
                body: {
                  zh: `${marketZh.shortName} 成交于 ${formatCents(price)}。`,
                  en: `${marketEn.shortName} filled at ${formatCents(price)}.`,
                },
                read: false,
                time: { zh: "刚刚", en: "Just now" },
              },
              ...current.notifications,
            ].slice(0, 12),
            toast: makeToast(
              "success",
              `${actionZh} ${sideZh} 已成交：${shares} 份，价格 ${formatCents(price)}。`,
              `${actionEn} ${sideEn} filled: ${shares} shares at ${formatCents(price)}.`,
            ),
          };
        });
      },
      closePosition({ market }) {
        setState((current) => {
          const marketZh = localizeMarket(market, "zh");
          const marketEn = localizeMarket(market, "en");
          const matched = current.positions.filter(
            (position) => position.title.includes(marketZh.shortName) || String(position.titleEn).includes(marketEn.shortName),
          );
          const released = matched.reduce((sum, position) => {
            const shares = Number.parseInt(String(position.shares).replace(/[^\d]/g, ""), 10) || 0;
            const mark = Number.parseInt(String(position.mark ?? position.avg).replace(/[^\d]/g, ""), 10) || 0;
            return sum + Math.round((shares * mark) / 100);
          }, 0);

          return {
            ...current,
            positions: current.positions.filter(
              (position) => !position.title.includes(marketZh.shortName) && !String(position.titleEn).includes(marketEn.shortName),
            ),
            activities: [
              makeActivity({
                time: "刚刚",
                typeZh: t("zh", "closeAction"),
                typeEn: t("en", "closeAction"),
                marketZh: marketZh.title,
                marketEn: marketEn.title,
                detailZh: `关闭 ${matched.length} 条持仓`,
                detailEn: `Closed ${matched.length} open lines`,
                statusZh: t("zh", "completed"),
                statusEn: t("en", "completed"),
              }),
              ...current.activities,
            ].slice(0, 12),
            portfolioSummary: {
              ...current.portfolioSummary,
              availableCash: formatCurrency(parseCurrency(current.portfolioSummary.availableCash) + released),
            },
            notifications: [
              {
                id: `n-${Date.now()}`,
                title: { zh: "仓位已平", en: "Position closed" },
                body: { zh: `${marketZh.shortName} 仓位已关闭。`, en: `${marketEn.shortName} position closed.` },
                read: false,
                time: { zh: "刚刚", en: "Just now" },
              },
              ...current.notifications,
            ].slice(0, 12),
            toast: makeToast("info", `${marketZh.shortName}${t("zh", "positionClosed")}`, `${marketEn.shortName} ${t("en", "positionClosed").toLowerCase()}`),
          };
        });
      },
      postComment({ slug, text }) {
        setState((current) => {
          const author = current.user ?? { name: "Demo Trader", handle: "@pulse_demo", avatar: "PD", badges: ["Verified", "Demo"], pnl: "+1.2k" };
          const optimistic = {
            id: `${slug}-${Date.now()}`,
            user: author.name,
            handle: author.handle,
            avatar: author.avatar,
            badges: author.badges,
            pnl: author.pnl,
            time: { zh: "刚刚", en: "Just now" },
            text: { zh: text, en: text },
            replies: [],
            optimistic: true,
            likes: 0,
            pinned: false,
          };

          return {
            ...current,
            user: current.user ?? author,
            comments: { ...current.comments, [slug]: [optimistic, ...(current.comments[slug] ?? [])] },
            toast: makeToast("success", t("zh", "commentPosted"), t("en", "commentPosted")),
          };
        });
      },
      postReply({ slug, commentId, text }) {
        setState((current) => {
          const author = current.user ?? { name: "Demo Trader", handle: "@pulse_demo", avatar: "PD", badges: ["Verified", "Demo"], pnl: "+1.2k" };
          return {
            ...current,
            user: current.user ?? author,
            comments: {
              ...current.comments,
              [slug]: (current.comments[slug] ?? []).map((comment) =>
                comment.id !== commentId
                  ? comment
                  : {
                      ...comment,
                      replies: [
                        {
                          id: `${commentId}-reply-${Date.now()}`,
                          user: author.name,
                          handle: author.handle,
                          time: { zh: "刚刚", en: "Just now" },
                          text: { zh: text, en: text },
                          optimistic: true,
                        },
                        ...(comment.replies ?? []),
                      ],
                    },
              ),
            },
            toast: makeToast("success", t("zh", "replyPosted"), t("en", "replyPosted")),
          };
        });
      },
      likeComment({ slug, commentId }) {
        setState((current) => ({
          ...current,
          comments: {
            ...current.comments,
            [slug]: (current.comments[slug] ?? []).map((comment) => (comment.id === commentId ? { ...comment, likes: (comment.likes ?? 0) + 1 } : comment)),
          },
        }));
      },
      pinComment({ slug, commentId }) {
        setState((current) => ({
          ...current,
          comments: {
            ...current.comments,
            [slug]: (current.comments[slug] ?? []).map((comment) => ({ ...comment, pinned: comment.id === commentId })),
          },
          toast: makeToast("info", t("zh", "commentPinned"), t("en", "commentPinned")),
        }));
      },
      saveSearch(query) {
        if (!query.trim()) return;
        setState((current) => ({
          ...current,
          savedSearches: [query.trim(), ...current.savedSearches.filter((item) => item !== query.trim())].slice(0, 8),
          toast: makeToast("success", `${t("zh", "searchSaved")} ${query.trim()}`, `${t("en", "searchSaved")} ${query.trim()}`),
        }));
      },
      removeSavedSearch(query) {
        setState((current) => ({
          ...current,
          savedSearches: current.savedSearches.filter((item) => item !== query),
        }));
      },
      createAlert({ marketSlug, label, threshold }) {
        setState((current) => ({
          ...current,
          alerts: [{ id: `a-${Date.now()}`, marketSlug, label: { zh: label, en: label }, threshold, active: true }, ...current.alerts].slice(0, 10),
          notifications: [
            { id: `n-${Date.now()}`, title: { zh: "提醒已创建", en: "Alert created" }, body: { zh: label, en: label }, read: false, time: { zh: "刚刚", en: "Just now" } },
            ...current.notifications,
          ].slice(0, 12),
          toast: makeToast("success", t("zh", "alertCreated"), t("en", "alertCreated")),
        }));
      },
      toggleAlert(alertId) {
        setState((current) => ({
          ...current,
          alerts: current.alerts.map((alert) => (alert.id === alertId ? { ...alert, active: !alert.active } : alert)),
        }));
      },
      markNotificationsRead() {
        setState((current) => ({
          ...current,
          notifications: current.notifications.map((item) => ({ ...item, read: true })),
        }));
      },
      clearToast() {
        setState((current) => ({ ...current, toast: null }));
      },
    }),
    [],
  );

  const value = useMemo(() => ({ ...state, hydrated, ...actions }), [actions, hydrated, state]);
  return <DemoAppContext.Provider value={value}>{children}</DemoAppContext.Provider>;
}

export function useDemoAppState() {
  const context = useContext(DemoAppContext);
  if (!context) throw new Error("useDemoAppState must be used within DemoAppProvider");
  return context;
}
