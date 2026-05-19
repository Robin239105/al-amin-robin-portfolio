import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PERSONAL } from '../../data/constants'
import Hero3DAvatar from '../3d/Hero3DAvatar'

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-3d-gradient flex items-center pt-28 pb-0 lg:pb-16">
      {/* Background Gradient Orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-secondary/2 rounded-full blur-[120px] pointer-events-none ambient-glow" style={{ animationDelay: '2s' }} />

      {/* Centering wrapper that stretches to the entire available viewport height minus padding */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex items-center min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-176px)]">
        {/* Grid tracks stretch to fill the height, centering text relative to screen midpoint */}
        <div className="grid lg:grid-cols-12 gap-12 lg:min-h-[640px] items-stretch w-full">
          
          {/* Left Content (Grid span 7) - Stretched to full height, relative wrapper, and centered vertically */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center text-center lg:text-left h-full relative w-full"
          >

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 text-gray-300 font-medium tracking-wide text-base sm:text-lg text-center lg:text-left"
            >
              Hey, I am <span className="text-primary font-bold">{PERSONAL.name}</span>
            </motion.div>
            
            {/* Huge Bold Title - High SEO Impact Full-Stack Software Engineer H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-display font-extrabold text-white tracking-tight leading-[1.02] mb-6 text-center lg:text-left"
            >
              Full-Stack <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_25px_rgba(250,131,52,0.25)]">
                Software Engineer
              </span>
            </motion.h1>
            
            {/* High-End Enterprise SEO-Optimized Copy Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 text-xs sm:text-sm lg:text-base mb-8 max-w-xl text-center lg:text-left leading-relaxed font-normal mx-auto lg:mx-0"
            >
              I engineer production-grade web applications, secure REST/GraphQL APIs, and automated cloud systems. Leveraging Next.js, React, Node.js, and custom databases to translate complex business challenges into seamless, scalable digital solutions.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8 w-full"
            >
              <Link
                to="/contact"
                className="relative overflow-hidden group px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider btn-glow transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">Hire me</span>
                {/* Shiny swipe */}
                <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-out z-0" />
              </Link>
              
              <a
                href={`mailto:${PERSONAL.email}`}
                className="relative overflow-hidden w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 group"
                title="Send an email"
              >
                {/* Sliding background */}
                <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10">
                  <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-gray-300 group-hover:text-primary group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </a>
            </motion.div>

            {/* Brand Authority Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-full max-w-xl mt-4"
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center lg:text-left flex flex-col justify-center">
                  <span className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.2)]">
                    13k+
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">
                    Projects
                  </span>
                </div>
                
                <div className="text-center lg:text-left flex flex-col justify-center border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.2)]">
                    800+
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">
                    Clients
                  </span>
                </div>
                
                <div className="text-center lg:text-left flex flex-col justify-center border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.2)]">
                    6+ Years
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">
                    Experience
                  </span>
                </div>
              </div>
            </motion.div>
            
          </motion.div>

          {/* Right Content - 3D Mascot area (Grid span 5) - Visible only on Mobile/Tablet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:hidden relative w-full h-[360px] sm:h-[480px] md:h-[520px] flex items-end justify-center mt-6 z-10 overflow-visible"
          >
            <Hero3DAvatar />
          </motion.div>
          
          {/* Right Content Spacer (Grid span 5) - Reserves space on Desktop */}
          <div className="lg:col-span-5 h-full pointer-events-none hidden lg:block" />
          
        </div>
      </div>
      
      {/* 3D Mascot area - Absolute container centered to align perfectly within the max-w-7xl content grid */}
      <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 h-[88%] max-h-[820px] hidden lg:flex items-end justify-end pointer-events-none z-10">
        <div className="w-[48%] h-full flex items-end justify-center relative">
          <Hero3DAvatar />
        </div>
      </div>
      
    </section>
  )
}