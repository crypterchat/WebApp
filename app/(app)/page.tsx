import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Link from "next/link";
import type { NavLink, BlogPost, CaseStudy, Feature, Stat } from "@/lib/cms-types";
import "../globals.css";
import HomePageScripts from "./HomePageScripts";
import AppleFooter from "../components/AppleFooter";
import TeenSafetySection from "../components/TeenSafetySection";
import HeroMessenger from "../components/HeroMessenger";
import FileSharingSection from "../components/FileSharingSection";
import WalletConnectNav from "../components/WalletConnectNav";

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });
  const nav = await payload.findGlobal({ slug: "navigation" });
  const footer = await payload.findGlobal({ slug: "footer" });
  const announcement = await payload.findGlobal({ slug: "announcement-bar" });
  const homepage = await payload.findGlobal({ slug: "homepage" });
  
  const blogPostsResponse = await payload.find({
    collection: "blog-posts",
    sort: "-date",
    limit: 3,
  });

  const { docs: caseStudies } = await payload.find({
    collection: 'case-studies',
    limit: 10,
  });

  const { docs: features } = await payload.find({
    collection: 'features',
    limit: 10,
  });

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderAnnouncement = (content: any) => {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (content?.root?.children) {
      const extractText = (nodes: any[]): string => {
        return nodes
          .map((node: any) => {
            if (node.text) return node.text;
            if (node.children) return extractText(node.children);
            return "";
          })
          .join("");
      };
      return extractText(content.root.children);
    }
    return "";
  };

  const announcementHtml = renderAnnouncement(announcement?.content);

  return (
    <>
      <HomePageScripts />
      {/* TOPBAR */}
      {announcement?.enabled && announcementHtml && (
        <div className="topbar">
          <div dangerouslySetInnerHTML={{ __html: announcementHtml }} />
        </div>
      )}

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="nav-left">
            <Link href="/" className="logo">
              <img src="/crypterchat.svg" alt="CrypterChat" style={{ height: "30px", width: "auto" }} />
            </Link>
            <ul className="nav-links">
              {nav.links
                ?.filter((link: NavLink) => link?.label?.toLowerCase() !== "blog")
                .map((link: NavLink, i: number) => (
                  <li key={i}>
                    <a 
                      href={link?.url || "#"} 
                      className={i === 0 ? "active" : ""}
                      target={link?.isExternal ? "_blank" : undefined}
                    >
                      {link?.label} {link?.isExternal && <span className="ext-icon">↗</span>}
                    </a>
                  </li>
                ))}
              <li className="wallet-connect-li">
                <WalletConnectNav />
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <a href={nav.githubUrl} target="_blank" className="nav-icon-btn" title="GitHub">
              <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href={nav.npmUrl} target="_blank" className="nav-icon-btn" title="npm">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><path d="M7 18v-6h4v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="15" y1="12" x2="15" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </a>
            <button className="nav-icon-btn theme-toggle" title="Toggle theme">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
            <div className="search-pill">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
              <span className="kbd">⌘K</span>
            </div>
            <button className="hamburger" id="hamburger" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div className="mobile-nav" id="mobileNav">
          {nav.links
            ?.filter((link: NavLink) => link?.label?.toLowerCase() !== "blog")
            .map((link: NavLink, i: number) => (
              <a key={i} href={link?.url || "#"} target={link?.isExternal ? "_blank" : undefined}>
                {link?.label} {link?.isExternal && "↗"}
              </a>
            ))}
          <div className="mobile-wallet-nav-container">
            <WalletConnectNav isMobile={true} />
          </div>
          <a href={nav.githubUrl} target="_blank">GitHub ↗</a>
        </div>
      </nav>

      {/* HERO SECTION — MESSENGER STYLE */}
      <HeroMessenger
        eyebrow="Qr-codes"
        title={"Own Your\nConversations.\nYour Server.\nYour Rules."}
        description="Kom in contact met mensen die je in het echte leven ontmoet door hun QR-code in Messenger te scannen of die van jou te delen. Privé, versleuteld en op je eigen server."
        appStoreUrl="#"
        googlePlayUrl="#"
      />


      {/* CASE STUDY CARDS */}
      <section className="cards-section">
        <div className="container">
          <p className="section-label">Who uses CrypterChat</p>
          <div className="cards-grid">
            {(caseStudies as CaseStudy[]).map((cs) => (
              <div className="card" key={cs.id}>
                <div className="card-logo" dangerouslySetInnerHTML={{ __html: cs.svgCode || '' }}>
                </div>
                <h2 className="card-title">{cs.title}</h2>
                <p className={cs.isQuote ? "card-quote" : "card-body"}>{cs.body}</p>
                <a href={`/Who/document/${cs.id}`} className="card-link">{cs.linkText || 'Read more'} <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILE SHARING / FEATURES — MESSENGER STYLE */}
      <FileSharingSection
        eyebrow="Bestanden delen"
        title={"Grote bestanden\ndelen"}
        description="Vergeet e-mail. Of het nu een Word-, PDF- of Excel-document is, je kunt bestanden tot 100 MB verzenden via Messenger."
      />


      {/* CODE SECTION */}
      <section className="code-section">
        <div className="container">
          <div className="code-grid">
            <div className="code-text">
              <h2>Run your own private chat server.</h2>
              <p>CrypterChat is a secure blockchain messaging platform — inspired by WhatsApp, but built for real privacy, ownership and control. Self-host it in minutes.</p>
              <a href="/server" className="btn btn-primary">Deploy Your Server</a>
              <a href="/docs" className="btn btn-outline">View Documentation</a>
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="/proofofwork.svg"
                alt="CrypterChat Proof of Work"
                className="w-full max-w-[480px] h-auto object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {homepage.stats?.map((stat: Stat, i: number) => (
              <div key={i}>
                <div className="stat-num">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEEN SAFETY / MESSAGE DELIVERY */}
      <TeenSafetySection />

      {/* CTA BANNER */}
      {homepage.cta && (
        <section className="cta-section">
          <div className="container">
            <h2>{homepage.cta.title}</h2>
            <p>{homepage.cta.body}</p>
            <div className="cta-buttons">
              <a href={homepage.cta.primaryBtnUrl} className="btn-white btn">{homepage.cta.primaryBtnText}</a>
              <a href={homepage.cta.secondaryBtnUrl} className="btn-ghost btn">{homepage.cta.secondaryBtnText}</a>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <AppleFooter footer={footer} />
    </>
  );
}
