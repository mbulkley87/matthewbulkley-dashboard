import { useEffect, useState } from 'react'
import { fetchLeaderboard } from '../services/accountsApi'

const BOARDS = [
  { game: 'herodetails', name: 'Hero Details', icon: '⚔️', accent: '#e8862c' },
  { game: 'cluetations', name: 'ClueTations', icon: '🔎', accent: '#c084fc' },
  { game: 'twogether', name: 'Twogether', icon: '🤝', accent: '#e63946' },
  { game: 'battleship', name: 'Battleship', icon: '🚢', accent: '#4fd1c5' },
  { game: 'splitcontrol', name: 'Split Control', icon: '🔌', accent: '#e67e3a' },
  { game: 'towerdefense', name: 'Tower Defense', icon: '🏹', accent: '#f59e0b' },
]

function MiniLeaderboard({ board }) {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchLeaderboard(board.game, 5)
      .then((data) => { if (!cancelled) setEntries(data) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [board.game])

  return (
    <div className="mini-leaderboard" style={{ '--accent': board.accent }}>
      <div className="mini-leaderboard-header">
        <span aria-hidden="true">{board.icon}</span>
        <span>{board.name}</span>
      </div>
      {error && <p className="mini-leaderboard-empty">Couldn't load this one.</p>}
      {!error && entries === null && <p className="mini-leaderboard-empty">Loading...</p>}
      {!error && entries?.length === 0 && <p className="mini-leaderboard-empty">No scores yet.</p>}
      {!error && entries?.length > 0 && (
        <ol className="mini-leaderboard-list">
          {entries.map((entry, index) => (
            <li key={entry.userId}>
              <span className="mini-leaderboard-rank">#{index + 1}</span>
              <span className="mini-leaderboard-name">{entry.username}</span>
              <span className="mini-leaderboard-score">{entry.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

// Blackjack tracks its own bankroll (own service, own Postgres) rather than
// a generic best-score via accounts-service, so its board has a different
// shape (balance + lifetime net earnings, not a single score) and is
// fetched directly from its own API.
const BLACKJACK_API = 'https://api-blackjack.matthewbulkley.com'

function formatBusts(resetCount) {
  return `${resetCount} time${resetCount === 1 ? '' : 's'} busted`
}

function MiniBlackjackLeaderboard() {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`${BLACKJACK_API}/api/leaderboard?limit=5`)
      .then((response) => { if (!response.ok) throw new Error('failed'); return response.json() })
      .then((data) => { if (!cancelled) setEntries(data) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="mini-leaderboard" style={{ '--accent': '#2e7d4f' }}>
      <div className="mini-leaderboard-header">
        <span aria-hidden="true">🃏</span>
        <span>Blackjack</span>
      </div>
      {error && <p className="mini-leaderboard-empty">Couldn't load this one.</p>}
      {!error && entries === null && <p className="mini-leaderboard-empty">Loading...</p>}
      {!error && entries?.length === 0 && <p className="mini-leaderboard-empty">No hands played yet.</p>}
      {!error && entries?.length > 0 && (
        <ol className="mini-leaderboard-list">
          {entries.map((entry, index) => (
            <li key={entry.username}>
              <span className="mini-leaderboard-rank">#{index + 1}</span>
              <span className="mini-leaderboard-name">{entry.username}</span>
              <span className="mini-leaderboard-score">
                ${entry.balance} <span className="mini-leaderboard-busts">({formatBusts(entry.resetCount)})</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function LeaderboardsCard() {
  return (
    <section className="dashboard-section">
      <h2 className="dashboard-section-title">Leaderboards</h2>
      <div className="leaderboards-card">
        {BOARDS.map((board) => (
          <MiniLeaderboard key={board.game} board={board} />
        ))}
        <MiniBlackjackLeaderboard />
      </div>
    </section>
  )
}

export default LeaderboardsCard
