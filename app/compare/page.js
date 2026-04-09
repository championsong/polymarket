"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MarketShell } from "../../components/ClientShell";
import { ProbabilityLineChart } from "../../components/MarketChart";
import { useDemoAppState } from "../../components/DemoAppState";
import { localizeMarket } from "../../components/i18n";
import { markets } from "../../data/markets";
import { traderPositionsBySlug, traderProfiles, traderRecentFillsBySlug } from "../../data/traders";

function parseMoney(value) {
  return Number.parseInt(String(value).replace(/[^\d-]/g, ""), 10) || 0;
}

function parsePercent(value) {
  return Number.parseInt(String(value).replace(/[^\d-]/g, ""), 10) || 0;
}

function parseCount(value) {
  const source = String(value).toLowerCase().replace(/,/g, "");
  if (source.includes("k")) return Math.round(Number.parseFloat(source) * 1000);
  if (source.includes("m")) return Math.round(Number.parseFloat(source) * 1000000);
  return Number.parseInt(source.replace(/[^\d-]/g, ""), 10) || 0;
}

function formatDiff(value, suffix = "") {
  if (value === 0) return `0${suffix}`;
  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function computeSimilarity(leftTrader, rightTrader) {
  const leftTags = new Set(leftTrader.strategyTags?.en ?? []);
  const rightTags = new Set(rightTrader.strategyTags?.en ?? []);
  const sharedTags = [...leftTags].filter((item) => rightTags.has(item)).length;
  const leftMarkets = new Set(leftTrader.favoriteMarkets ?? []);
  const rightMarkets = new Set(rightTrader.favoriteMarkets ?? []);
  const sharedMarkets = [...leftMarkets].filter((item) => rightMarkets.has(item)).length;
  const winRateGap = Math.abs(parsePercent(leftTrader.winRate) - parsePercent(rightTrader.winRate));
  return Math.max(8, Math.min(97, sharedTags * 24 + sharedMarkets * 18 + (30 - Math.min(30, winRateGap))));
}

function computeOverlapScore(leftTrader, rightTrader) {
  const left = new Set(leftTrader.favoriteMarkets ?? []);
  const right = new Set(rightTrader.favoriteMarkets ?? []);
  const intersection = [...left].filter((item) => right.has(item)).length;
  const union = new Set([...left, ...right]).size || 1;
  return Math.round((intersection / union) * 100);
}

function computeCorrelation(leftSeries = [], rightSeries = []) {
  const size = Math.min(leftSeries.length, rightSeries.length);
  if (size < 2) return 0;
  const left = leftSeries.slice(0, size);
  const right = rightSeries.slice(0, size);
  const leftMean = left.reduce((sum, value) => sum + value, 0) / size;
  const rightMean = right.reduce((sum, value) => sum + value, 0) / size;
  let numerator = 0;
  let leftVariance = 0;
  let rightVariance = 0;
  for (let index = 0; index < size; index += 1) {
    const leftDiff = left[index] - leftMean;
    const rightDiff = right[index] - rightMean;
    numerator += leftDiff * rightDiff;
    leftVariance += leftDiff * leftDiff;
    rightVariance += rightDiff * rightDiff;
  }
  const denominator = Math.sqrt(leftVariance * rightVariance) || 1;
  return Math.round((numerator / denominator) * 100);
}

function applyScenario(points = [], scenario) {
  if (scenario === "bull") return points.map((point, index) => Math.min(99, point + 4 + (index % 3)));
  if (scenario === "bear") return points.map((point, index) => Math.max(5, point - 5 - (index % 2)));
  if (scenario === "volatile") return points.map((point, index) => Math.max(5, Math.min(99, point + (index % 2 === 0 ? 6 : -4))));
  return points;
}

function CompareMetric({ locale, labelZh, labelEn, leftValue, rightValue, diffValue, diffLabel, positiveIsGood = true }) {
  const tone = diffValue === 0 ? "neutral" : (diffValue > 0) === positiveIsGood ? "positive" : "negative";
  return (
    <div className="stack-item">
      <div className="panel-header">
        <strong>{locale === "zh" ? labelZh : labelEn}</strong>
        <span className={tone}>{diffValue === 0 ? (locale === "zh" ? "持平" : "Even") : `${locale === "zh" ? "差值" : "Delta"} ${diffLabel}`}</span>
      </div>
      <div className="compare-metric-row">
        <span>{leftValue}</span>
        <span className="muted-text">vs</span>
        <span>{rightValue}</span>
      </div>
    </div>
  );
}

function TraderCompareCard({ locale, trader }) {
  const favoriteMarkets = useMemo(
    () =>
      (trader.favoriteMarkets ?? [])
        .map((slug) => markets.find((item) => item.slug === slug))
        .filter(Boolean)
        .map((market) => localizeMarket(market, locale)),
    [locale, trader.favoriteMarkets]
  );
  const positions = traderPositionsBySlug[trader.slug] ?? [];
  const strategyTags = trader.strategyTags?.[locale] ?? trader.strategyTags?.en ?? [];

  return (
    <section className="panel">
      <div className="panel-header">
        <div className="profile-inline">
          <span className="avatar-badge">{trader.avatar}</span>
          <div>
            <strong>{trader.name}</strong>
            <div className="muted-text">{trader.handle}</div>
          </div>
        </div>
        <Link className="ghost-button small-button" href={`/traders/${trader.slug}`}>
          {locale === "zh" ? "查看主页" : "View profile"}
        </Link>
      </div>

      <p className="muted-text compare-bio">{locale === "zh" ? trader.bioZh : trader.bioEn}</p>

      <div className="stats-grid portfolio-stats">
        <div>
          <span>{locale === "zh" ? "总 PnL" : "Total PnL"}</span>
          <strong className="positive">{trader.pnl}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "胜率" : "Win rate"}</span>
          <strong>{trader.winRate}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "关注者" : "Followers"}</span>
          <strong>{trader.followers}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "成交量" : "Volume"}</span>
          <strong>{trader.volume}</strong>
        </div>
      </div>

      <div className="stack-list">
        <div className="stack-item">
          <div className="panel-header">
            <strong>{locale === "zh" ? "策略标签" : "Strategy tags"}</strong>
          </div>
          <div className="tag-list">
            {strategyTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="stack-item">
          <div className="panel-header">
            <strong>{locale === "zh" ? "关注市场" : "Favorite markets"}</strong>
          </div>
          <div className="tag-list">
            {favoriteMarkets.map((market) => (
              <Link key={market.slug} href={`/markets/${market.slug}`}>
                {market.shortName}
              </Link>
            ))}
          </div>
        </div>

        <div className="stack-item">
          <div className="panel-header">
            <strong>{locale === "zh" ? "当前持仓" : "Open positions"}</strong>
          </div>
          <div className="stack-list compare-positions">
            {positions.map((position) => {
              const market = markets.find((item) => item.slug === position.marketSlug);
              const localized = market ? localizeMarket(market, locale) : null;
              return (
                <div className="stack-item" key={`${trader.slug}-${position.marketSlug}`}>
                  <div className="panel-header">
                    <strong>{localized?.shortName ?? position.marketSlug}</strong>
                    <span className={String(position.pnl).startsWith("+") ? "positive" : "negative"}>{position.pnl}</span>
                  </div>
                  <span className="muted-text">
                    {position.side} · Avg {position.avg} · Mark {position.mark} · {position.shares} shares
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PerformanceTimelinePanel({ locale, leftTrader, rightTrader, scenario }) {
  const leftPoints = applyScenario(leftTrader.performanceTimeline ?? [], scenario);
  const rightPoints = applyScenario(rightTrader.performanceTimeline ?? [], scenario);
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "表现时间线" : "Performance timeline"}</p>
          <h2>{locale === "zh" ? "两位交易员的累计曲线" : "Cumulative performance curves"}</h2>
        </div>
      </div>
      <div className="stack-list">
        <div className="stack-item">
          <div className="panel-header">
            <strong>{leftTrader.name}</strong>
            <span className="positive">{leftTrader.pnl}</span>
          </div>
          <ProbabilityLineChart points={leftPoints} />
        </div>
        <div className="stack-item">
          <div className="panel-header">
            <strong>{rightTrader.name}</strong>
            <span className="positive">{rightTrader.pnl}</span>
          </div>
          <ProbabilityLineChart points={rightPoints} />
        </div>
      </div>
    </section>
  );
}

function HeatmapPanel({ locale, leftTrader, rightTrader }) {
  const heatmap = markets.slice(0, 6).map((market) => {
    const leftHas = (leftTrader.favoriteMarkets ?? []).includes(market.slug);
    const rightHas = (rightTrader.favoriteMarkets ?? []).includes(market.slug);
    const localized = localizeMarket(market, locale);
    let tone = "slate";
    if (leftHas && rightHas) tone = "emerald";
    else if (leftHas) tone = "cyan";
    else if (rightHas) tone = "amber";
    return { slug: market.slug, label: localized.shortName, tone, leftHas, rightHas };
  });

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "热力图" : "Heatmap"}</p>
          <h2>{locale === "zh" ? "市场覆盖分布" : "Market coverage map"}</h2>
        </div>
      </div>
      <div className="compare-heatmap-grid">
        {heatmap.map((item) => (
          <div className={`compare-heatmap-cell compare-heatmap-${item.tone}`} key={item.slug}>
            <strong>{item.label}</strong>
            <span className="muted-text">
              {item.leftHas && item.rightHas
                ? locale === "zh"
                  ? "双方覆盖"
                  : "Both"
                : item.leftHas
                  ? leftTrader.name
                  : item.rightHas
                    ? rightTrader.name
                    : locale === "zh"
                      ? "未覆盖"
                      : "None"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SharedMarketsPanel({ locale, leftTrader, rightTrader }) {
  const overlap = (leftTrader.favoriteMarkets ?? []).filter((slug) => (rightTrader.favoriteMarkets ?? []).includes(slug));
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "重叠观察" : "Overlap"}</p>
          <h2>{locale === "zh" ? "共同关注市场" : "Shared watchlist themes"}</h2>
        </div>
      </div>
      <div className="tag-list">
        {overlap.length ? (
          overlap.map((slug) => {
            const market = markets.find((item) => item.slug === slug);
            if (!market) return null;
            const localized = localizeMarket(market, locale);
            return (
              <Link key={slug} href={`/markets/${slug}`}>
                {localized.shortName}
              </Link>
            );
          })
        ) : (
          <span>{locale === "zh" ? "当前没有共同关注的市场。" : "No overlapping favorite markets right now."}</span>
        )}
      </div>
    </section>
  );
}

function SharedPositionsPanel({ locale, leftTrader, rightTrader }) {
  const leftPositions = traderPositionsBySlug[leftTrader.slug] ?? [];
  const rightPositions = traderPositionsBySlug[rightTrader.slug] ?? [];
  const shared = leftPositions.map((position) => ({ left: position, right: rightPositions.find((item) => item.marketSlug === position.marketSlug) })).filter((item) => item.right);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "仓位交集" : "Shared positions"}</p>
          <h2>{locale === "zh" ? "同时持有的市场" : "Markets both traders hold"}</h2>
        </div>
      </div>
      <div className="stack-list">
        {shared.length ? (
          shared.map(({ left, right }) => {
            const market = markets.find((item) => item.slug === left.marketSlug);
            const localized = market ? localizeMarket(market, locale) : null;
            return (
              <div className="stack-item" key={left.marketSlug}>
                <div className="panel-header">
                  <strong>{localized?.shortName ?? left.marketSlug}</strong>
                  <span className="mini-badge neutral-badge">Shared</span>
                </div>
                <div className="compare-metric-row">
                  <span>{leftTrader.name}: {left.side} @ {left.avg}</span>
                  <span>{rightTrader.name}: {right.side} @ {right.avg}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="stack-item">
            <span>{locale === "zh" ? "这两位交易员目前没有共同持仓。" : "These traders do not currently share any positions."}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function SimilarityPanel({ locale, leftTrader, rightTrader }) {
  const similarity = computeSimilarity(leftTrader, rightTrader);
  const overlapScore = computeOverlapScore(leftTrader, rightTrader);
  const correlation = computeCorrelation(leftTrader.performanceTimeline, rightTrader.performanceTimeline);
  const tone = similarity >= 70 ? "positive" : similarity >= 45 ? "neutral" : "negative";
  const sharedTags = (leftTrader.strategyTags?.[locale] ?? leftTrader.strategyTags?.en ?? []).filter((tag) =>
    (rightTrader.strategyTags?.[locale] ?? rightTrader.strategyTags?.en ?? []).includes(tag)
  );

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "相似度" : "Similarity"}</p>
          <h2>{locale === "zh" ? "交易风格接近程度" : "How similar they trade"}</h2>
        </div>
        <span className={`mini-badge ${tone}`}>{similarity}%</span>
      </div>
      <div className="stats-grid portfolio-stats">
        <div>
          <span>{locale === "zh" ? "相似度评分" : "Similarity score"}</span>
          <strong>{similarity}%</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "市场重叠度" : "Overlap score"}</span>
          <strong>{overlapScore}%</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "曲线相关性" : "Curve correlation"}</span>
          <strong>{correlation}%</strong>
        </div>
      </div>
      <div className="tag-list">
        {sharedTags.length ? sharedTags.map((tag) => <span key={tag}>{tag}</span>) : <span>{locale === "zh" ? "暂无重叠策略标签" : "No shared strategy tags"}</span>}
      </div>
    </section>
  );
}

function ExecutionStyleSummaryPanel({ locale, leftTrader, rightTrader }) {
  const leftFills = traderRecentFillsBySlug[leftTrader.slug] ?? [];
  const rightFills = traderRecentFillsBySlug[rightTrader.slug] ?? [];

  function summarize(fills) {
    const sizeTotal = fills.reduce((sum, item) => sum + parseCount(item.size), 0);
    const avgSize = fills.length ? Math.round(sizeTotal / fills.length) : 0;
    const yesCount = fills.filter((item) => item.side === "Yes").length;
    return {
      avgSize,
      aggression: avgSize >= 300 ? "Aggressive" : avgSize >= 150 ? "Balanced" : "Selective",
      bias: yesCount >= Math.ceil(fills.length / 2) ? "Yes bias" : "No bias",
    };
  }

  const leftSummary = summarize(leftFills);
  const rightSummary = summarize(rightFills);

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "执行风格" : "Execution style"}</p>
          <h2>{locale === "zh" ? "最近成交摘要" : "Recent execution summary"}</h2>
        </div>
      </div>
      <div className="compare-grid">
        <div className="stack-list">
          <div className="stack-item">
            <div className="panel-header">
              <strong>{leftTrader.name}</strong>
              <span>{leftSummary.avgSize}</span>
            </div>
            <span className="muted-text">
              {locale === "zh"
                ? `${leftSummary.aggression === "Aggressive" ? "更激进" : leftSummary.aggression === "Balanced" ? "更均衡" : "更挑选"} · ${leftSummary.bias === "Yes bias" ? "偏多" : "偏空"}`
                : `${leftSummary.aggression} · ${leftSummary.bias}`}
            </span>
          </div>
        </div>
        <div className="stack-list">
          <div className="stack-item">
            <div className="panel-header">
              <strong>{rightTrader.name}</strong>
              <span>{rightSummary.avgSize}</span>
            </div>
            <span className="muted-text">
              {locale === "zh"
                ? `${rightSummary.aggression === "Aggressive" ? "更激进" : rightSummary.aggression === "Balanced" ? "更均衡" : "更挑选"} · ${rightSummary.bias === "Yes bias" ? "偏多" : "偏空"}`
                : `${rightSummary.aggression} · ${rightSummary.bias}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SharedMarketDrilldownPanel({ locale, leftTrader, rightTrader }) {
  const shared = (leftTrader.favoriteMarkets ?? []).filter((slug) => (rightTrader.favoriteMarkets ?? []).includes(slug));

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "交集下钻" : "Shared drilldown"}</p>
          <h2>{locale === "zh" ? "共同市场明细" : "Shared market detail"}</h2>
        </div>
      </div>
      <div className="stack-list">
        {shared.length ? (
          shared.map((slug) => {
            const market = markets.find((item) => item.slug === slug);
            const localized = market ? localizeMarket(market, locale) : null;
            const leftPosition = (traderPositionsBySlug[leftTrader.slug] ?? []).find((item) => item.marketSlug === slug);
            const rightPosition = (traderPositionsBySlug[rightTrader.slug] ?? []).find((item) => item.marketSlug === slug);
            return (
              <div className="stack-item" key={slug}>
                <div className="panel-header">
                  <strong>{localized?.title ?? slug}</strong>
                  <Link className="ghost-button small-button" href={`/markets/${slug}`}>
                    {locale === "zh" ? "查看市场" : "Open market"}
                  </Link>
                </div>
                <div className="compare-drilldown-grid">
                  <div>
                    <strong>{leftTrader.name}</strong>
                    <div className="muted-text">{leftPosition ? `${leftPosition.side} · ${leftPosition.avg}` : locale === "zh" ? "仅关注未建仓" : "Watching only"}</div>
                  </div>
                  <div>
                    <strong>{rightTrader.name}</strong>
                    <div className="muted-text">{rightPosition ? `${rightPosition.side} · ${rightPosition.avg}` : locale === "zh" ? "仅关注未建仓" : "Watching only"}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="stack-item">
            <span>{locale === "zh" ? "两位交易员没有共同关注市场可下钻。" : "No shared markets available for drilldown."}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function MatchRecommendationPanel({ locale, leftTrader, rightTrader }) {
  const candidates = traderProfiles
    .filter((item) => item.slug !== leftTrader.slug && item.slug !== rightTrader.slug)
    .map((item) => ({ trader: item, score: computeSimilarity(leftTrader, item) }))
    .sort((a, b) => b.score - a.score);
  const top = candidates[0];

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "推荐匹配" : "Recommended match"}</p>
          <h2>{locale === "zh" ? "最值得继续比较的人" : "Next trader to compare"}</h2>
        </div>
      </div>
      {top ? (
        <div className="stack-item">
          <div className="panel-header">
            <strong>{top.trader.name}</strong>
            <span className="mini-badge">{top.score}%</span>
          </div>
          <span className="muted-text">{locale === "zh" ? top.trader.bioZh : top.trader.bioEn}</span>
          <Link className="ghost-button small-button" href={`/traders/${top.trader.slug}`}>
            {locale === "zh" ? "查看主页" : "View profile"}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

function ExportSummaryPanel({ locale, leftTrader, rightTrader, similarity, overlapScore, scenario }) {
  const [copied, setCopied] = useState(false);

  async function exportSummary() {
    const text = locale === "zh"
      ? `交易员对比\n左侧: ${leftTrader.name}\n右侧: ${rightTrader.name}\n相似度: ${similarity}%\n重叠度: ${overlapScore}%\n情景: ${scenario}`
      : `Trader Compare\nLeft: ${leftTrader.name}\nRight: ${rightTrader.name}\nSimilarity: ${similarity}%\nOverlap: ${overlapScore}%\nScenario: ${scenario}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "导出卡片" : "Export card"}</p>
          <h2>{locale === "zh" ? "复制比较摘要" : "Copy compare summary"}</h2>
        </div>
      </div>
      <div className="stack-item">
        <span className="muted-text">
          {locale === "zh" ? "把当前比较的关键摘要复制到剪贴板，方便发给别人或存进笔记。" : "Copy the current comparison summary to your clipboard."}
        </span>
        <button className="solid-button" onClick={exportSummary} type="button">
          {copied ? (locale === "zh" ? "已复制" : "Copied") : locale === "zh" ? "复制摘要" : "Copy summary"}
        </button>
      </div>
    </section>
  );
}

function SavedPresetsPanel({ locale, presets, onSave, onLoad, onDelete, presetName, setPresetName }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "预设" : "Presets"}</p>
          <h2>{locale === "zh" ? "保存当前比较" : "Save current compare"}</h2>
        </div>
      </div>
      <div className="comment-composer">
        <input className="search-input search-input-wide" placeholder={locale === "zh" ? "预设名称" : "Preset name"} value={presetName} onChange={(event) => setPresetName(event.target.value)} />
        <button className="solid-button" onClick={onSave} type="button">
          {locale === "zh" ? "保存预设" : "Save preset"}
        </button>
      </div>
      <div className="stack-list">
        {presets.length ? (
          presets.map((preset) => (
            <div className="stack-item" key={preset.id}>
              <div className="panel-header">
                <strong>{preset.name}</strong>
                <span className="muted-text">{preset.scenario}</span>
              </div>
              <span className="muted-text">{preset.leftName} vs {preset.rightName}</span>
              <div className="watchlist-folder-actions">
                <button className="ghost-button small-button" onClick={() => onLoad(preset)} type="button">
                  {locale === "zh" ? "加载" : "Load"}
                </button>
                <button className="ghost-button small-button" onClick={() => onDelete(preset.id)} type="button">
                  {locale === "zh" ? "删除" : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="stack-item">
            <span>{locale === "zh" ? "还没有保存的比较预设。" : "No saved compare presets yet."}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function SideBySideFillsPanel({ locale, leftTrader, rightTrader }) {
  const leftFills = traderRecentFillsBySlug[leftTrader.slug] ?? [];
  const rightFills = traderRecentFillsBySlug[rightTrader.slug] ?? [];

  function renderFill(fill, traderName, tone) {
    const market = markets.find((item) => item.slug === fill.marketSlug);
    const localized = market ? localizeMarket(market, locale) : null;
    return (
      <div className={`stack-item fill-compare-card fill-compare-${tone}`} key={`${traderName}-${fill.marketSlug}-${fill.time}-${fill.side}`}>
        <div className="panel-header">
          <strong>{traderName}</strong>
          <span className="muted-text">{fill.time}</span>
        </div>
        <span>{localized?.shortName ?? fill.marketSlug}</span>
        <span className="muted-text">
          {fill.side} · {fill.price} · {fill.size} shares
        </span>
      </div>
    );
  }

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "成交对照" : "Side-by-side fills"}</p>
          <h2>{locale === "zh" ? "最近成交流" : "Recent fills feed"}</h2>
        </div>
      </div>
      <div className="compare-grid">
        <div className="stack-list">
          {leftFills.map((fill) => renderFill(fill, leftTrader.name, "left"))}
        </div>
        <div className="stack-list">
          {rightFills.map((fill) => renderFill(fill, rightTrader.name, "right"))}
        </div>
      </div>
    </section>
  );
}

export default function ComparePage() {
  const { locale } = useDemoAppState();
  const [leftSlug, setLeftSlug] = useState(traderProfiles[0]?.slug ?? "macro_liu");
  const [rightSlug, setRightSlug] = useState(traderProfiles[1]?.slug ?? "delta_cat");
  const [scenario, setScenario] = useState("base");
  const [presetName, setPresetName] = useState("");
  const [savedPresets, setSavedPresets] = useState([]);
  const presetsKey = "pulse-market-compare-presets-v1";

  const leftTrader = traderProfiles.find((item) => item.slug === leftSlug) ?? traderProfiles[0];
  const rightTrader = traderProfiles.find((item) => item.slug === rightSlug) ?? traderProfiles[1] ?? traderProfiles[0];
  const similarity = computeSimilarity(leftTrader, rightTrader);
  const overlapScore = computeOverlapScore(leftTrader, rightTrader);

  const metricDiffs = useMemo(
    () => ({
      pnl: parseMoney(leftTrader.pnl) - parseMoney(rightTrader.pnl),
      winRate: parsePercent(leftTrader.winRate) - parsePercent(rightTrader.winRate),
      followers: parseCount(leftTrader.followers) - parseCount(rightTrader.followers),
      volume: parseCount(leftTrader.volume) - parseCount(rightTrader.volume),
    }),
    [leftTrader, rightTrader]
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(presetsKey);
      if (raw) setSavedPresets(JSON.parse(raw));
    } catch {}
  }, []);

  function persistPresets(next) {
    setSavedPresets(next);
    try {
      window.localStorage.setItem(presetsKey, JSON.stringify(next));
    } catch {}
  }

  function savePreset() {
    const name = presetName.trim() || `${leftTrader.name} vs ${rightTrader.name}`;
    const next = [
      {
        id: `preset-${Date.now()}`,
        name,
        leftSlug,
        rightSlug,
        leftName: leftTrader.name,
        rightName: rightTrader.name,
        scenario,
      },
      ...savedPresets,
    ].slice(0, 8);
    persistPresets(next);
    setPresetName("");
  }

  function loadPreset(preset) {
    setLeftSlug(preset.leftSlug);
    setRightSlug(preset.rightSlug);
    setScenario(preset.scenario ?? "base");
  }

  function deletePreset(id) {
    persistPresets(savedPresets.filter((item) => item.id !== id));
  }

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{locale === "zh" ? "交易员对比" : "Trader Compare"}</span>
            <Link className="ghost-button small-button" href="/leaderboard">
              {locale === "zh" ? "返回排行" : "Back to leaderboard"}
            </Link>
          </div>
          <h2>{locale === "zh" ? "并排比较交易员风格、持仓和表现" : "Compare trader styles, positions, and performance"}</h2>
          <p>
            {locale === "zh"
              ? "这版新增了市场热力图、重叠度评分和左右成交流，让 compare 页面更像交易研究台。"
              : "This version adds a market heatmap, overlap scoring, and side-by-side fills so compare feels closer to a trader research desk."}
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{locale === "zh" ? "选择交易员" : "Select traders"}</p>
            <h2>{locale === "zh" ? "谁和谁比" : "Who vs who"}</h2>
          </div>
        </div>
        <div className="compare-toolbar">
          <label className="compare-select">
            <span>{locale === "zh" ? "左侧" : "Left"}</span>
            <select value={leftSlug} onChange={(event) => setLeftSlug(event.target.value)}>
              {traderProfiles.map((trader) => (
                <option key={trader.slug} value={trader.slug}>
                  {trader.name}
                </option>
              ))}
            </select>
          </label>
          <label className="compare-select">
            <span>{locale === "zh" ? "右侧" : "Right"}</span>
            <select value={rightSlug} onChange={(event) => setRightSlug(event.target.value)}>
              {traderProfiles.map((trader) => (
                <option key={trader.slug} value={trader.slug}>
                  {trader.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="chart-toolbar compare-scenario-row">
          {[
            { id: "base", zh: "基准", en: "Base" },
            { id: "bull", zh: "乐观", en: "Bull" },
            { id: "bear", zh: "保守", en: "Bear" },
            { id: "volatile", zh: "波动", en: "Volatile" },
          ].map((item) => (
            <button className={`pill chart-pill ${scenario === item.id ? "active" : ""}`} key={item.id} onClick={() => setScenario(item.id)} type="button">
              {locale === "zh" ? item.zh : item.en}
            </button>
          ))}
        </div>
      </section>

      <section className="compare-grid">
        <TraderCompareCard locale={locale} trader={leftTrader} />
        <TraderCompareCard locale={locale} trader={rightTrader} />
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "指标差值" : "Metric diff"}</p>
                <h2>{locale === "zh" ? "关键表现对比" : "Key performance deltas"}</h2>
              </div>
            </div>
            <div className="stack-list">
              <CompareMetric locale={locale} labelZh="PnL" labelEn="PnL" leftValue={leftTrader.pnl} rightValue={rightTrader.pnl} diffValue={metricDiffs.pnl} diffLabel={formatDiff(metricDiffs.pnl)} />
              <CompareMetric locale={locale} labelZh="胜率" labelEn="Win rate" leftValue={leftTrader.winRate} rightValue={rightTrader.winRate} diffValue={metricDiffs.winRate} diffLabel={formatDiff(metricDiffs.winRate, "%")} />
              <CompareMetric locale={locale} labelZh="关注者" labelEn="Followers" leftValue={leftTrader.followers} rightValue={rightTrader.followers} diffValue={metricDiffs.followers} diffLabel={formatDiff(metricDiffs.followers)} />
              <CompareMetric locale={locale} labelZh="成交量" labelEn="Volume" leftValue={leftTrader.volume} rightValue={rightTrader.volume} diffValue={metricDiffs.volume} diffLabel={formatDiff(metricDiffs.volume)} />
            </div>
          </section>
          <PerformanceTimelinePanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} scenario={scenario} />
          <ExecutionStyleSummaryPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
          <HeatmapPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
          <SideBySideFillsPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
        </div>
        <div className="detail-side">
          <SimilarityPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
          <ExportSummaryPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} similarity={similarity} overlapScore={overlapScore} scenario={scenario} />
          <SavedPresetsPanel
            locale={locale}
            onDelete={deletePreset}
            onLoad={loadPreset}
            onSave={savePreset}
            presetName={presetName}
            presets={savedPresets}
            setPresetName={setPresetName}
          />
          <MatchRecommendationPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
          <SharedMarketsPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
          <SharedPositionsPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
          <SharedMarketDrilldownPanel locale={locale} leftTrader={leftTrader} rightTrader={rightTrader} />
        </div>
      </section>
    </MarketShell>
  );
}
