import { motion } from 'framer-motion'
import {
  SiReact,
  SiAstro,
  SiNodedotjs,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript
} from 'react-icons/si'

export default function Hero3DAvatar() {
  return (
    <div className="relative w-full h-full flex items-end justify-center select-none overflow-visible scale-[0.55] sm:scale-[0.8] lg:scale-100 origin-bottom">
      
      {/* 1. Concentric Orbit Tracks in Background (Symmetrically centered around his head/neck, z-0) */}
      <div className="absolute rounded-full border border-white/[0.04] w-[360px] h-[360px] pointer-events-none top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute rounded-full border border-white/[0.03] w-[510px] h-[510px] pointer-events-none top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute rounded-full border border-white/[0.015] w-[660px] h-[660px] pointer-events-none top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* 2. Giant 3D Glass Lightning Bolt BEHIND Mascot (Tilted down-left, z-0) */}
      <motion.img
        src="/lightning.webp"
        alt="3D Glass Lightning Bolt"
        width="650"
        height="812"
        className="absolute w-[340px] sm:w-[440px] aspect-[650/812] object-contain pointer-events-none z-0"
        style={{
          top: '-5%',
          right: '-10%',
          filter: 'drop-shadow(0 0 35px rgba(250,131,52,0.45))'
        }}
        initial={{ x: 300, y: -300, opacity: 0, rotate: 45, scale: 0.8 }}
        animate={{ x: 0, y: 0, opacity: 1, rotate: 15, scale: 1 }}
        transition={{ type: "spring", stiffness: 35, damping: 12, duration: 1.6 }}
      />

      {/* 3. Orbiting / Floating Real Stack Badges - Perfectly centered around head/neck, rendering BEHIND mascot (z-10) */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 35, damping: 12, delay: 0.4, duration: 1.5 }}
      >
        
        {/* TRACK A: INNER ORBIT (Clockwise Spin, 360px, Centered around head) */}
        <div className="absolute w-[360px] h-[360px] top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-full h-full animate-orbit-cw relative pointer-events-auto">
            
            {/* NODE.JS BADGE (Top Center) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="counter-rotate-cw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#181E1B]/85 backdrop-blur-md border-2 border-[#339933]/40 flex items-center justify-center shadow-lg shadow-[#339933]/20 hover:scale-115 hover:border-[#339933] transition-all duration-300">
                <SiNodedotjs className="w-6 h-6 sm:w-7 sm:h-7 text-[#339933]" />
              </div>
            </div>
            
            {/* TYPESCRIPT BADGE (Bottom Center) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <div className="counter-rotate-cw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1F2731]/85 backdrop-blur-md border-2 border-[#3178C6]/40 flex items-center justify-center shadow-lg shadow-[#3178C6]/20 hover:scale-115 hover:border-[#3178C6] transition-all duration-300">
                <SiTypescript className="w-6 h-6 sm:w-7 sm:h-7 text-[#3178C6]" />
              </div>
            </div>

            {/* JAVASCRIPT BADGE (Right Edge) */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
              <div className="counter-rotate-cw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#181815]/85 backdrop-blur-md border-2 border-[#F7DF1E]/40 flex items-center justify-center shadow-lg shadow-[#F7DF1E]/20 hover:scale-115 hover:border-[#F7DF1E] transition-all duration-300">
                <SiJavascript className="w-6 h-6 sm:w-7 sm:h-7 text-[#F7DF1E]" />
              </div>
            </div>

            {/* TAILWIND CSS BADGE (Left Edge) */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="counter-rotate-cw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0F172A]/85 backdrop-blur-md border-2 border-[#06B6D4]/40 flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 hover:scale-115 hover:border-[#06B6D4] transition-all duration-300">
                <SiTailwindcss className="w-6 h-6 sm:w-7 sm:h-7 text-[#06B6D4]" />
              </div>
            </div>

          </div>
        </div>

        {/* TRACK B: OUTER ORBIT (Counter-Clockwise Spin, 510px, Centered around head) */}
        <div className="absolute w-[510px] h-[510px] top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-full h-full animate-orbit-ccw relative pointer-events-auto">
            
            {/* REACT BADGE (Right Edge) */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
              <div className="counter-rotate-ccw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1C2025]/85 backdrop-blur-md border-2 border-[#61DAFB]/40 flex items-center justify-center shadow-lg shadow-[#61DAFB]/20 hover:scale-115 hover:border-[#61DAFB] transition-all duration-300">
                <SiReact className="w-7 h-7 sm:w-8 sm:h-8 text-[#61DAFB] animate-spin-slow" />
              </div>
            </div>

            {/* ASTRO BADGE (Left Edge) */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="counter-rotate-ccw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0D0B14]/85 backdrop-blur-md border-2 border-[#FF5D01]/40 flex items-center justify-center shadow-lg shadow-[#FF5D01]/20 hover:scale-115 hover:border-[#FF5D01] transition-all duration-300">
                <SiAstro className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF5D01]" />
              </div>
            </div>

            {/* NEXT.JS BADGE (Top Center) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="counter-rotate-ccw w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/85 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-lg shadow-white/10 hover:scale-115 hover:border-white transition-all duration-300">
                <SiNextdotjs className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>



          </div>
        </div>

      </motion.div>

      {/* 4. Main Mascot - Positioned in FRONT of the orbits (z-20) and sized perfectly to fit within orbits */}
      <motion.div
        className="relative z-20 flex items-end justify-center w-full h-full"
        initial={{ y: 350, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 45, damping: 14, duration: 1.5 }}
      >
        {/* Continuous Hover Float Container */}
        <motion.div
          className="relative z-20 flex items-end justify-center w-full h-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glow behind the mascot */}
          <div className="absolute w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none top-[30%] z-0" />
          
          {/* Mascot Photo - Sized perfectly and resting flush on the bottom baseline */}
          <img
            src="/mascot.webp"
            alt="Al Amin Robin Mascot"
            width="650"
            height="812"
            fetchPriority="high"
            className="w-[104%] sm:w-[108%] max-w-[580px] md:max-w-[600px] lg:max-w-[630px] aspect-[650/812] h-auto object-contain relative z-20 select-none drop-shadow-[0_20px_50px_rgba(250,131,52,0.22)]"
          />
        </motion.div>
      </motion.div>

    </div>
  )
}