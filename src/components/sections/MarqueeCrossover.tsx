import { Award, Layers, Users, Star, Zap, Cpu, Sparkles } from 'lucide-react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiWordpress,
  SiDocker,
  SiOpenai
} from 'react-icons/si'

export default function MarqueeCrossover() {
  const stacks = [
    { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#339933]' },
    { name: 'WordPress', icon: SiWordpress, color: 'text-[#21759B]' },
    { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
    { name: 'AI Integration', icon: SiOpenai, color: 'text-primary' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  ]

  const stats = [
    { value: '6+', text: 'Years Experience', icon: Award, accent: 'text-primary' },
    { value: '13k+', text: 'Projects Completed', icon: Layers, accent: 'text-accent' },
    { value: '800+', text: 'Happy Clients', icon: Users, accent: 'text-emerald-400' },
    { value: '100%', text: 'Satisfaction Rate', icon: Star, accent: 'text-amber-400' },
    { value: '98+', text: 'PageSpeed SEO Score', icon: Zap, accent: 'text-orange-400' },
    { value: 'n8n', text: 'AI Automation Specialist', icon: Cpu, accent: 'text-blue-400' },
    { value: '24/7', text: 'Remote Availability', icon: Sparkles, accent: 'text-purple-400' },
  ]

  // Duplicate arrays to create infinite seamless marquee loop
  const doubledStacks = [...stacks, ...stacks, ...stacks, ...stacks]
  const doubledStats = [...stats, ...stats, ...stats, ...stats]

  return (
    <section className="relative z-20 py-12 sm:py-16 overflow-hidden bg-[#040406] border-y border-white/5 marquee-container">
      {/* Dynamic Background Ambient Spotlights */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Futuristic Radial Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Soft Premium Side Fading Masks (Edge Blur & Gradient Blend) */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#040406] via-[#040406]/90 to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#040406] via-[#040406]/90 to-transparent z-30 pointer-events-none" />

      <div className="flex flex-col gap-8 relative z-10">
        
        {/* Track 1: Tech Stack Marquee (Scrolls Left) */}
        <div className="relative">
          <div className="w-full py-2 overflow-hidden flex">
            <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap px-3">
              {doubledStacks.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-[#0D0D12] hover:bg-primary/5 border border-white/5 hover:border-primary/30 py-3 px-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(250,131,52,0.15)] transition-all duration-300 group cursor-default"
                >
                  <item.icon aria-hidden="true" className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-all duration-300`} />
                  <span className="text-gray-300 group-hover:text-white text-sm font-semibold tracking-wide font-sans transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crossover Divider Badge */}
        <div className="flex items-center justify-center gap-4 py-1">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-gray-500 font-sans uppercase">
            Tech Engine <span className="text-primary font-serif italic">//</span> Performance metrics
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Track 2: Stats & Metrics Marquee (Scrolls Right) */}
        <div className="relative">
          <div className="w-full py-2 overflow-hidden flex">
            <div className="animate-marquee-right flex items-center gap-6 whitespace-nowrap px-3">
              {doubledStats.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-[#0B0B0E] hover:bg-accent/5 border border-white/5 hover:border-accent/30 py-3 px-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(250,131,52,0.15)] transition-all duration-300 group cursor-default"
                >
                  <item.icon aria-hidden="true" className={`w-5 h-5 ${item.accent} group-hover:scale-110 transition-all duration-300`} />
                  <span className="text-primary font-extrabold text-sm tracking-wide font-sans">
                    {item.value}
                  </span>
                  <span className="text-gray-400 group-hover:text-white text-sm font-medium tracking-wide font-sans transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
