import { motion } from 'framer-motion';

const snippets = [
  { text: '// lead_developer.js', top: '15%', left: '5%' },
  { text: 'while(isCoding) { ... }', top: '45%', left: '85%' },
  { text: '<Component />', top: '75%', left: '10%' },
  { text: 'git push --force', top: '25%', left: '75%' },
  { text: 'function animate() { ... }', top: '5%', left: '40%' },
];

const CodeDecorations = () => {
  return (
    <div className="code-decorations-container" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {snippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          className="code-tag tech-font"
          style={{
            position: 'absolute',
            top: snippet.top,
            left: snippet.left,
            whiteSpace: 'nowrap',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: idx * 2,
          }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );
};

export default CodeDecorations;
