import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Link from "next/link";
import type { NavLink, BlogPost, FooterColumn, FooterLink } from "@/lib/cms-types";
import "../../globals.css";
import HomePageScripts from "../HomePageScripts";

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise });
  const postsResponse = await payload.find({
    collection: "blog-posts",
    sort: "-date",
    limit: 50,
  });
  
  const nav = await payload.findGlobal({ slug: "navigation" });
  const footer = await payload.findGlobal({ slug: "footer" });
  const announcement = await payload.findGlobal({ slug: "announcement-bar" });

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                    className={link?.url?.includes('blog') ? "active" : ""}
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
      </nav>

      <section className="blog-section" style={{ minHeight: '60vh', padding: '60px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', marginBottom: '40px', fontWeight: '800', letterSpacing: '-0.5px' }}>Blog</h1>
          <div className="blog-grid">
            {(postsResponse.docs as BlogPost[]).map((post) => (
              <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`blog-thumb ${post.thumbColor}`}>
                  {post.thumbIcon}
                </div>
                <div className="blog-info">
                  <div className="blog-tag">{post.tag}</div>
                  <div className="blog-title">{post.title}</div>
                  <div className="blog-excerpt">{post.excerpt}</div>
                  <div className="blog-meta">
                    <span>{post.author}</span>
                    <span className="blog-dot">·</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
            {postsResponse.docs.length === 0 && (
              <p>No blog posts found.</p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/crypterchat.svg" alt="CrypterChat" style={{ height: "30px", width: "auto" }} />
              </div>
              <p>{footer.brandDescription}</p>
              <div className="footer-social">
                <a href={footer.socialLinks?.github} className="social-btn">
                  <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
                <a href={footer.socialLinks?.twitter} className="social-btn">
                  <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
              </div>
            </div>
            {footer.columns?.map((col: FooterColumn, i: number) => (
              <div key={i} className="footer-col">
                <h4>{col?.title}</h4>
                <ul>
                  {col.links?.map((link: FooterLink, j: number) => (
                    <li key={j}><Link href={link?.url || "#"}>{link?.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-left">{footer.copyright}</div>
            <div className="footer-bottom-right">
              {footer.bottomLinks?.map((link: NavLink, i: number) => (
                <Link key={i} href={link?.url || "#"}>{link?.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
