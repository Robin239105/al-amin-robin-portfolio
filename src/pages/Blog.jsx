import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="blog-page">
      <div className="portfolio-orb portfolio-orb-1"></div>
      <div className="portfolio-orb portfolio-orb-2"></div>

      {/* Hero Section */}
      <header className="blog-hero-section">
        <div className="container">
          <motion.h1 
            className="blog-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Insight & Innovation
          </motion.h1>
          <motion.p 
            className="blog-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Exploring the frontiers of Web Development, AI, and Digital Strategy in 2026.
          </motion.p>
        </div>
      </header>

      {/* Filter Section */}
      <div className="blog-filter-section">
        <div className="blog-filter-wrapper">
          <div className="blog-filter-bar">
            {categories.map((category) => (
              <button
                key={category}
                className={`blog-filter-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="blog-active-indicator"
                    className="blog-active-indicator"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="blog-grid">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-card-image" loading="lazy" />
                  <span className="blog-card-category">{post.category}</span>
                </div>
                <div className="blog-card-content">
                  <span className="blog-card-date">{post.date}</span>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    Read Article
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Blog;
