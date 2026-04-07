export const tickerItems = [
  "BTC 75 万概率升至 62%",
  "美联储 6 月释放降息信号报 44%",
  "总决赛 6 场内结束报 66%",
  "春节档影片首周破 20 亿报 53%",
  "新主流加密 ETF 获批报 57%",
  "金价本月破 600 元报 39%",
];

export const marketCategories = [
  { id: "all", label: "全部" },
  { id: "crypto", label: "加密" },
  { id: "macro", label: "宏观" },
  { id: "sports", label: "体育" },
  { id: "culture", label: "娱乐" },
];

export const markets = [
  {
    slug: "btc-above-750k",
    category: "crypto",
    categoryLabel: "加密",
    title: "4 月 15 日前，比特币会站上 75 万元吗？",
    summary: "ETF 资金流、风险偏好和宏观消息一起驱动的高热度短期合约。",
    description:
      "这类合约通常会在美股开盘、ETF 净流入更新和宏观发言前后出现快速重定价，非常适合用来做事件驱动和日内交易演示。",
    yesPrice: 62,
    noPrice: 38,
    probability: 62,
    change: "+8.4%",
    volume: "¥1280万",
    liquidity: "¥430万",
    traders: "4,291",
    expiresAt: "04-15 23:59",
    hot: true,
    chart: [42, 48, 51, 47, 58, 62, 60, 67, 62],
    orderbook: [
      { side: "买入 是", price: "62¢", size: "14,220" },
      { side: "买入 否", price: "38¢", size: "9,880" },
      { side: "最新成交", price: "61¢", size: "2,120" },
    ],
    rules: [
      "若 4 月 15 日 23:59 前观察价格触达或高于 75 万元，则按“是”结算。",
      "若观察期内始终未触达目标价格，则按“否”结算。",
      "所有结算规则与价格数据均为产品演示用途。",
    ],
    news: [
      "亚盘时段买盘增强，市场预期晚间波动将继续放大。",
      "ETF 资金流连续三日为正，提高了短期突破预期。",
      "交易者更关注 72 万至 75 万区间的快速冲顶路径。",
    ],
  },
  {
    slug: "new-crypto-etf",
    category: "crypto",
    categoryLabel: "加密",
    title: "本季度内，会有新的主流加密 ETF 获批吗？",
    summary: "政策、申请进度和市场情绪交织的中周期监管题材。",
    description:
      "这类市场更像长一点的政策押注，适合展示新闻流、阶段性波动与概率随时间修正的产品形态。",
    yesPrice: 57,
    noPrice: 43,
    probability: 57,
    change: "+3.1%",
    volume: "¥910万",
    liquidity: "¥270万",
    traders: "2,034",
    expiresAt: "06-30 23:59",
    hot: false,
    chart: [31, 34, 39, 44, 47, 51, 56, 58, 57],
    orderbook: [
      { side: "买入 是", price: "57¢", size: "7,420" },
      { side: "买入 否", price: "43¢", size: "5,690" },
      { side: "最新成交", price: "56¢", size: "1,360" },
    ],
    rules: [
      "若监管机构在本季度结束前正式批准指定产品，则按“是”结算。",
      "若截至季度结束仍未获批，则按“否”结算。",
      "以官方公告作为演示判定依据。",
    ],
    news: [
      "申请材料更新后，市场将概率抬升至 57%。",
      "审查窗口临近，交易者更倾向提前布局“是”侧。",
      "若下一轮听证延后，短线或出现快速回撤。",
    ],
  },
  {
    slug: "fed-june-signal",
    category: "macro",
    categoryLabel: "宏观",
    title: "6 月议息会议前，美联储会释放明确降息信号吗？",
    summary: "就业、通胀与联储表态共同驱动的高关注宏观事件市场。",
    description:
      "这是典型的政策预期型合约，适合展示顶部快讯、图表、新闻摘要和多空切换的完整产品路径。",
    yesPrice: 44,
    noPrice: 56,
    probability: 44,
    change: "-2.6%",
    volume: "¥760万",
    liquidity: "¥220万",
    traders: "3,162",
    expiresAt: "06-12 03:00",
    hot: true,
    chart: [59, 58, 56, 52, 49, 46, 45, 43, 44],
    orderbook: [
      { side: "买入 是", price: "44¢", size: "8,310" },
      { side: "买入 否", price: "56¢", size: "8,920" },
      { side: "最新成交", price: "45¢", size: "990" },
    ],
    rules: [
      "若会议声明或主席发布会中出现市场公认的明确信号，则按“是”结算。",
      "若未出现，则按“否”结算。",
      "判定口径仅用于演示。",
    ],
    news: [
      "最新通胀数据高于预期，压低了降息信号概率。",
      "交易员开始把更多仓位切向“否”侧。",
      "若就业数据走弱，概率可能迅速反弹。",
    ],
  },
  {
    slug: "gold-above-600",
    category: "macro",
    categoryLabel: "宏观",
    title: "本月国际金价会突破每克 600 元吗？",
    summary: "避险情绪、美元走势与地缘消息主导的商品市场题材。",
    description:
      "相比政策型题材，这类市场更适合展示连续走势和短线强弱切换，用户能更快理解二元合约的节奏。",
    yesPrice: 39,
    noPrice: 61,
    probability: 39,
    change: "+5.7%",
    volume: "¥530万",
    liquidity: "¥180万",
    traders: "1,286",
    expiresAt: "04-30 23:59",
    hot: false,
    chart: [18, 21, 26, 29, 31, 35, 37, 40, 39],
    orderbook: [
      { side: "买入 是", price: "39¢", size: "5,420" },
      { side: "买入 否", price: "61¢", size: "4,760" },
      { side: "最新成交", price: "38¢", size: "810" },
    ],
    rules: [
      "若指定观察价格在本月任一时点高于 600 元，则按“是”结算。",
      "若月内未突破，则按“否”结算。",
      "价格源为演示数据。",
    ],
    news: [
      "避险买盘升温后，‘是’侧价格连续三小时上涨。",
      "美元转弱被视为推动突破概率上修的关键变量。",
      "若风险资产转强，该市场可能重新回落。",
    ],
  },
  {
    slug: "finals-under-6",
    category: "sports",
    categoryLabel: "体育",
    title: "总决赛系列赛会在 6 场内结束吗？",
    summary: "伤病、主场优势和盘口预期影响极大的高波动体育合约。",
    description:
      "体育市场天然适合做直播感更强的界面，尤其适合把顶部行情、盘口侧栏和移动端交易抽屉一起组合展示。",
    yesPrice: 66,
    noPrice: 34,
    probability: 66,
    change: "+1.8%",
    volume: "¥820万",
    liquidity: "¥250万",
    traders: "2,948",
    expiresAt: "05-20 22:00",
    hot: true,
    chart: [51, 54, 57, 61, 60, 63, 64, 68, 66],
    orderbook: [
      { side: "买入 是", price: "66¢", size: "11,210" },
      { side: "买入 否", price: "34¢", size: "6,540" },
      { side: "最新成交", price: "65¢", size: "1,720" },
    ],
    rules: [
      "若总决赛在第六场或更早结束，则按“是”结算。",
      "若需要第七场，则按“否”结算。",
      "以官方赛程结果为准。",
    ],
    news: [
      "头号得分手伤情确认后，市场对速胜路径重新定价。",
      "盘中大额买单主要集中在‘是’侧。",
      "若客场球队偷下一场，概率可能快速回吐。",
    ],
  },
  {
    slug: "spring-festival-box-office",
    category: "culture",
    categoryLabel: "娱乐",
    title: "这部春节档影片的首周票房会破 20 亿吗？",
    summary: "口碑、排片和社交热度驱动的高情绪弹性娱乐市场。",
    description:
      "娱乐题材适合用来展示更广泛用户也能理解的预测市场玩法，同时保留专业交易壳的结构与视觉语言。",
    yesPrice: 53,
    noPrice: 47,
    probability: 53,
    change: "+6.9%",
    volume: "¥460万",
    liquidity: "¥150万",
    traders: "1,501",
    expiresAt: "02-20 23:59",
    hot: true,
    chart: [27, 31, 36, 39, 45, 47, 50, 56, 53],
    orderbook: [
      { side: "买入 是", price: "53¢", size: "4,910" },
      { side: "买入 否", price: "47¢", size: "4,420" },
      { side: "最新成交", price: "54¢", size: "670" },
    ],
    rules: [
      "若首周官方累计票房高于 20 亿，则按“是”结算。",
      "否则按“否”结算。",
      "以指定票房平台演示数据为准。",
    ],
    news: [
      "点映口碑升温后，‘是’侧成交额明显放大。",
      "排片占比提升，市场重新评估首周上限。",
      "若工作日票房承压，该市场可能回落到 50% 下方。",
    ],
  },
];

