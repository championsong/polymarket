const marketData = [
  {
    id: "btc-750k",
    category: "crypto",
    categoryLabel: "\u52a0\u5bc6",
    title: "4 \u6708 15 \u65e5\u524d\uff0c\u6bd4\u7279\u5e01\u4f1a\u7ad9\u4e0a 75 \u4e07\u5143\u5417\uff1f",
    description: "\u56f4\u7ed5\u6bd4\u7279\u5e01\u77ed\u671f\u51b2\u9ad8\u9884\u671f\u7684\u70ed\u95e8\u5408\u7ea6\uff0c\u4ef7\u683c\u4f1a\u968f ETF \u8d44\u91d1\u6d41\u3001\u98ce\u9669\u504f\u597d\u548c\u5b8f\u89c2\u6d88\u606f\u8fc5\u901f\u6ce2\u52a8\u3002",
    yesPrice: 62,
    noPrice: 38,
    probability: 62,
    change: "+8.4%",
    volume: "\u00a5 1280\u4e07",
    traders: "4,291",
    deadline: "04-15 23:59",
    hot: true,
    rules: [
      "\u82e5 4 \u6708 15 \u65e5 23:59 \u524d\u89c2\u5bdf\u4ef7\u683c\u89e6\u8fbe\u6216\u9ad8\u4e8e 75 \u4e07\u5143\uff0c\u5408\u7ea6\u6309\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u82e5\u89c2\u5bdf\u671f\u5185\u59cb\u7ec8\u672a\u89e6\u8fbe\u76ee\u6807\u4ef7\u683c\uff0c\u5408\u7ea6\u6309\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u6570\u636e\u6e90\u4e0e\u7ed3\u7b97\u903b\u8f91\u5747\u4e3a\u6f14\u793a\u7528\u9014\u3002"
    ]
  },
  {
    id: "eth-etf",
    category: "crypto",
    categoryLabel: "\u52a0\u5bc6",
    title: "\u672c\u5b63\u5ea6\u5185\uff0c\u4f1a\u6709\u65b0\u7684\u4e3b\u6d41\u52a0\u5bc6 ETF \u83b7\u6279\u5417\uff1f",
    description: "\u76d1\u7ba1\u53e3\u5f84\u3001\u7533\u8bf7\u8fdb\u5ea6\u548c\u5e02\u573a\u9884\u671f\u5171\u540c\u9a71\u52a8\u8be5\u5e02\u573a\uff0c\u662f\u4e2d\u77ed\u7ebf\u4ea4\u6613\u8005\u6700\u5e38\u770b\u7684\u653f\u7b56\u9898\u6750\u4e4b\u4e00\u3002",
    yesPrice: 57,
    noPrice: 43,
    probability: 57,
    change: "+3.1%",
    volume: "\u00a5 910\u4e07",
    traders: "2,034",
    deadline: "06-30 23:59",
    hot: false,
    rules: [
      "\u82e5\u76d1\u7ba1\u673a\u6784\u5728\u672c\u5b63\u5ea6\u7ed3\u675f\u524d\u6b63\u5f0f\u6279\u51c6\u6307\u5b9a\u4ea7\u54c1\uff0c\u5219\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u82e5\u622a\u81f3\u5b63\u5ea6\u7ed3\u675f\u4ecd\u672a\u83b7\u6279\uff0c\u5219\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u4ee5\u5b98\u65b9\u516c\u544a\u4e3a\u51c6\u3002"
    ]
  },
  {
    id: "fed-cut",
    category: "macro",
    categoryLabel: "\u5b8f\u89c2",
    title: "6 \u6708\u8bae\u606f\u4f1a\u8bae\u524d\uff0c\u7f8e\u8054\u50a8\u4f1a\u91ca\u653e\u660e\u786e\u964d\u606f\u4fe1\u53f7\u5417\uff1f",
    description: "\u5c31\u4e1a\u3001\u901a\u80c0\u548c\u8054\u50a8\u5b98\u5458\u8868\u6001\u4f1a\u6301\u7eed\u6539\u53d8\u5e02\u573a\u5b9a\u4ef7\uff0c\u9002\u5408\u505a\u4e8b\u4ef6\u9a71\u52a8\u578b\u4ea4\u6613\u3002",
    yesPrice: 44,
    noPrice: 56,
    probability: 44,
    change: "-2.6%",
    volume: "\u00a5 760\u4e07",
    traders: "3,162",
    deadline: "06-12 03:00",
    hot: true,
    rules: [
      "\u82e5\u4f1a\u8bae\u58f0\u660e\u6216\u4e3b\u5e2d\u53d1\u5e03\u4f1a\u4e2d\u51fa\u73b0\u5e02\u573a\u516c\u8ba4\u7684\u660e\u786e\u964d\u606f\u524d\u77bb\u8868\u8ff0\uff0c\u5219\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u82e5\u672a\u51fa\u73b0\uff0c\u5219\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u5224\u5b9a\u53e3\u5f84\u4e3a\u6f14\u793a\u7528\u9014\u3002"
    ]
  },
  {
    id: "gold-600",
    category: "macro",
    categoryLabel: "\u5b8f\u89c2",
    title: "\u672c\u6708\u56fd\u9645\u91d1\u4ef7\u4f1a\u7a81\u7834\u6bcf\u514b 600 \u5143\u5417\uff1f",
    description: "\u907f\u9669\u60c5\u7eea\u3001\u7f8e\u5143\u8d70\u52bf\u4e0e\u5730\u7f18\u4e8b\u4ef6\u90fd\u4f1a\u8ba9\u8fd9\u4e2a\u5e02\u573a\u51fa\u73b0\u5feb\u901f\u62c9\u5347\u3002",
    yesPrice: 39,
    noPrice: 61,
    probability: 39,
    change: "+5.7%",
    volume: "\u00a5 530\u4e07",
    traders: "1,286",
    deadline: "04-30 23:59",
    hot: false,
    rules: [
      "\u82e5\u6307\u5b9a\u89c2\u5bdf\u4ef7\u683c\u5728\u672c\u6708\u4efb\u4e00\u65f6\u70b9\u9ad8\u4e8e 600 \u5143\uff0c\u5219\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u82e5\u6708\u5185\u672a\u7a81\u7834\uff0c\u5219\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u4ef7\u683c\u6e90\u4e3a\u6a21\u62df\u3002"
    ]
  },
  {
    id: "cba-finals",
    category: "sports",
    categoryLabel: "\u4f53\u80b2",
    title: "\u603b\u51b3\u8d5b\u7cfb\u5217\u8d5b\u4f1a\u5728 6 \u573a\u5185\u7ed3\u675f\u5417\uff1f",
    description: "\u53d7\u4f24\u75c5\u3001\u4e3b\u573a\u4f18\u52bf\u548c\u76d8\u53e3\u9884\u671f\u5f71\u54cd\u6781\u5927\uff0c\u6bd4\u8d5b\u65e5\u4e34\u8fd1\u65f6\u6ce2\u52a8\u5c24\u5176\u660e\u663e\u3002",
    yesPrice: 66,
    noPrice: 34,
    probability: 66,
    change: "+1.8%",
    volume: "\u00a5 820\u4e07",
    traders: "2,948",
    deadline: "05-20 22:00",
    hot: true,
    rules: [
      "\u82e5\u603b\u51b3\u8d5b\u5728\u7b2c\u516d\u573a\u6216\u66f4\u65e9\u7ed3\u675f\uff0c\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u82e5\u9700\u8981\u7b2c\u4e03\u573a\uff0c\u5219\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u4ee5\u5b98\u65b9\u8d5b\u7a0b\u7ed3\u679c\u4e3a\u51c6\u3002"
    ]
  },
  {
    id: "champions",
    category: "sports",
    categoryLabel: "\u4f53\u80b2",
    title: "\u672c\u8d5b\u5b63\u6b27\u51a0\u51a0\u519b\u4f1a\u6765\u81ea\u82f1\u8d85\u7403\u961f\u5417\uff1f",
    description: "\u6dd8\u6c70\u8d5b\u671f\u95f4\uff0c\u5e02\u573a\u4f1a\u968f\u7740\u6bcf\u8f6e\u5bf9\u9635\u548c\u4f24\u75c5\u52a8\u6001\u53d1\u751f\u5927\u5e45\u91cd\u5b9a\u4ef7\u3002",
    yesPrice: 48,
    noPrice: 52,
    probability: 48,
    change: "-1.2%",
    volume: "\u00a5 690\u4e07",
    traders: "1,774",
    deadline: "05-31 23:30",
    hot: false,
    rules: [
      "\u82e5\u6700\u7ec8\u51a0\u519b\u6240\u5c5e\u8054\u8d5b\u4e3a\u82f1\u8d85\uff0c\u5219\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u5426\u5219\u6309\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u4ee5\u8d5b\u4e8b\u5b98\u65b9\u7ed3\u679c\u4e3a\u51c6\u3002"
    ]
  },
  {
    id: "box-office",
    category: "culture",
    categoryLabel: "\u5a31\u4e50",
    title: "\u8fd9\u90e8\u6625\u8282\u6863\u5f71\u7247\u7684\u9996\u5468\u7968\u623f\u4f1a\u7834 20 \u4ebf\u5417\uff1f",
    description: "\u53e3\u7891\u3001\u6392\u7247\u548c\u793e\u4ea4\u70ed\u5ea6\u90fd\u4f1a\u8ba9\u8be5\u5408\u7ea6\u5728\u4e0a\u6620\u524d\u4e09\u5929\u6ce2\u52a8\u5267\u70c8\u3002",
    yesPrice: 53,
    noPrice: 47,
    probability: 53,
    change: "+6.9%",
    volume: "\u00a5 460\u4e07",
    traders: "1,501",
    deadline: "02-20 23:59",
    hot: true,
    rules: [
      "\u82e5\u9996\u5468\u5b98\u65b9\u7d2f\u8ba1\u7968\u623f\u9ad8\u4e8e 20 \u4ebf\uff0c\u5219\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u5426\u5219\u6309\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u4ee5\u6307\u5b9a\u7968\u623f\u5e73\u53f0\u6f14\u793a\u6570\u636e\u4e3a\u51c6\u3002"
    ]
  },
  {
    id: "idol-show",
    category: "culture",
    categoryLabel: "\u5a31\u4e50",
    title: "\u672c\u5b63\u7efc\u827a\u4f1a\u8bde\u751f\u73b0\u8c61\u7ea7\u51fa\u5708\u9009\u624b\u5417\uff1f",
    description: "\u70ed\u641c\u3001\u5207\u7247\u64ad\u653e\u91cf\u548c\u54c1\u724c\u5408\u4f5c\u589e\u901f\u4f1a\u5f71\u54cd\u5e02\u573a\u5224\u65ad\uff0c\u662f\u5178\u578b\u60c5\u7eea\u4ea4\u6613\u54c1\u79cd\u3002",
    yesPrice: 35,
    noPrice: 65,
    probability: 35,
    change: "+0.9%",
    volume: "\u00a5 210\u4e07",
    traders: "889",
    deadline: "07-10 22:00",
    hot: false,
    rules: [
      "\u82e5\u8282\u76ee\u64ad\u51fa\u671f\u95f4\u4ea7\u751f\u7ea6\u5b9a\u9608\u503c\u4ee5\u4e0a\u7684\u4f20\u64ad\u6570\u636e\uff0c\u5219\u201c\u662f\u201d\u7ed3\u7b97\u3002",
      "\u672a\u8fbe\u5230\u9608\u503c\u5219\u6309\u201c\u5426\u201d\u7ed3\u7b97\u3002",
      "\u7edf\u8ba1\u65b9\u5f0f\u4e3a\u6f14\u793a\u5b9a\u4e49\u3002"
    ]
  }
];

