# Delta-neutral funding strategy archive

This project has been archived. The bot is retired. The website preserves its final published snapshot and
no longer connects to the bot. The strategy write-up
is retained as historical documentation.

## Development

The archive is a static Vue 3 site built with Vite and Tailwind CSS.
It needs no backend, API credentials, or bot connection.

```sh
npm ci
npm run dev
npm run build
```

The development server runs on port 5180. The `/performance` route
shows the frozen final snapshot. Both the frontend container and the public
nginx configuration return HTTP 410 for the former `/api` routes, including
requests from older browser tabs.

## Final snapshot

`src/data/final-snapshot.json` is the fixed dataset captured at retirement.
It preserves the existing seven-day publication delay. Its cutoff and capture
dates are recorded in the file. Values that were withheld from the public site
remain withheld. The figures and their as-of date never advance with the clock.
There is no API client, polling, or automated refresh job.

## Deployment

Pushing to `main` builds the static site and deploys the frontend container and
public nginx configuration through GitHub Actions. This does not deploy or
change the underlying bot.

## License

MIT
