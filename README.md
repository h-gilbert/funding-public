# Funding Strategy Showcase

A public-facing Vue.js website showcasing delta-neutral trading strategy performance metrics.

## Tech Stack

- **Frontend**: Vue 3, Vite, Pinia, Vue Router
- **Styling**: Tailwind CSS
- **Fonts**: Inter, SF Mono, Instrument Serif

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (runs on port 5180)
npm run dev

# Build for production
npm run build
```

## Configuration

The frontend expects a backend API. In development, requests to `/api` are proxied to `localhost:3400`.

For production, set the environment variable:
```
VITE_API_URL=https://your-api-domain.com
```

See `.env.example` for all supported variables.

## Data lag

The site publishes figures on a deliberate delay (7 days by default) so that
unsettled exchange data is never shown while it is still moving. Configure it
with `VITE_DATA_LAG_DAYS`; set it to `0` to publish live.

Some sections are hidden while the delay is applied client-side, because the
backend cannot yet replay them as at a past date. See
[docs/data-lag.md](docs/data-lag.md) for what is covered, what is withheld, and
the `?asOf=` support the backend needs to restore them.

## License

MIT
