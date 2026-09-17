"use client";

import React, { useRef, useState, useEffect } from "react";
import "./teen-safety.css";

export default function TeenSafetySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      phoneRefs.current.forEach((phone, idx) => {
        if (!phone) return;
        const phoneCenter = phone.offsetLeft + phone.offsetWidth / 2;
        const distance = Math.abs(containerCenter - phoneCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPhone = (idx: number) => {
    const target = phoneRefs.current[idx];
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div className="teensafety-wrap">
      {/* SECTION 3: TEEN SAFETY / MESSAGE DELIVERY */}
      <section className="teensafety-phones-section">
        <div className="teensafety-phones-carousel-container">
          <div className="teensafety-phones" ref={containerRef}>
            {/* Phone E: not friends notice */}
            <div
              className="phone"
              ref={(el) => { phoneRefs.current[0] = el; }}
              onClick={() => scrollToPhone(0)}
            >
              <div className="screen">
                <div className="statusbar">
                  <span>9:41</span>
                  <span className="icons">
                    <svg width="16" height="10">
                      <rect width="16" height="10" rx="2" fill="currentColor" />
                    </svg>
                    <svg width="14" height="10" viewBox="0 0 24 16">
                      <path
                        d="M1 15 L6 9 L10 12 L15 5 L19 9 L23 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                    <svg width="20" height="10" viewBox="0 0 24 12">
                      <rect
                        x="1"
                        y="1"
                        width="19"
                        height="10"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                      />
                      <rect x="3" y="3" width="14" height="6" fill="currentColor" />
                      <rect x="21" y="4" width="2" height="4" fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <div className="notice-bar">Jullie zijn niet bevriend op Facebook</div>
                <div className="notice-body" />
                <div className="notice-footer">Je kunt dit account geen chatberichten sturen</div>
                <div className="lockbar" />
              </div>
            </div>

            {/* Phone F: settings for message delivery, informational modal */}
            <div
              className="phone"
              ref={(el) => { phoneRefs.current[1] = el; }}
              onClick={() => scrollToPhone(1)}
            >
              <div className="screen">
                <div className="statusbar">
                  <span>9:41</span>
                  <span className="icons">
                    <svg width="16" height="10">
                      <rect width="16" height="10" rx="2" fill="currentColor" />
                    </svg>
                    <svg width="14" height="10" viewBox="0 0 24 16">
                      <path
                        d="M1 15 L6 9 L10 12 L15 5 L19 9 L23 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                    <svg width="20" height="10" viewBox="0 0 24 12">
                      <rect
                        x="1"
                        y="1"
                        width="19"
                        height="10"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                      />
                      <rect x="3" y="3" width="14" height="6" fill="currentColor" />
                      <rect x="21" y="4" width="2" height="4" fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <div className="modal-close">×</div>
                <div className="modal-icon">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <path
                      d="M8 30c0-12 10-22 28-22s28 10 28 22c0 12-11 22-28 22-3 0-6-.3-8.6-.9L14 58l3-13.6C10 39.6 8 35 8 30z"
                      fill="#eef2ff"
                      stroke="#c9d6f7"
                      strokeWidth="1.5"
                    />
                    <circle cx="36" cy="27" r="11" fill="#0866ff" />
                    <path d="M31 27a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" fill="#fff" />
                    <circle cx="36" cy="27" r="2.4" fill="#0866ff" />
                  </svg>
                </div>
                <div className="modal-title">
                  Instellingen voor het leveren
                  <br />
                  van chatberichten wijzigen
                </div>
                <div className="modal-item">
                  <span className="modal-ico">💬</span>
                  <div>
                    <div className="modal-item-title">Wie jou een chatbericht kan sturen</div>
                    <div className="modal-item-desc">
                      Binnenkort kunnen alleen je vrienden op Facebook en mensen met je telefoonnummer je chatberichten sturen en je toevoegen aan groepen. Dit heeft geen invloed op je huidige chats.
                    </div>
                  </div>
                </div>
                <div className="modal-item">
                  <span className="modal-ico">⚙️</span>
                  <div>
                    <div className="modal-item-title">Je standaardinstellingen worden automatisch gewijzigd</div>
                    <div className="modal-item-desc">
                      Je krijgt 24 uur voordat dit gebeurt een melding. Je kunt er ook voor kiezen ze nu te wijzigen of helemaal niet.
                    </div>
                  </div>
                </div>
                <div className="lockbar" />
              </div>
            </div>

            {/* Phone G: message delivery settings detail */}
            <div
              className="phone"
              style={{ transform: "translateY(20px)" }}
              ref={(el) => { phoneRefs.current[2] = el; }}
              onClick={() => scrollToPhone(2)}
            >
              <div className="screen">
                <div className="statusbar">
                  <span>9:41</span>
                  <span className="icons">
                    <svg width="16" height="10">
                      <rect width="16" height="10" rx="2" fill="currentColor" />
                    </svg>
                    <svg width="14" height="10" viewBox="0 0 24 16">
                      <path
                        d="M1 15 L6 9 L10 12 L15 5 L19 9 L23 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                    <svg width="20" height="10" viewBox="0 0 24 12">
                      <rect
                        x="1"
                        y="1"
                        width="19"
                        height="10"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                      />
                      <rect x="3" y="3" width="14" height="6" fill="currentColor" />
                      <rect x="21" y="4" width="2" height="4" fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <div className="settings-header">
                  <span className="back">‹</span>
                </div>
                <div className="settings-title">Levering van chatberichten</div>
                <div className="settings-desc">
                  Stella kan bepalen of berichtverzoeken naar de lijst Chats of de map Berichtverzoeken gaan en of ze berichtverzoeken wel of niet ontvangt. Als Stella een Instagram-account heeft, heeft ze mogelijk andere instellingen waarnaar je kunt vragen.{" "}
                  <a href="#" className="link">
                    Meer informatie
                  </a>
                </div>
                <div className="settings-subhead">Mogelijke connecties</div>
                <div className="settings-list">
                  <div className="settings-row">
                    <div>
                      <div className="settings-row-title">Mensen met hun telefoonnummer</div>
                      <div className="settings-row-sub">Chats</div>
                    </div>
                    <span className="chev">›</span>
                  </div>
                  <div className="settings-row">
                    <div>
                      <div className="settings-row-title">Vrienden van vrienden op Facebook</div>
                      <div className="settings-row-sub">Berichtverzoeken</div>
                    </div>
                    <span className="chev">›</span>
                  </div>
                </div>
                <div className="settings-subhead">Andere mensen</div>
                <div className="settings-list">
                  <div className="settings-row">
                    <div>
                      <div className="settings-row-title">Anderen op Facebook</div>
                      <div className="settings-row-sub">Berichtverzoeken</div>
                    </div>
                    <span className="chev">›</span>
                  </div>
                </div>
                <div className="lockbar" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="teensafety-dots">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`teensafety-dot ${activeIndex === idx ? "active" : ""}`}
              onClick={() => scrollToPhone(idx)}
              aria-label={`Show phone ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: COPY BLOCKS (side by side) */}
      <section className="teensafety-text-pair">
        <div className="teensafety-text-pair-inner">
          <div className="teensafety-text-col">
            <h2>Tieners helpen om online veilig te blijven</h2>
            <p className="desc">
              Veiligheidsfuncties en strikte standaardinstellingen voor chatberichten voor minderjarigen beschermen hen tegen niet-verbonden volwassenen en mogelijk ongepaste content.
            </p>
            <a href="#" className="link-lg">
              Meer informatie
            </a>
          </div>
          <div className="teensafety-text-col">
            <h2>Je tieners ondersteunen bij het opbouwen van positieve connecties</h2>
            <p className="desc">
              Ouders kunnen aangepaste tools, inzichten en informatiebronnen gebruiken om samen met hun tiener richtlijnen op te stellen omtrent veilig blijven en om hun tiener te begeleiden naar ervaringen die bij hun leeftijd passen.
            </p>
            <a href="#" className="link-lg">
              Meer informatie
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
