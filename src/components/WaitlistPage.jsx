import { useState } from 'react'
import { BellRing, ShieldCheck } from 'lucide-react'

const apiBase = import.meta.env.VITE_BACKEND_URL || ''

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [updates, setUpdates] = useState('yes')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.'
    if (!updates) next.updates = 'Please choose an option.'
    return next
  }

  const submit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    try {
      await fetch(`${apiBase}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, updates: updates === 'yes' }),
      })
    } catch {
      // Offline fallback
    }

    alert(`Email: ${email}\nReceive updates: ${updates === 'yes' ? 'Yes' : 'No'}`)
    setEmail('')
    setUpdates('yes')
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
          <BellRing className="h-4 w-4" /> Early access
        </div>
        <h2 className="mt-5 text-4xl font-black">Join the Exunite waitlist</h2>
        <p className="mt-4 max-w-2xl text-slate-300 leading-8">
          Get early updates as RayPulse moves Exunite from concept to launch. We will share product news, design notes, and availability information with people who sign up first.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="you@startup.com"
            />
            {errors.email ? <p className="mt-2 text-sm text-red-300">{errors.email}</p> : null}
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-200">Would you like to receive notifications?</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {[
                { label: 'Yes, keep me updated', value: 'yes' },
                { label: 'No, thanks', value: 'no' },
              ].map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-200">
                  <input
                    type="radio"
                    name="updates"
                    value={option.value}
                    checked={updates === option.value}
                    onChange={(e) => setUpdates(e.target.value)}
                    className="h-4 w-4 accent-emerald-400"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.updates ? <p className="mt-2 text-sm text-red-300">{errors.updates}</p> : null}
          </div>

          <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
            Reserve my spot <ShieldCheck className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
