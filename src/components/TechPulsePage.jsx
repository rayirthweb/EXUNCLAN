import { useEffect, useMemo, useState } from 'react'
import { Filter, Search, Zap } from 'lucide-react'

const filters = ['All', 'AI', 'Robotics', 'Space', 'Cybersecurity']

export default function TechPulsePage() {
  const [query, setQuery] = useState('technology')
  const [activeFilter, setActiveFilter] = useState('All')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story`)
        const data = await res.json()
        if (alive) setItems(data.hits || [])
      } catch {
        if (alive) setError('Could not load live stories right now.')
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [query])

  const visible = useMemo(() => {
    const pool = activeFilter === 'All' ? items : items.filter((item) => `${item.title || ''} ${item._tags?.join(' ') || ''}`.toLowerCase().includes(activeFilter.toLowerCase()))
    return pool.slice(0, 9)
  }, [items, activeFilter])

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          <Zap className="h-4 w-4" /> Latest advancements around the world
        </div>
        <h2 className="mt-5 text-4xl font-black">Tech Pulse</h2>
        <p className="mt-3 max-w-2xl text-slate-300 leading-8">
          Explore live technology stories from around the web. Search a topic, filter by category, and browse the newest developments in AI, robotics, space, and cybersecurity.
        </p>

        <div className="mt-6 flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-slate-950/60 px-4 py-3">
          <Search className="h-4 w-4 text-cyan-300" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" placeholder="Search tech news" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm transition ${activeFilter === filter ? 'bg-white text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'}`}
            >
              <Filter className="mr-2 inline h-4 w-4" />
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="text-slate-300">Loading the latest stories...</p> : null}
        {error ? <p className="text-red-300">{error}</p> : null}
        {!loading && !error
          ? visible.map((item) => (
              <article key={item.objectID} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Tech story</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title || 'Untitled story'}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-300">{item.story_text || 'A major development shaping the next generation of products and ideas.'}</p>
                <a href={item.url || `https://news.ycombinator.com/item?id=${item.objectID}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Read more <span aria-hidden="true">→</span>
                </a>
              </article>
            ))
          : null}
      </div>
    </section>
  )
}
