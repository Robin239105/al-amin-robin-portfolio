import { motion } from 'framer-motion'
import { SERVICES } from '../../data/constants'
import { Code2, Database, Cpu, Gauge, Cloud } from 'lucide-react'
import { SiWordpress } from 'react-icons/si'

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-32 px-6 relative overflow-hidden bg-transparent">
      {/* Background Cosmic Ambient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/4 rounded-full blur-[160px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-secondary/2 rounded-full blur-[180px] pointer-events-none ambient-glow" style={{ animationDelay: '3s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mt-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Services</span>
          </h2>
          <div className="w-16 h-[2px] bg-primary/50 mx-auto mt-5" />
          <p className="text-gray-400 max-w-xl mx-auto mt-6 text-sm sm:text-base leading-relaxed">
            Specializing in building modern, high-performance web applications, secure full-stack custom APIs, and intelligent automation systems.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_25px_60px_rgba(250,131,52,0.12)] hover:-translate-y-2 transition-all duration-500 group cursor-default relative overflow-hidden"
            >
              {/* Decorative Subtle Inner Orange Glow Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

              {/* Dynamic glowing SVG Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-white/10 group-hover:border-primary/40 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/10 shadow-[0_0_15px_rgba(250,131,52,0.05)] group-hover:shadow-[0_0_25px_rgba(250,131,52,0.2)] transition-all duration-300 relative overflow-hidden">
                                {/* Frontend (React / Client) */}
                {service.icon === 'Frontend' && (
                  <Code2 aria-hidden="true" className="w-8 h-8 text-primary group-hover:scale-115 group-hover:rotate-6 transition-all duration-300" />
                )}

                {/* Backend (Server / Database) */}
                {service.icon === 'Backend' && (
                  <Database aria-hidden="true" className="w-8 h-8 text-primary group-hover:scale-115 group-hover:-translate-y-0.5 transition-all duration-300" />
                )}

                {/* WordPress (Mobile / Custom CMS) */}
                {service.icon === 'WordPress' && (
                  <SiWordpress aria-hidden="true" className="w-8 h-8 text-primary group-hover:scale-115 group-hover:rotate-12 transition-all duration-300" />
                )}

                {/* DevOps (Cloud Infrastructure) */}
                {service.icon === 'DevOps' && (
                  <Cloud aria-hidden="true" className="w-8 h-8 text-primary group-hover:scale-115 group-hover:animate-pulse transition-all duration-300" />
                )}

                {/* AI (Automation Systems) */}
                {service.icon === 'AI' && (
                  <Cpu aria-hidden="true" className="w-8 h-8 text-primary group-hover:scale-115 group-hover:rotate-[30deg] transition-all duration-300" />
                )}

                {/* Performance & SEO (Gauge Speed dial) */}
                {service.icon === 'SEO' && (
                  <Gauge aria-hidden="true" className="w-8 h-8 text-primary group-hover:scale-115 group-hover:rotate-45 transition-all duration-300" />
                )}

              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}