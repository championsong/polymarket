"use client";

import { useMemo, useState } from "react";
import { InteractivePriceChart } from "./MarketChart";
import { useDemoAppState } from "./DemoAppState";
import { t } from "./i18n";

function pickLocale(locale, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && (value.zh || value.en)) {
    return value[locale] ?? value.zh ?? value.en;
  }
  return value;
}

export function OrderEntryPanel({ market }) {
  const { locale, placeOrder, closePosition, toggleWatchlist, watchlist, walletConnected, connectWallet, user, signIn, marketMarks, createAlert } =
    useDemoAppState();
  const [side, setSide] = useState("yes");
  const [amount, setAmount] = useState(200);
  const [mode, setMode] = useState("buy");
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isWatched = useMemo(() => watchlist.some((item) => item.marketSlug === market.slug || item.name === market.shortName), [market.slug, market.shortName, watchlist]);
  const liveMark = marketMarks[market.slug] ?? market.yesPrice;
  const price = side === "yes" ? liveMark : 100 - liveMark;
  const shares = Math.floor((amount / price) * 100);

  function ensureReady() {
    if (!user) {
      signIn();
      setMessage(t(locale, "signedIn"));
      return false;
    }
    if (!walletConnected) {
      connectWallet();
      setMessage(t(locale, "walletConnectedToast"));
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!ensureReady()) return;

    if (mode === "close") {
      closePosition({ market });
      setMessage(t(locale, "closePosition"));
    } else {
      placeOrder({ market, side, amount, mode });
      setMessage(`${mode === "sell" ? t(locale, "sell") : t(locale, "buy")} ${shares} @ ${price}¢`);
    }

    setDrawerOpen(false);
  }

  const ticketTabs = [
    { id: "buy", label: t(locale, "buy") },
    { id: "sell", label: t(locale, "sell") },
    { id: "close", label: t(locale, "close") },
  ];

  return (
    <>
      <div className="panel trade-panel desktop-trade-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t(locale, "orderTicket")}</p>
            <h2>{t(locale, "buySellClose")}</h2>
          </div>
          <span className="mini-badge">{t(locale, "playableDemo")}</span>
        </div>

        <div className="chart-toolbar">
          {ticketTabs.map((tab) => (
            <button className={`pill chart-pill ${mode === tab.id ? "active" : ""}`} key={tab.id} onClick={() => setMode(tab.id)} type="button">
              {tab.label}
            </button>
          ))}
        </div>

        <InteractivePriceChart points={market.chart} />

        <div className="stats-grid">
          <div>
            <span>{t(locale, "liveYesMark")}</span>
            <strong>{liveMark}¢</strong>
          </div>
          <div>
            <span>{t(locale, "liveNoMark")}</span>
            <strong>{100 - liveMark}¢</strong>
          </div>
          <div>
            <span>{t(locale, "liquidity")}</span>
            <strong>{market.liquidity}</strong>
          </div>
        </div>

        {mode !== "close" ? (
          <>
            <div className="price-row">
              <button className={`yes-button wide-button ${side === "yes" ? "selected-button" : ""}`} onClick={() => setSide("yes")} type="button">
                <span>{mode === "sell" ? t(locale, "sellYes") : t(locale, "buyYes")}</span>
                <strong>{liveMark}¢</strong>
              </button>
              <button className={`no-button wide-button ${side === "no" ? "selected-button" : ""}`} onClick={() => setSide("no")} type="button">
                <span>{mode === "sell" ? t(locale, "sellNo") : t(locale, "buyNo")}</span>
                <strong>{100 - liveMark}¢</strong>
              </button>
            </div>

            <div className="range-box">
              <label htmlFor={`demo-order-size-${market.slug}`}>{t(locale, "orderSize")}</label>
              <input
                id={`demo-order-size-${market.slug}`}
                max="1000"
                min="20"
                onChange={(event) => setAmount(Number(event.target.value))}
                step="20"
                type="range"
                value={amount}
              />
              <div className="panel-header">
                <strong>¥{amount}</strong>
                <span className="muted-text">
                  {t(locale, "estimateShares")} {shares}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="stack-item">
            <strong>{t(locale, "closeOpenLines")}</strong>
            <span className="muted-text">{t(locale, "closeHint")}</span>
          </div>
        )}

        <div className="price-row">
          <button className="solid-button wide-button" onClick={handleSubmit} type="button">
            {mode === "close" ? t(locale, "closePosition") : walletConnected ? t(locale, "submitTicket") : t(locale, "connectWalletToTrade")}
          </button>
          <button className="ghost-button wide-button" onClick={() => toggleWatchlist(market)} type="button">
            {isWatched ? t(locale, "removeWatchlist") : t(locale, "addWatchlist")}
          </button>
        </div>

        <div className="price-row">
          <button className="ghost-button wide-button" onClick={() => createAlert({ marketSlug: market.slug, label: `${market.shortName} alert`, threshold: `${liveMark}¢` })} type="button">
            {t(locale, "createMarketAlert")}
          </button>
        </div>

        {message ? <p className="muted-text">{message}</p> : null}
      </div>

      <button className="mobile-trade-trigger" onClick={() => setDrawerOpen(true)} type="button">
        <span>{mode === "close" ? t(locale, "closePosition") : mode === "sell" ? t(locale, "sell") : t(locale, "buy")}</span>
        <strong>{mode === "close" ? "Ticket" : `${price}¢`}</strong>
      </button>

      {drawerOpen ? (
        <div className="mobile-drawer-root" onClick={() => setDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <strong>{market.shortName}</strong>
              <button className="icon-button" onClick={() => setDrawerOpen(false)} type="button">
                ×
              </button>
            </div>
            <div className="chart-toolbar">
              {ticketTabs.map((tab) => (
                <button className={`pill chart-pill ${mode === tab.id ? "active" : ""}`} key={tab.id} onClick={() => setMode(tab.id)} type="button">
                  {tab.label}
                </button>
              ))}
            </div>
            {mode !== "close" ? (
              <>
                <div className="price-row">
                  <button className={`yes-button wide-button ${side === "yes" ? "selected-button" : ""}`} onClick={() => setSide("yes")} type="button">
                    {t(locale, "yes")} {liveMark}¢
                  </button>
                  <button className={`no-button wide-button ${side === "no" ? "selected-button" : ""}`} onClick={() => setSide("no")} type="button">
                    {t(locale, "no")} {100 - liveMark}¢
                  </button>
                </div>
                <div className="range-box">
                  <label htmlFor={`mobile-order-size-${market.slug}`}>{t(locale, "orderSize")}</label>
                  <input
                    id={`mobile-order-size-${market.slug}`}
                    max="1000"
                    min="20"
                    onChange={(event) => setAmount(Number(event.target.value))}
                    step="20"
                    type="range"
                    value={amount}
                  />
                  <div className="panel-header">
                    <strong>¥{amount}</strong>
                    <span className="muted-text">
                      {t(locale, "estimateShares")} {shares}
                    </span>
                  </div>
                </div>
              </>
            ) : null}
            <button className="solid-button wide-button" onClick={handleSubmit} type="button">
              {mode === "close" ? t(locale, "closePosition") : t(locale, "submitTicket")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ReplyComposer({ onSubmit }) {
  const { locale } = useDemoAppState();
  const [text, setText] = useState("");
  return (
    <div className="reply-composer">
      <textarea className="comment-textarea reply-textarea" onChange={(event) => setText(event.target.value)} placeholder={t(locale, "writeReply")} rows={2} value={text} />
      <button
        className="ghost-button"
        onClick={() => {
          if (!text.trim()) return;
          onSubmit(text.trim());
          setText("");
        }}
        type="button"
      >
        {t(locale, "reply")}
      </button>
    </div>
  );
}

export function CommentsFeedPanel({ slug }) {
  const { locale, comments, postComment, postReply, likeComment, pinComment } = useDemoAppState();
  const [text, setText] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [sortBy, setSortBy] = useState("top");

  const items = useMemo(() => {
    const current = [...(comments[slug] ?? [])];
    current.sort((left, right) => {
      if (left.pinned !== right.pinned) return left.pinned ? -1 : 1;
      if (sortBy === "new") return right.id.localeCompare(left.id);
      return (right.likes ?? 0) - (left.likes ?? 0);
    });
    return current;
  }, [comments, slug, sortBy]);

  return (
    <div className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">{t(locale, "commentsFeed")}</p>
          <h2>{t(locale, "traderTakes")}</h2>
        </div>
        <div className="chart-toolbar">
          <button className={`pill chart-pill ${sortBy === "top" ? "active" : ""}`} onClick={() => setSortBy("top")} type="button">
            {t(locale, "top")}
          </button>
          <button className={`pill chart-pill ${sortBy === "new" ? "active" : ""}`} onClick={() => setSortBy("new")} type="button">
            {t(locale, "newest")}
          </button>
        </div>
      </div>

      <div className="comment-composer">
        <textarea className="comment-textarea" onChange={(event) => setText(event.target.value)} placeholder={t(locale, "shareTake")} rows={3} value={text} />
        <div className="panel-header">
          <span className="muted-text">{t(locale, "postsStored")}</span>
          <button
            className="solid-button"
            onClick={() => {
              if (!text.trim()) return;
              postComment({ slug, text: text.trim() });
              setText("");
            }}
            type="button"
          >
            {t(locale, "post")}
          </button>
        </div>
      </div>

      <div className="stack-list">
        {items.map((comment) => {
          const isCollapsed = collapsed[comment.id] ?? false;
          return (
            <div className="comment-feed-item" key={comment.id}>
              <div className="comment-avatar">{comment.avatar}</div>
              <div className="comment-body">
                <div className="comment-topline">
                  <strong>{comment.user}</strong>
                  <span className="muted-text">{comment.handle}</span>
                  <span className="muted-text">{pickLocale(locale, comment.time)}</span>
                </div>
                <div className="comment-badges">
                  {comment.badges.map((badge) => (
                    <span className="comment-badge" key={badge}>
                      {badge}
                    </span>
                  ))}
                  <span className="comment-pnl">{comment.pnl}</span>
                  {comment.pinned ? <span className="comment-badge">Pinned</span> : null}
                  {comment.optimistic ? <span className="comment-badge">Posting</span> : null}
                </div>
                <p>{pickLocale(locale, comment.text)}</p>
                <div className="comment-actions-row">
                  <button className="ghost-button small-button" onClick={() => likeComment({ slug, commentId: comment.id })} type="button">
                    {t(locale, "like")} {comment.likes ?? 0}
                  </button>
                  <button className="ghost-button small-button" onClick={() => setReplyTarget(replyTarget === comment.id ? null : comment.id)} type="button">
                    {t(locale, "reply")}
                  </button>
                  <button className="ghost-button small-button" onClick={() => pinComment({ slug, commentId: comment.id })} type="button">
                    {t(locale, "pin")}
                  </button>
                  <button className="ghost-button small-button" onClick={() => setCollapsed((current) => ({ ...current, [comment.id]: !isCollapsed }))} type="button">
                    {isCollapsed ? t(locale, "expandReplies") : t(locale, "collapseReplies")}
                  </button>
                </div>
                {replyTarget === comment.id ? (
                  <ReplyComposer
                    onSubmit={(replyText) => {
                      postReply({ slug, commentId: comment.id, text: replyText });
                      setReplyTarget(null);
                    }}
                  />
                ) : null}
                {!isCollapsed && comment.replies?.length ? (
                  <div className="reply-list">
                    {comment.replies.map((reply) => (
                      <div className="reply-item" key={reply.id}>
                        <div className="panel-header">
                          <strong>{reply.user}</strong>
                          <span className="muted-text">
                            {reply.handle} · {pickLocale(locale, reply.time)}
                          </span>
                        </div>
                        <p>{pickLocale(locale, reply.text)}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
