"use client";

import { MarketShell } from "../../components/ClientShell";
import { useDemoAppState } from "../../components/DemoAppState";

function pickLocale(locale, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && (value.zh || value.en)) {
    return value[locale] ?? value.zh ?? value.en;
  }
  return value;
}

export default function NotificationsPage() {
  const { locale, notifications, alerts, markNotificationsRead, toggleAlert } = useDemoAppState();

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{locale === "zh" ? "通知中心" : "Notifications"}</span>
            <button className="ghost-button small-button" onClick={markNotificationsRead} type="button">
              {locale === "zh" ? "全部标记已读" : "Mark all read"}
            </button>
          </div>
          <h2>{locale === "zh" ? "提醒、成交回报与系统动态" : "Alerts, fills, and system updates"}</h2>
          <p>
            {locale === "zh"
              ? "这里汇总了模拟订单回报、市场提醒和账户动态，行为会和站内状态一起持久化。"
              : "This page collects demo fills, market alerts, and account updates, all persisted with the rest of the local app state."}
          </p>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "收件箱" : "Inbox"}</p>
                <h2>{locale === "zh" ? "最近通知" : "Recent notifications"}</h2>
              </div>
            </div>
            <div className="stack-list">
              {notifications.map((item) => (
                <div className={`stack-item notification-item ${item.read ? "notification-read" : ""}`} key={item.id}>
                  <div className="panel-header">
                    <strong>{pickLocale(locale, item.title)}</strong>
                    <span className="muted-text">{pickLocale(locale, item.time)}</span>
                  </div>
                  <span>{pickLocale(locale, item.body)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-side">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "提醒" : "Alerts"}</p>
                <h2>{locale === "zh" ? "市场提醒管理" : "Manage market alerts"}</h2>
              </div>
            </div>
            <div className="stack-list">
              {alerts.map((alert) => (
                <div className="stack-item" key={alert.id}>
                  <div className="panel-header">
                    <strong>{pickLocale(locale, alert.label)}</strong>
                    <button className="ghost-button small-button" onClick={() => toggleAlert(alert.id)} type="button">
                      {alert.active ? (locale === "zh" ? "启用中" : "Enabled") : locale === "zh" ? "已暂停" : "Paused"}
                    </button>
                  </div>
                  <span className="muted-text">{alert.threshold}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </MarketShell>
  );
}
