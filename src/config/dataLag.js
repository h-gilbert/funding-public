/**
 * Public data lag.
 *
 * The showcase deliberately trails the live trading product: every figure on
 * the site is the value as it stood LAG_DAYS ago. Recent exchange data is not
 * settled enough to publish, so it is withheld until it ages past the cutoff.
 *
 * Nothing here invents or shifts a number. It only withholds. A metric that
 * cannot be resolved as at the cutoff is reported as unavailable rather than
 * backfilled with a fresher value.
 */

const DAY_MS = 24 * 60 * 60 * 1000

const parsedLag = Number.parseFloat(import.meta.env.VITE_DATA_LAG_DAYS ?? '7')

/** How far behind the live product the public site runs, in days. */
export const LAG_DAYS = Number.isFinite(parsedLag) && parsedLag >= 0 ? parsedLag : 7

export const isLagged = LAG_DAYS > 0

/**
 * Set VITE_API_SUPPORTS_ASOF=true once the backend honours `?asOf=<ISO>` on the
 * public endpoints. Until then the lag is applied client-side, which only works
 * for metrics the history endpoint can replay. See metricsService.
 */
export const backendSupportsAsOf = String(import.meta.env.VITE_API_SUPPORTS_ASOF) === 'true'

/**
 * Aggregates (monthly breakdown, return sources, capital overview) have no
 * historical replay, so they can only be served at the cutoff by the backend.
 */
export const canServeLaggedAggregates = !isLagged || backendSupportsAsOf

/** The instant the public site is reporting as at. */
export function asOfDate(now = Date.now()) {
  return new Date(now - LAG_DAYS * DAY_MS)
}

export function asOfParam(now = Date.now()) {
  return asOfDate(now).toISOString()
}

export function formatAsOf(date = asOfDate()) {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return '--'
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function roundedLag() {
  return Number.isInteger(LAG_DAYS) ? LAG_DAYS : Math.round(LAG_DAYS)
}

/** Noun form: "7 days". */
export function lagLabel() {
  const days = roundedLag()
  return `${days} day${days === 1 ? '' : 's'}`
}

/** Adjective form: "7-day", as in "a 7-day delay". */
export function lagAdjective() {
  return `${roundedLag()}-day`
}
