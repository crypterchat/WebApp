import React from "react";

interface HeroMessengerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
}

export default function HeroMessenger({
  eyebrow = "Qr-codes",
  title = "Own Your\nConversations.\nYour Server.\nYour Rules.",
  description = "Kom in contact met mensen die je in het echte leven ontmoet door hun QR-code in Messenger te scannen of die van jou te delen. Privé, versleuteld en op je eigen server.",
  appStoreUrl = "#",
  googlePlayUrl = "#",
}: HeroMessengerProps) {
  return (
    <div className="hero-messenger-wrap">
      <section className="hero-messenger-section">
        <div className="hero-messenger-copy">
          <p className="hero-messenger-eyebrow">{eyebrow}</p>
          <h1 className="hero-messenger-title">
            {title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-messenger-desc">{description}</p>
          
          <div className="hero-messenger-ctas">
            <a
              href={appStoreUrl}
              className="hero-messenger-btn"
              title="Download on the App Store"
            >
              <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="btn-subtext text-[9px] text-gray-500 font-medium">Download on the</span>
                <span className="btn-maintext text-sm font-semibold tracking-tight">App Store</span>
              </div>
            </a>

            <a
              href={googlePlayUrl}
              className="hero-messenger-btn"
              title="Get it on Google Play"
            >
              <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0">
                <path fill="#4DB6AC" d="M49 61c-4.9 5.3-7.7 13.5-7.7 24.4v341.2c0 10.9 2.8 19 7.7 24.4l1.2 1.2 191.9-191.9v-5.6L50.2 59.8 49 61z"/>
                <path fill="#DCE775" d="M304.7 197.8L242.1 260.4v5.6l62.6 62.6 1.8-1 74.3-42.3 74.3-42.3c21.2-12.1 21.2-31.9 0-43.9l-74.3-42.3-74.3-42.3-1.8 1z"/>
                <path fill="#D32F2F" d="M306.5 328.6l-64.4-64.4-191.9 191.9c16.3 17.3 43.1 18.2 72.5 1.5l183.8-129z"/>
                <path fill="#FFCA28" d="M306.5 183.4L122.7 54.4C93.3 37.7 66.5 38.6 50.2 55.9L242.1 247.8l64.4-64.4z"/>
              </svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="btn-subtext text-[8px] text-gray-500 font-semibold tracking-wider uppercase">GET IT ON</span>
                <span className="btn-maintext text-sm font-semibold tracking-tight">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div className="hero-phones-two-front">
          {/* Phone A: Profile / Settings */}
          <div className="phone">
            <div className="screen">
              <div className="statusbar">
                <span>9:41</span>
                <span className="icons">
                  <svg width="16" height="10"><rect width="16" height="10" rx="2" fill="currentColor"/></svg>
                  <svg width="14" height="10" viewBox="0 0 24 16"><path d="M1 15 L6 9 L10 12 L15 5 L19 9 L23 1" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  <svg width="20" height="10" viewBox="0 0 24 12"><rect x="1" y="1" width="19" height="10" rx="2" fill="none" stroke="currentColor"/><rect x="3" y="3" width="14" height="6" fill="currentColor"/><rect x="21" y="4" width="2" height="4" fill="currentColor"/></svg>
                </span>
              </div>
              <div className="chat-header" style={{ paddingTop: "2px" }}>
                <span className="back">‹</span>
              </div>
              <div className="profile-block">
                <div className="avatar-lg"></div>
                <div className="pname">Alex Walker</div>
                <div className="plink">Een notitie achterlaten</div>
              </div>
              <div className="list">
                <div className="list-group">
                  <div className="list-row"><span className="ico" style={{ background: "#eee2ff" }}>🌙</span>Donkere modus<span className="val">Systeem <span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#dff4e6" }}>●</span>Status Actief<span className="val">Aan <span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#e0ecff" }}>?</span>Toegankelijkheid<span className="val"><span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#ffe9d6" }}>🔒</span>Privacy en veiligheid<span className="val"><span className="chev">›</span></span></div>
                </div>
                <div className="list-group">
                  <div className="list-row"><span className="ico" style={{ background: "#f0f1f3" }}>🙂</span>Avatar<span className="val"><span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#ffe1ea" }}>🔔</span>Melding en geluiden<span className="val">Aan <span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#e0ecff" }}>💳</span>Bestellingen<span className="val"><span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#e6f0ff" }}>🏷️</span>Betalingen<span className="val"><span className="chev">›</span></span></div>
                  <div className="list-row"><span className="ico" style={{ background: "#eef0f3" }}>🖼️</span>Foto&apos;s en media<span className="val"><span className="chev">›</span></span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone B: QR code */}
          <div className="phone" style={{ background: "#000" }}>
            <div className="screen">
              <div className="statusbar">
                <span>9:41</span>
                <span className="icons">
                  <svg width="16" height="10"><rect width="16" height="10" rx="2" fill="currentColor"/></svg>
                  <svg width="14" height="10" viewBox="0 0 24 16"><path d="M1 15 L6 9 L10 12 L15 5 L19 9 L23 1" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  <svg width="20" height="10" viewBox="0 0 24 12"><rect x="1" y="1" width="19" height="10" rx="2" fill="none" stroke="currentColor"/><rect x="3" y="3" width="14" height="6" fill="currentColor"/><rect x="21" y="4" width="2" height="4" fill="currentColor"/></svg>
                </span>
              </div>

              <div className="qr-header">
                <span className="back">‹</span>
                <span className="title">QR-code</span>
                <span style={{ fontSize: "15px" }}>📷</span>
              </div>
              <div className="profile-block" style={{ paddingTop: "16px" }}>
                <div className="avatar-lg" style={{ width: "64px", height: "64px" }}></div>
                <div className="pname" style={{ fontSize: "17px" }}>Alex Walker</div>
              </div>
              <div className="qr-card">
                <div className="qr-inner">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect width="120" height="120" fill="#fff"/>
                    <g fill="#0b1220">
                      <rect x="8" y="8" width="26" height="26" rx="4"/>
                      <rect x="14" y="14" width="14" height="14" rx="2" fill="#fff"/>
                      <rect x="86" y="8" width="26" height="26" rx="4"/>
                      <rect x="92" y="14" width="14" height="14" rx="2" fill="#fff"/>
                      <rect x="8" y="86" width="26" height="26" rx="4"/>
                      <rect x="14" y="92" width="14" height="14" rx="2" fill="#fff"/>
                    </g>
                    <g fill="#0b1220">
                      <rect x="42" y="8" width="4" height="4"/><rect x="50" y="8" width="4" height="4"/><rect x="58" y="8" width="4" height="4"/><rect x="66" y="12" width="4" height="4"/><rect x="74" y="8" width="4" height="4"/>
                      <rect x="44" y="16" width="4" height="4"/><rect x="60" y="18" width="4" height="4"/><rect x="70" y="20" width="4" height="4"/>
                      <rect x="8" y="42" width="4" height="4"/><rect x="16" y="46" width="4" height="4"/><rect x="8" y="50" width="4" height="4"/><rect x="22" y="52" width="4" height="4"/><rect x="8" y="60" width="4" height="4"/><rect x="16" y="66" width="4" height="4"/><rect x="8" y="70" width="4" height="4"/>
                      <rect x="42" y="44" width="4" height="4"/><rect x="50" y="46" width="4" height="4"/><rect x="58" y="42" width="4" height="4"/><rect x="66" y="50" width="4" height="4"/><rect x="74" y="44" width="4" height="4"/><rect x="46" y="56" width="4" height="4"/><rect x="60" y="60" width="4" height="4"/><rect x="70" y="58" width="4" height="4"/><rect x="42" y="68" width="4" height="4"/><rect x="56" y="72" width="4" height="4"/><rect x="66" y="70" width="4" height="4"/><rect x="50" y="78" width="4" height="4"/>
                      <rect x="86" y="44" width="4" height="4"/><rect x="94" y="48" width="4" height="4"/><rect x="104" y="46" width="4" height="4"/><rect x="86" y="56" width="4" height="4"/><rect x="98" y="58" width="4" height="4"/><rect x="108" y="54" width="4" height="4"/><rect x="86" y="66" width="4" height="4"/><rect x="96" y="70" width="4" height="4"/><rect x="106" y="66" width="4" height="4"/>
                      <rect x="42" y="86" width="4" height="4"/><rect x="50" y="90" width="4" height="4"/><rect x="60" y="86" width="4" height="4"/><rect x="70" y="94" width="4" height="4"/><rect x="80" y="88" width="4" height="4"/><rect x="90" y="90" width="4" height="4"/><rect x="100" y="86" width="4" height="4"/><rect x="108" y="92" width="4" height="4"/>
                    </g>
                    <circle cx="60" cy="60" r="12" fill="#0866ff"/>
                    <path d="M52 62c0-5 4-8 8-8s8 3 8 8-5 8-8 8c-1.6 0-3-.4-4.2-1.1L52 70l1.3-4.4A7.9 7.9 0 0 1 52 62z" fill="#fff"/>
                  </svg>
                </div>
              </div>
              <p className="qr-note">
                Als je je QR-code deelt, kunnen mensen je chatberichten sturen en bellen. Ze zien mogelijk ook je Status Actief en wanneer je chatberichten hebt gelezen.
              </p>
              <div className="qr-reset">QR-code resetten</div>
              <div className="qr-share">Delen</div>
              <div className="lockbar"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
