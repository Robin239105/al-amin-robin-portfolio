import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { PROJECTS } from '../data/constants'
import { StaggerContainer, StaggerItem } from '../components/animations/MotionWrappers'
import SEO from '../components/SEO'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All Categories')
  const [activeTech, setActiveTech] = useState('All Technologies')

  // Dynamically extract and sort unique categories
  const categories = [
    'All Categories',
    ...Array.from(new Set(PROJECTS.map((p) => p.category))).sort()
  ]

  // Dynamically extract and sort unique tech tags from all projects
  const uniqueTechs = [
    'All Technologies',
    ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech))).sort()
  ]

  // Concurrently filter by both category and technology selection
  const filtered = PROJECTS.filter((p) => {
    const matchCategory = activeCategory === 'All Categories' || p.category === activeCategory
    const matchTech = activeTech === 'All Technologies' || p.tech.includes(activeTech)
    return matchCategory && matchTech
  })

  const portfolioSchema = {
    '@type': 'CollectionPage',
    'name': 'Al Amin Robin Projects Archive',
    'description': 'A showcase of high-end custom WordPress architectures, SaaS dashboards, Next.js web applications, and database optimizations.',
    'url': 'https://alaminrobin.com/portfolio'
  }

  return (
    <div className="pt-36 pb-24 px-6 relative overflow-hidden bg-transparent">
      <SEO 
        title="Portfolio & Projects Archive | Premium Web Solutions"
        description="Browse Al Amin Robin's work portfolio containing custom themes, SaaS integrations, fullstack applications, and backend systems."
        keywords="Web developer portfolio, custom wordpress theme developer, nextjs developer portfolio, react projects"
        schemaType="CollectionPage"
        schemaData={portfolioSchema}
      />
      {/* Cosmic background ambient glow circles */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[180px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/2 rounded-full blur-[140px] pointer-events-none ambient-glow" style={{ animationDelay: '2s' }} />

      <section className="max-w-7xl mx-auto relative z-10">
        <StaggerContainer animateOnLoad={true}>
          
          {/* Header Layout Grid */}
          <StaggerItem className="mb-12 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold font-display">Showcase</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-4 leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Projects Archive</span>
            </h1>
            <div className="w-16 h-[2px] bg-primary/50 mt-5 mb-6" />
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Explore an extensive collection of my selected engineering creations, spanning complete high-performance fullstack web applications, custom API integrations, WordPress sites, and sleek premium user interfaces.
            </p>
          </StaggerItem>

          {/* Minimal Controls Center Dashboard Bar */}
          <StaggerItem className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-5 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-lg shadow-black/15">
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold self-start sm:self-center">Filter Operations</span>
                <div className="w-full sm:w-[1px] h-[1px] sm:h-6 bg-white/10 hidden sm:block" />
                
                {/* Category Selector */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Category:</span>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="appearance-none w-full sm:w-auto bg-[#07070A] border border-white/10 rounded-2xl pl-4 pr-10 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 cursor-pointer hover:border-white/20 transition-all font-semibold shadow-inner bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tech Stack Selector */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tech Stack:</span>
                  <select
                    value={activeTech}
                    onChange={(e) => setActiveTech(e.target.value)}
                    className="appearance-none w-full sm:w-auto bg-[#07070A] border border-white/10 rounded-2xl pl-4 pr-10 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 cursor-pointer hover:border-white/20 transition-all font-semibold shadow-inner bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat"
                  >
                    {uniqueTechs.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear button if any filter is active */}
              {(activeCategory !== 'All Categories' || activeTech !== 'All Technologies') && (
                <button
                  onClick={() => {
                    setActiveCategory('All Categories')
                    setActiveTech('All Technologies')
                  }}
                  className="text-xs text-primary hover:text-orange-400 font-bold uppercase tracking-wider px-4 py-2 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all w-full md:w-auto text-center cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </StaggerItem>

          {/* Dynamic Grid of Showcase Cards */}
          <StaggerItem key={`${activeCategory}-${activeTech}`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <div key={project.id} className="group rounded-3xl overflow-hidden border border-white/5 orange-glow-border glass-testimonial hover:shadow-[0_25px_60px_rgba(250,131,52,0.12)] hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between h-full">
                    
                    {/* Decorative subtle aura inside card */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                    <div>
                      {/* Image Frame */}
                      <div className="aspect-[4/3] bg-white/[0.02] overflow-hidden relative border-b border-white/5">
                        <img
                          src={project.image}
                          alt={project.title}
                          width="400"
                          height="300"
                          loading="lazy"
                          decoding="async"
                          className="absolute top-0 left-0 w-full h-auto translate-y-0 transition-all duration-[5000ms] ease-in-out group-hover:top-full group-hover:-translate-y-full"
                        />
                        {/* Hover Overlay with Glass Buttons */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                          <div className="flex gap-3 relative z-20">
                            {project.liveUrl && (
                              <a 
                                href={project.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Launch project live site"
                                className="w-12 h-12 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center text-black font-extrabold hover:scale-110 shadow-[0_0_15px_rgba(250,131,52,0.4)] transition-transform"
                              >
                                <FiExternalLink className="w-5 h-5" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="View project source code on GitHub"
                                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-white/20 transition-transform"
                              >
                                <FaGithub className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 relative z-10">
                        <div className="flex items-center gap-2.5 mb-3.5">
                          <span className="text-xs font-mono text-primary bg-primary/5 border border-primary/20 px-2 py-0.5 rounded">{String(project.id).padStart(2, '0')}</span>
                          <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{project.category.replace('-', ' / ')}</span>
                        </div>
                        <h3 className="text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight uppercase">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges footer (stuck to bottom of card) */}
                    <div className="p-6 pt-0 mt-auto relative z-10">
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-gray-300 border border-white/10 group-hover:border-primary/20 group-hover:text-white transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  )
}