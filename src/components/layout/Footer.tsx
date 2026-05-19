import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { PERSONAL } from '../../data/constants'

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] py-6 overflow-hidden">
      {/* Subtle brand orange backdrop glow reflecting up from the top seam, merging with CTA glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[300px] bg-gradient-to-b from-primary/12 via-primary/5 to-transparent rounded-full blur-[110px] pointer-events-none" />
      {/* Subtle Glow backdrop */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-primary/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white flex items-center gap-2 leading-none">
                <span>robin</span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </span>
            </Link>
            <span className="text-xs text-gray-500 hidden sm:inline">|</span>
            <p className="text-xs text-gray-400 hidden sm:inline font-semibold">
              Fullstack Developer & Architect
            </p>
          </div>

          {/* Social circular icons */}
          <div className="flex items-center gap-3">
                        {/* GitHub */}
            <a 
              href={PERSONAL.github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 group hover:-translate-y-0.5"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a 
              href={PERSONAL.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-[#0A66C2]/5 hover:bg-[#0A66C2]/15 border border-[#0A66C2]/10 hover:border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:text-white transition-all duration-300 group hover:-translate-y-0.5"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>

            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${PERSONAL.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-[#25D366]/5 hover:bg-[#25D366]/15 border border-[#25D366]/10 hover:border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:text-white transition-all duration-300 group hover:-translate-y-0.5"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            {/* Facebook */}
            <a 
              href={PERSONAL.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#1877F2]/5 hover:bg-[#1877F2]/15 border border-[#1877F2]/10 hover:border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:text-white transition-all duration-300 group hover:-translate-y-0.5"
            >
              <FaFacebook className="w-5 h-5" />
            </a>

          </div>

          {/* Copyright & Availability Badge */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
            <p>© {new Date().getFullYear()} Robin. All rights reserved.</p>
            <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-gray-400 uppercase tracking-wider">Active</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}