import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, X } from 'lucide-react';
import './QuickFAQ.css';

const faqData = [
  {
    question: "What services does Al Amin Robin provide?",
    answer: "Al Amin Robin provides premium full stack website development, specializing in custom WordPress solutions, React.js applications, and high-end digital architecture for brands worldwide."
  },
  {
    question: "How many projects has Al Amin Robin completed?",
    answer: "With over 6 years of experience, Al Amin Robin has successfully delivered more than 1,300 projects and managed portfolios for over 1,000 happy clients."
  },
  {
    question: "Does Al Amin Robin offer custom design and UI/UX services?",
    answer: "Yes, we provide comprehensive end-to-end digital services including professional UI/UX design (Figma), custom theme development, and technical speed optimization."
  },
  {
    question: "How long does website development take?",
    answer: "Most premium websites and portfolios are completed within 2 to 4 weeks, depending on complexity, to ensure absolute perfection and performance."
  },
  {
    question: "What technologies do you use for development?",
    answer: "I specialize in a modern stack including React.js, Next.js, and WordPress (Elementor/Bricks), powered by Framer Motion and GSAP for premium animations."
  },
  {
    question: "Do you build eCommerce websites?",
    answer: "Yes, we create high-conversion eCommerce platforms using WooCommerce and Shopify, optimized for both user experience and administrative control."
  },
  {
    question: "How can I contact Al Amin Robin for a project?",
    answer: "You can use the contact form on this website, or connect directly via WhatsApp (+8801575096211) or Telegram for a free project consultation."
  }
];

export default function QuickFAQ({ forceShow = false }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaq = useMemo(() => {
    return faqData.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section className={`quick-faq-section ${forceShow ? 'force-show' : 'desktop-only'}`}>
      <div className="container">
        <div className="quick-faq-title-wrapper">
          <h2 className="quick-faq-title small-title">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <p className="quick-faq-subtitle">Quick answers to common inquiries about my services and process.</p>
        </div>

        {/* Search Bar */}
        <div className="faq-search-wrapper">
          <div className="faq-search-bar glass-panel">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="faq-search-input"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search FAQ"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="quick-faq-grid glass-panel">
          <AnimatePresence mode="wait">
            {filteredFaq.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredFaq.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`faq-item ${activeIdx === idx ? 'active' : ''}`}
                  >
                    <button 
                      className="faq-question-btn"
                      onClick={() => toggle(idx)}
                      aria-expanded={activeIdx === idx}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <span className="faq-icon-wrapper">
                        {activeIdx === idx ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {activeIdx === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="faq-answer-wrapper"
                        >
                          <div className="faq-answer-content">
                            <p>{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="faq-no-results"
              >
                <p>No results found for "<span className="gold-text">{searchQuery}</span>"</p>
                <button 
                  className="btn-text gold-text" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear search and show all
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
