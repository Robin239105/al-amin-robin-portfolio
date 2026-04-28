import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Showcase', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'My Team', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

// Bottom tab bar items with icons
const tabItems = [
  { name: 'Home', path: '/', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )},
  { name: 'About', path: '/about', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )},
  { name: 'Work', path: '/portfolio', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <line x1="3" x2="21" y1="9" y2="9"></line>
      <line x1="9" x2="9" y1="21" y2="9"></line>
    </svg>
  )},
  { name: 'Blog', path: '/blog', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-2.5z"></path>
      <path d="M8 7h6"></path>
      <path d="M8 11h8"></path>
      <path d="M8 15h6"></path>
    </svg>
  )},
  { name: 'Contact', path: '/contact', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )},
];

const MailIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(12, 78, 68, 0)', 'rgba(12, 78, 68, 0.7)']
  );

  const navBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Navigation Bar (Desktop) */}
      <motion.nav 
        className={`navigation ${isScrolled ? 'scrolled' : ''}`}
        style={{ backgroundColor: navBackground, backdropFilter: navBlur }}
      >
        <div className="nav-container container">
          <Link to="/" className="brand" onClick={(e) => handleNavClick(e, '/')}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/media/Untitled-design.webp" alt="Logo" className="nav-logo" />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu" onMouseLeave={() => setHoveredIndex(null)}>
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <div 
                  key={link.name} 
                  className="nav-item-wrapper"
                  onMouseEnter={() => setHoveredIndex(i)}
                >
                  <Link 
                    to={link.path} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.path)}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      style={{ position: 'relative', zIndex: 2 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="nav-hover-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="nav-social-links">
            <a href="mailto:wpdeveloper.robin@gmail.com" className="nav-social-link" aria-label="Email Me"><MailIcon /></a>
            <a href="https://www.facebook.com/wpdeveloper.robin" target="_blank" rel="noopener noreferrer" className="nav-social-link" aria-label="Facebook Profile"><FacebookIcon /></a>
            <a href="https://github.com/Robin239105" target="_blank" rel="noopener noreferrer" className="nav-social-link" aria-label="GitHub Profile"><GithubIcon /></a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="bottom-tab-bar">
        {tabItems.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`tab-item ${isActive ? 'tab-active' : ''}`}
              onClick={(e) => handleNavClick(e, tab.path)}
            >
              <div className="tab-icon-wrapper">
                {tab.icon(isActive)}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="tab-indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="tab-label">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}


