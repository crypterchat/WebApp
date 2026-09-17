import React from 'react';
import Link from 'next/link';
import type { Footer, FooterColumn, FooterLink } from '@/lib/cms-types';

export default function AppleFooter({ footer }: { footer: Footer }) {
  return (
    <footer className="premium-footer">
      <div className="premium-footer-inner">
        
        {/* Top Description & Social */}
        {footer.brandDescription && (
          <div className="pf-top">
            <p className="pf-brand-desc">
              {footer.brandDescription}
            </p>
            <div className="pf-social">
              <span className="pf-social-label">Follow Crypterchat:</span>
              <div className="pf-social-links">
                {footer.socialLinks?.github && <a href={footer.socialLinks.github} target="_blank">GitHub</a>}
                {footer.socialLinks?.twitter && <a href={footer.socialLinks.twitter} target="_blank">Twitter</a>}
                {footer.socialLinks?.npm && <a href={footer.socialLinks.npm} target="_blank">npm</a>}
                {footer.socialLinks?.discord && <a href={footer.socialLinks.discord} target="_blank">Discord</a>}
              </div>
            </div>
          </div>
        )}

        {/* Columns */}
        <div className="pf-columns">
          {footer.columns?.map((col: FooterColumn, i: number) => (
            <div key={i} className="pf-col">
              <h3 className="pf-col-title">{col?.title}</h3>
              <ul className="pf-col-links">
                {col.links?.map((link: FooterLink, j: number) => (
                  <li key={j}>
                    <Link href={link?.url || "#"}>{link?.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom / Copyright */}
        <div className="pf-bottom">
          <div className="pf-bottom-main">
            <div className="pf-copyright">{footer.copyright}</div>
            <div className="pf-legal-links">
              {footer.bottomLinks?.map((link: FooterLink, i: number) => (
                <React.Fragment key={i}>
                  <Link href={link?.url || "#"}>{link?.label}</Link>
                  {footer.bottomLinks && i < footer.bottomLinks.length - 1 && <span className="pf-divider">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="pf-locale">
            <span>United States</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