const watchlistData = [
  { name: "\u6bd4\u7279\u5e01 75 \u4e07", note: "\u8d44\u91d1\u6301\u7eed\u6d41\u5165", price: "62\u00a2", change: "+8.4%" },
  { name: "6 \u6708\u964d\u606f\u4fe1\u53f7", note: "\u8bae\u606f\u524d\u591c\u6700\u6d3b\u8dc3", price: "44\u00a2", change: "-2.6%" },
  { name: "\u603b\u51b3\u8d5b 6 \u573a\u5185\u7ed3\u675f", note: "\u6bd4\u8d5b\u65e5\u6ce2\u52a8\u653e\u5927", price: "66\u00a2", change: "+1.8%" }
];

const positionsData = [
  { title: "\u4e70\u5165 \u662f | \u6bd4\u7279\u5e01 75 \u4e07", shares: "820 \u4efd", avg: "\u5747\u4ef7 54\u00a2", pnl: "+\u00a5 5,840" },
  { title: "\u4e70\u5165 \u5426 | 6 \u6708\u964d\u606f\u4fe1\u53f7", shares: "410 \u4efd", avg: "\u5747\u4ef7 60\u00a2", pnl: "+\u00a5 1,280" },
  { title: "\u4e70\u5165 \u662f | \u6625\u8282\u6863\u7968\u623f 20 \u4ebf", shares: "300 \u4efd", avg: "\u5747\u4ef7 47\u00a2", pnl: "-\u00a5 300" }
];

