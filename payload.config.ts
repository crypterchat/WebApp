import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Media } from './collections/Media';
import { CaseStudies } from './collections/CaseStudies';
import { Features } from './collections/Features';
import { BlogPosts } from './collections/BlogPosts';

import { AnnouncementBar } from './globals/AnnouncementBar';
import { Navigation } from './globals/Navigation';
import { Footer } from './globals/Footer';
import { Homepage } from './globals/Homepage';
import type { NavLink } from './lib/cms-types';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  onInit: async (payload) => {
    try {
      // Seed Blog Posts
      const posts = [
        {
          title: "PGPJS v6.0: Streaming Encryption & Deno Support",
          slug: "pgpjs-v6-streaming-encryption-deno-support",
          excerpt: "The biggest release in two years brings full streaming support, first-class Deno compatibility, and a 40% reduction in bundle size.",
          tag: "Release",
          date: "2025-06-12T00:00:00.000Z",
          author: "Daniel Huigens",
          thumbColor: "bt-blue",
          thumbIcon: "🔐",
        },
        {
          title: "Why Client-Side Encryption Still Matters in 2025",
          slug: "why-client-side-encryption-still-matters",
          excerpt: "A look at the threat model behind end-to-end encryption and why pushing crypto to the browser remains the most robust privacy approach available.",
          tag: "Security",
          date: "2025-05-28T00:00:00.000Z",
          author: "Laure Saulnier",
          thumbColor: "bt-green",
          thumbIcon: "🛡️",
        },
        {
          title: "Encrypting File Uploads Before They Hit Your Server",
          slug: "encrypting-file-uploads-before-they-hit-your-server",
          excerpt: "Step-by-step guide: use PGPJS in the browser to encrypt a file with the recipient's public key before uploading it to S3 or any cloud storage.",
          tag: "Tutorial",
          date: "2025-05-14T00:00:00.000Z",
          author: "Marco Nicosia",
          thumbColor: "bt-amber",
          thumbIcon: "📦",
        }
      ];

      for (const post of posts) {
        const existing = await payload.find({
          collection: 'blog-posts',
          where: { slug: { equals: post.slug } }
        });
        if (existing.totalDocs === 0) {
          await payload.create({ collection: 'blog-posts', data: post });
        }
      }

      // Seed Static Pages
      const pages = [
        { title: 'Privacy Policy', slug: 'privacy-policy' },
        { title: 'Terms of Service', slug: 'terms-of-service' },
        { title: 'Cookie Settings', slug: 'cookie-settings' }
      ];
      for (const p of pages) {
        const existing = await payload.find({
          collection: 'pages',
          where: { slug: { equals: p.slug } }
        });
        if (existing.totalDocs === 0) {
          await payload.create({ collection: 'pages', data: p });
        }
      }

      // Seed Announcement Bar
      const announcementConfig = await payload.findGlobal({ slug: 'announcement-bar' });
      if (!announcementConfig?.content) {
        await payload.updateGlobal({
          slug: 'announcement-bar',
          data: {
            enabled: true,
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'PGPJS v6.0 is out — full streaming encryption support.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        });
      }

      // Seed Navigation
      const navConfig = await payload.findGlobal({ slug: 'navigation' });
      if (!navConfig?.links || navConfig.links.length === 0) {
        await payload.updateGlobal({
          slug: 'navigation',
          data: {
            links: [
              { label: 'Docs', url: '/docs' },
              { label: 'ChatScan', url: '/chatscan' },
              { label: 'API Reference', url: '/login', isExternal: true },
              { label: 'Community', url: '/blog' },
            ],
            githubUrl: 'https://github.com/pgpjs',
            npmUrl: 'https://www.npmjs.com/package/openpgp'
          }
        });
      }

      // Seed Footer
      const footerConfig = await payload.findGlobal({ slug: 'footer' });
      if (!footerConfig?.brandDescription) {
        await payload.updateGlobal({
          slug: 'footer',
          data: {
            brandDescription: 'PGPJS is the official open-source JavaScript implementation of the OpenPGP standard.',
            socialLinks: {
              github: 'https://github.com/pgpjs',
              twitter: 'https://twitter.com',
              npm: 'https://npmjs.com',
              discord: 'https://discord.com'
            },
            columns: [
              {
                title: 'PGPJS',
                links: [
                  { label: 'About', url: '/about' },
                  { label: 'Blog', url: '/blog' },
                  { label: 'Careers', url: '/careers' }
                ]
              },
              {
                title: 'RESOURCES',
                links: [
                  { label: 'Documentation', url: '/docs' },
                  { label: 'API Reference', url: '/login' },
                  { label: 'Tutorials', url: '/tutorials' }
                ]
              }
            ],
            bottomLinks: [
              { label: 'Privacy Policy', url: '/privacy-policy' },
              { label: 'Terms of Service', url: '/terms-of-service' }
            ],
            copyright: '© 2026 PGPJS. All rights reserved.'
          }
        });
      }

      // Seed Homepage
      const homepageConfig = await payload.findGlobal({ slug: 'homepage' });
      if (!homepageConfig?.cta?.title) {
        await payload.updateGlobal({
          slug: 'homepage',
          data: {
            cta: {
              title: 'Ready to add encryption to your app?',
              body: 'PGPJS is MIT-licensed, battle-tested by millions of users, and maintained by the open-source community. Start encrypting in minutes.',
              primaryBtnText: 'Get started',
              primaryBtnUrl: '/docs',
              secondaryBtnText: 'View on GitHub ↗',
              secondaryBtnUrl: 'https://github.com/pgpjs'
            },
            stats: [
              { number: '58M+', label: 'Weekly npm downloads' },
              { number: '7.2K', label: 'GitHub stars' },
              { number: '100+', label: 'Contributors worldwide' },
              { number: 'v6.0', label: 'Latest stable release' }
            ],
            codeSnippet: {
              title: 'Run your own private chat server.',
              body: 'CrypterChat is a secure blockchain messaging platform — inspired by WhatsApp, but built for real privacy, ownership and control. Self-host it in minutes.',
              primaryBtnText: 'Deploy Your Server',
              primaryBtnUrl: '/server',
              secondaryBtnText: 'View Documentation',
              secondaryBtnUrl: '/docs',
              codeTitle: 'server.ts',
              code: 'import { createServer } from "crypterchat"\n\nawait createServer({\n  port: 8443,\n  e2e: true,\n})',
            },
          }
        });
      }

      // Seed Case Studies if empty
      const caseStudies = await payload.find({ collection: 'case-studies' });
      if (caseStudies.totalDocs === 0) {
        const caseStudyData = [
          {
            title: 'ProtonMail – End-to-End Encryption for 100M+ Mailboxes',
            body: '"OpenPGP.js powers every encrypted email we send. It\'s the encryption layer our users trust without having to think about it."',
            isQuote: true,
            linkUrl: '/Who/document/',
            linkText: 'Read more',
            svgCode: '<svg width="130" height="36" viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg"><path d="M2 4 L2 32 L10 32 L10 20 L17 32 L26 32 L18 19 C22 17 24 14 24 10 C24 6 21 4 17 4 Z M10 10 L16 10 C17.8 10 19 11.2 19 13 C19 14.8 17.8 16 16 16 L10 16 Z" fill="#6d4aff"/><text x="30" y="24" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#6d4aff">Proton</text><text x="90" y="24" fontSize="17" fontWeight="400" fontFamily="-apple-system,sans-serif" fill="#333">Mail</text></svg>'
          },
          {
            title: 'Keybase Uses PGPJS for Cross-Platform Identity Verification',
            body: 'PGPJS gives Keybase the ability to verify cryptographic proofs across web, desktop, and mobile — with a single, auditable open-source codebase.',
            isQuote: false,
            linkUrl: '/Who/document/',
            linkText: 'Read more',
            svgCode: '<svg width="120" height="36" viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="11" fill="none" stroke="#ff6c21" strokeWidth="2.5"/><circle cx="14" cy="14" r="5" fill="#ff6c21"/><rect x="22" y="12.5" width="14" height="3" rx="1.5" fill="#ff6c21"/><rect x="31" y="12.5" width="3" height="6" rx="1" fill="#ff6c21"/><rect x="26" y="12.5" width="3" height="5" rx="1" fill="#ff6c21"/><text x="40" y="21" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#ff6c21">Keybase</text></svg>'
          },
          {
            title: 'How Mailvelope Brings PGP to Gmail, Outlook & Yahoo',
            body: 'Mailvelope used PGPJS to build seamless PGP encryption directly into every major webmail client — all without the user ever leaving the browser.',
            isQuote: false,
            linkUrl: '/Who/document/',
            linkText: 'Read more',
            svgCode: '<svg width="148" height="36" viewBox="0 0 148 36" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="7" width="28" height="22" rx="3.5" fill="none" stroke="#1a73e8" strokeWidth="2"/><polyline points="0,9 14,20 28,9" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round"/><text x="34" y="24" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#1a73e8">Mailvelope</text></svg>'
          },
          {
            title: 'Signal Desktop Relies on PGPJS for Key Exchange',
            body: 'Signal\'s desktop application uses PGPJS to manage PGP key exchange and verification for its linked device protocol.',
            isQuote: false,
            linkUrl: '/Who/document/',
            linkText: 'Read more',
            svgCode: '<svg width="110" height="36" viewBox="0 0 110 36" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#3a76f0"/><path d="M8 18 Q9 10 16 8 Q24 10 24 18 Q20 26 16 26 Q14 26 12 25 L8 28 L9 24 Q7 22 8 18Z" fill="#fff"/><text x="36" y="22" fontSize="17" fontWeight="600" fontFamily="-apple-system,sans-serif" fill="#3a76f0">Signal</text></svg>'
          },
          {
            title: 'Thunderbird Integrates PGPJS for Native OpenPGP Support',
            body: 'Mozilla\'s Thunderbird switched to PGPJS to deliver native, built-in OpenPGP support — removing the need for any external plugin.',
            isQuote: false,
            linkUrl: '/Who/document/',
            linkText: 'Read more',
            svgCode: '<svg width="130" height="36" viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="13" fill="#0a84ff"/><path d="M10 16 C10 12 13 9 16 9 C21 9 22 13 22 16 C22 20 19 23 16 23 C13 23 10 20 10 16Z" fill="#fff"/><circle cx="16" cy="16" r="4" fill="#0a84ff"/><text x="34" y="22" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#0a84ff">Thunderbird</text></svg>'
          }
        ];

        for (const doc of caseStudyData) {
          await payload.create({
            collection: 'case-studies',
            data: doc,
          });
        }
      }

      // Update Navigation links if "Tutorials" is present
      const nav = await payload.findGlobal({ slug: 'navigation' });
      if (nav && nav.links) {
        let changed = false;
        const updatedLinks = nav.links.map((link: NavLink) => {
          if (link.label === 'Tutorials') {
            changed = true;
            return { ...link, label: 'ChatScan', url: '/ChatScan' };
          }
          return link;
        });
        
        if (changed) {
          await payload.updateGlobal({
            slug: 'navigation',
            data: { links: updatedLinks },
          });
        }
      }
    } catch (err) {
      console.error('Error seeding data:', err);
    }
  },
  sharp,
  admin: {
    user: 'users',
  },
  editor: lexicalEditor({}),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    Media,
    CaseStudies,
    Features,
    BlogPosts,
  ],
  globals: [
    AnnouncementBar,
    Navigation,
    Footer,
    Homepage,
  ],
  secret: process.env.PAYLOAD_SECRET || 'super-secret-key',
  db: postgresAdapter({
    push: process.env.PAYLOAD_PUSH === 'true',
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
