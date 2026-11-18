import { useEffect, useState } from 'react'
import { fetchLeaderboard } from '../services/accountsApi'

const BOARDS = [
  { game: 'herodetails', name: 'Hero Details', icon: '⚔️', accent: '#e8862c' },
  { game: 'cluetations', name: 'ClueTations', icon: '🔎', accent: '#c084fc' },
  { game: 'twogether', name: 'Twogether', icon: '🤝', accent: '#e63946' },
  { game: 'battleship', name: 'Battleship', icon: '🚢', accent: '#4fd1c5' },
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

function LeaderboardsCard() {
  return (
    <section className="dashboard-section">
      <h2 className="dashboard-section-title">Leaderboards</h2>
      <div className="leaderboards-card">
        {BOARDS.map((board) => (
          <MiniLeaderboard key={board.game} board={board} />
        ))}
      </div>
    </section>
  )
}

export default LeaderboardsCard
