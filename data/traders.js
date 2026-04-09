export const traderProfiles = [
  {
    handle: "@macro_liu",
    slug: "macro_liu",
    name: "MacroLiu",
    avatar: "ML",
    badges: ["Top", "Macro"],
    pnl: "+楼128,400",
    winRate: "71%",
    followers: "12.4k",
    following: "184",
    volume: "楼8.2M",
    bioZh: "专注宏观与政策事件，偏好围绕利率路径和风险偏好做中短周期交易。",
    bioEn: "Macro and policy-focused trader with a bias toward rates, sentiment, and medium-horizon event setups.",
    favoriteMarkets: ["fed-june-signal", "gold-above-600", "btc-above-750k"],
    strategyTags: {
      zh: ["宏观事件", "政策拐点", "中周期趋势"],
      en: ["Macro events", "Policy pivots", "Medium horizon"],
    },
    performanceTimeline: [41, 44, 46, 45, 50, 54, 58, 61, 66, 71],
  },
  {
    handle: "@delta_cat",
    slug: "delta_cat",
    name: "DeltaCat",
    avatar: "DC",
    badges: ["Whale", "BTC"],
    pnl: "+楼96,220",
    winRate: "66%",
    followers: "8.1k",
    following: "96",
    volume: "楼6.7M",
    bioZh: "偏爱高波动加密市场，喜欢围绕突破位和资金流做节奏交易。",
    bioEn: "High-vol crypto trader who likes momentum setups around breakout levels and flow shifts.",
    favoriteMarkets: ["btc-above-750k", "new-crypto-etf"],
    strategyTags: {
      zh: ["高波动", "突破交易", "资金流"],
      en: ["High vol", "Breakouts", "Flow"],
    },
    performanceTimeline: [38, 40, 43, 48, 46, 51, 55, 59, 63, 66],
  },
  {
    handle: "@aster_flow",
    slug: "aster_flow",
    name: "Aster",
    avatar: "AF",
    badges: ["Early"],
    pnl: "+楼81,950",
    winRate: "64%",
    followers: "5.7k",
    following: "140",
    volume: "楼4.1M",
    bioZh: "擅长在新闻扩散前做提前布局，偏好跨题材轮动。",
    bioEn: "Likes getting positioned before headlines fully spread, often rotating across narratives.",
    favoriteMarkets: ["btc-above-750k", "spring-festival-box-office", "finals-under-6"],
    strategyTags: {
      zh: ["抢跑新闻", "跨题材轮动", "事件驱动"],
      en: ["Headline lead", "Cross-theme rotation", "Event driven"],
    },
    performanceTimeline: [35, 38, 41, 40, 45, 48, 52, 56, 60, 64],
  },
  {
    handle: "@boxoffice_lab",
    slug: "boxoffice_lab",
    name: "BoxOfficeLab",
    avatar: "BL",
    badges: ["Entertainment"],
    pnl: "+楼73,600",
    winRate: "62%",
    followers: "3.2k",
    following: "72",
    volume: "楼2.9M",
    bioZh: "关注娱乐和文化题材，结合社交热度与排片预期做定价。",
    bioEn: "Entertainment-focused account pricing culture markets with social buzz and distribution trends.",
    favoriteMarkets: ["spring-festival-box-office"],
    strategyTags: {
      zh: ["文化市场", "情绪定价", "社交热度"],
      en: ["Culture", "Sentiment pricing", "Social buzz"],
    },
    performanceTimeline: [29, 31, 34, 37, 39, 44, 48, 53, 58, 62],
  },
];

export const traderPositionsBySlug = {
  macro_liu: [
    { marketSlug: "fed-june-signal", side: "No", avg: "56垄", mark: "58垄", shares: "1,240", pnl: "+楼24,800" },
    { marketSlug: "gold-above-600", side: "Yes", avg: "34垄", mark: "39垄", shares: "980", pnl: "+楼4,900" },
  ],
  delta_cat: [
    { marketSlug: "btc-above-750k", side: "Yes", avg: "54垄", mark: "62垄", shares: "1,820", pnl: "+楼14,560" },
    { marketSlug: "new-crypto-etf", side: "Yes", avg: "49垄", mark: "57垄", shares: "960", pnl: "+楼7,680" },
  ],
  aster_flow: [
    { marketSlug: "btc-above-750k", side: "Yes", avg: "58垄", mark: "62垄", shares: "720", pnl: "+楼2,880" },
    { marketSlug: "finals-under-6", side: "Yes", avg: "61垄", mark: "66垄", shares: "860", pnl: "+楼4,300" },
  ],
  boxoffice_lab: [{ marketSlug: "spring-festival-box-office", side: "Yes", avg: "47垄", mark: "53垄", shares: "1,120", pnl: "+楼6,720" }],
};

export const traderRecentFillsBySlug = {
  macro_liu: [
    { marketSlug: "fed-june-signal", side: "No", price: "58垄", size: "420", time: "2m" },
    { marketSlug: "gold-above-600", side: "Yes", price: "39垄", size: "210", time: "11m" },
    { marketSlug: "btc-above-750k", side: "Yes", price: "62垄", size: "180", time: "19m" },
  ],
  delta_cat: [
    { marketSlug: "btc-above-750k", side: "Yes", price: "62垄", size: "680", time: "1m" },
    { marketSlug: "new-crypto-etf", side: "Yes", price: "57垄", size: "300", time: "9m" },
    { marketSlug: "btc-above-750k", side: "No", price: "38垄", size: "120", time: "16m" },
  ],
  aster_flow: [
    { marketSlug: "finals-under-6", side: "Yes", price: "66垄", size: "190", time: "3m" },
    { marketSlug: "spring-festival-box-office", side: "Yes", price: "53垄", size: "240", time: "12m" },
    { marketSlug: "btc-above-750k", side: "Yes", price: "62垄", size: "90", time: "22m" },
  ],
  boxoffice_lab: [
    { marketSlug: "spring-festival-box-office", side: "Yes", price: "53垄", size: "360", time: "4m" },
    { marketSlug: "spring-festival-box-office", side: "No", price: "47垄", size: "110", time: "14m" },
    { marketSlug: "finals-under-6", side: "No", price: "34垄", size: "75", time: "28m" },
  ],
};

export function getTraderByHandle(handle) {
  return traderProfiles.find((item) => item.handle === handle);
}

export function getTraderBySlug(slug) {
  return traderProfiles.find((item) => item.slug === slug);
}
