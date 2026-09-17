"use client";

import Image from "next/image";
import { Server, Database, Shield, Smartphone, Terminal, ArrowRight, Download, Settings, BookOpen } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#121214] text-gray-900 dark:text-white pb-20 md:pb-0 relative">
      {/* HERO BANNER */}
      <div className="docs-hero">
        <Image 
          src="/Chnage_the_bg_to_blue_one_no_red_op_need_transpera_delpmaspu.png" 
          alt="CrypterChat App" 
          fill
          className="docs-hero-bg"
          priority
        />
        <div className="docs-hero-overlay"></div>
        
        <div className="docs-hero-inner">
          <div>
            <Image 
              src="/CRYPTERCHAT_logo.svg" 
              alt="CrypterChat Logo" 
              width={200} 
              height={50} 
              className="docs-hero-logo" 
            />
            <h1 className="docs-hero-title">Self-Hosted Server Guide</h1>
            <p className="docs-hero-desc">
              Take full control of your private communication. Deploy your own zero-knowledge, end-to-end encrypted backend for the CrypterChat app.
            </p>
          </div>
          <a href="#quick-start" className="docs-hero-btn">
            Get Started <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* QUICK JUMP TOOLBAR */}
      <div className="docs-toolbar">
        <a href="#how-it-works" className="docs-tab-link">How It Works</a>
        <a href="#prerequisites" className="docs-tab-link">Prerequisites</a>
        <a href="#quick-start" className="docs-tab-link">Quick Start</a>
        <a href="#configuration" className="docs-tab-link">Environment Vars</a>
        <a href="#connect-app" className="docs-tab-link">Connect App</a>
      </div>

      {/* DOCUMENTATION CONTENT */}
      <div className="docs-body">
          
        {/* SECTION: HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-16">
          <div className="docs-section-header">
            <div className="docs-icon-box"><Smartphone size={22} /></div>
            <h2 className="docs-section-h2">How CrypterChat Works</h2>
          </div>
          <p className="docs-p">
            CrypterChat is designed with a decoupled architecture. The iOS and Android mobile apps act strictly as dumb clients. They handle the UI, push notifications, and local keystore management, but they <strong>rely entirely on your private server</strong> to route encrypted messages.
          </p>
          <div className="docs-grid">
            <div className="docs-card">
              <Shield className="text-emerald-500 mb-3" size={26} />
              <div className="docs-card-title">End-to-End Encryption</div>
              <div className="docs-card-desc">All messages are encrypted on the device using AES-256-GCM and Curve25519. Your server only ever sees ciphertext. It cannot read any message contents.</div>
            </div>
            <div className="docs-card">
              <Database className="text-blue-500 mb-3" size={26} />
              <div className="docs-card-title">Zero-Knowledge Storage</div>
              <div className="docs-card-desc">The server acts as a relay. It queues encrypted payloads in PostgreSQL just long enough for the recipient device to pull them, after which they are instantly wiped.</div>
            </div>
          </div>
        </section>

        {/* SECTION: PREREQUISITES */}
        <section id="prerequisites" className="scroll-mt-16">
          <div className="docs-section-header">
            <div className="docs-icon-box"><Server size={22} /></div>
            <h2 className="docs-section-h2">Prerequisites</h2>
          </div>
          <div className="docs-list">
            <div className="docs-list-item">
              <div className="docs-badge-num">1</div>
              <div>
                <div className="docs-list-title">Node.js (v18 or higher)</div>
                <div className="docs-list-desc">Required to run the WebSocket and Express server runtime.</div>
              </div>
            </div>
            <div className="docs-list-item">
              <div className="docs-badge-num">2</div>
              <div>
                <div className="docs-list-title">PostgreSQL (v14 or higher)</div>
                <div className="docs-list-desc">For storing user credentials, public keys, and encrypted message queues.</div>
              </div>
            </div>
            <div className="docs-list-item">
              <div className="docs-badge-num">3</div>
              <div>
                <div className="docs-list-title">Redis (Optional but Recommended)</div>
                <div className="docs-list-desc">Required for horizontal scaling of WebSocket connections across multiple instances.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: QUICK START */}
        <section id="quick-start" className="scroll-mt-16">
          <div className="docs-section-header">
            <div className="docs-icon-box"><Terminal size={22} /></div>
            <h2 className="docs-section-h2">Quick Start Guide</h2>
          </div>
          
          <div>
            <div className="docs-step-card">
              <div className="docs-step-title">1. Clone the server repository</div>
              <div className="docs-code-box">
                <pre>
                  <span className="text-pink-400">git</span> clone https://github.com/ericksonholding/crypterchat-server.git{'\n'}
                  <span className="text-pink-400">cd</span> crypterchat-server
                </pre>
              </div>
            </div>

            <div className="docs-step-card">
              <div className="docs-step-title">2. Install dependencies</div>
              <div className="docs-code-box">
                <pre>
                  <span className="text-pink-400">npm</span> install
                </pre>
              </div>
            </div>

            <div className="docs-step-card">
              <div className="docs-step-title">3. Configure your database</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Copy the example environment file and add your PostgreSQL connection string.</p>
              <div className="docs-code-box">
                <pre>
                  <span className="text-pink-400">cp</span> .env.example .env{'\n'}
                  <span className="text-gray-500"># Edit .env and set DATABASE_URL</span>
                </pre>
              </div>
            </div>

            <div className="docs-step-card">
              <div className="docs-step-title">4. Run database migrations</div>
              <div className="docs-code-box">
                <pre>
                  <span className="text-pink-400">npm</span> run db:migrate
                </pre>
              </div>
            </div>

            <div className="docs-step-card">
              <div className="docs-step-title">5. Start the server</div>
              <div className="docs-code-box">
                <pre>
                  <span className="text-pink-400">npm</span> run start
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CONFIGURATION */}
        <section id="configuration" className="scroll-mt-16">
          <div className="docs-section-header">
            <div className="docs-icon-box"><Settings size={22} /></div>
            <h2 className="docs-section-h2">Environment Variables</h2>
          </div>
          <div className="docs-table-card">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Description</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">PORT</td>
                  <td>The port the server binds to (default: 3000)</td>
                  <td><span className="docs-badge-no">No</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">DATABASE_URL</td>
                  <td>PostgreSQL connection string</td>
                  <td><span className="docs-badge-yes">Yes</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">JWT_SECRET</td>
                  <td>Secret used to sign client authentication tokens</td>
                  <td><span className="docs-badge-yes">Yes</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">REDIS_URL</td>
                  <td>Redis connection for WebSocket pub/sub</td>
                  <td><span className="docs-badge-no">No</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION: CONNECT APP */}
        <section id="connect-app" className="scroll-mt-16">
          <div className="docs-cta-card">
            <div className="docs-cta-title">Connecting the Mobile App</div>
            <p className="docs-cta-desc">
              Once your server is running, open the CrypterChat app on your iOS or Android device. Navigate to <strong>Settings &gt; Advanced &gt; Custom Server</strong> and enter your server URL (e.g., <code>https://chat.yourdomain.com</code>).
            </p>
            <button className="docs-cta-btn" type="button">
              Download Client Config
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
