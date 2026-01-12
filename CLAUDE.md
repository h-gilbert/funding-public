# Funding Strategy Showcase

## Project Overview
Public-facing Vue.js website showcasing delta-neutral trading strategy performance. Polls the trading-calculator backend for sanitized metrics and displays them elegantly.

**Subdomain Target:** `funding.{yourdomain}`
**Design Direction:** Light & Minimal (Apple-inspired)
**Data Policy:** Percentages only - no absolute dollar amounts

## Tech Stack
- **Frontend**: Vue 3.4, Vite 5, Pinia, Vue Router
- **Styling**: Tailwind CSS 3.4
- **Fonts**: Inter (sans), SF Mono (numbers), Instrument Serif (headings)

## Port Configuration

| Service | Port | Description |
|---------|------|-------------|
| Frontend (Dev) | 5180 | Vite dev server |
| Backend API | 3400 | trading-calculator backend (separate repo) |

## Running Locally

### Development Mode
```bash
# Install dependencies
npm install

# Start frontend dev server
npm run dev

# Requires trading-calculator backend running on port 3400
```

### Production Build
```bash
npm run build
npm run preview
```

## Environment Variables

The frontend uses Vite's proxy in development. For production, set:
```
VITE_API_URL=https://api.yourdomain.com
```

## Project Structure
```
funding-showcase/
├── content/
│   └── blog/                    # Markdown blog posts
├── src/
│   ├── assets/styles/           # Tailwind + custom CSS
│   ├── components/
│   │   ├── layout/              # AppHeader, AppFooter
│   │   ├── metrics/             # MetricCard, MetricsGrid, LiveIndicator
│   │   ├── strategy/            # Strategy explainer components
│   │   └── blog/                # Blog components (future)
│   ├── composables/             # useMetrics
│   ├── services/                # API layer
│   ├── stores/                  # Pinia stores
│   └── views/                   # Page components
├── tailwind.config.js
└── vite.config.js
```

## API Integration

The frontend proxies `/api` to the trading-calculator backend:

| Frontend Route | Backend Endpoint | Purpose |
|---------------|------------------|---------|
| `/api/public/health` | `GET /api/public/health` | Health check |
| `/api/public/stats/overview` | `GET /api/public/stats/overview` | Key metrics |
| `/api/public/stats/history` | `GET /api/public/stats/history` | Chart data |
| `/api/public/stats/monthly` | `GET /api/public/stats/monthly` | Monthly breakdown |

## Design System

### Colors
- Background: `#FFFFFF`, `#FAFBFC`
- Text: `#0F172A` (primary), `#475569` (secondary), `#94A3B8` (muted)
- Accent: `#0066FF` (blue)
- Profit: `#00C853` (green)
- Loss: `#FF3B30` (red)

### Typography
- Display: Instrument Serif, 72px
- Headings: Instrument Serif, 48px/36px
- Body: Inter, 16px
- Numbers: SF Mono

## Notes
- Frontend port 5180 chosen to avoid conflicts with trading-calculator (5177)
- All metrics are percentage-based for privacy (no dollar amounts)
- Polling interval: 60 seconds for live metrics
- Blog system uses markdown files (coming soon)
- Mobile-first responsive design

## Design Prohibition
Never use bracket/parenthesis borders (left-side only decorative borders with curved corners). See `.claude/skills/frontend-standards/` for details and approved alternatives.
