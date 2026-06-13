import { useState } from 'react'
import { Mail, MessageSquare, User } from 'lucide-react'

const apiBase = import.meta.env.VITE_BACKEND_URL || ''

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email.'
    if (!form.message.trim()) next.message = 'Message is required.'
    return next
  }

  const submit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    try {
      await fetch(`${apiBase}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // Offline fallback
    }

    alert(`Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
          <h2 className="mt-4 text-4xl font-black">Talk to RayPulse</h2>
          <p className="mt-4 max-w-2xl text-slate-300 leading-8">
            Whether you are interested in Exunite, a retail partnership, a media feature, or a collaboration, we would love to hear from you.
          </p>
          <p className="mt-4 max-w-2xl text-slate-300 leading-8">
            Please use the form below to send your message. We check every inquiry carefully, and the team uses the feedback to shape the product direction.
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            {[
              { label: 'Name', key: 'name', icon: User, type: 'text', placeholder: 'Your name' },
              { label: 'Email', key: 'email', icon: Mail, type: 'email', placeholder: 'you@company.com' },
            ].map(({ label, key, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm((v) => ({ ...v, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                  />
                </div>
                {errors[key] ? <p className="mt-2 text-sm text-red-300">{errors[key]}</p> : null}
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Message</label>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <textarea
                  rows="7"
                  value={form.message}
                  onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
                  placeholder="Tell us what you want to create..."
                  className="w-full resize-none bg-transparent text-white outline-none placeholder:text-slate-500"
                />
              </div>
              {errors.message ? <p className="mt-2 text-sm text-red-300">{errors.message}</p> : null}
            </div>

            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
              Send message <MessageSquare className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
          <h3 className="text-2xl font-bold">What to include</h3>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <li>• Your name and the best email address to reach you at.</li>
            <li>• A clear message about your interest in Exunite or RayPulse.</li>
            <li>• Any partnership, press, or product questions you have.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