export const watchlist = [
  { name: "比特币 75 万", note: "今晚最活跃", price: "62¢", change: "+8.4%" },
  { name: "6 月降息信号", note: "宏观交易核心话题", price: "44¢", change: "-2.6%" },
  { name: "总决赛 6 场内结束", note: "比赛日波动放大", price: "66¢", change: "+1.8%" },
];

export const positions = [
  { title: "买入 是 | 比特币 75 万", shares: "820 份", avg: "均价 54¢", pnl: "+¥5,840" },
  { title: "买入 否 | 6 月降息信号", shares: "410 份", avg: "均价 60¢", pnl: "+¥1,280" },
  { title: "买入 是 | 春节档票房 20 亿", shares: "300 份", avg: "均价 47¢", pnl: "-¥300" },
];

export const leaderboard = [
  { rank: "01", name: "Alpha 研究所", profit: "+¥128,400", winRate: "胜率 71%" },
  { rank: "02", name: "深海套利", profit: "+¥96,220", winRate: "胜率 66%" },
  { rank: "03", name: "波动猎手", profit: "+¥81,950", winRate: "胜率 64%" },
  { rank: "04", name: "北极星宏观", profit: "+¥73,600", winRate: "胜率 62%" },
];

export const portfolioSummary = {
  totalValue: "¥128,420",
  availableCash: "¥21,940",
  todayPnl: "+¥6,820",
  unrealizedPnl: "+¥12,440",
  winRate: "63%",
};

