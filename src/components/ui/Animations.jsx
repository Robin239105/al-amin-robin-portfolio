import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function ScrollReveal({ children, width = "100%", delay = 0, style = {} }) {
  const ref = useRef(null);
  // Using a more lenient margin to ensure elements at the top of the viewport trigger immediately
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <div ref={ref} style={{ position: "relative", width, ...style }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({ text, elementType: Wrapper = "p", className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  
  const defaultAnimations = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordAnimations = {
    hidden: { opacity: 0, y: 20, filter: "blur(0px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  return (
    <Wrapper className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={defaultAnimations}
        aria-hidden
      >
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
            <motion.span style={{ display: "inline-block" }} variants={wordAnimations}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}

export function CountUp({ to, duration = 2.5, delay = 0 }) {
  const count = useMotionValue(1);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        animate(count, to, { duration, ease: "easeOut" });
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [count, isInView, to, duration, delay]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function CharReveal({ text, className = "", delay = 0, stagger = 0.03 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(0px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={charVariants}
              className={className}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < text.split(" ").length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}


