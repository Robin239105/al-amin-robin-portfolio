import { motion } from 'framer-motion'

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({ 
  children, 
  staggerTime = 0.1, 
  className = '',
  animateOnLoad = false 
}: { 
  children: React.ReactNode; 
  staggerTime?: number; 
  className?: string;
  animateOnLoad?: boolean;
}) => (
  <motion.div
    initial="hidden"
    animate={animateOnLoad ? "visible" : undefined}
    whileInView={animateOnLoad ? undefined : "visible"}
    viewport={animateOnLoad ? undefined : { once: true, margin: "-100px" }}
    variants={{
      visible: { transition: { staggerChildren: staggerTime } }
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
)