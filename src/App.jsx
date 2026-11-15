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
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Matthew Bulkley</h1>
        <p>A few of the things I've built.</p>
      </header>

      <Section title="My Websites" sites={WEBSITES} />
      <Section title="Games" sites={GAMES} />
    </main>
  )
}

export default App
