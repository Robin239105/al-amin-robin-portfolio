import { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink, FiStar, FiGitBranch, FiGlobe } from 'react-icons/fi'
import { PERSONAL } from '../data/constants'
import { StaggerContainer, StaggerItem } from '../components/animations/MotionWrappers'
import SEO from '../components/SEO'

interface Repo {
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  language: string | null
  homepage: string | null
}

// Module-level cache to keep repositories loaded between page transitions
let cachedRepos: Repo[] | null = null;
let lastFetchedTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

export default function GithubPage() {
  const [repos, setRepos] = useState<Repo[]>(cachedRepos || [])
  const [loading, setLoading] = useState(!cachedRepos)

  useEffect(() => {
    const fetchRepos = async () => {
      const now = Date.now()
      if (cachedRepos && now - lastFetchedTime < CACHE_DURATION) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch('https://api.github.com/users/Robin239105/repos?sort=updated&per_page=12')
        if (!res.ok) throw new Error('Failed to fetch repositories')
        const data = await res.json()
        if (Array.isArray(data)) {
          cachedRepos = data
          lastFetchedTime = now
          setRepos(data)
        } else {
          throw new Error('Data is not an array')
        }
      } catch (error) {
        console.error('Error fetching repos:', error)
        // Fallback to static repos list based on real repository data if API fails or rate limited
        const fallback = [
          { 
            name: 'Kazzius-Capital', 
            description: 'Fintech Solution Website', 
            stargazers_count: 5, 
            forks_count: 1, 
            html_url: 'https://github.com/Robin239105/Kazzius-Capital', 
            language: 'JavaScript', 
            homepage: 'https://kazziuscapital.com' 
          },
          { 
            name: 'Agency-Operating-System', 
            description: 'Operating Zone For an Agency', 
            stargazers_count: 8, 
            forks_count: 2, 
            html_url: 'https://github.com/Robin239105/Agency-Operating-System', 
            language: 'TypeScript', 
            homepage: 'https://agency-operating-system-virid.vercel.app' 
          },
          { 
            name: 'Bondi-Clinic', 
            description: 'Clinical Dermatology Clinic Website', 
            stargazers_count: 12, 
            forks_count: 3, 
            html_url: 'https://github.com/Robin239105/Bondi-Clinic', 
            language: 'JavaScript', 
            homepage: 'https://bondiskinclinic.com.au' 
          },
          { 
            name: 'al-amin-robin-portfolio', 
            description: 'My Personal Website Development Portfolio', 
            stargazers_count: 15, 
            forks_count: 4, 
            html_url: 'https://github.com/Robin239105/al-amin-robin-portfolio', 
            language: 'JavaScript', 
            homepage: 'https://alaminrobin.com' 
          },
          { 
            name: 'Roam-With-Rove-React', 
            description: 'A car reselling website', 
            stargazers_count: 6, 
            forks_count: 1, 
            html_url: 'https://github.com/Robin239105/Roam-With-Rove-React', 
            language: 'JavaScript', 
            homepage: 'https://roam-with-rove.vercel.app' 
          },
          { 
            name: 'You-Be-The-Champ', 
            description: 'Player Ring Replica Selling Website', 
            stargazers_count: 9, 
            forks_count: 2, 
            html_url: 'https://github.com/Robin239105/You-Be-The-Champ', 
            language: 'JavaScript', 
            homepage: 'https://you-be-the-champ.vercel.app' 
          }
        ]
        if (!cachedRepos) {
          setRepos(fallback)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const githubSchema = {
    '@type': 'CollectionPage',
    'name': 'Al Amin Robin Open Source Repositories',
    'description': 'Real-time repository details and open-source packages maintained by Al Amin Robin.',
    'url': 'https://alaminrobin.com/github'
  }

  return (
    <div className="pt-36 pb-24 px-6 relative overflow-hidden bg-transparent">
      <SEO 
        title="GitHub Repositories & Open Source | Live Activity"
        description="Monitor Al Amin Robin's open-source projects, active repository commits, coding activity, and development work on GitHub."
        keywords="GitHub Repositories, open source code, Al Amin Robin GitHub, Web developer repositories"
        schemaType="CollectionPage"
        schemaData={githubSchema}
      />
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[180px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-secondary/2 rounded-full blur-[140px] pointer-events-none ambient-glow" style={{ animationDelay: '2s' }} />

      <section className="max-w-7xl mx-auto relative z-10">
        <StaggerContainer staggerTime={0.06} animateOnLoad={true}>
          
          {/* Header Layout */}
          <StaggerItem className="mb-16 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold font-display">GitHub</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-4 leading-tight">
              Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Contributions</span>
            </h1>
            <div className="w-16 h-[2px] bg-primary/50 mt-5 mb-6" />
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Review a collection of my public software releases, developer starter packs, and utilities hosted on my GitHub profile.
            </p>
            
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-6 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-sm font-semibold tracking-wide text-white hover:shadow-[0_0_20px_rgba(250,131,52,0.25)] transition-all duration-300"
            >
              View GitHub Profile <FiExternalLink className="w-4 h-4 text-primary" />
            </a>
          </StaggerItem>

          {/* Repositories grid with premium styling */}
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="glass-testimonial rounded-3xl p-8 border border-white/5 animate-pulse min-h-[220px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 pb-3 border-b border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-white/5" />
                      <div className="w-32 h-6 bg-white/5 rounded" />
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded mb-3" />
                    <div className="w-2/3 h-4 bg-white/5 rounded" />
                  </div>
                  <div className="w-24 h-4 bg-white/5 rounded mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <StaggerItem>
              <div className="grid md:grid-cols-2 gap-8">
                {repos.map((repo) => (
                  <div key={repo.name} className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_25px_60px_rgba(250,131,52,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between min-h-[230px]">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
                    
                    <div>
                      {/* Title Bar */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                            <FaGithub className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(250,131,52,0.4)]" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-primary transition-colors line-clamp-1">{repo.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/30 flex items-center justify-center text-gray-300 hover:text-primary transition-all duration-300"
                              title="View Live Site"
                            >
                              <FiGlobe className="w-4 h-4" />
                            </a>
                          )}
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/30 flex items-center justify-center text-gray-300 hover:text-primary transition-all duration-300"
                            title="View Code on GitHub"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>
                    
                    {/* Footer Info */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.03] pt-4 mt-auto">
                      <div className="flex items-center gap-5 text-xs font-mono font-bold tracking-wider text-gray-400">
                        <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1 rounded-full group-hover:border-primary/20 transition-colors">
                          <FiStar className="w-3.5 h-3.5 text-primary drop-shadow-[0_0_5px_rgba(250,131,52,0.4)]" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1 rounded-full group-hover:border-primary/20 transition-colors">
                          <FiGitBranch className="w-3.5 h-3.5 text-primary drop-shadow-[0_0_5px_rgba(250,131,52,0.4)]" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                      
                      {repo.language && (
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-primary border border-primary/20 px-2 py-0.5 rounded-md bg-primary/5">
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>
      </section>
    </div>
  )
}