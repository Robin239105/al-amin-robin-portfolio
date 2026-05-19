import { motion } from 'framer-motion'

const techIcons = [
  { name: 'React', color: '#61DAFB', icon: '⚛️', delay: 0 },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'JS', delay: 0.5 },
  { name: 'Node.js', color: '#339933', icon: 'N', delay: 1 },
  { name: 'TypeScript', color: '#3178C6', icon: 'TS', delay: 1.5 },
  { name: 'HTML5', color: '#E34F26', icon: '5', delay: 2 },
  { name: 'CSS3', color: '#1572B6', icon: '3', delay: 2.5 },
]

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {techIcons.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute floating-icon"
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${20 + (index % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: tech.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${tech.color}22, ${tech.color}44)`,
              border: `2px solid ${tech.color}66`,
              color: tech.color,
              boxShadow: `0 10px 30px ${tech.color}33`,
            }}
          >
            {tech.icon}
          </div>
        </motion.div>
      ))}
    </div>
  )
}