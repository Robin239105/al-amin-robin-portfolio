import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL } from '../../data/constants'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '/about' },
  { name: 'My Stacks', href: '/tech-stack' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'GitHub', href: '/github' },
  { name: 'Connect', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  return (
    <motion.nav 
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? 'top-4 px-4 sm:px-6 md:px-8' : 'top-0 py-4 sm:py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 85, damping: 16 }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative">
        {/* Compact & Balanced header height container */}
        <div className={`flex items-center justify-between relative w-full border transition-all duration-500 ${
          scrolled 
            ? 'h-14 px-5 rounded-full border-white/10 bg-[#070709]/85 backdrop-blur-xl shadow-lg lg:h-12 lg:px-0 lg:rounded-none lg:border-transparent lg:bg-transparent lg:backdrop-blur-none lg:shadow-none' 
            : 'h-16 sm:h-20 px-0 rounded-none border-transparent bg-transparent backdrop-blur-none shadow-none'
        }`}>
          
          {/* Left: Redesigned Premium Brand Logo - Hide on desktop sticky */}
          <div className={`relative z-50 flex items-center transition-all duration-500 ${
            scrolled ? 'lg:opacity-0 lg:pointer-events-none lg:scale-95' : 'lg:opacity-100 lg:pointer-events-auto lg:scale-100'
          }`}>
            <Link to="/" className="flex items-center group cursor-pointer">
              {/* Balanced Brand Name font size */}
              <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-1.5 leading-none transition-all duration-500 group-hover:text-primary">
                <span>robin</span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </span>
            </Link>
          </div>

          {/* Center: Absolute centered floating capsule menu (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            {/* Perfectly sized capsule with outer padding and fixed height on scrolled state */}
            <div className={`rounded-full px-3.5 flex items-center justify-center border transition-all duration-500 shadow-lg ${
              scrolled 
                ? 'h-11 md:h-12 shadow-[0_15px_30px_rgba(250,131,52,0.08)] bg-[#070709]/85 border-primary/20 backdrop-blur-xl scale-95' 
                : 'h-12 sm:h-14 bg-[#030304]/60 border-white/10 backdrop-blur-md'
            }`}>
              
              {/* Desktop menu links inside pill - Perfect spacing, gap, and whitespace-nowrap */}
              <div className="flex items-center gap-2 sm:gap-3 relative">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`px-5 sm:px-6 h-8 sm:h-9 flex items-center justify-center rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative group text-center select-none whitespace-nowrap ${
                        isActive ? 'text-white font-extrabold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {/* Floating glass active capsule indicator with generous margins */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 border border-primary/40 backdrop-blur-md shadow-[0_0_10px_rgba(250,131,52,0.2)] rounded-full z-0"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 leading-none">{link.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Resume Button / Mobile Hamburger button */}
          <div className="relative z-50 flex items-center gap-4">
            {/* Desktop Resume Button - Hide on desktop sticky */}
            <div className={`hidden sm:block transition-all duration-500 ${
              scrolled ? 'lg:opacity-0 lg:pointer-events-none lg:scale-95' : 'lg:opacity-100 lg:pointer-events-auto lg:scale-100'
            }`}>
              <a
                href={PERSONAL.cvUrl}
                download
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary border-none px-6 h-11 rounded-full text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(250,131,52,0.25)] hover:shadow-primary/40 hover:scale-105 active:scale-95 group leading-none cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="leading-none">Resume</span>
              </a>
            </div>

            {/* Mobile/Tablet Hamburger button (Always in its own gorgeous round glass capsule on the far right!) */}
            <button
              className={`lg:hidden w-11 h-11 rounded-full border flex flex-col items-center justify-center relative hover:text-primary transition-all duration-300 cursor-pointer shadow-md ${
                scrolled 
                  ? 'bg-[#070709]/85 border-primary/30 backdrop-blur-xl text-white' 
                  : 'bg-[#030304]/60 border-white/10 backdrop-blur-md text-white'
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="w-5 h-3.5 relative flex flex-col justify-between items-center">
                <span className="w-5 h-0.5 bg-current rounded-full animate-none" />
                <span className="w-5 h-0.5 bg-current rounded-full animate-none" />
                <span className="w-5 h-0.5 bg-current rounded-full animate-none" />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="lg:hidden fixed inset-0 z-50 bg-[#030303] flex flex-col justify-between p-6 pt-6 pb-8 overflow-hidden"
          >
            {/* Elegant Glow background effects inside menu */}
            <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none" />
            
            {/* Elegant Header row inside menu overlay */}
            <div className="flex items-center justify-between w-full relative z-10 py-2 border-b border-white/5">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5 leading-none">
                <span>robin</span>
                <span className="w-2 h-2 rounded-full bg-primary" />
              </span>
              
              <button
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] hover:bg-primary/10 hover:border-primary/45 flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-md"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links with Staggered Slide In */}
            <div className="flex flex-col space-y-6 mt-8 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold font-display">Navigation</span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.href
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.5 }}
                    >
                      <Link
                        to={link.href}
                        className={`inline-flex items-center gap-4 text-3xl sm:text-4xl font-display font-extrabold tracking-tight transition-all duration-300 relative py-1 ${
                          isActive 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-500 font-black' 
                            : 'text-white/60 hover:text-white'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(250,131,52,0.6)]" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Drawer Footer Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="border-t border-white/5 pt-6 space-y-6 relative z-10"
            >
              {/* Quick Status */}
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 py-2.5 px-4 rounded-xl w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase font-sans">Available for Projects</span>
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Email Me</span>
                  <a href={`mailto:${PERSONAL.email}`} className="text-xs text-gray-300 hover:text-primary transition-colors font-medium break-all">{PERSONAL.email}</a>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Location</span>
                  <span className="text-xs text-gray-300 font-medium">Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Action Button & Socials Bar */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <a
                  href={PERSONAL.cvUrl}
                  download
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 px-6 py-3 rounded-full text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-primary/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Resume
                </a>

                {/* Micro Social icons row */}
                <div className="flex items-center gap-2.5">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}