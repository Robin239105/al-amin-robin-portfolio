import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function HeroBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const snippets = [
    "const profile = 'Full Stack Developer';",
    "function buildMasterpiece() { }",
    "npm run cinematic",
    "<ArchitecturalNode />",
    "git push origin v5.0",
    "import { GSAP } from 'gsap';",
    "while(is_creative) { ... }",
    "const perfection = true;",
    "export default Portfolio;",
    "const status = 'Level 2 Seller';"
  ];

  return (
    <div className="hero-bg-container">
      {/* Code Background Layer (v4.5) */}
      <div className="hero-code-bg">
        {snippets.map((code, i) => (
          <div 
            key={i} 
            className="hero-code-snippet"
            style={{ 
              top: `${10 + (Math.random() * 80)}%`, 
              left: `${5 + (Math.random() * 85)}%`,
              opacity: 0.04 + (Math.random() * 0.03)
            }}
          >
            {code}
          </div>
        ))}
      </div>


      {/* Interactive Spotlight */}
      <motion.div 
        className="hero-interactive-spotlight"
        style={{
          left: springX,
          top: springY,
          willChange: 'left, top'
        }}
      />

      {/* Architectural Grid Lines (Subtle) */}
      <div className="hero-grid-lines"></div>
    </div>
  );
}

