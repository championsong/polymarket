"use client";

import { MarketShell } from "../../components/ClientShell";
import { useDemoAppState } from "../../components/DemoAppState";

const themeOptions = [
  { id: "dark", zh: "暗色", en: "Dark" },
  { id: "light", zh: "亮色", en: "Light" },
];

const tradeSizes = [100, 200, 500, 1000];

export default function SettingsPage() {
  const { locale, setLocale, settings, updateSettings, toggleNotificationPref } = useDemoAppState();

  return (
    <MarketShell>
      <section className="detail-hero panel">
        <div className="detail-hero-copy">
          <div className="panel-header">
            <span className="category-tag">{locale === "zh" ? "设置" : "Settings"}</span>
          </div>
          <h2>{locale === "zh" ? "主题、语言与通知偏好" : "Theme, language, and notification preferences"}</h2>
          <p>
            {locale === "zh"
              ? "这里的设置会保存在本地，包括界面主题、语言、紧凑模式、默认下单金额和通知类型。"
              : "Preferences are stored locally, including theme, language, compact mode, default trade size, and notification types."}
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

          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "语言" : "Language"}</p>
                <h2>{locale === "zh" ? "界面语言" : "Interface language"}</h2>
              </div>
            </div>
            <div className="chart-toolbar">
              {[
                { id: "zh", label: "中文" },
                { id: "en", label: "EN" },
              ].map((option) => (
                <button className={`pill chart-pill ${locale === option.id ? "active" : ""}`} key={option.id} onClick={() => setLocale(option.id)} type="button">
                  {option.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-side">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "布局" : "Layout"}</p>
                <h2>{locale === "zh" ? "紧凑模式" : "Compact mode"}</h2>
              </div>
            </div>
            <button className="stack-item pref-row" onClick={() => updateSettings({ compactMode: !settings.compactMode })} type="button">
              <div>
                <strong>{locale === "zh" ? "启用更紧凑的信息密度" : "Use denser spacing"}</strong>
                <span className="muted-text">{settings.compactMode ? (locale === "zh" ? "已开启" : "Enabled") : locale === "zh" ? "已关闭" : "Disabled"}</span>
              </div>
              <span className={`mini-badge ${settings.compactMode ? "" : "neutral-badge"}`}>{settings.compactMode ? "On" : "Off"}</span>
            </button>
          </section>

          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">{locale === "zh" ? "交易" : "Trading"}</p>
                <h2>{locale === "zh" ? "默认下单金额" : "Default trade size"}</h2>
              </div>
            </div>
            <div className="chart-toolbar">
              {tradeSizes.map((size) => (
                <button
                  className={`pill chart-pill ${settings.defaultTradeSize === size ? "active" : ""}`}
                  key={size}
                  onClick={() => updateSettings({ defaultTradeSize: size })}
                  type="button"
                >
                  ¥{size}
                </button>
              ))}
            </div>
          </section>

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
                  <span className={`mini-badge ${settings.notificationPrefs[item.key] ? "" : "neutral-badge"}`}>{settings.notificationPrefs[item.key] ? "On" : "Off"}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </MarketShell>
  );
}
