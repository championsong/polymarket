"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MarketShell } from "../../components/ClientShell";
import { ProbabilityLineChart } from "../../components/MarketChart";
import { useDemoAppState } from "../../components/DemoAppState";
import { localizeMarket, t } from "../../components/i18n";
import { markets } from "../../data/markets";

const FOLDER_META_KEY = "pulse-market-folder-meta-v1";
const FOLDER_ALERTS_KEY = "pulse-market-folder-alerts-v1";
const FOLDER_NOTES_KEY = "pulse-market-folder-notes-v1";
const COLOR_OPTIONS = ["cyan", "amber", "rose", "emerald", "violet", "slate"];

function pickLocale(locale, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && (value.zh || value.en)) {
    return value[locale] ?? value.zh ?? value.en;
  }
  return value;
}

function resolvePositionTitle(item, locale) {
  return locale === "en" && item.titleEn ? item.titleEn : item.title;
}

function resolveAvg(item, locale) {
  return locale === "en" && item.avgEn ? item.avgEn : item.avg;
}

function getDefaultFolderMeta(folderId, index) {
  return {
    color: COLOR_OPTIONS[index % COLOR_OPTIONS.length],
    pinned: folderId === "core",
    collapsed: false,
  };
}

function SummaryPanel() {
  const { locale, portfolioSummary } = useDemoAppState();

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "portfolio")}</p>
          <h2>{t(locale, "accountOverview")}</h2>
        </div>
        <span className="mini-badge">{t(locale, "persisted")}</span>
      </div>
      <div className="stats-grid portfolio-stats">
        <div>
          <span>{t(locale, "totalValue")}</span>
          <strong>{portfolioSummary.totalValue}</strong>
        </div>
        <div>
          <span>{t(locale, "availableCash")}</span>
          <strong>{portfolioSummary.availableCash}</strong>
        </div>
        <div>
          <span>{t(locale, "todayPnl")}</span>
          <strong className="positive">{portfolioSummary.todayPnl}</strong>
        </div>
        <div>
          <span>{t(locale, "unrealized")}</span>
          <strong className="positive">{portfolioSummary.unrealizedPnl}</strong>
        </div>
        <div>
          <span>{t(locale, "winRate")}</span>
          <strong>{portfolioSummary.winRate}</strong>
        </div>
      </div>
    </section>
  );
}

function AnalyticsPanel() {
  const { locale, positions, activities } = useDemoAppState();
  const points = useMemo(() => [34, 37, 39, 44, 43, 47, 49, 52, 55], []);
  const positive = positions.filter((item) => String(item.pnl).startsWith("+")).length;

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "分析" : "Analytics"}</p>
          <h2>{locale === "zh" ? "PnL 曲线与统计" : "PnL curve and stats"}</h2>
        </div>
      </div>
      <ProbabilityLineChart points={points} />
      <div className="stats-grid portfolio-stats">
        <div>
          <span>{locale === "zh" ? "持仓数量" : "Open positions"}</span>
          <strong>{positions.length}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "盈利仓位" : "Winning lines"}</span>
          <strong>{positive}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "活动记录" : "Activity count"}</span>
          <strong>{activities.length}</strong>
        </div>
      </div>
    </section>
  );
}

