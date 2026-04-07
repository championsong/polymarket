export const traderProfiles = [
  {
    handle: "@macro_liu",
    slug: "macro_liu",
    name: "MacroLiu",
    avatar: "ML",
    badges: ["Top", "Macro"],
    pnl: "+¥128,400",
    winRate: "71%",
    followers: "12.4k",
    following: "184",
    volume: "¥8.2M",
    bioZh: "专注宏观与政策事件，偏好用利率路径和风险偏好做短中周期交易。",
    bioEn: "Macro and policy-focused trader with a bias toward rates, sentiment, and medium-horizon event setups.",
    favoriteMarkets: ["fed-june-signal", "gold-above-600", "btc-above-750k"],
  },
  {
    handle: "@delta_cat",
    slug: "delta_cat",
    name: "DeltaCat",
    avatar: "DC",
    badges: ["Whale", "BTC"],
    pnl: "+¥96,220",
    winRate: "66%",
    followers: "8.1k",
    following: "96",
    volume: "¥6.7M",
    bioZh: "偏爱高波动加密市场，喜欢围绕突破位和资金流做节奏交易。",
    bioEn: "High-vol crypto trader who likes momentum setups around breakout levels and flow shifts.",
    favoriteMarkets: ["btc-above-750k", "new-crypto-etf"],
  },
  {
    handle: "@aster_flow",
    slug: "aster_flow",
    name: "Aster",
    avatar: "AF",
    badges: ["Early"],
    pnl: "+¥81,950",
    winRate: "64%",
    followers: "5.7k",
    following: "140",
    volume: "¥4.1M",
    bioZh: "擅长在新闻扩散前做提前布局，偏好跨题材轮动。",
    bioEn: "Likes getting positioned before headlines fully spread, often rotating across narratives.",
    favoriteMarkets: ["btc-above-750k", "spring-festival-box-office", "finals-under-6"],
  },
  {
    handle: "@boxoffice_lab",
    slug: "boxoffice_lab",
    name: "BoxOfficeLab",
    avatar: "BL",
    badges: ["Entertainment"],
    pnl: "+¥73,600",
    winRate: "62%",
    followers: "3.2k",
    following: "72",
    volume: "¥2.9M",
    bioZh: "关注娱乐和文化题材，结合社交热度与排片预期做定价。",
    bioEn: "Entertainment-focused account pricing culture markets with social buzz and distribution trends.",
    favoriteMarkets: ["spring-festival-box-office"],
  },
];

export function getTraderByHandle(handle) {
  return traderProfiles.find((item) => item.handle === handle);
}

export function getTraderBySlug(slug) {
  return traderProfiles.find((item) => item.slug === slug);
}
