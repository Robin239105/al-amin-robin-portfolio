import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../../data/constants'

// Unified Browser Mockup displaying the project's actual screenshot
interface BrowserMockupProps {
  url: string;
  image: string;
}

function BrowserMockup({ url, image }: BrowserMockupProps) {
  return (
    <div className="w-full h-full bg-[#070709] rounded-2xl border border-white/5 overflow-hidden flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {/* Browser Bar */}
      <div className="h-7 bg-[#0D0D12] border-b border-white/5 flex items-center px-4 gap-1.5 shrink-0 z-10">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <div className="ml-3 bg-white/5 rounded px-2.5 py-0.5 text-[8px] sm:text-[9px] text-gray-500 font-mono tracking-wider w-48 overflow-hidden text-ellipsis whitespace-nowrap text-left">
          {url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
        </div>
      </div>
      
      {/* Image Container - Still, showing top section */}
      <div className="flex-1 overflow-hidden relative bg-[#09090D]">
        <img 
          src={image} 
          alt={url} 
          width="360"
          height="198"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  )
}


export default function FeaturedProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured)
  
  // Track hovered index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Keep last hovered active index to prevent visual flash during scale down
  const [activeMockupIndex, setActiveMockupIndex] = useState<number>(0)
  
  useEffect(() => {
    if (hoveredIndex !== null) {
      setActiveMockupIndex(hoveredIndex)
    }
  }, [hoveredIndex])

  // Container ref for relative bounding mouse calculation
  const containerRef = useRef<HTMLDivElement>(null)

  // Motion values for cursor coordinates
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // High-fidelity spring configurations for smooth cursor follow feel
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Calculate cursor positions relative to the section wrapper
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Get custom metrics based on index
  const getMetrics = (idx: number) => {
    switch (idx) {
      case 0:
        return [
          { label: 'CONVERSION', val: '+24%' },
          { label: 'REVENUE', val: '6-FIGURE' }
        ]
      case 1:
        return [
          { label: 'PERFORMANCE', val: '98%' },
          { label: 'CORE VITALS', val: 'FAST' }
        ]
      case 2:
        return [
          { label: 'UPTIME', val: '99.9%' },
          { label: 'DATA LAG', val: '<100ms' }
        ]
      case 3:
        return [
          { label: 'HOURS SAVED', val: '40H/MO' },
          { label: 'EFFICIENCY', val: '10X' }
        ]
      default:
        return []
    }
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-20 md:py-28 px-6 bg-[#040406] relative overflow-hidden cursor-default select-none"
    >
      {/* Background Ambient Spotlight Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary/2 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Flagship Works</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold mt-2 text-white">
              Masterpiece <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Creations</span>
            </h2>
          </div>
          
          <Link 
            to="/portfolio" 
            className="relative overflow-hidden group px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white border border-white/10 hover:border-primary/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 shrink-0"
          >
            {/* Sliding background */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-1">
              All Projects <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </Link>
        </div>

        {/* 100% Custom Cursor-Follower Mockup Overlay (Desktop only - NO TILT) */}
        <motion.div
          style={{
            position: 'absolute',
            left: springX,
            top: springY,
            translateX: '-50%',
            translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 50,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: hoveredIndex !== null ? 1 : 0, 
            opacity: hoveredIndex !== null ? 0.98 : 0
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.6 }}
          className="hidden lg:block w-[360px] h-[225px] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10 bg-[#070709] select-none"
        >
          <div className="w-full h-full relative">
            {featured[activeMockupIndex] && (
              <BrowserMockup
                url={featured[activeMockupIndex].liveUrl || 'alaminrobin.com'}
                image={featured[activeMockupIndex].image}
              />
            )}
          </div>
        </motion.div>

        {/* 2x2 Grid of Beautiful, Snug, Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((project, index) => {
            const rowMetrics = getMetrics(index)

            const dotGlowColor = index === 0 
              ? '#FF6B35' 
              : index === 1 
                ? '#7C3AED' 
                : index === 2 
                  ? '#10B981'
                  : '#38BDF8'

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative rounded-3xl border border-white/5 bg-[#08080C] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-[0_20px_50px_rgba(250,131,52,0.02)] cursor-default select-none min-h-[350px] sm:min-h-[380px]"
              >
                {/* Internal Glow Effect */}
                <div 
                  className="absolute -top-1/4 -left-1/4 w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none transition-all duration-500 opacity-5 group-hover:opacity-15"
                  style={{ backgroundColor: dotGlowColor }}
                />

                {/* Top Title & Index section */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] tracking-[0.2em] text-[#FF6B35] font-black uppercase">
                        {project.category.replace('-', ' / ')}
                      </span>
                      {/* Active indicator dot */}
                      <span 
                        className="w-1.5 h-1.5 rounded-full transition-transform duration-500 scale-0 group-hover:scale-100 animate-pulse" 
                        style={{ backgroundColor: dotGlowColor, boxShadow: `0 0 10px ${dotGlowColor}` }} 
                      />
                    </div>
                    
                    <span className="text-2xl font-display font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight leading-none group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Middle Content Section: Text Desc, Tech Badges, Metrics & Mobile Mockup */}
                <div className="relative z-10 my-4 flex-1 flex flex-col justify-center gap-3.5">
                  <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack & metrics wrapper */}
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-3.5">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metric Pills */}
                    <div className="flex gap-2">
                      {rowMetrics.map((m) => (
                        <div 
                          key={m.label}
                          className="border border-white/10 bg-white/[0.02] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 leading-none shrink-0"
                        >
                          <span className="text-[6px] tracking-wide text-gray-500 font-bold uppercase">{m.label}:</span>
                          <span className="text-[8px] sm:text-[9px] text-white font-black">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inline Static Screenshot for Mobile Screens (lg:hidden) */}
                  <div className="block lg:hidden mt-3 w-full aspect-[16/10] max-h-[220px] rounded-2xl overflow-hidden border border-white/5 bg-[#070709]">
                    <div className="w-full h-full relative pointer-events-none scale-[0.98]">
                      <BrowserMockup 
                        url={project.liveUrl || 'alaminrobin.com'} 
                        image={project.image} 
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Action CTA Links */}
                <div className="relative z-20 shrink-0 flex items-center justify-between border-t border-white/5 pt-3.5 bg-[#08080C] mt-2">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View project source code on GitHub"
                        className="relative overflow-hidden group/git w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                      >
                        {/* Sliding background */}
                        <span className="absolute inset-0 bg-white translate-y-full group-hover/git:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        <span className="relative z-10 text-gray-300 group-hover/git:text-black transition-colors duration-300 flex items-center justify-center">
                          <FaGithub className="w-3.5 h-3.5" />
                        </span>
                      </a>
                    )}
                    
                    {project.githubUrl && project.liveUrl && (
                      <span className="text-gray-700 text-xs font-mono">/</span>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] sm:text-[10px] font-extrabold uppercase text-gray-400 hover:text-white transition-colors tracking-widest cursor-pointer leading-none flex items-center gap-1 group/btn relative py-1"
                      >
                        <span className="relative z-10 flex items-center gap-1">
                          Launch Project 
                          <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </span>
                        {/* Sliding underline */}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-orange-500 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300" />
                      </a>
                    )}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Launch project live site"
                      className="relative overflow-hidden group/circle w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer shrink-0"
                    >
                      {/* Sliding background */}
                      <span className="absolute inset-0 bg-gradient-to-tr from-primary to-orange-500 translate-y-full group-hover/circle:translate-y-0 transition-transform duration-300 ease-out z-0" />
                      <span className="relative z-10 text-white group-hover/circle:text-black transition-colors duration-300 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover/circle:translate-x-0.5 group-hover/circle:-translate-y-0.5" />
                      </span>
                    </a>
                  )}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}