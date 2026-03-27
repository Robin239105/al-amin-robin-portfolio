import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { lazy, Suspense } from 'react';
import { LazyMotion, domMax } from 'framer-motion';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    // Initialize premium momentum scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => lenis.destroy();
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </LazyMotion>
  );
}

function AppContent() {
  return (
    <>
      <div className="noise-overlay"></div>
      <Navigation />
      <main className="main-content">
        <Suspense fallback={<div className="loader-container"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all for deleted admin routes */}
            <Route path="/admin/*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8801575096211"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.054 31.29l6.156-1.97A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.318 22.594c-.39 1.1-1.932 2.014-3.152 2.282-.834.178-1.924.32-5.594-1.202-4.694-1.946-7.71-6.71-7.944-7.02-.226-.31-1.846-2.462-1.846-4.698 0-2.236 1.168-3.334 1.584-3.79.39-.426 1.026-.614 1.636-.614.198 0 .376.01.536.018.456.02.686.046 .988.764.376.896 1.296 3.162 1.41 3.392.114.232.228.542.08.854-.14.318-.264.46-.496.726-.232.268-.454.472-.686.76-.214.254-.454.526-.194.97.26.444 1.158 1.906 2.486 3.088 1.706 1.518 3.146 1.99 3.59 2.21.444.22.706.184.964-.112.266-.304 1.136-1.322 1.438-1.776.296-.456.596-.376.998-.226.406.148 2.57 1.212 3.012 1.432.444.222.74.332.854.518.112.186.112 1.08-.278 2.184z"/>
        </svg>
      </a>
    </>
  );
}

export default App;
