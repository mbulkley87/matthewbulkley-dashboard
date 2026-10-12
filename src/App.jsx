import './App.css'

// ClueTations' URL is a placeholder until it actually has a deployed home -
// see the project's own README for where it ends up.
const SITES = [
  {
    name: 'Hero Details',
    description: 'Cooperative dice-and-deckbuilder browser game.',
    href: 'https://herodetails.matthewbulkley.com',
    icon: '⚔️',
    accent: '#e8862c',
  },
  {
    name: 'Castle Creek Lodge',
    description: 'Our rental property.',
    href: 'https://castlecreeklodge.com',
    icon: '🏔️',
    accent: '#4fa37a',
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
  {
    name: 'ClueTations',
    description: 'Crack the cipher, guess the quote. (In progress)',
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

function App() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Matthew Bulkley</h1>
        <p>A few of the things I've built.</p>
      </header>

      <div className="site-grid">
        {SITES.map((site) => (
          <SiteCard key={site.name} site={site} />
        ))}
      </div>
    </main>
  )
}

export default App
