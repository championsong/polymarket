"use client";

import { useEffect, useMemo, useState } from "react";
import { useDemoAppState } from "./DemoAppState";
import { t } from "./i18n";

function parsePrice(price) {
  return Number.parseInt(String(price).replace(/[^\d]/g, ""), 10);
}

function parseShares(shares) {
  return Number.parseInt(String(shares).replace(/[^\d]/g, ""), 10);
}

function jitterDepth(rows, direction, zoom) {
  if (!rows.length) return { updated: rows, flashIndex: -1 };
  const index = Math.floor(Math.random() * rows.length);
  const updated = rows.map((row, rowIndex) => {
    let nextShares = parseShares(row.shares);
    if (zoom === 2 && rowIndex > 1) return row;
    if (zoom === 5 && rowIndex > 0) return row;
    if (rowIndex !== index) return row;

    const priceValue = parsePrice(row.price) + (direction === "up" ? 1 : -1);
    const clampedPrice = Math.max(1, Math.min(99, priceValue));
    nextShares = Math.max(800, nextShares + Math.floor(Math.random() * 240 - 120));
    const total = `¥${Math.round((clampedPrice * nextShares) / 100).toLocaleString("en-US")}`;

    return {
      price: `${clampedPrice}¢`,
      shares: nextShares.toLocaleString("en-US"),
      total,
    };
  });

  return { updated, flashIndex: index };
}

function createFill(side, depthRows) {
  const row = depthRows[Math.floor(Math.random() * depthRows.length)];
  const shares = 40 + Math.floor(Math.random() * 280);
  const now = new Date();

  return {
    time: now.toLocaleTimeString("en-GB", { hour12: false }),
    side,
    price: row.price,
    shares: `${shares}`,
  };
}

export function RealtimeOrderBook({ depth, trades }) {
  const { locale } = useDemoAppState();
  const [yesRows, setYesRows] = useState(depth?.yes ?? []);
  const [noRows, setNoRows] = useState(depth?.no ?? []);
  const [fills, setFills] = useState(trades ?? []);
  const [flash, setFlash] = useState({ yes: -1, no: -1 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setYesRows(depth?.yes ?? []);
    setNoRows(depth?.no ?? []);
    setFills(trades ?? []);
  }, [depth, trades]);

  useEffect(() => {
    const depthTimer = window.setInterval(() => {
      setYesRows((current) => {
        const next = jitterDepth(current, Math.random() > 0.45 ? "up" : "down", zoom);
        setFlash((prev) => ({ ...prev, yes: next.flashIndex }));
        return next.updated;
      });
      setNoRows((current) => {
        const next = jitterDepth(current, Math.random() > 0.45 ? "down" : "up", zoom);
        setFlash((prev) => ({ ...prev, no: next.flashIndex }));
        return next.updated;
      });
    }, 1800);

    const fillTimer = window.setInterval(() => {
      setFills((current) => {
        const side = Math.random() > 0.5 ? t(locale, "buyYesShort") : t(locale, "buyNoShort");
        const source = side === t(locale, "buyYesShort") ? yesRows : noRows;
        if (!source.length) return current;
        return [createFill(side, source), ...current].slice(0, 10);
      });
    }, 2400);

    return () => {
      window.clearInterval(depthTimer);
      window.clearInterval(fillTimer);
    };
  }, [locale, noRows, yesRows, zoom]);

  const display = useMemo(
    () => ({
      yesRows: zoom === 1 ? yesRows : yesRows.slice(0, zoom === 2 ? 2 : 1),
      noRows: zoom === 1 ? noRows : noRows.slice(0, zoom === 2 ? 2 : 1),
      fills,
    }),
    [fills, noRows, yesRows, zoom],
  );

  return (
    <div className="realtime-grid">
      <div className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "realtimeLadder")}</p>
            <h2>{t(locale, "orderBook")}</h2>
          </div>
          <div className="chart-toolbar">
            {[1, 2, 5].map((level) => (
              <button className={`pill chart-pill ${zoom === level ? "active" : ""}`} key={level} onClick={() => setZoom(level)} type="button">
                {level}x
              </button>
            ))}
          </div>
        </div>

        <div className="depth-columns">
          <div className="depth-column">
            <div className="depth-header">
              <span>{t(locale, "buyYes")}</span>
              <span>Price / Size</span>
            </div>
            {display.yesRows.map((row, index) => (
              <div className={`depth-row depth-row-yes ${flash.yes === index ? "flash-green" : ""}`} key={`yes-${index}-${row.price}`}>
                <strong>{row.price}</strong>
                <span>{row.shares}</span>
                <span>{row.total}</span>
              </div>
            ))}
          </div>

          <div className="depth-column">
            <div className="depth-header">
              <span>{t(locale, "buyNo")}</span>
              <span>Price / Size</span>
            </div>
            {display.noRows.map((row, index) => (
              <div className={`depth-row depth-row-no ${flash.no === index ? "flash-red" : ""}`} key={`no-${index}-${row.price}`}>
                <strong>{row.price}</strong>
                <span>{row.shares}</span>
                <span>{row.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "recentFills")}</p>
            <h2>{t(locale, "streamingPrints")}</h2>
          </div>
          <span className="mini-badge">{t(locale, "liveDemo")}</span>
        </div>

        <div className="stack-list">
          {display.fills.map((trade, index) => (
            <div className={`stack-item fill-item ${index === 0 ? "fill-hot" : ""}`} key={`${trade.time}-${trade.side}-${trade.price}-${index}`}>
              <div className="panel-header">
                <strong>{trade.side}</strong>
                <span>{trade.price}</span>
              </div>
              <span className="muted-text">
                {trade.time} · {trade.shares}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
