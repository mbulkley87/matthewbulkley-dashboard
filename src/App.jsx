import { useState } from 'react'
import AccountWidget from './components/AccountWidget'
import LoginModal from './components/LoginModal'
import LeaderboardsCard from './components/LeaderboardsCard'
import useAccount from './hooks/useAccount'
import './App.css'

const WEBSITES = [
  {
    name: 'Castle Creek Lodge',
    description: 'Our rental property.',
    href: 'https://castlecreeklodge.com',
    icon: '🏔️',
    accent: '#4fa37a',
  },
  {
    name: 'Big Chair River House',
    description: 'Our rental property.',
    href: 'https://bigchairriverhouse.com/',
    icon: '🏡',
    accent: '#3fa7a0',
  },
  {
    name: 'Boulder Ridge POA',
    description: 'The property owners association we live in - and built the site for.',
    href: 'https://boulderridgepoa-mchenry.org/',
    icon: '🏘️',
    accent: '#5b8def',
  },
  {
    name: 'JNK Contracting',
    description: 'Contracting services.',
    href: 'https://jnk-contracting.com/',
    icon: '🛠️',
    accent: '#d4a72c',
  },
]

const GAMES = [
  {
    name: 'Hero Details',
    description: 'Cooperative dice-and-deckbuilder browser game.',
    href: 'https://herodetails.matthewbulkley.com',
    icon: '⚔️',
    accent: '#e8862c',
  },
  {
    name: 'ClueTations',
    description: 'Crack the cipher, guess the quote.',
    href: 'https://cluetations.matthewbulkley.com',
    icon: '🔎',
    accent: '#c084fc',
  },
  {
    name: 'Twogether',
    description: '2-player co-op puzzle game - play together online, from any device.',
    href: 'https://twogether.matthewbulkley.com',
    icon: '🤝',
    accent: '#e63946',
  },
  {
    name: 'Battleship',
    description: '2-player Battleship on a 6x6 grid - Radar Scan and Barrage included.',
    href: 'https://battleship.matthewbulkley.com',
    icon: '🚢',
    accent: '#4fd1c5',
  },
  {
    name: 'Split Control',
    description: '2-player co-op circuit puzzle - you each control half the tiles.',
    href: 'https://splitcontrol.matthewbulkley.com',
    icon: '🔌',
    accent: '#e67e3a',
  },
]

function SiteCard({ site }) {
  return (
    <a
      className="site-card"
      href={site.href}
      target="_blank"
      rel="noreferrer"
      style={{ '--accent': site.accent }}
    >
      <span className="site-card-icon" aria-hidden="true">{site.icon}</span>
      <span className="site-card-name">{site.name}</span>
      <span className="site-card-description">{site.description}</span>
      <span className="site-card-link">Visit →</span>
    </a>
  )
}

function Section({ title, sites }) {
  return (
    <section className="dashboard-section">
      <h2 className="dashboard-section-title">{title}</h2>
      <div className="site-grid">
        {sites.map((site) => (
          <SiteCard key={site.name} site={site} />
        ))}
      </div>
    </section>
  )
}

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const account = useAccount()

  return (
    <main className="dashboard">
      <AccountWidget
        isLoggedIn={account.isLoggedIn}
        isChecking={account.isChecking}
        username={account.username}
        onSignIn={() => setShowLogin(true)}
        onSignOut={account.logout}
      />

      <header className="dashboard-header">
        <h1>Matthew Bulkley</h1>
        <p>A few of the things I've built.</p>
      </header>

      <Section title="Games" sites={GAMES} />
      <Section title="My Websites" sites={WEBSITES} />
      <LeaderboardsCard />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginGuest={account.loginGuest}
          onRegisterPassword={account.registerPassword}
          onLoginPassword={account.loginPassword}
        />
      )}
    </main>
  )
}

export default App
