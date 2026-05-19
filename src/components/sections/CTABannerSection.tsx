import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTABannerSection() {
  return (
    <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-[#030303]">
      {/* Dynamic ambient lighting & gorgeous sunset brand orange glow at the bottom seam */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[850px] h-[300px] bg-gradient-to-t from-primary/12 via-primary/5 to-transparent rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold font-display">Let's Create</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight text-white">
            Ready to Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-500 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Something New?</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Let's discuss your project, integrate intelligent features, and build something truly exceptional together. I am always open to unique freelancing and contracting opportunities.
          </p>
          <div className="pt-6">
            <Link
              to="/contact"
              className="relative overflow-hidden group btn-glow inline-flex items-center gap-3 px-10 py-4 rounded-full text-black font-extrabold text-lg shadow-[0_0_20px_rgba(250,131,52,0.4)] hover:shadow-[0_0_35px_rgba(250,131,52,0.6)] transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                Let's Talk
                <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </span>
              {/* Shiny swipe */}
              <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-out z-0" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}