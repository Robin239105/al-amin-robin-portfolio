import { motion } from 'framer-motion';

const snippets = [
  { text: 'const portfolio = new Developer();', top: '15%', left: '5%' },
  { text: 'while(isCoding) { drink(coffee); }', top: '45%', left: '85%' },
  { text: '<Component {...props} />', top: '75%', left: '10%' },
  { text: 'npm install premium-ux', top: '25%', left: '75%' },
  { text: 'git commit -m "fixed UI"', top: '65%', left: '90%' },
  { text: 'function animate() { requestAnimationFrame(animate); }', top: '5%', left: '40%' },
  { text: 'import { motion } from "framer-motion";', top: '90%', left: '50%' },
  { text: 'useEffect(() => { init(); }, []);', top: '35%', left: '3%' },
  { text: '01100001 01101101 01101001 01101110', top: '85%', left: '25%' },
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
            opacity: [0.1, 0.3, 0.1],
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
