import React from "react";
import "./file-sharing.css";

interface FileSharingSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function FileSharingSection({
  eyebrow = "Bestanden delen",
  title = "Grote bestanden\ndelen",
  description = "Vergeet e-mail. Of het nu een Word-, PDF- of Excel-document is, je kunt bestanden tot 100 MB verzenden via Messenger.",
}: FileSharingSectionProps) {
  return (
    <div className="filesharing-wrap">
      <section className="filesharing-section">
        {/* Left: Two Phones */}
        <div className="filesharing-phones">
          {/* Phone C: chat with share sheet */}
          <div className="phone" style={{ transform: "translateY(24px)" }}>
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
              <div className="chat-header">
                <span className="back">‹</span>
                <div className="avatar"></div>
                <div className="name">Jacqueline Farley</div>
                <div className="actions">
                  <span style={{ cursor: "pointer" }}>📞</span>
                  <span style={{ cursor: "pointer" }}>🎥</span>
                </div>
              </div>
              <div className="chat-body">
                <div className="row out">
                  <div className="bubble out">wat doe je?</div>
                </div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Nu aan het voorbereiden op de les</div>
                </div>
                <div className="row out">
                  <div className="bubble out">We hebben om 10 uur les, toch?</div>
                </div>
                <div className="timestamp">19:52 uur</div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Ben je begonnen met het verslag? 😊</div>
                </div>
                <div className="row out">
                  <div className="bubble out">Ja!</div>
                </div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Geweldig!</div>
                </div>
              </div>
              <div className="sheet">
                <div className="sheet-title">
                  <span>Een bestand delen</span>
                  <span>📄</span>
                </div>
                <div className="opt">
                  <span>Locatie</span>
                  <span>📍</span>
                </div>
                <div className="opt">
                  <span>Games spelen</span>
                  <span>🎮</span>
                </div>
                <div className="opt">
                  <span>Stel je voor</span>
                  <span>💬</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone D: chat with sent file */}
          <div className="phone">
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
              <div className="chat-header">
                <span className="back">‹</span>
                <div className="avatar"></div>
                <div className="name">Jacqueline Farley</div>
                <div className="actions">
                  <span style={{ cursor: "pointer" }}>📞</span>
                  <span style={{ cursor: "pointer" }}>🎥</span>
                </div>
              </div>
              <div className="chat-body">
                <div className="row out">
                  <div className="bubble out">wat doe je?</div>
                </div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Nu aan het voorbereiden op de les</div>
                </div>
                <div className="row out">
                  <div className="bubble out">We hebben om 10 uur les, toch?</div>
                </div>
                <div className="timestamp">19:52 uur</div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Ben je begonnen met het verslag? 😊</div>
                </div>
                <div className="row out">
                  <div className="bubble out">Ja!</div>
                </div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Geweldig!</div>
                </div>
                <div className="row">
                  <div className="mini-avatar"></div>
                  <div className="bubble in">Je bent mijn held ❤️</div>
                </div>
              </div>
              <div className="composer">
                <span className="plus">⊕</span>
                <div className="field">Aa</div>
                <div className="micemoji">📷 🖼️ 🎤 ⏳</div>
              </div>
              <div className="lockbar"></div>
            </div>
          </div>
        </div>

        {/* Right: Text Copy */}
        <div className="filesharing-copy">
          <p className="filesharing-eyebrow">{eyebrow}</p>
          <h2 className="filesharing-title">
            {title.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="filesharing-desc">{description}</p>
        </div>
      </section>
    </div>
  );
}
