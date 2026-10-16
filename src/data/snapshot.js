import snapshot from './final-snapshot.json'

// Bundled once at retirement. No clock, API client, or polling is involved.
export const overview = snapshot.overview
export const asOfLabel = new Date(snapshot.asOf).toLocaleDateString('en-NZ', {
  timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric'
})
