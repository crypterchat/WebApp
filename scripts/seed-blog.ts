import { getPayload } from "payload";
import configPromise from "../payload.config";

async function seed() {
  const payload = await getPayload({ config: configPromise });

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
    try {
      await payload.create({
        collection: "blog-posts",
        data: post,
      });
      console.log(`Created post: ${post.title}`);
    } catch (e: any) {
      if (e?.data?.some?.((err: any) => err.field === 'slug' && err.message === 'Value must be unique')) {
        console.log(`Skipped existing post: ${post.title}`);
      } else {
        console.error(`Failed to create post: ${post.title}`, e);
      }
    }
  }

  process.exit(0);
}

seed();
