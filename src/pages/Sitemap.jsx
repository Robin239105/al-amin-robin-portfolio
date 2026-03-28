import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal, FadeIn } from '../components/ui/Animations';
import { Map, ArrowRight, ExternalLink } from 'lucide-react';
import './Sitemap.css';

const siteMapData = [
  {
    title: "Main Pages",
    pages: [
      { name: "Home", path: "/", desc: "Main landing page & biography" },
      { name: "About", path: "/about", desc: "Detailed experience & story" },
      { name: "Services", path: "/services", desc: "Service offerings & solutions" },
      { name: "Portfolio", path: "/portfolio", desc: "Selected projects exhibition" },
      { name: "Contact", path: "/contact", desc: "Get in touch for collaborations" }
    ]
  },
  {
    title: "Legal & Tracking",
    pages: [
      { name: "Sitemap (XML)", path: "/sitemap.xml", desc: "Machine-readable search engine index", external: true },
      { name: "Robots.txt", path: "/robots.txt", desc: "Search crawler instructions", external: true }
    ]
  }
];

export default function Sitemap() {
  return (
    <div className="page-container sitemap-page">
      <div className="sitemap-hero">
        <div className="container">
          <ScrollReveal>
            <div className="sitemap-icon-box">
              <Map size={32} className="gold-text" />
            </div>
            <h1 className="sitemap-title">
              Site <span className="gold-text">Architecture.</span>
            </h1>
            <p className="sitemap-subtitle">
              Comprehensive index of all digital assets and navigation routes.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="sitemap-content section-padding">
        <div className="container">
          <div className="sitemap-grid">
            {siteMapData.map((section, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="sitemap-section">
                  <h3 className="sitemap-section-title">{section.title}</h3>
                  <div className="sitemap-links-list">
                    {section.pages.map((page, pIdx) => (
                      page.external ? (
                        <a 
                          key={pIdx} 
                          href={page.path} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="sitemap-card glass-panel premium-glow"
                        >
                          <div className="sitemap-card-info">
                            <span className="sitemap-page-name">{page.name}</span>
                            <span className="sitemap-page-desc">{page.desc}</span>
                          </div>
                          <ExternalLink size={18} className="sitemap-arrow" />
                        </a>
                      ) : (
                        <Link 
                          key={pIdx} 
                          to={page.path} 
                          className="sitemap-card glass-panel premium-glow"
                        >
                          <div className="sitemap-card-info">
                            <span className="sitemap-page-name">{page.name}</span>
                            <span className="sitemap-page-desc">{page.desc}</span>
                          </div>
                          <ArrowRight size={18} className="sitemap-arrow" />
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
