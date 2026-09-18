# CrypterChat WebApp

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a71c389-11d3-4c2a-9592-893b575a1b5f/deploy-status)](https://app.netlify.com/projects/crypterchat/deploys)

Next.js app for CrypterChat — marketing site, Payload CMS, and authenticated dashboard (API keys, servers, chat scan, docs).

Production: **https://crypterchat.netlify.app**

## Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/home.png" alt="Home" width="800" />
</p>

| Home | Landing |
|:---:|:---:|
| ![Home](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/home.png) | ![Landing](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/landing.png) |

| Login | API Keys |
|:---:|:---:|
| ![Login](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/login.png) | ![API Keys](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/api-key.png) |

| Server Setup | ChatScan |
|:---:|:---:|
| ![Server](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/server.png) | ![ChatScan](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/chatscan.png) |

| Docs | Blog |
|:---:|:---:|
| ![Docs](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/docs.png) | ![Blog](https://raw.githubusercontent.com/crypterchat/WebApp/main/docs/screenshots/blog.png) |

Browse the image gallery on GitHub Pages: **https://crypterchat.github.io/WebApp/**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env` and set `DATABASE_URL` and `PAYLOAD_SECRET`.

## Deploy (Netlify)

## Deploy (Netlify)

The GitHub repo is connected to the Netlify project **crypterchat** (site ID `6a71c389-11d3-4c2a-9592-893b575a1b5f`).

**Continuous deploy:** a push or merge to `clean-upload` rebuilds and publishes [https://crypterchat.netlify.app](https://crypterchat.netlify.app). Pull requests get Deploy Previews automatically.

In [Netlify environment variables](https://app.netlify.com/projects/crypterchat/configuration/env), set these for **Builds** and **Functions / Runtime**:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string (`sslmode=require`) |
| `PAYLOAD_SECRET` | Payload CMS secret |
| `NEXT_PUBLIC_SERVER_URL` | Public origin, e.g. `https://crypterchat.netlify.app` |

If Git-connected builds fail while cloning, add the Netlify **Deploy key** under GitHub → Settings → Deploy keys (read-only).

## Demo captures

Regenerate screenshots and videos locally:

```bash
npm run capture-homepages   # home + landing into docs/screenshots
npm run record-demo         # all pages + walkthrough video
```

Outputs also land on your Desktop under `crypterchat-captures/`. Demo mode uses `?demo=1` so dashboard pages render without a real Firebase login.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- Repo: https://github.com/crypterchat/WebApp
