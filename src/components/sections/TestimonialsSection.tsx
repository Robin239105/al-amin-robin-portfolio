import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../../data/constants'
import { Star, Shield, Zap, Globe } from 'lucide-react'

export default function TestimonialsSection() {
  // Duplicate testimonials to create a seamless infinite marquee slider loop
  const infiniteTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

  const renderPlatformBadge = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'fiverr':
        return (
          <div className="flex items-center gap-1 bg-[#1DBF73]/10 px-2.5 py-0.8 rounded-full text-[9px] tracking-wide font-black text-[#1DBF73] uppercase shrink-0">
            <Zap aria-hidden="true" className="w-2.5 h-2.5 fill-[#1DBF73] text-transparent" />
            Fiverr
          </div>
        )
      case 'upwork':
        return (
          <div className="flex items-center gap-1 bg-[#14A800]/10 px-2.5 py-0.8 rounded-full text-[9px] tracking-wide font-black text-[#14A800] uppercase shrink-0">
            <Shield aria-hidden="true" className="w-2.5 h-2.5 fill-[#14A800] text-transparent" />
            Upwork
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-1 bg-primary/10 px-2.5 py-0.8 rounded-full text-[9px] tracking-wide font-black text-primary uppercase shrink-0">
            <Globe aria-hidden="true" className="w-2.5 h-2.5 text-primary" />
            Direct
          </div>
        )
    }
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[#040406]">
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[180px] pointer-events-none ambient-glow" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-secondary/1 rounded-full blur-[130px] pointer-events-none ambient-glow" style={{ animationDelay: '1.5s' }} />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Full-width Wide Fading Gradient Side Masks for Seamless Edge-to-Edge Fade */}
      <div className="absolute inset-y-0 left-0 w-[20%] sm:w-[35%] bg-gradient-to-r from-[#040406] via-[#040406]/95 via-[#040406]/70 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] sm:w-[35%] bg-gradient-to-l from-[#040406] via-[#040406]/95 via-[#040406]/70 to-transparent z-20 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 px-6"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">What Clients Say</span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mt-4 text-white">
            Client Success & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Reviews</span>
          </h2>
          <div className="w-16 h-[2px] bg-primary/50 mx-auto mt-5" />
        </motion.div>

        {/* Seamless Infinite Testimonial Slider Row */}
        <div className="w-full overflow-hidden flex py-4">
          <div 
            className="animate-marquee-left hover:[animation-play-state:paused] flex gap-6 items-stretch whitespace-nowrap px-3"
            style={{ animationDuration: '80s' }}
          >
            {infiniteTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="w-[360px] sm:w-[400px] shrink-0 whitespace-normal bg-[#08080C] rounded-3xl p-6 sm:p-8 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden flex flex-col justify-between cursor-pointer select-none group"
              >
                {/* Double Quote Backdrop decoration */}
                <span className="absolute -top-6 -right-2 text-8xl font-serif text-primary/[0.02] select-none group-hover:text-primary/[0.05] group-hover:scale-105 transition-all duration-500">
                  “
                </span>

                <div>
                  {/* Top Row: quote mark & platform badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl text-primary font-serif leading-none">“</span>
                    {renderPlatformBadge(testimonial.platform)}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base italic mb-6 font-medium">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Bottom Row: credentials and stars */}
                <div className="pt-5 border-t border-white/5 flex flex-col gap-4 mt-auto">
                  <div className="flex justify-between items-center gap-4">
                    
                    {/* Author identity */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary border border-primary/20 shrink-0">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-white text-sm leading-tight">{testimonial.author}</h3>
                        <p className="text-[10px] text-gray-500 mt-0.5 font-bold tracking-wide uppercase">
                          {testimonial.role} @ <span className="text-gray-400">{testimonial.company}</span>
                        </p>
                      </div>
                    </div>

                    {/* Star Rating Icons */}
                    <div className="flex gap-0.5 shrink-0">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-primary fill-primary" 
                        />
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}