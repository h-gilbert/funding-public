# Data lag

The public site deliberately trails live trading. Every figure it publishes is
the value as it stood `VITE_DATA_LAG_DAYS` ago (default 7), so unsettled
exchange data is never published while it is still moving.

The rule the implementation follows: **withhold, never substitute.** A metric
that cannot be resolved as at the cutoff is shown as unavailable or omitted —
it is never backfilled with a fresher number.

## Configuration

| Variable | Default | Effect |
| --- | --- | --- |
| `VITE_DATA_LAG_DAYS` | `7` | Days the site trails live trading. `0` disables the delay entirely and restores live behaviour. |
| `VITE_API_SUPPORTS_ASOF` | `false` | Set to `true` once the backend honours `?asOf=`. Switches the cutoff from client-side to server-side. |

All of it is driven from `src/config/dataLag.js`.

## How the cutoff is applied today (client-side)

The backend has no `asOf` parameter yet, so the frontend does what it can:

- **Charts** (`/public/stats/history`) — the service over-fetches by the lag
  length, drops every point newer than the cutoff, and recomputes the summary
  so the window still spans the requested number of days.
- **Headline metrics** — the overview is *rebuilt* from the history endpoint:
  for each metric, the latest daily point at or before the cutoff. These are
  real recorded values, not interpolations.
- **`daysRunning`** — the only field taken from the live overview, because it
  is a clock rather than exchange data: its value at the cutoff is exactly
  today's value minus the lag.

### What this cannot cover

The history endpoint only replays: `apy30d`, `apy7d`, `apyAllTime`,
`cumulativeReturnPct`, `capitalUtilizationPct`, `maxDrawdownPct`,
`currentDrawdownPct`, `winRatePct`, `volatility30d`, `weeklyReturnPct`,
`monthlyReturnPct`.

Everything else has no historical series, so while the lag is client-side it is
hidden rather than shown live:

- Open positions, total positions closed, average hold time, funding-to-fee
  ratio, daily return (metric cards are dropped from the grid)
- Monthly returns breakdown (`/public/stats/monthly`) — section hidden
- Return sources breakdown (`/public/stats/return-sources`) — section hidden
- Capital overview (`/public/capital/overview`) — not fetched

Polling also drops to a 5-minute floor, since week-old data does not change
minute to minute.

## Moving the cutoff to the backend

This is the fix that restores the hidden sections. The frontend already sends
`?asOf=<ISO timestamp>` on every public endpoint when
`VITE_API_SUPPORTS_ASOF=true`, and stops doing any client-side trimming.

What `dnbot-backend` needs to implement on the public routes:

1. Accept `asOf` as an ISO-8601 timestamp on `/public/stats/overview`,
   `/public/stats/history`, `/public/stats/monthly`,
   `/public/stats/return-sources` and `/public/capital/overview`.
2. Compute every figure from data recorded at or before `asOf`, exactly as the
   endpoint would have answered on that date — do not compute over the full
   window and then relabel it.
3. Return the effective cutoff as `meta.asOf` so the frontend can display it
   rather than assume it. The store reads this field directly.
4. Reject an `asOf` in the future (or clamp it to now) rather than silently
   ignoring it.

Note that today the backend **silently ignores unknown query parameters**, which
is why the switch is behind an explicit flag: sending `asOf` to a backend that
does not understand it would return live data labelled as delayed. Do not flip
`VITE_API_SUPPORTS_ASOF` to `true` before point 3 above is live and verified.

## Presentation

Because the numbers are not live, the UI no longer claims they are:

- `DataIndicator` (formerly `LiveIndicator`) drops the pulsing "live" dot and
  appends the as-at date.
- `DataDelayNotice` states the delay and the cutoff date on the home and
  performance pages.
- Page copy, meta descriptions and the footer disclaimer say "published on a
  7 day delay" instead of "real-time" / "updated every minute".