export const activities = [
  {
    time: "今天 19:24",
    type: "买入 是",
    market: "比特币会站上 75 万元吗？",
    detail: "成交 220 份 · 均价 61¢",
    status: "已成交",
  },
  {
    time: "今天 18:06",
    type: "止盈 卖出",
    market: "春节档影片首周票房会破 20 亿吗？",
    detail: "卖出 100 份 · 成交价 56¢",
    status: "已完成",
  },
  {
    time: "今天 16:42",
    type: "挂单 取消",
    market: "6 月议息会议前，会释放降息信号吗？",
    detail: "取消 300 份 · 买入 是 43¢",
    status: "已撤销",
  },
  {
    time: "昨天 22:11",
    type: "买入 否",
    market: "总决赛系列赛会在 6 场内结束吗？",
    detail: "成交 180 份 · 均价 35¢",
    status: "已成交",
  },
];

export const portfolioWatch = [
  { name: "BTC 75 万", price: "62¢", change: "+8.4%", note: "晚间波动可能继续放大" },
  { name: "6 月降息信号", price: "44¢", change: "-2.6%", note: "数据夜最敏感" },
  { name: "总决赛 6 场内结束", price: "66¢", change: "+1.8%", note: "赛前新闻影响大" },
];

export const commentsBySlug = {
  "btc-above-750k": [
    { user: "MacroLiu", time: "2 分钟前", text: "今晚 ETF 资金流如果继续走强，75 万不是没有机会。" },
    { user: "DeltaCat", time: "11 分钟前", text: "我更关注 72 万到 73 万区间能不能站稳，那里会决定冲顶概率。" },
    { user: "Aster", time: "18 分钟前", text: "美股风险偏好回暖以后，这条市场的成交明显比白天更集中。" },
  ],
  "new-crypto-etf": [
    { user: "Faye", time: "5 分钟前", text: "如果下周有更多申请更新，57% 还有继续抬的空间。" },
    { user: "BlockRiver", time: "20 分钟前", text: "这条更适合做波段，不像 BTC 那种盘中节奏。" },
  ],
  "fed-june-signal": [
    { user: "RatesDesk", time: "7 分钟前", text: "市场已经明显把仓位切向‘否’，现在反而要提防意外鸽派表述。" },
    { user: "Mina", time: "25 分钟前", text: "这类宏观题材最好和数据日历一起看。" },
  ],
  "gold-above-600": [
    { user: "SafeHaven", time: "14 分钟前", text: "只要美元别突然拉回，金价继续上修的概率不低。" },
  ],
  "finals-under-6": [
    { user: "CourtSide", time: "4 分钟前", text: "核心球员伤停这个变量还没完全计入价格。" },
    { user: "TraderW", time: "17 分钟前", text: "如果客队偷到一场，这条会瞬间回撤很多。" },
  ],
  "spring-festival-box-office": [
    { user: "BoxOfficeLab", time: "9 分钟前", text: "点映口碑扩散速度比预期快，53% 不算贵。" },
  ],
};

