import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="error-code-wrapper"
          >
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }}
              className="error-code gradient-text"
            >
              404
            </motion.h1>
            <div className="error-glow"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="error-text-container"
          >
            <h2 className="error-title">
              Buddy, you are at the <span className="gold-text">wrong page!</span>
            </h2>
            <p className="error-description">
              The architecture of this URL seems to be missing. 
              Let's get you back to the main structure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="error-cta"
          >
            <Link to="/" className="btn-primary">
              Return to Base
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        .not-found-page {
          min-height: calc(100vh - var(--nav-height));
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 8rem 0;
          overflow: hidden;
        }

        .not-found-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .error-code-wrapper {
          position: relative;
          margin-bottom: 2rem;
        }

        .error-code {
          font-size: clamp(8rem, 20vw, 15rem);
          font-weight: 900;
          line-height: 1;
          margin: 0;
          filter: drop-shadow(0 0 30px var(--accent-glow));
        }

        .error-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          z-index: -1;
          opacity: 0.5;
        }

        .error-title {
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .error-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        .error-cta {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .not-found-page {
            padding: 4rem 0;
          }
          
          .error-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
