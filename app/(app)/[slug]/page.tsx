import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { NavLink } from "@/lib/cms-types";
import HomePageScripts from "../HomePageScripts";
import AppleFooter from "../../components/AppleFooter";

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  
  const pagesResponse = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (pagesResponse.docs.length === 0) {
    return notFound();
  }

  const page = pagesResponse.docs[0];

  const nav = await payload.findGlobal({ slug: "navigation" });
  const footer = await payload.findGlobal({ slug: "footer" });
  const announcement = await payload.findGlobal({ slug: "announcement-bar" });

  return (
    <>
      <HomePageScripts />
      {/* TOPBAR */}
      {announcement.enabled && (
        <div className="topbar">
          <div dangerouslySetInnerHTML={{ __html: announcement.content || '' }} />
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
              {nav.links?.map((link: NavLink, i: number) => (
                <li key={i}>
                  <Link 
                    href={link?.url || "#"} 
                    className={link?.url?.includes(slug) ? "active" : ""}
                    target={link?.isExternal ? "_blank" : undefined}
                  >
                    {link?.label} {link?.isExternal && <span className="ext-icon">↗</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-right">
            <a href={nav.githubUrl} target="_blank" className="nav-icon-btn" title="GitHub">
              <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
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
          {nav.links?.map((link: NavLink, i: number) => (
            <Link key={i} href={link?.url || "#"} target={link?.isExternal ? "_blank" : undefined}>
              {link?.label} {link?.isExternal && "↗"}
            </Link>
          ))}
          <a href={nav.githubUrl} target="_blank">GitHub ↗</a>
        </div>
      </nav>

      <section style={{ padding: '60px 0', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1.2', marginBottom: '40px', letterSpacing: '-1px' }}>
            {page.title}
          </h1>
          <div className="page-content" style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-color, #202124)' }}>
            {/* Typically we'd render the richText content here */}
            <p>This is the {page.title} page. Content can be edited in Payload CMS.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AppleFooter footer={footer} />
    </>
  );
}
