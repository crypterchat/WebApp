import payload from 'payload';
import type { NavLink } from '../lib/cms-types';
import config from '../payload.config';

async function updateDb() {
  await payload.init({
    config,
  });

  // Update Navigation
  const nav = await payload.findGlobal({ slug: 'navigation' });
  if (nav && nav.links) {
    const updatedLinks = nav.links.map((link: NavLink) => {
      if (link.label === 'Tutorials') {
        return { ...link, label: 'ChatScan', url: '/ChatScan' };
      }
      return link;
    });
    
    await payload.updateGlobal({
      slug: 'navigation',
      data: { links: updatedLinks },
    });
    console.log("Updated Navigation Global!");
  }

  // Seed Case Studies if empty
  const caseStudies = await payload.find({ collection: 'case-studies' });
  if (caseStudies.totalDocs === 0) {
    const data = [
      {
        title: 'ProtonMail – End-to-End Encryption for 100M+ Mailboxes',
        body: '"OpenPGP.js powers every encrypted email we send. It\'s the encryption layer our users trust without having to think about it."',
        isQuote: true,
        linkUrl: '/Who/document/protonmail',
        linkText: 'Read more',
        svgCode: '<svg width="130" height="36" viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg"><path d="M2 4 L2 32 L10 32 L10 20 L17 32 L26 32 L18 19 C22 17 24 14 24 10 C24 6 21 4 17 4 Z M10 10 L16 10 C17.8 10 19 11.2 19 13 C19 14.8 17.8 16 16 16 L10 16 Z" fill="#6d4aff"/><text x="30" y="24" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#6d4aff">Proton</text><text x="90" y="24" fontSize="17" fontWeight="400" fontFamily="-apple-system,sans-serif" fill="#333">Mail</text></svg>'
      },
      {
        title: 'Keybase Uses PGPJS for Cross-Platform Identity Verification',
        body: 'PGPJS gives Keybase the ability to verify cryptographic proofs across web, desktop, and mobile — with a single, auditable open-source codebase.',
        isQuote: false,
        linkUrl: '/Who/document/keybase',
        linkText: 'Read more',
        svgCode: '<svg width="120" height="36" viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="11" fill="none" stroke="#ff6c21" strokeWidth="2.5"/><circle cx="14" cy="14" r="5" fill="#ff6c21"/><rect x="22" y="12.5" width="14" height="3" rx="1.5" fill="#ff6c21"/><rect x="31" y="12.5" width="3" height="6" rx="1" fill="#ff6c21"/><rect x="26" y="12.5" width="3" height="5" rx="1" fill="#ff6c21"/><text x="40" y="21" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#ff6c21">Keybase</text></svg>'
      },
      {
        title: 'How Mailvelope Brings PGP to Gmail, Outlook & Yahoo',
        body: 'Mailvelope used PGPJS to build seamless PGP encryption directly into every major webmail client — all without the user ever leaving the browser.',
        isQuote: false,
        linkUrl: '/Who/document/mailvelope',
        linkText: 'Read more',
        svgCode: '<svg width="148" height="36" viewBox="0 0 148 36" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="7" width="28" height="22" rx="3.5" fill="none" stroke="#1a73e8" strokeWidth="2"/><polyline points="0,9 14,20 28,9" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round"/><text x="34" y="24" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#1a73e8">Mailvelope</text></svg>'
      },
      {
        title: 'Signal Desktop Relies on PGPJS for Key Exchange',
        body: 'Signal\'s desktop application uses PGPJS to manage PGP key exchange and verification for its linked device protocol.',
        isQuote: false,
        linkUrl: '/Who/document/signal',
        linkText: 'Read more',
        svgCode: '<svg width="110" height="36" viewBox="0 0 110 36" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#3a76f0"/><path d="M8 18 Q9 10 16 8 Q24 10 24 18 Q20 26 16 26 Q14 26 12 25 L8 28 L9 24 Q7 22 8 18Z" fill="#fff"/><text x="36" y="22" fontSize="17" fontWeight="600" fontFamily="-apple-system,sans-serif" fill="#3a76f0">Signal</text></svg>'
      },
      {
        title: 'Thunderbird Uses PGPJS for Built-in Email Encryption',
        body: 'Thunderbird 78+ dropped GnuPG in favor of a native implementation powered by an optimized build of PGPJS.',
        isQuote: false,
        linkUrl: '/Who/document/thunderbird',
        linkText: 'Read more',
        svgCode: '<svg width="130" height="36" viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="13" fill="#0a84ff"/><path d="M10 16 C10 12 13 9 16 9 C21 9 22 13 22 16 C22 20 19 23 16 23 C13 23 10 20 10 16Z" fill="#fff"/><circle cx="16" cy="16" r="4" fill="#0a84ff"/><text x="34" y="22" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#0a84ff">Thunderbird</text></svg>'
      },
    ];

    for (const doc of data) {
      await payload.create({
        collection: 'case-studies',
        data: doc,
      });
    }
    console.log("Seeded Case Studies!");
  }
  process.exit(0);
}
updateDb().catch(console.error);
