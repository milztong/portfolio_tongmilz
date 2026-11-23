# Tong Milz — Developer Portfolio

A bilingual developer portfolio focused on presenting projects as concise engineering case studies rather than a collection of screenshots. The site combines professional experience, technical project pages, interactive demos, and an on-site portfolio assistant in a responsive Next.js application.

**Live site:** [www.tongmilz.com](https://www.tongmilz.com)

## Highlights

- German and English landing pages
- Project and work-experience case studies authored in MDX
- Dynamic detail pages generated from structured front matter
- Interactive local “Ask Tong” assistant for portfolio questions
- Embedded Stock Prediction Game with shared Jinodo authentication
- Jinodo web-app and Android APK links
- Responsive layout, motion, and accessible navigation
- Metadata, Open Graph image generation, sitemap, robots rules, and JSON-LD
- Production deployment on Vercel with a custom domain

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 with App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Content | MDX, gray-matter, next-mdx-remote |
| Interaction | Framer Motion, Lucide icons |
| Charts | Lightweight Charts |
| Quality | ESLint, TypeScript, Next.js production build |
| Hosting | Vercel |

## Project structure

```text
src/
├── app/                 # Routes, layouts, metadata, sitemap and robots
├── components/          # Shared UI and interactive portfolio components
├── content/
│   ├── projects/        # Project case studies in MDX
│   └── work/            # Work-experience entries in MDX
└── lib/                 # Content loading and shared helpers

public/
├── downloads/           # Downloadable Jinodo Android build
└── ...                  # Images and static assets
```

## Main routes

| Route | Description |
| --- | --- |
| `/` | German landing page |
| `/en` | English landing page |
| `/projects` | Project overview |
| `/projects/[slug]` | MDX-powered project case study |
| `/work` | Professional experience overview |
| `/work/[slug]` | Detailed work entry |
| `/about` | Personal profile and background |
| `/stock-predictor` | Embedded Stock Prediction Game |

## Local development

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/milztong/portfolio_tongmilz.git
cd portfolio_tongmilz
npm install
```

Create `.env.local` when the embedded Stock Predictor should use non-default services:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_JINODO_URL=https://api.tongmilz.com
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Stock Predictor backend used by the `/backend` rewrite |
| `NEXT_PUBLIC_JINODO_URL` | Jinodo backend used by the `/auth-backend` authentication rewrite |

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content workflow

Project and work pages are stored as MDX files in `src/content`. Each file combines structured front matter with the long-form case study, so new entries can be added without creating a dedicated React page.

Typical project front matter contains information such as the title, summary, technology tags, image, repository, live link, and display order. The dynamic routes load that metadata and render the MDX body with the shared portfolio layout.

## Quality checks

```bash
npm run lint
npm run build
```

The production build validates the TypeScript application, renders the static routes, and generates the SEO endpoints.

## Deployment

The repository is connected to Vercel. Production deployments use the custom domain [www.tongmilz.com](https://www.tongmilz.com).

Configure `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_JINODO_URL` for the **Production** and **Preview** environments in Vercel, then redeploy when either value changes.

## Featured projects

- [Jinodo](https://jinodo.tongmilz.com) — a real-time content and communication platform
- [Stock Prediction Game](https://github.com/milztong/StockPredictionGame) — an anonymized daily market prediction challenge
- Additional case studies covering generative AI, VR, fitness, and enterprise workflows