const leaderboardData = [
  { rank: "01", name: "Alpha \u7814\u7a76\u6240", profit: "+\u00a5 128,400", winRate: "\u80dc\u7387 71%" },
  { rank: "02", name: "\u6df1\u6d77\u5957\u5229", profit: "+\u00a5 96,220", winRate: "\u80dc\u7387 66%" },
  { rank: "03", name: "\u6ce2\u52a8\u730e\u624b", profit: "+\u00a5 81,950", winRate: "\u80dc\u7387 64%" },
  { rank: "04", name: "\u5317\u6781\u661f\u5b8f\u89c2", profit: "+\u00a5 73,600", winRate: "\u80dc\u7387 62%" }
];

const tickerItems = [
  "\u6bd4\u7279\u5e01 75 \u4e07\u6982\u7387\u5347\u81f3 62%",
  "6 \u6708\u964d\u606f\u4fe1\u53f7\u56de\u843d\u81f3 44%",
  "\u603b\u51b3\u8d5b 6 \u573a\u5185\u7ed3\u675f\u5347\u81f3 66%",
  "\u6625\u8282\u6863\u5f71\u7247\u7834 20 \u4ebf\u62a5 53%",
  "\u65b0\u52a0\u5bc6 ETF \u83b7\u6279\u62a5 57%",
  "\u91d1\u4ef7\u7834 600 \u5143\u62a5 39%"
];

