import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { LazyMotion, domMax } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

import { HelmetProvider } from 'react-helmet-async';

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
    <HelmetProvider>
      <LazyMotion features={domMax} strict>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
}

import QuickFAQ from './components/QuickFAQ';
import CodeDecorations from './components/ui/CodeDecorations';

function AppContent() {
  return (
    <>
      <div className="noise-overlay"></div>
      <div className="grid-background" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.3 }}></div>
      <CodeDecorations />
      <Navigation />
      <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Catch-all for deleted admin routes */}
            <Route path="/admin/*" element={<Home />} />
            {/* Catch-all for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </main>
      <QuickFAQ />
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
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;


