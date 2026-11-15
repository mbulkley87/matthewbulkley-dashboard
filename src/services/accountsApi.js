// Shared across every game/site under matthewbulkley.com - see the
// accounts-service repo.
const BASE_URL = import.meta.env.VITE_ACCOUNTS_API_URL || 'https://accounts.matthewbulkley.com'

async function parseOrThrow(response) {
  if (response.ok) {
    // Score submission returns 200 with an empty body, not 204 -
    // response.json() throws SyntaxError on "", so check for actual
    // content first rather than trusting the status code.
    const text = await response.text()
    return text ? JSON.parse(text) : null
  }
  const message = await response.text().catch(() => '')
  throw new Error(message || `Request failed (${response.status})`)
}

export async function loginAsGuest(username) {
  const response = await fetch(`${BASE_URL}/api/auth/guest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  })
  return parseOrThrow(response)
}

// Unlike loginAsGuest, this identity CAN be logged back into later from any
// browser - recommended over guest for anyone who wants to stay signed in
// across every site here.
export async function registerWithPassword(username, password) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return parseOrThrow(response)
}

export async function loginWithPassword(username, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return parseOrThrow(response)
}

export async function fetchCurrentUser(token) {
  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return parseOrThrow(response)
}

export async function fetchLeaderboard(game, limit = 20) {
  const response = await fetch(`${BASE_URL}/api/leaderboard/${game}?limit=${limit}`)
  return parseOrThrow(response)
}
