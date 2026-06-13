import { ArrowRight, Activity, Droplets, HeartPulse, Scale3D, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '24/7', label: 'Wellness visibility' },
  { value: 'Smart', label: 'Body composition insights' },
  { value: 'Fast', label: 'Daily progress tracking' },
]

const featureCards = [
  {
    icon: Scale3D,
    title: 'Whole-body reading in seconds',
    text: 'Exunite is designed to estimate weight trends, body fat percentage, visceral fat markers, and more from a single step-on experience.',
  },
  {
    icon: HeartPulse,
    title: 'Comfort-first health tracking',
    text: 'Our vision is a friendly home device that helps people pay attention to their body without making wellness feel clinical or intimidating.',
  },
  {
    icon: Droplets,
    title: 'Daily signal, not random noise',
    text: 'Track meaningful changes over time with a calm dashboard that helps users understand habits, consistency, and momentum.',
  },
]

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
            RayPulse presents Exunite
          </p>
          <h1 className="mt-6 max-w-2xl text-5xl font-black tracking-tight text-white sm:text-6xl">
            A new kind of health machine for the modern home.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Exunite is the flagship product from RayPulse — a connected weighing machine concept built to help people keep an eye on weight, body fat percentage, visceral fat, heart rate, and other everyday wellness signals through advanced body-reading technology.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
            The idea behind Exunite is simple: make health data feel less like a spreadsheet and more like a helpful companion. By combining a clean interface, a premium physical product feel, and thoughtful tracking, RayPulse aims to turn routine check-ins into a motivating habit.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/waitlist" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]">
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10">
              Talk to the team
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
              alt="Modern health device setup"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-center">
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {featureCards.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]">
            <Icon className="h-6 w-6 text-emerald-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/50 p-8 backdrop-blur lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Mission</p>
          <h2 className="mt-4 text-3xl font-black">Helping people stay aware, consistent, and encouraged.</h2>
          <p className="mt-4 text-slate-300 leading-8">
            RayPulse exists to make body insights approachable. Too many wellness tools are built to overwhelm people with complex charts or cold language. We want Exunite to feel calm, elegant, and motivating — something that blends into the home and supports better habits over time.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Vision</p>
          <h2 className="mt-4 text-3xl font-black">A future where health starts with a simple daily step.</h2>
          <p className="mt-4 text-slate-300 leading-8">
            Our long-term vision is a wellness ecosystem where users can understand their progress at a glance, share meaningful goals with family or trainers, and build trust in their own routine. Exunite is the beginning of that vision.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Sparkles, title: 'Premium product feel', text: 'A device and digital experience designed to feel polished, modern, and quietly futuristic.' },
          { icon: Activity, title: 'Daily wellness momentum', text: 'A single measurement routine can reveal trends that help users keep going with confidence.' },
          { icon: HeartPulse, title: 'Human-centered health', text: 'We focus on helpful feedback, not pressure — making progress feel visible and manageable.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <Icon className="h-6 w-6 text-cyan-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-center text-sm text-slate-400">Company Owner- RayirthJ@Unex</p>
    </section>
  )
}
