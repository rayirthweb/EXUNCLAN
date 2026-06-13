import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, Rocket, X } from 'lucide-react'
import HomePage from './components/HomePage'
import ContactPage from './components/ContactPage'
import WaitlistPage from './components/WaitlistPage'
import TechPulsePage from './components/TechPulsePage'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
  { to: '/waitlist', label: 'Waitlist' },
  { to: '/pulse', label: 'Tech Pulse' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">RayPulse</p>
            <p className="text-xs text-slate-400">Exunite by RayPulse</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white">RayPulse</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
              A health technology company creating Exunite, a sleek connected weighing system built to help people understand their body with clarity.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <p className="font-medium text-white">Mission</p>
            <p className="mt-3 leading-7">
              Make everyday wellness data feel useful, human, and easy to act on without turning health into noise.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <p className="font-medium text-white">Vision</p>
            <p className="mt-3 leading-7">
              Build a future where people understand body composition, heart rate, and wellness trends at a glance from a device they actually enjoy using.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),transparent_30%)]" />
      <Header />
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/pulse" element={<TechPulsePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
