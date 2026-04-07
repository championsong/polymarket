"use client";

import { MarketShell } from "../../components/ClientShell";
import { useDemoAppState } from "../../components/DemoAppState";

const themeOptions = [
  { id: "dark", zh: "暗色", en: "Dark" },
  { id: "light", zh: "亮色", en: "Light" },
];

export default function SettingsPage() {
  const { locale, settings, updateSettings, toggleNotificationPref } = useDemoAppState();

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{locale === "zh" ? "设置" : "Settings"}</span>
          </div>
          <h2>{locale === "zh" ? "主题与通知偏好" : "Theme and notification preferences"}</h2>
          <p>
            {locale === "zh"
              ? "这里的设置会保存在本地，包括站点主题和你想接收的通知类型。"
              : "Preferences are stored locally, including your site theme and the types of notifications you want to receive."}
          </p>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "主题" : "Theme"}</p>
                <h2>{locale === "zh" ? "界面风格" : "Interface style"}</h2>
              </div>
            </div>
            <div className="chart-toolbar">
              {themeOptions.map((option) => (
                <button
                  className={`pill chart-pill ${settings.theme === option.id ? "active" : ""}`}
                  key={option.id}
                  onClick={() => updateSettings({ theme: option.id })}
                  type="button"
                >
                  {locale === "zh" ? option.zh : option.en}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-side">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "通知偏好" : "Notification preferences"}</p>
                <h2>{locale === "zh" ? "接收类型" : "Delivery types"}</h2>
              </div>
            </div>
            <div className="stack-list">
              {[
                { key: "fills", zh: "订单成交", en: "Order fills" },
                { key: "alerts", zh: "市场提醒", en: "Market alerts" },
                { key: "comments", zh: "评论互动", en: "Comment activity" },
                { key: "marketing", zh: "产品更新", en: "Product updates" },
              ].map((item) => (
                <button className="stack-item pref-row" key={item.key} onClick={() => toggleNotificationPref(item.key)} type="button">
                  <div>
                    <strong>{locale === "zh" ? item.zh : item.en}</strong>
                    <span className="muted-text">{settings.notificationPrefs[item.key] ? (locale === "zh" ? "已开启" : "Enabled") : locale === "zh" ? "已关闭" : "Disabled"}</span>
                  </div>
                  <span className={`mini-badge ${settings.notificationPrefs[item.key] ? "" : "neutral-badge"}`}>
                    {settings.notificationPrefs[item.key] ? "On" : "Off"}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </MarketShell>
  );
}