function PositionsPanel() {
  const { locale, positions } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "positions")}</p>
          <h2>{t(locale, "currentHoldings")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {positions.map((item) => (
          <div className="stack-item" key={item.id ?? item.title}>
            <div className="panel-header">
              <strong>{resolvePositionTitle(item, locale)}</strong>
              <span className={String(item.pnl).startsWith("+") ? "positive" : "negative"}>{item.pnl}</span>
            </div>
            <span className="muted-text">
              {item.shares} · {resolveAvg(item, locale)} · Mark {item.mark ?? item.avg.replace("均价", "").trim()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityPanel() {
  const { locale, activities } = useDemoAppState();
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "activity")}</p>
          <h2>{t(locale, "recentFillsActions")}</h2>
        </div>
      </div>
      <div className="stack-list">
        {activities.map((item, index) => (
          <div className="stack-item activity-item" key={`${index}-${pickLocale(locale, item.market)}-${pickLocale(locale, item.type)}`}>
            <div className="panel-header">
              <strong>{pickLocale(locale, item.type)}</strong>
              <span className="muted-text">{pickLocale(locale, item.time)}</span>
            </div>
            <span>{pickLocale(locale, item.market)}</span>
            <span className="muted-text">{pickLocale(locale, item.detail)}</span>
            <span className="mini-badge neutral-badge">{pickLocale(locale, item.status)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WatchFoldersPanel() {
  const { locale, watchlist, watchFolders, moveWatchlistItem, reorderWatchlistItem, createWatchFolder, renameWatchFolder, deleteWatchFolder } = useDemoAppState();
  const [folderName, setFolderName] = useState("");
  const [activeFolder, setActiveFolder] = useState("all");
  const [dragIndex, setDragIndex] = useState(null);
  const [draggedMarketSlug, setDraggedMarketSlug] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [folderMeta, setFolderMeta] = useState({});
  const [folderAlerts, setFolderAlerts] = useState({});
  const [folderNotes, setFolderNotes] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const folders = useMemo(() => {
    const base = Object.values(watchFolders).map((folder, index) => ({
      ...folder,
      ...getDefaultFolderMeta(folder.id, index),
      ...(folderMeta[folder.id] ?? {}),
    }));
    return [...base].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));
  }, [folderMeta, watchFolders]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FOLDER_META_KEY);
      if (raw) setFolderMeta(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(FOLDER_META_KEY, JSON.stringify(folderMeta));
    } catch {}
  }, [folderMeta]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FOLDER_ALERTS_KEY);
      if (raw) setFolderAlerts(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FOLDER_NOTES_KEY);
      if (raw) setFolderNotes(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(FOLDER_ALERTS_KEY, JSON.stringify(folderAlerts));
    } catch {}
  }, [folderAlerts]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FOLDER_NOTES_KEY, JSON.stringify(folderNotes));
    } catch {}
  }, [folderNotes]);

  useEffect(() => {
    setFolderMeta((current) => {
      const next = { ...current };
      let changed = false;
      Object.values(watchFolders).forEach((folder, index) => {
        if (!next[folder.id]) {
          next[folder.id] = getDefaultFolderMeta(folder.id, index);
          changed = true;
        }
      });
      return changed ? next : current;
    });
  }, [watchFolders]);

  const filteredWatchlist = useMemo(() => {
    if (activeFolder === "all") return watchlist;
    const folder = watchFolders[activeFolder];
    if (!folder) return watchlist;
    const slugSet = new Set(folder.marketSlugs ?? []);
    return watchlist.filter((item) => slugSet.has(item.marketSlug));
  }, [activeFolder, watchFolders, watchlist]);

  const folderSummary = useMemo(() => {
    const activeAlerts = Object.values(folderAlerts).filter((item) => item?.active).length;
    const totalMarkets = folders.reduce((sum, folder) => sum + (folder.marketSlugs?.length ?? 0), 0);
    const pinnedCount = folders.filter((folder) => folder.pinned).length;
    return { activeAlerts, totalMarkets, pinnedCount };
  }, [folderAlerts, folders]);

  function updateFolderMeta(folderId, patch) {
    setFolderMeta((current) => ({
      ...current,
      [folderId]: {
        ...(current[folderId] ?? {}),
        ...patch,
      },
    }));
  }

  function updateFolderAlert(folderId, patch) {
    setFolderAlerts((current) => ({
      ...current,
      [folderId]: {
        active: false,
        threshold: "60%",
        direction: "above",
        ...(current[folderId] ?? {}),
        ...patch,
      },
    }));
  }

  function toggleSelectedItem(marketSlug) {
    setSelectedItems((current) => (current.includes(marketSlug) ? current.filter((item) => item !== marketSlug) : [...current, marketSlug]));
  }

  function moveSelectedItems(folderId) {
    selectedItems.forEach((marketSlug) => moveWatchlistItem({ marketSlug, folderId }));
    setSelectedItems([]);
  }

  function updateFolderNote(folderId, note) {
    setFolderNotes((current) => ({
      ...current,
      [folderId]: note,
    }));
  }

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "分组观察" : "Watch folders"}</p>
          <h2>{locale === "zh" ? "管理观察列表" : "Manage watchlist"}</h2>
        </div>
      </div>

      <div className="chart-toolbar folder-filter-row">
        <button className={`pill chart-pill ${activeFolder === "all" ? "active" : ""}`} onClick={() => setActiveFolder("all")} type="button">
          {locale === "zh" ? "全部" : "All"}
        </button>
        {folders.map((folder) => (
          <button className={`pill chart-pill folder-chip folder-chip-${folder.color} ${activeFolder === folder.id ? "active" : ""}`} key={folder.id} onClick={() => setActiveFolder(folder.id)} type="button">
            {folder.pinned ? "• " : ""}
            {pickLocale(locale, folder.name)}
          </button>
        ))}
      </div>

      <div className="stats-grid portfolio-stats folder-summary-grid">
        <div>
          <span>{locale === "zh" ? "文件夹数" : "Folders"}</span>
          <strong>{folders.length}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "置顶分组" : "Pinned"}</span>
          <strong>{folderSummary.pinnedCount}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "活跃提醒" : "Active alerts"}</span>
          <strong>{folderSummary.activeAlerts}</strong>
        </div>
        <div>
          <span>{locale === "zh" ? "覆盖市场" : "Covered markets"}</span>
          <strong>{folderSummary.totalMarkets}</strong>
        </div>
      </div>

      <div className="stack-list">
        {folders.map((folder, index) => {
          const isEditing = editingFolderId === folder.id;
          return (
            <div
              className={`stack-item folder-card folder-card-${folder.color}`}
              key={folder.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!draggedMarketSlug) return;
                moveWatchlistItem({ marketSlug: draggedMarketSlug, folderId: folder.id });
                setDraggedMarketSlug(null);
              }}
            >
              <div className="panel-header">
                <div className="folder-title-row">
                  <span className={`folder-color-dot folder-color-dot-${folder.color}`} />
                  {isEditing ? (
                    <input className="search-input search-input-wide" value={editingName} onChange={(event) => setEditingName(event.target.value)} />
                  ) : (
                    <strong>{pickLocale(locale, folder.name)}</strong>
                  )}
                  {folder.pinned ? <span className="mini-badge">{locale === "zh" ? "置顶" : "Pinned"}</span> : null}
                </div>
                <span className="muted-text">{(folder.marketSlugs ?? []).length}</span>
              </div>

              <div className="watchlist-folder-actions">
                <button className="ghost-button small-button" onClick={() => updateFolderMeta(folder.id, { pinned: !folder.pinned })} type="button">
                  {folder.pinned ? (locale === "zh" ? "取消置顶" : "Unpin") : locale === "zh" ? "置顶" : "Pin"}
                </button>
                <button className="ghost-button small-button" onClick={() => updateFolderMeta(folder.id, { collapsed: !folder.collapsed })} type="button">
                  {folder.collapsed ? (locale === "zh" ? "展开" : "Expand") : locale === "zh" ? "折叠" : "Collapse"}
                </button>
                {COLOR_OPTIONS.map((color) => (
                  <button
                    className={`folder-color-swatch folder-color-swatch-${color} ${folder.color === color ? "active" : ""}`}
                    key={color}
                    onClick={() => updateFolderMeta(folder.id, { color })}
                    type="button"
                  />
                ))}
              </div>

              <div className="watchlist-folder-actions">
                <button
                  className={`ghost-button small-button ${(folderAlerts[folder.id]?.active ?? false) ? "active-soft" : ""}`}
                  onClick={() => updateFolderAlert(folder.id, { active: !(folderAlerts[folder.id]?.active ?? false) })}
                  type="button"
                >
                  {(folderAlerts[folder.id]?.active ?? false) ? (locale === "zh" ? "关闭提醒" : "Alert on") : locale === "zh" ? "开启提醒" : "Alert off"}
                </button>
                <input
                  className="search-input folder-alert-input"
                  value={folderAlerts[folder.id]?.threshold ?? "60%"}
                  onChange={(event) => updateFolderAlert(folder.id, { threshold: event.target.value })}
                />
                <button className="ghost-button small-button" onClick={() => updateFolderAlert(folder.id, { direction: (folderAlerts[folder.id]?.direction ?? "above") === "above" ? "below" : "above" })} type="button">
                  {(folderAlerts[folder.id]?.direction ?? "above") === "above" ? (locale === "zh" ? "高于" : "Above") : locale === "zh" ? "低于" : "Below"}
                </button>
              </div>

              {!folder.collapsed ? (
                <>
                  <div className="folder-dropzone">
                    {locale === "zh" ? "把市场拖到这里移入该分组" : "Drop a market here to move it into this folder"}
                  </div>
                  <div className="tag-list">
                    {(folder.marketSlugs ?? []).map((slug) => {
                      const market = markets.find((item) => item.slug === slug);
                      return market ? <span key={slug}>{localizeMarket(market, locale).shortName}</span> : null;
                    })}
                  </div>
                  <textarea
                    className="search-input folder-note-input"
                    placeholder={locale === "zh" ? "记录这个文件夹的观察笔记…" : "Add notes for this folder..."}
                    value={folderNotes[folder.id] ?? ""}
                    onChange={(event) => updateFolderNote(folder.id, event.target.value)}
                  />
                  <div className="watchlist-folder-actions">
                    {isEditing ? (
                      <>
                        <button
                          className="ghost-button small-button"
                          onClick={() => {
                            renameWatchFolder({ folderId: folder.id, name: editingName });
                            setEditingFolderId(null);
                            setEditingName("");
                          }}
                          type="button"
                        >
                          {locale === "zh" ? "保存" : "Save"}
                        </button>
                        <button
                          className="ghost-button small-button"
                          onClick={() => {
                            setEditingFolderId(null);
                            setEditingName("");
                          }}
                          type="button"
                        >
                          {locale === "zh" ? "取消" : "Cancel"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="ghost-button small-button"
                          onClick={() => {
                            setEditingFolderId(folder.id);
                            setEditingName(pickLocale(locale, folder.name));
                          }}
                          type="button"
                        >
                          {locale === "zh" ? "重命名" : "Rename"}
                        </button>
                        <button
                          className="ghost-button small-button"
                          onClick={() => {
                            deleteWatchFolder(folder.id);
                            setFolderMeta((current) => {
                              const next = { ...current };
                              delete next[folder.id];
                              return next;
                            });
                            if (activeFolder === folder.id) setActiveFolder("all");
                          }}
                          type="button"
                        >
                          {locale === "zh" ? "删除" : "Delete"}
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p className="muted-text folder-collapsed-note">
                  {locale === "zh" ? "文件夹已折叠，点击上方按钮展开。" : "Folder collapsed. Expand to view its markets."}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="comment-composer">
        <input className="search-input search-input-wide" placeholder={locale === "zh" ? "新建文件夹名称" : "New folder name"} value={folderName} onChange={(event) => setFolderName(event.target.value)} />
        <button
          className="solid-button"
          onClick={() => {
            if (!folderName.trim()) return;
            createWatchFolder(folderName);
            setFolderName("");
          }}
          type="button"
        >
          {locale === "zh" ? "创建文件夹" : "Create folder"}
        </button>
      </div>

      <div className="section-header">
        <div>
          <p className="eyebrow">{locale === "zh" ? "排序与归档" : "Sort and assign"}</p>
          <h2>{locale === "zh" ? "拖拽或按钮调整顺序" : "Drag or nudge item order"}</h2>
        </div>
      </div>

      <div className="watchlist-folder-actions">
        <span className="muted-text">
          {locale === "zh" ? `已选择 ${selectedItems.length} 个市场` : `${selectedItems.length} markets selected`}
        </span>
        {folders.map((folder) => (
          <button className={`pill chart-pill folder-chip folder-chip-${folder.color}`} disabled={!selectedItems.length} key={`bulk-${folder.id}`} onClick={() => moveSelectedItems(folder.id)} type="button">
            {locale === "zh" ? "批量移入" : "Bulk move"} {pickLocale(locale, folder.name)}
          </button>
        ))}
      </div>

      <div className="stack-list">
        {filteredWatchlist.map((item) => {
          const actualIndex = watchlist.findIndex((entry) => entry.marketSlug === item.marketSlug);
          return (
            <div
              className={`stack-item watchlist-card ${dragIndex === actualIndex ? "watchlist-card-dragging" : ""}`}
              draggable
              key={item.marketSlug ?? item.name}
              onDragStart={() => {
                setDragIndex(actualIndex);
                setDraggedMarketSlug(item.marketSlug);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setDraggedMarketSlug(null);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex === null) return;
                reorderWatchlistItem({ fromIndex: dragIndex, toIndex: actualIndex });
                setDragIndex(null);
                setDraggedMarketSlug(null);
              }}
            >
              <div className="panel-header">
                <label className="watchlist-select">
                  <input checked={selectedItems.includes(item.marketSlug)} onChange={() => toggleSelectedItem(item.marketSlug)} type="checkbox" />
                  <strong>{item.name}</strong>
                </label>
                <span>{item.price}</span>
              </div>
              <span className="muted-text">{item.note}</span>
              <div className="watchlist-sort-row">
                <button className="ghost-button small-button" onClick={() => reorderWatchlistItem({ fromIndex: actualIndex, toIndex: Math.max(0, actualIndex - 1) })} type="button">
                  {locale === "zh" ? "上移" : "Up"}
                </button>
                <button className="ghost-button small-button" onClick={() => reorderWatchlistItem({ fromIndex: actualIndex, toIndex: Math.min(watchlist.length - 1, actualIndex + 1) })} type="button">
                  {locale === "zh" ? "下移" : "Down"}
                </button>
                <div className="chart-toolbar">
                  {folders.map((folder) => (
                    <button className={`pill chart-pill folder-chip folder-chip-${folder.color}`} key={folder.id} onClick={() => moveWatchlistItem({ marketSlug: item.marketSlug, folderId: folder.id })} type="button">
                      {pickLocale(locale, folder.name)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  const { locale } = useDemoAppState();

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{t(locale, "portfolio")}</span>
            <Link className="ghost-button small-button" href="/">
              {t(locale, "backHome")}
            </Link>
          </div>
          <h2>{t(locale, "portfolioHeroTitle")}</h2>
          <p>{t(locale, "portfolioHeroBody")}</p>
        </div>
      </section>

      <SummaryPanel />
      <section className="detail-grid">
        <div className="detail-main">
          <AnalyticsPanel />
          <PositionsPanel />
          <ActivityPanel />
        </div>
        <div className="detail-side">
          <WatchFoldersPanel />
        </div>
      </section>
    </MarketShell>
  );
}
