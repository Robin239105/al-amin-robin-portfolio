import { TECH_STACK } from '../data/constants'
import { StaggerContainer, StaggerItem } from '../components/animations/MotionWrappers'
import TechIcon from '../components/TechIcon'
import SEO from '../components/SEO'

export default function TechStack() {
  const techSchema = {
    '@type': 'CollectionPage',
    'name': 'Al Amin Robin Tech Stack & Engineering Skills',
    'description': 'A detailed catalog of development technologies, database frameworks, DevOps tools, and CMS platforms used by Al Amin Robin.',
    'url': 'https://alaminrobin.com/tech-stack'
  }

  return (
    <div className="pt-36 pb-24 px-6 relative overflow-hidden bg-transparent">
      <SEO 
        title="Tech Stack & Engineering Skills | Modern Development Toolkit"
        description="Explore Al Amin Robin's developer toolkit. Specialist in React, Next.js, WordPress development, WooCommerce, server management, and AI automations."
        keywords="React, Next.js, PHP, Node.js, WordPress Custom Themes, Docker, PostgreSQL, n8n, Make"
        schemaType="CollectionPage"
        schemaData={techSchema}
      />
      {/* Background Cosmic Ambient Orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[180px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-secondary/2 rounded-full blur-[140px] pointer-events-none ambient-glow" style={{ animationDelay: '2s' }} />

      <section className="max-w-7xl mx-auto relative z-10">
        <StaggerContainer animateOnLoad={true}>
          
          {/* Header Layout */}
          <StaggerItem className="mb-20 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold font-display">My Stacks</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-4 leading-tight">
              My Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Stacks</span>
            </h1>
            <div className="w-16 h-[2px] bg-primary/50 mt-5 mb-6" />
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              A curated toolkit of robust languages, performance-oriented frameworks, cloud systems, and intelligent modern integrations that I use to bring fast, secure web applications to life.
            </p>
          </StaggerItem>

          {/* Staggered Stacks Grid */}
          <StaggerContainer staggerTime={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TECH_STACK.map((category) => (
                <StaggerItem key={category.name}>
                  <div className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_25px_60px_rgba(250,131,52,0.12)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    
                    {/* Corner decorative aura */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                    <h2 className="text-lg font-bold text-white mb-6 tracking-wider uppercase border-b border-white/5 pb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    
                    <div className="space-y-3.5">
                      {category.items.map((tech) => (
                        <div 
                           key={tech.name}
                           className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-primary/30 hover:bg-primary/5 hover:translate-x-1.5 transition-all duration-300 group/item cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-white/5 group-hover/item:bg-white/10 flex items-center justify-center border border-white/10 group-hover/item:border-primary/45 transition-colors">
                              <TechIcon name={tech.icon} className="w-5 h-5" />
                            </span>
                            <span className="text-sm font-semibold text-gray-300 group-hover/item:text-white transition-colors">
                              {tech.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover/item:text-primary/70 transition-colors">
                            {tech.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </StaggerContainer>
      </section>
    </div>
  )
}