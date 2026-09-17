import "./landing.css";

export const metadata = {
  title: "CrypterChat — Own Your Conversations | Secure Blockchain Messaging",
  description: "CrypterChat is a secure blockchain messaging platform. Chat privately, create communities and run your own encrypted chat server. The WhatsApp alternative built for privacy, ownership and control.",
  keywords: "secure messaging app, blockchain chat app, decentralized messaging, private chat server, self hosted messaging app, WhatsApp alternative, encrypted business chat, Web3 messaging app, private team communication, crypto community chat app",
};

export default function LandingPage() {
  return (
    <div className="lp">

      {/* ── NAVBAR ── */}
      <nav className="lp-nav">
        <a href="/landing" className="lp-nav-logo">
          <div className="lp-nav-logo-icon">💬</div>
          <span className="lp-nav-logo-text">CrypterChat</span>
        </a>
        <ul className="lp-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#self-hosted">Self-Hosted</a></li>
          <li><a href="#business">Business</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#developers">Developers</a></li>
        </ul>
        <div className="lp-nav-right">
          <a href="#waitlist" className="lp-btn-ghost" style={{padding:'9px 18px',fontSize:'13px'}}>Log in</a>
          <a href="#waitlist" className="lp-nav-cta">Start Free →</a>
        </div>
        <button className="lp-hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-bg"></div>
        <div className="lp-network-canvas"></div>
        <div className="lp-hero-inner">
          {/* Left */}
          <div>
            <div className="lp-hero-badge">
              <span className="lp-hero-badge-dot"></span>
              Now in Beta — Join 2,400+ users
            </div>
            <h1 className="lp-hero-h1">
              Own Your<br/>
              <span className="gradient-text">Conversations.</span>
            </h1>
            <p className="lp-hero-sub">
              CrypterChat is a secure blockchain messaging platform where you can chat privately, create communities and run your own encrypted chat server. Your data. Your rules.
            </p>
            <div className="lp-hero-ctas" id="waitlist">
              <a href="#" className="lp-btn-primary">🚀 Start Using CrypterChat</a>
              <a href="#self-hosted" className="lp-btn-ghost">⚙️ Run Your Own Server</a>
              <a href="#waitlist" className="lp-btn-outline">Join the Waitlist</a>
            </div>
            <div className="lp-hero-stats">
              <div>
                <div className="lp-hero-stat-num">E2E</div>
                <div className="lp-hero-stat-label">Encrypted</div>
              </div>
              <div>
                <div className="lp-hero-stat-num">100%</div>
                <div className="lp-hero-stat-label">Data Ownership</div>
              </div>
              <div>
                <div className="lp-hero-stat-num">Open</div>
                <div className="lp-hero-stat-label">Source & API</div>
              </div>
            </div>
          </div>

          {/* Right: Chat Mockup */}
          <div className="lp-chat-mockup">
            <div className="lp-chat-header">
              <div className="lp-chat-avatar">🔒</div>
              <div>
                <div className="lp-chat-name">CrypterChat Group</div>
                <div className="lp-chat-status">End-to-end encrypted</div>
              </div>
              <div className="lp-chat-actions">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="lp-chat-body">
              <div className="lp-msg-encrypted">🔐 Messages are end-to-end encrypted</div>
              <div className="lp-msg" style={{animationDelay:'0.5s'}}>
                <div className="lp-msg-av">A</div>
                <div>
                  <div className="lp-msg-bubble">Hey! Just set up our private CrypterChat server 🎉</div>
                  <div className="lp-msg-meta">Alice · 10:42 AM</div>
                </div>
              </div>
              <div className="lp-msg right">
                <div className="lp-msg-av green">B</div>
                <div>
                  <div className="lp-msg-bubble">Amazing! No Big Tech involved. Real ownership 🔐</div>
                  <div className="lp-msg-meta">10:43 AM · ✓✓</div>
                </div>
              </div>
              <div className="lp-msg">
                <div className="lp-msg-av">A</div>
                <div>
                  <div className="lp-msg-bubble">Blockchain identity verified. Feels great!</div>
                  <div className="lp-msg-meta">Alice · 10:44 AM</div>
                </div>
              </div>
              <div className="lp-msg right">
                <div className="lp-msg-av green">B</div>
                <div>
                  <div className="lp-msg-bubble">This is the future of private messaging 🚀</div>
                  <div className="lp-msg-meta">10:44 AM · ✓✓</div>
                </div>
              </div>
            </div>
            <div className="lp-chat-input">
              <input className="lp-chat-input-field" placeholder="Send an encrypted message..." readOnly />
              <button className="lp-chat-send">➤</button>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── PROBLEM ── */}
      <section className="lp-problem">
        <div className="lp-problem-inner">
          <div className="lp-label">The Problem</div>
          <h2 className="lp-h2">Big Tech owns your <span className="g">conversations.</span></h2>
          <p className="lp-subtitle">Every message you send on WhatsApp, Telegram or Discord goes through servers owned by corporations. You have no control, no ownership, no real privacy.</p>
          <div className="lp-problem-grid">
            {[
              { icon: '🏢', title: 'Centralized Servers', body: 'Your messages live on servers controlled by mega-corporations. They can be accessed, sold, or shut down at any time.' },
              { icon: '👁️', title: 'No Real Privacy', body: 'Metadata is collected, behavior is tracked, and your data is used for advertising and profiling without your real consent.' },
              { icon: '🔓', title: 'Zero Ownership', body: 'You do not own your account, your data, or your community. Any platform can ban you and erase everything overnight.' },
              { icon: '⛔', title: 'Limited Control for Businesses', body: 'Companies cannot control their team communication, set their own policies, or ensure compliance on third-party platforms.' },
              { icon: '🌐', title: 'Vendor Lock-in', body: 'You are locked in. Migrating your data, contacts and history to another platform is difficult or impossible by design.' },
              { icon: '⚠️', title: 'Regulatory Risks', body: 'Governments can request user data from centralized providers. Your private conversations are never truly safe.' },
            ].map((p, i) => (
              <div key={i} className="lp-problem-card">
                <div className="lp-problem-icon">{p.icon}</div>
                <div className="lp-problem-title">{p.title}</div>
                <div className="lp-problem-body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── SOLUTION ── */}
      <section className="lp-section">
        <div className="lp-solution-grid">
          <div>
            <div className="lp-label">The Solution</div>
            <h2 className="lp-h2">Messaging built for <span className="g">ownership.</span></h2>
            <p className="lp-subtitle">CrypterChat puts you back in control. Built on blockchain principles with full self-hosting support, real encryption and open infrastructure.</p>
            <div className="lp-solution-points">
              {[
                { icon: '🔗', title: 'Blockchain-Powered Identity', body: 'Your identity is verified on-chain. No central authority can impersonate you, delete your account or revoke your access.' },
                { icon: '🔐', title: 'True End-to-End Encryption', body: 'Messages are encrypted on your device. Not even CrypterChat can read them. Zero knowledge by design.' },
                { icon: '🖥️', title: 'Self-Hosted Infrastructure', body: 'Deploy your own CrypterChat server in minutes. Full control over your data, users and policies.' },
                { icon: '🏗️', title: 'Open & Interoperable', body: 'Full API, SDK and webhook support. Build on top of CrypterChat or integrate with your existing tools.' },
              ].map((s, i) => (
                <div key={i} className="lp-solution-point">
                  <div className="lp-solution-point-icon">{s.icon}</div>
                  <div>
                    <div className="lp-solution-point-title">{s.title}</div>
                    <div className="lp-solution-point-body">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-solution-visual">
            <div style={{marginBottom:'12px',fontSize:'13px',fontWeight:'700',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'1px'}}>Your Data Security</div>
            {[
              { label: 'Message Encryption', val: '256-bit AES', pct: '100%', color: 'var(--green)' },
              { label: 'Identity Verification', val: 'Blockchain', pct: '100%', color: 'var(--primary)' },
              { label: 'Data Ownership', val: 'Full Control', pct: '100%', color: 'var(--purple)' },
              { label: 'Third-Party Access', val: 'None', pct: '0%', color: '#ff4444' },
            ].map((s, i) => (
              <div key={i} className="lp-mini-stat">
                <div className="lp-mini-stat-label">{s.label}</div>
                <div className="lp-mini-stat-bar">
                  <div className="lp-mini-stat-fill" style={{width:s.pct, background:s.color}}></div>
                </div>
                <div className="lp-mini-stat-val">{s.val}</div>
              </div>
            ))}
            <div style={{marginTop:'20px',padding:'16px',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:'12px',fontSize:'13px',color:'var(--green)',display:'flex',gap:'10px',alignItems:'center'}}>
              <span>✓</span> Privacy-first architecture — no backdoors, no exceptions
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── FEATURES ── */}
      <section className="lp-features-bg" id="features">
        <div className="lp-section">
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <div className="lp-label" style={{justifyContent:'center'}}>Features</div>
            <h2 className="lp-h2">Everything you need to <span className="g">communicate securely.</span></h2>
            <p className="lp-subtitle" style={{margin:'0 auto'}}>A complete secure messaging platform — for individuals, teams, developers and enterprises.</p>
          </div>
          <div className="lp-features-grid">
            {[
              { icon: '🔒', color: 'blue', title: 'End-to-End Encrypted Chats', body: 'Every private conversation is fully encrypted. Messages exist only between you and your recipient — nobody else.' },
              { icon: '👥', color: 'purple', title: 'Group Chats & Communities', body: 'Create encrypted group chats, community channels and broadcast lists. Scale from a team of 2 to communities of thousands.' },
              { icon: '📎', color: 'blue', title: 'Voice Notes, Media & Files', body: 'Send voice notes, images, videos and files of any size — all end-to-end encrypted and stored on your infrastructure.' },
              { icon: '⛓️', color: 'purple', title: 'Blockchain Identity & Verification', body: 'Verify who you are talking to using on-chain identity. No more impersonation, fake accounts or spoofed messages.' },
              { icon: '🖥️', color: 'green', title: 'Self-Hosted Private Servers', body: 'Deploy your own CrypterChat server anywhere. Full control over all data, users, retention policies and security settings.' },
              { icon: '🏢', color: 'blue', title: 'Business & Team Workspaces', body: 'Dedicated workspaces for teams. Organize by departments, projects or roles with fine-grained permission controls.' },
              { icon: '⚙️', color: 'purple', title: 'Admin Dashboard', body: 'Powerful admin panel for server owners. Manage users, audit logs, content policies, backups and compliance reports.' },
              { icon: '🔌', color: 'green', title: 'API, SDK & Webhooks', body: 'Full REST API, JavaScript/Python SDK, webhooks and bot support. Build integrations, automate workflows and extend functionality.' },
              { icon: '📱', color: 'blue', title: 'Web, iOS & Android', body: 'Available on all platforms with a consistent, fast experience. Sync seamlessly across all your devices in real time.' },
              { icon: '💾', color: 'purple', title: 'Secure Backup & Recovery', body: 'Encrypted backup and recovery options. Never lose your message history — even when switching servers or devices.' },
              { icon: '🛡️', color: 'green', title: 'Advanced Privacy Controls', body: 'Disappearing messages, read receipts control, screenshot detection and fine-grained contact privacy settings.' },
              { icon: '🌍', color: 'blue', title: 'Multi-Language & Custom Branding', body: 'Deploy CrypterChat with your own branding, custom domain and localized experience for your community or business.' },
            ].map((f, i) => (
              <div key={i} className="lp-feature-card">
                <div className={`lp-feature-icon ${f.color}`}>{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-body">{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── SELF-HOSTED ── */}
      <section className="lp-server-section" id="self-hosted">
        <div className="lp-server-inner">
          <div className="lp-server-grid">
            <div>
              <div className="lp-label">Self-Hosted Server</div>
              <h2 className="lp-h2">Your server.<br/>Your data.<br/><span className="g">Your rules.</span></h2>
              <p style={{fontSize:'1.05rem',color:'var(--muted)',lineHeight:'1.7',marginBottom:'32px'}}>
                Deploy a full private CrypterChat server in minutes. Perfect for companies, crypto communities, Web3 projects, schools or any organization that wants real control over their communication infrastructure.
              </p>
              <div className="lp-server-points">
                {[
                  { icon: '🏠', label: 'Full Ownership' },
                  { icon: '🔒', label: 'Private Infrastructure' },
                  { icon: '🎨', label: 'Custom Branding' },
                  { icon: '📊', label: 'Admin Dashboard' },
                  { icon: '⚡', label: 'No Central Dependency' },
                  { icon: '📜', label: 'Compliance-Ready' },
                  { icon: '👥', label: 'Community Moderation' },
                  { icon: '🌐', label: 'Custom Domain' },
                ].map((p, i) => (
                  <div key={i} className="lp-server-point">
                    <span className="lp-server-point-icon">{p.icon}</span>
                    {p.label}
                  </div>
                ))}
              </div>
              <div style={{marginTop:'36px',display:'flex',gap:'14px',flexWrap:'wrap'}}>
                <a href="#" className="lp-btn-primary">⚙️ Deploy Your Server</a>
                <a href="#" className="lp-btn-ghost">Read Documentation</a>
              </div>
            </div>
            <div className="lp-terminal">
              <div className="lp-terminal-bar">
                <div className="lp-terminal-dots"><span></span><span></span><span></span></div>
                <span className="lp-terminal-title">bash — crypterchat-deploy</span>
              </div>
              <div className="lp-terminal-body">
                <div className="lp-t-line"><span className="lp-t-prompt">$</span><span className="lp-t-cmd"> npx crypterchat-server init</span></div>
                <div style={{height:'8px'}}></div>
                <div className="lp-t-line"><span className="lp-t-info">▶ Initializing CrypterChat Server...</span></div>
                <div className="lp-t-line"><span className="lp-t-success">✓ Blockchain identity layer loaded</span></div>
                <div className="lp-t-line"><span className="lp-t-success">✓ Encryption keys generated (AES-256)</span></div>
                <div className="lp-t-line"><span className="lp-t-success">✓ Database initialized</span></div>
                <div className="lp-t-line"><span className="lp-t-success">✓ Admin panel configured</span></div>
                <div style={{height:'8px'}}></div>
                <div className="lp-t-line"><span className="lp-t-prompt">$</span><span className="lp-t-cmd"> crypterchat-server start --port 443</span></div>
                <div style={{height:'8px'}}></div>
                <div className="lp-t-line"><span className="lp-t-success">✓ CrypterChat Server running!</span></div>
                <div className="lp-t-line"><span className="lp-t-info">  🌐 https://chat.yourcompany.com</span></div>
                <div className="lp-t-line"><span className="lp-t-info">  ⚙️  Admin: https://chat.yourcompany.com/admin</span></div>
                <div className="lp-t-line"><span className="lp-t-info">  👥 Users: Unlimited</span></div>
                <div style={{height:'8px'}}></div>
                <div className="lp-t-line"><span className="lp-t-prompt">$</span> <span className="lp-t-cursor"></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── BLOCKCHAIN ── */}
      <section className="lp-chain-section">
        <div className="lp-section">
          <div className="lp-chain-grid">
            <div className="lp-chain-visual">
              {[
                { icon: '🆔', label: 'Your Identity', hash: '0x4a2f...e91c', color: 'var(--primary)' },
                { icon: '🔐', label: 'Message Sent', hash: '0x8b3d...f42a', color: 'var(--purple)' },
                { icon: '✅', label: 'Signature Verified', hash: '0x1c9e...a77f', color: 'var(--green)' },
                { icon: '📬', label: 'Delivered & Decrypted', hash: '0x5f6b...c23d', color: 'var(--primary)' },
              ].map((b, i) => (
                <div key={i}>
                  <div className="lp-chain-block">
                    <div className="lp-chain-block-icon" style={{background:`${b.color}20`,border:`1px solid ${b.color}40`}}>{b.icon}</div>
                    <div>
                      <div style={{fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{b.label}</div>
                      <div className="lp-chain-block-hash">{b.hash}</div>
                    </div>
                    <div style={{marginLeft:'auto',padding:'4px 10px',background:`${b.color}15`,border:`1px solid ${b.color}30`,borderRadius:'100px',fontSize:'11px',color:b.color,fontWeight:'700'}}>Verified</div>
                  </div>
                  {i < 3 && <div className="lp-chain-connector"></div>}
                </div>
              ))}
            </div>
            <div>
              <div className="lp-label">Blockchain</div>
              <h2 className="lp-h2">Trust without a <span className="g">middleman.</span></h2>
              <p style={{fontSize:'1.05rem',color:'var(--muted)',lineHeight:'1.7',marginBottom:'28px'}}>
                CrypterChat uses blockchain technology to give you something traditional messaging apps cannot: verifiable trust without relying on a central authority.
              </p>
              {[
                { title: 'Verified Identity', body: 'Your account is anchored to a blockchain identity. Anyone you chat with can verify you are really you — not an impostor.' },
                { title: 'Transparent & Auditable', body: 'Key operations like identity registration and key rotation are recorded transparently. No hidden changes behind your back.' },
                { title: 'Decentralized Communication', body: 'No single company owns the network. CrypterChat is designed to be resilient, censorship-resistant and community-driven.' },
                { title: 'Real Ownership', body: 'Your identity, data and communities belong to you — not to a platform that can revoke access or disappear tomorrow.' },
              ].map((b, i) => (
                <div key={i} style={{display:'flex',gap:'14px',marginBottom:'20px',alignItems:'flex-start'}}>
                  <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--primary)',marginTop:'6px',flexShrink:0,boxShadow:'0 0 8px var(--primary)'}}></div>
                  <div>
                    <div style={{fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{b.title}</div>
                    <div style={{fontSize:'14px',color:'var(--muted)',lineHeight:'1.6'}}>{b.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── BUSINESS ── */}
      <section className="lp-business-section" id="business">
        <div className="lp-business-inner">
          <div style={{textAlign:'center',marginBottom:'24px'}}>
            <div className="lp-label" style={{justifyContent:'center'}}>Business</div>
            <h2 className="lp-h2" style={{maxWidth:'700px',margin:'0 auto 16px'}}>
              Communication built for <span className="g">serious teams.</span>
            </h2>
            <p style={{fontSize:'1.05rem',color:'var(--muted)',maxWidth:'580px',margin:'0 auto',lineHeight:'1.7'}}>
              CrypterChat for Business gives teams and communities a secure private communication network — without giving control to Big Tech.
            </p>
          </div>
          <div className="lp-biz-grid">
            {[
              { icon: '🏢', title: 'Enterprise Teams', body: 'Internal communication with SSO, audit logs and compliance tools.' },
              { icon: '⛓️', title: 'Web3 Projects', body: 'DAO governance, crypto community chat and token-gated channels.' },
              { icon: '🎓', title: 'Schools & Universities', body: 'Private, safe communication for students and staff — GDPR compliant.' },
              { icon: '🔐', title: 'Security-First Orgs', body: 'For organizations where data leaks are not an option.' },
              { icon: '🌍', title: 'Global Communities', body: 'Run massive communities with moderation tools and custom rules.' },
              { icon: '⚡', title: 'Startups & Agencies', body: 'Deploy fast, scale easily, keep your communications private from day one.' },
            ].map((b, i) => (
              <div key={i} className="lp-biz-card">
                <div className="lp-biz-card-icon">{b.icon}</div>
                <div className="lp-biz-card-title">{b.title}</div>
                <div className="lp-biz-card-body">{b.body}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'48px',display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="#" className="lp-btn-primary">Request a Business Demo</a>
            <a href="#pricing" className="lp-btn-ghost">View Business Pricing</a>
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── PRICING ── */}
      <section className="lp-pricing-bg" id="pricing">
        <div className="lp-pricing-inner">
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <div className="lp-label" style={{justifyContent:'center'}}>Pricing</div>
            <h2 className="lp-h2">Simple, transparent <span className="g">pricing.</span></h2>
            <p className="lp-subtitle" style={{margin:'0 auto'}}>Start free. Scale when you're ready. No hidden fees, no surprise charges.</p>
          </div>
          <div className="lp-pricing-grid">
            {[
              {
                name: 'Free', amount: '€0', period: '/forever',
                features: ['Private encrypted chats', 'Basic group chats (up to 10)', 'Voice & media sharing', 'Blockchain identity', 'iOS & Android apps'],
                btn: 'Start Free', btnStyle: 'outline', featured: false,
              },
              {
                name: 'Pro', amount: '€7', period: '/month', badge: 'Most Popular',
                features: ['Everything in Free', 'Unlimited groups', '10GB media storage', 'Priority encryption', 'Premium identity badge', 'Message scheduling', 'Advanced privacy controls'],
                btn: 'Get Pro', btnStyle: 'solid', featured: true,
              },
              {
                name: 'Business', amount: '€29', period: '/month',
                features: ['Everything in Pro', 'Team workspace', 'Admin dashboard', 'Custom branding', 'SSO & user management', 'Audit logs', 'API access (1M calls/mo)'],
                btn: 'Start Business', btnStyle: 'outline', featured: false,
              },
              {
                name: 'Self-Hosted', amount: '€99', period: '/month',
                features: ['Full server deployment', 'Unlimited users', 'Your own infrastructure', 'Custom domain', 'Full data ownership', 'Priority support', 'White-label ready'],
                btn: 'Deploy Server', btnStyle: 'outline', featured: false,
              },
              {
                name: 'Enterprise', amount: 'Custom', period: '',
                features: ['Everything in Self-Hosted', 'Dedicated infrastructure', 'SLA guarantees', 'Compliance package', 'Custom integrations', 'Onboarding & training', '24/7 dedicated support'],
                btn: 'Contact Sales', btnStyle: 'outline', featured: false,
              },
            ].map((p, i) => (
              <div key={i} className={`lp-price-card${p.featured ? ' featured' : ''}`}>
                {p.badge && <div className="lp-price-badge">{p.badge}</div>}
                <div className="lp-price-name">{p.name}</div>
                <div className="lp-price-amount">{p.amount}</div>
                <div className="lp-price-period">{p.period || '\u00a0'}</div>
                <ul className="lp-price-features">
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <a href="#" className={`lp-price-btn ${p.btnStyle}`}>{p.btn}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── TRUST ── */}
      <section className="lp-trust-bg">
        <div className="lp-trust-inner">
          <div className="lp-label" style={{justifyContent:'center'}}>Trust & Security</div>
          <h2 className="lp-h2" style={{textAlign:'center',marginBottom:'12px'}}>Built for privacy. <span className="g">By design.</span></h2>
          <p className="lp-subtitle" style={{margin:'0 auto 60px',textAlign:'center'}}>Not just a privacy promise — a privacy architecture.</p>
          <div className="lp-trust-grid">
            {[
              { icon: '🏗️', title: 'Privacy-First Architecture', body: 'Encryption is not optional — it is built into every layer. Your messages cannot be read by anyone except the intended recipient.' },
              { icon: '🚫', title: 'No Unnecessary Data Collection', body: 'We do not collect, sell or monetize your data. CrypterChat is built on a subscription model, not surveillance capitalism.' },
              { icon: '🖥️', title: 'User-Controlled Infrastructure', body: 'Self-hosted option gives you complete control over where your data lives, who can access it and how long it is retained.' },
              { icon: '📖', title: 'Transparent Security Model', body: 'Our security architecture is documented and open to review. No security through obscurity — real cryptographic guarantees.' },
              { icon: '🛠️', title: 'Business-Ready Admin Tools', body: 'Compliance reports, audit logs, role-based access and retention policies make CrypterChat ready for regulated industries.' },
              { icon: '🔌', title: 'Open API & Integrations', body: 'Our open API means you are never locked in. Integrate with your existing tools, automate workflows and build custom solutions.' },
            ].map((t, i) => (
              <div key={i} className="lp-trust-card">
                <div className="lp-trust-icon">{t.icon}</div>
                <div>
                  <div className="lp-trust-title">{t.title}</div>
                  <div className="lp-trust-body">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── DEVELOPER ── */}
      <section className="lp-dev-section" id="developers">
        <div className="lp-dev-inner">
          <div className="lp-dev-grid">
            <div>
              <div className="lp-label">For Developers</div>
              <h2 className="lp-h2">Build on <span className="g">CrypterChat.</span></h2>
              <p style={{fontSize:'1.05rem',color:'var(--muted)',lineHeight:'1.7',marginBottom:'24px'}}>
                CrypterChat is a platform, not just an app. Build bots, integrations, custom clients and entire communication products on top of our secure, open infrastructure.
              </p>
              {[
                { title: 'REST API', body: 'Full programmatic access to messages, users, groups and server settings.' },
                { title: 'JavaScript & Python SDK', body: 'Official SDKs to get you building fast. Typed, documented and open source.' },
                { title: 'Webhooks', body: 'Real-time event notifications. React to messages, joins, reactions and more.' },
                { title: 'Bot Framework', body: 'Build powerful bots and AI assistants that live inside your CrypterChat server.' },
              ].map((d, i) => (
                <div key={i} style={{display:'flex',gap:'12px',marginBottom:'18px',alignItems:'flex-start'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--purple)',marginTop:'7px',flexShrink:0}}></div>
                  <div>
                    <div style={{fontSize:'15px',fontWeight:'700',marginBottom:'3px'}}>{d.title}</div>
                    <div style={{fontSize:'13px',color:'var(--muted)',lineHeight:'1.5'}}>{d.body}</div>
                  </div>
                </div>
              ))}
              <div className="lp-dev-tags">
                {['REST API','WebSocket','SDK','Webhooks','Bots','Docker','Self-Host Docs','OpenAPI Spec','GraphQL (coming)'].map((t, i) => (
                  <div key={i} className="lp-dev-tag">{t}</div>
                ))}
              </div>
              <div style={{marginTop:'32px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <a href="#" className="lp-btn-primary">View API Docs</a>
                <a href="#" className="lp-btn-ghost">GitHub →</a>
              </div>
            </div>
            <div className="lp-code-block">
              <div className="lp-code-bar">
                <div className="lp-code-dots"><span></span><span></span><span></span></div>
                <span className="lp-code-file">crypterchat-api.js</span>
              </div>
              <div className="lp-code-body">
                <div><span className="lp-cc">// Send an encrypted message via API</span></div>
                <div><span className="lp-ck">import</span> {'{ CrypterChat }'} <span className="lp-ck">from</span> <span className="lp-cs">'@crypterchat/sdk'</span>;</div>
                <div>&nbsp;</div>
                <div><span className="lp-ck">const</span> <span className="lp-cv">client</span> = <span className="lp-ck">new</span> <span className="lp-cf">CrypterChat</span>({'{'}</div>
                <div>&nbsp;&nbsp;<span className="lp-cv">serverUrl</span>: <span className="lp-cs">'https://chat.yourserver.com'</span>,</div>
                <div>&nbsp;&nbsp;<span className="lp-cv">apiKey</span>: process.<span className="lp-cv">env</span>.<span className="lp-cv">CRYPTER_API_KEY</span>,</div>
                <div>{'}'});</div>
                <div>&nbsp;</div>
                <div><span className="lp-cc">// Send encrypted message to a channel</span></div>
                <div><span className="lp-ck">const</span> <span className="lp-cv">msg</span> = <span className="lp-ck">await</span> client.<span className="lp-cv">messages</span>.<span className="lp-cf">send</span>({'{'}</div>
                <div>&nbsp;&nbsp;<span className="lp-cv">channel</span>: <span className="lp-cs">'#general'</span>,</div>
                <div>&nbsp;&nbsp;<span className="lp-cv">text</span>: <span className="lp-cs">'Hello from the API! 🔐'</span>,</div>
                <div>&nbsp;&nbsp;<span className="lp-cv">encrypted</span>: <span className="lp-ck">true</span>,</div>
                <div>{'}'});</div>
                <div>&nbsp;</div>
                <div><span className="lp-cc">// Listen for new messages via webhook</span></div>
                <div>client.<span className="lp-cv">webhooks</span>.<span className="lp-cf">on</span>(<span className="lp-cs">'message.received'</span>, <span className="lp-cv">msg</span> <span className="lp-ck">=&gt;</span> {'{'}</div>
                <div>&nbsp;&nbsp;console.<span className="lp-cf">log</span>(<span className="lp-cs">`New: </span>${'${msg.text}'}<span className="lp-cs">`</span>);</div>
                <div>{'}'});</div>
                <div>&nbsp;</div>
                <div><span className="lp-cc">// ✓ Message delivered, encrypted & verified</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider"></div>

      {/* ── FINAL CTA ── */}
      <section className="lp-cta-section">
        <h2 className="lp-cta-h2">
          Start building your private<br/>
          <span style={{background:'linear-gradient(135deg,var(--primary),var(--purple),#ff6bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
            communication network today.
          </span>
        </h2>
        <p className="lp-cta-sub">
          The future of private messaging is decentralized, encrypted and yours. Join thousands of users, teams and communities who chose real control.
        </p>
        <div className="lp-cta-btns">
          <a href="#" className="lp-btn-primary" style={{fontSize:'16px',padding:'16px 32px'}}>🚀 Join Waitlist</a>
          <a href="#" className="lp-btn-ghost" style={{fontSize:'16px',padding:'16px 32px'}}>✨ Start Free</a>
          <a href="#self-hosted" className="lp-btn-ghost" style={{fontSize:'16px',padding:'16px 32px'}}>⚙️ Deploy Server</a>
          <a href="#" className="lp-btn-outline" style={{fontSize:'16px',padding:'16px 32px'}}>💼 Contact Sales</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-grid">
            <div>
              <a href="/landing" className="lp-nav-logo" style={{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
                <div className="lp-nav-logo-icon">💬</div>
                <span className="lp-nav-logo-text">CrypterChat</span>
              </a>
              <p className="lp-footer-brand-desc">The secure blockchain messaging platform. Chat privately, create communities and run your own encrypted chat server.</p>
              <div className="lp-footer-social">
                <a href="#" className="lp-footer-social-btn">𝕏</a>
                <a href="#" className="lp-footer-social-btn">💻</a>
                <a href="#" className="lp-footer-social-btn">💬</a>
              </div>
            </div>
            <div>
              <div className="lp-footer-col-title">Product</div>
              <ul className="lp-footer-col-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#self-hosted">Self-Hosted</a></li>
                <li><a href="#business">Business</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>
            <div>
              <div className="lp-footer-col-title">Developers</div>
              <ul className="lp-footer-col-links">
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">SDK Reference</a></li>
                <li><a href="#">Webhooks</a></li>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Status Page</a></li>
              </ul>
            </div>
            <div>
              <div className="lp-footer-col-title">Company</div>
              <ul className="lp-footer-col-links">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <div className="lp-footer-copy">© 2025 CrypterChat. All rights reserved. Built for privacy, ownership and control.</div>
            <div className="lp-footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