const marketGrid = document.querySelector("#marketGrid");
const watchlistList = document.querySelector("#watchlistList");
const positionsList = document.querySelector("#positionsList");
const leaderboard = document.querySelector("#leaderboard");
const tickerTrack = document.querySelector("#tickerTrack");
const searchInput = document.querySelector("#searchInput");
const pills = document.querySelectorAll(".pill");
const emptyState = document.querySelector("#emptyState");
const jumpButtons = document.querySelectorAll("[data-jump]");

const tradeDrawer = document.querySelector("#tradeDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const drawerClose = document.querySelector("#drawerClose");
const drawerTitle = document.querySelector("#drawerTitle");
const drawerCategory = document.querySelector("#drawerCategory");
const drawerVolume = document.querySelector("#drawerVolume");
const drawerDescription = document.querySelector("#drawerDescription");
const drawerProb = document.querySelector("#drawerProb");
const drawerChangeMetric = document.querySelector("#drawerChangeMetric");
const drawerDeadline = document.querySelector("#drawerDeadline");
const drawerPrice = document.querySelector("#drawerPrice");
const drawerShares = document.querySelector("#drawerShares");
const drawerRules = document.querySelector("#drawerRules");
const orderTabs = document.querySelectorAll(".order-tab");
const orderAmount = document.querySelector("#orderAmount");
const amountValue = document.querySelector("#amountValue");
const amountHint = document.querySelector("#amountHint");
const submitOrder = document.querySelector("#submitOrder");

const heroTitle = document.querySelector("#heroTitle");
const heroYesPrice = document.querySelector("#heroYesPrice");
const heroNoPrice = document.querySelector("#heroNoPrice");
const heroChange = document.querySelector("#heroChange");
const heroVolume = document.querySelector("#heroVolume");
const heroTraders = document.querySelector("#heroTraders");

let activeFilter = "all";
let activeMarket = marketData[0];
let activeSide = "yes";

function renderTicker() {
  tickerTrack.innerHTML = [...tickerItems, ...tickerItems].map((item) => `<span>${item}</span>`).join("");
}

function renderWatchlist() {
  watchlistList.innerHTML = watchlistData.map((item) => `
    <article class="watch-item">
      <div class="watch-item-head">
        <div>
          <div class="watch-item-title">${item.name}</div>
          <div class="watch-item-sub">${item.note}</div>
        </div>
        <strong class="watch-item-price">${item.price}</strong>
      </div>
      <div class="watch-item-sub">24h ${item.change}</div>
    </article>
  `).join("");
}

function renderPositions() {
  positionsList.innerHTML = positionsData.map((item) => `
    <article class="position-item">
      <div class="position-head">
        <div class="position-title">${item.title}</div>
        <strong class="position-pnl ${item.pnl.startsWith("+") ? "positive" : ""}">${item.pnl}</strong>
      </div>
      <div class="position-meta">${item.shares} · ${item.avg}</div>
    </article>
  `).join("");
}

function renderLeaderboard() {
  leaderboard.innerHTML = leaderboardData.map((item) => `
    <div class="leader-row">
      <span>${item.rank}</span>
      <strong>${item.name}</strong>
      <span>${item.winRate}</span>
      <span class="positive">${item.profit}</span>
    </div>
  `).join("");
}

function createMarketCard(market) {
  return `
    <article class="market-card" data-id="${market.id}" data-category="${market.category}">
      <div class="market-card-top">
        <span class="category-tag">${market.categoryLabel}</span>
        <span class="volume-tag">${market.volume} \u6210\u4ea4\u989d</span>
      </div>
      <h3>${market.title}</h3>
      <p>${market.description}</p>
      <div class="market-meta">
        <span>\u6982\u7387 ${market.probability}%</span>
        <span>24h ${market.change}</span>
        <span>\u5230\u671f ${market.deadline}</span>
      </div>
      <div class="card-footer">
        <div class="card-prices">
          <button class="yes-button" type="button"><span>\u662f</span><strong>${market.yesPrice}\u00a2</strong></button>
          <button class="no-button" type="button"><span>\u5426</span><strong>${market.noPrice}\u00a2</strong></button>
        </div>
        <button class="ghost-button view-button" data-open="${market.id}" type="button">\u67e5\u770b\u8be6\u60c5</button>
      </div>
    </article>
  `;
}

function renderMarkets() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = marketData.filter((market) => {
    const categoryMatch = activeFilter === "all" || market.category === activeFilter;
    const text = `${market.title} ${market.description} ${market.categoryLabel}`.toLowerCase();
    const keywordMatch = keyword === "" || text.includes(keyword);
    return categoryMatch && keywordMatch;
  });

  marketGrid.innerHTML = filtered.map(createMarketCard).join("");
  emptyState.classList.toggle("is-hidden", filtered.length > 0);

  marketGrid.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openDrawer(button.dataset.open));
  });
}