export const depthBySlug = {
  "btc-above-750k": {
    yes: [
      { price: "62¢", shares: "14,220", total: "¥88,164" },
      { price: "61¢", shares: "12,090", total: "¥73,749" },
      { price: "60¢", shares: "11,480", total: "¥68,880" },
    ],
    no: [
      { price: "38¢", shares: "9,880", total: "¥37,544" },
      { price: "39¢", shares: "8,940", total: "¥34,866" },
      { price: "40¢", shares: "8,120", total: "¥32,480" },
    ],
  },
  "new-crypto-etf": {
    yes: [
      { price: "57¢", shares: "7,420", total: "¥42,294" },
      { price: "56¢", shares: "6,980", total: "¥39,088" },
      { price: "55¢", shares: "6,310", total: "¥34,705" },
    ],
    no: [
      { price: "43¢", shares: "5,690", total: "¥24,467" },
      { price: "44¢", shares: "4,880", total: "¥21,472" },
      { price: "45¢", shares: "4,220", total: "¥18,990" },
    ],
  },
  "fed-june-signal": {
    yes: [
      { price: "44¢", shares: "8,310", total: "¥36,564" },
      { price: "43¢", shares: "7,940", total: "¥34,142" },
      { price: "42¢", shares: "7,250", total: "¥30,450" },
    ],
    no: [
      { price: "56¢", shares: "8,920", total: "¥49,952" },
      { price: "57¢", shares: "7,480", total: "¥42,636" },
      { price: "58¢", shares: "6,900", total: "¥40,020" },
    ],
  },
  "gold-above-600": {
    yes: [
      { price: "39¢", shares: "5,420", total: "¥21,138" },
      { price: "38¢", shares: "5,010", total: "¥19,038" },
      { price: "37¢", shares: "4,660", total: "¥17,242" },
    ],
    no: [
      { price: "61¢", shares: "4,760", total: "¥29,036" },
      { price: "62¢", shares: "4,210", total: "¥26,102" },
      { price: "63¢", shares: "3,920", total: "¥24,696" },
    ],
  },
  "finals-under-6": {
    yes: [
      { price: "66¢", shares: "11,210", total: "¥73,986" },
      { price: "65¢", shares: "10,340", total: "¥67,210" },
      { price: "64¢", shares: "9,680", total: "¥61,952" },
    ],
    no: [
      { price: "34¢", shares: "6,540", total: "¥22,236" },
      { price: "35¢", shares: "5,960", total: "¥20,860" },
      { price: "36¢", shares: "5,410", total: "¥19,476" },
    ],
  },
  "spring-festival-box-office": {
    yes: [
      { price: "53¢", shares: "4,910", total: "¥26,023" },
      { price: "52¢", shares: "4,320", total: "¥22,464" },
      { price: "51¢", shares: "3,840", total: "¥19,584" },
    ],
    no: [
      { price: "47¢", shares: "4,420", total: "¥20,774" },
      { price: "48¢", shares: "3,990", total: "¥19,152" },
      { price: "49¢", shares: "3,620", total: "¥17,738" },
    ],
  },
};

export const tradeHistoryBySlug = {
  "btc-above-750k": [
    { time: "19:24:11", side: "买入 是", price: "61¢", shares: "220 份" },
    { time: "19:23:50", side: "买入 否", price: "39¢", shares: "80 份" },
    { time: "19:23:18", side: "买入 是", price: "62¢", shares: "140 份" },
    { time: "19:22:40", side: "买入 是", price: "62¢", shares: "320 份" },
  ],
  "new-crypto-etf": [
    { time: "18:08:11", side: "买入 是", price: "57¢", shares: "150 份" },
    { time: "18:05:45", side: "买入 否", price: "44¢", shares: "120 份" },
  ],
  "fed-june-signal": [
    { time: "17:31:20", side: "买入 否", price: "56¢", shares: "260 份" },
    { time: "17:29:03", side: "买入 是", price: "44¢", shares: "100 份" },
  ],
  "gold-above-600": [
    { time: "16:54:02", side: "买入 是", price: "39¢", shares: "90 份" },
    { time: "16:53:28", side: "买入 否", price: "61¢", shares: "140 份" },
  ],
  "finals-under-6": [
    { time: "15:20:42", side: "买入 是", price: "66¢", shares: "300 份" },
    { time: "15:19:13", side: "买入 否", price: "35¢", shares: "110 份" },
  ],
  "spring-festival-box-office": [
    { time: "14:40:12", side: "买入 是", price: "53¢", shares: "120 份" },
    { time: "14:38:31", side: "买入 否", price: "47¢", shares: "95 份" },
  ],
};

export function getMarketBySlug(slug) {
  return markets.find((market) => market.slug === slug);
}
