"use client";

import { useMemo, useState } from "react";
import { buildChartPath } from "./chart-utils";
import { t } from "./i18n";

function shapePoints(points, timeframe) {
  if (!points?.length) return [];
  if (timeframe === "1H") return points.slice(-4);
  if (timeframe === "1D") return points.slice(-6);
  if (timeframe === "1W") return points.slice(-8);
  return points;
}

function BaseChart({ points }) {
  const path = buildChartPath(points);
  const area = `${path} L 100,100 L 0,100 Z`;

  return (
    <div className="chart-shell">
      <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={area} className="chart-area" />
        <path d={path} className="chart-line" />
      </svg>
    </div>
  );
}

export function ProbabilityLineChart({ points }) {
  return <BaseChart points={points} />;
}

export function InteractivePriceChart({ points }) {
  const [timeframe, setTimeframe] = useState("1D");
  const visible = useMemo(() => shapePoints(points, timeframe), [points, timeframe]);

  return (
    <div className="interactive-chart">
      <div className="chart-toolbar">
        {["1H", "1D", "1W", "ALL"].map((item) => (
          <button className={`pill chart-pill ${item === timeframe ? "active" : ""}`} key={item} onClick={() => setTimeframe(item)} type="button">
            {item}
          </button>
        ))}
      </div>
      <BaseChart points={visible} />
    </div>
  );
}

export function MarketChartCard({ locale = "zh" }) {
  return (
    <div className="panel feature-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "productShell")}</p>
          <h2>{t(locale, "shellFeatureTitle")}</h2>
        </div>
      </div>
      <div className="feature-grid">
        <div className="stack-item">
          <strong>{t(locale, "topTicker")}</strong>
          <span className="muted-text">{t(locale, "topTickerBody")}</span>
        </div>
        <div className="stack-item">
          <strong>{t(locale, "sidebarWallet")}</strong>
          <span className="muted-text">{t(locale, "sidebarWalletBody")}</span>
        </div>
        <div className="stack-item">
          <strong>{t(locale, "playableState")}</strong>
          <span className="muted-text">{t(locale, "playableStateBody")}</span>
        </div>
      </div>
    </div>
  );
}