function renderHero() {
  const heroMarket = marketData.find((item) => item.hot) || marketData[0];
  heroTitle.textContent = heroMarket.title;
  heroYesPrice.textContent = `${heroMarket.yesPrice}\u00a2`;
  heroNoPrice.textContent = `${heroMarket.noPrice}\u00a2`;
  heroChange.textContent = heroMarket.change;
  heroVolume.textContent = heroMarket.volume;
  heroTraders.textContent = heroMarket.traders;
}

function updateAmount() {
  const amount = Number(orderAmount.value);
  const price = activeSide === "yes" ? activeMarket.yesPrice : activeMarket.noPrice;
  const shares = Math.floor((amount / price) * 100);
  amountValue.textContent = `\u00a5${amount}`;
  amountHint.textContent = `\u9884\u8ba1\u53ef\u4e70\u5165 ${shares} \u4efd`;
}

function updateDrawer() {
  drawerTitle.textContent = activeMarket.title;
  drawerCategory.textContent = activeMarket.categoryLabel;
  drawerVolume.textContent = `${activeMarket.volume} \u6210\u4ea4\u989d`;
  drawerDescription.textContent = activeMarket.description;
  drawerProb.textContent = `${activeMarket.probability}%`;
  drawerChangeMetric.textContent = activeMarket.change;
  drawerDeadline.textContent = activeMarket.deadline;
  drawerPrice.textContent = `${activeSide === "yes" ? activeMarket.yesPrice : activeMarket.noPrice}\u00a2`;
  drawerShares.textContent = `${280 + activeMarket.probability} \u4efd`;
  drawerRules.innerHTML = activeMarket.rules.map((rule) => `<li>${rule}</li>`).join("");
  orderTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.side === activeSide);
  });
  updateAmount();
}

function openDrawer(id) {
  const selected = marketData.find((item) => item.id === id);
  if (!selected) return;
  activeMarket = selected;
  activeSide = "yes";
  updateDrawer();
  tradeDrawer.classList.add("is-open");
  tradeDrawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  tradeDrawer.classList.remove("is-open");
  tradeDrawer.setAttribute("aria-hidden", "true");
}

function bindFilters() {
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      activeFilter = pill.dataset.filter;
      pills.forEach((item) => item.classList.toggle("active", item === pill));
      renderMarkets();
    });
  });
  searchInput.addEventListener("input", renderMarkets);
}

function bindDrawerEvents() {
  drawerBackdrop.addEventListener("click", closeDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  orderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeSide = tab.dataset.side;
      updateDrawer();
    });
  });
  orderAmount.addEventListener("input", updateAmount);
  submitOrder.addEventListener("click", () => {
    const sideLabel = activeSide === "yes" ? "\u662f" : "\u5426";
    submitOrder.textContent = `\u5df2\u6a21\u62df\u4e70\u5165 ${sideLabel}`;
    window.setTimeout(() => {
      submitOrder.textContent = "\u6a21\u62df\u4e0b\u5355";
    }, 1400);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });
}

function bindJumpButtons() {
  jumpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.jump);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

renderTicker();
renderWatchlist();
renderPositions();
renderLeaderboard();
renderHero();
renderMarkets();
bindFilters();
bindDrawerEvents();
bindJumpButtons();
