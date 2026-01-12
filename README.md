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

## License

MIT
