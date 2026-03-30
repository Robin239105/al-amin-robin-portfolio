import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../components/ui/Animations';
import './Portfolio.css';

const categories = [
  'All',
  'Restaurant & Food',
  'Finance & Fintech',
  'Business & Corporate',
  'Real Estate & Construction',
  'Service & Maintenance',
  'Medical & Healthcare',
  'Travel & Hospitality',
  'Creative & Design',
  'Sports'
];

const projects = [
  { title: 'Arqaa', category: 'Travel & Hospitality', imageUrl: '/media/arqaa.webp', liveUrl: 'https://ridearqaa.com/' },
  { title: 'Pro Power', category: 'Service & Maintenance', imageUrl: '/media/FireShot Capture 001 - Pro Power – Professional Trash Bin Cleaning_ - darkturquoise-camel-624860.hostingersite.com.webp', liveUrl: 'https://darkturquoise-camel-624860.hostingersite.com/' },
  { title: 'Ovest KaDeWe', category: 'Restaurant & Food', imageUrl: '/media/screencapture-ovest-kadewe-de-2026-01-22-22_17_58-scaled.webp', liveUrl: 'https://ovest-kadewe.de' },
  { title: 'Soiree By M&C', category: 'Business & Corporate', imageUrl: '/media/FireShot Capture 006 - Soiree By M&C – An Event Company - soireebymc.com.webp', liveUrl: 'https://soireebymc.com/' },
  { title: 'Marler Design', category: 'Creative & Design', imageUrl: '/media/FireShot Capture 005 - Marler Designs - marlerdesigns.com.webp', liveUrl: 'https://marlerdesigns.com/' },
  { title: 'Pellopay', category: 'Finance & Fintech', imageUrl: '/media/FireShot Capture 004 - Pellopay- Best Business Funding In UK - pellopay.io.webp', liveUrl: 'https://pellopay.io/' },
  { title: 'Augusta Das Eis', category: 'Restaurant & Food', imageUrl: '/media/FireShot Capture 003 - Augusta Daseis - augustadaseis.com.webp', liveUrl: 'https://augustadaseis.com/' },
  { title: 'Cali Modern Design and Construction', category: 'Real Estate & Construction', imageUrl: '/media/FireShot Capture 002 - Calimoderndesign - calimoderndesign2487.live-website.com.webp', liveUrl: 'https://calimoderndesign2487.live-website.com' },
  { title: 'Araw Supermarket', category: 'Business & Corporate', imageUrl: '/media/screencapture-arawsupermarket-gr-2025-12-09-16_58_26-scaled-e1765279408154.webp', liveUrl: 'https://arawsupermarket.gr' },
  { title: 'Baxter & Frost', category: 'Restaurant & Food', imageUrl: '/media/screencapture-baxterandfrost-2025-09-28-01_16_43-scaled.webp', liveUrl: 'https://baxterandfrost.com/' },
  { title: 'Bellocorp', category: 'Real Estate & Construction', imageUrl: '/media/screencapture-bellocorp-ca-2023-04-08-20_55_42.webp', liveUrl: 'https://bellocorp.ca/' },
  { title: 'Best Food Recipe', category: 'Restaurant & Food', imageUrl: '/media/screencapture-bestfoodrecipe-2025-09-28-00_35_40-scaled.webp', liveUrl: 'https://bestfoodrecipe.com/' },
  { title: 'Coco Bakery', category: 'Restaurant & Food', imageUrl: '/media/screencapture-cocobakery-sa-2024-05-20-18_16_23.webp', liveUrl: null },
  { title: 'Crypto White Label', category: 'Finance & Fintech', imageUrl: '/media/screencapture-cryptowhitelabel-co-uk-2025-10-30-20_32_06-scaled.webp', liveUrl: 'https://cryptowhitelabel.co.uk' },
  { title: 'Empa World', category: 'Business & Corporate', imageUrl: '/media/screencapture-empaworld-nl-2025-09-28-00_56_27-scaled.webp', liveUrl: 'https://www.empaworld.nl/' },
  { title: 'FL Farmacy', category: 'Medical & Healthcare', imageUrl: '/media/screencapture-flfarmacy-2025-12-09-17_33_16-scaled.webp', liveUrl: 'https://flfarmacy.com' },
  { title: 'FMCG Pay', category: 'Finance & Fintech', imageUrl: '/media/screencapture-fmcgpay-2025-09-27-07_05_21.webp', liveUrl: 'https://fmcgpay.com/' },
  { title: 'German Visa Center', category: 'Business & Corporate', imageUrl: '/media/screencapture-germanvisacenter-2024-05-20-18_31_25.webp', liveUrl: null },
  { title: 'Hostious', category: 'Business & Corporate', imageUrl: '/media/screencapture-hostious-dk-2025-09-27-07_05_57-2-1-scaled.webp', liveUrl: 'https://hostious.dk/' },
  { title: 'ICO America', category: 'Sports', imageUrl: '/media/screencapture-ico-america-2026-01-25-20_29_07-scaled.webp', liveUrl: 'https://ico-america.com/' },
  { title: 'Jonny Winter', category: 'Creative & Design', imageUrl: '/media/screencapture-jonnywinter-au-2024-08-28-02_54_23-scaled.webp', liveUrl: 'https://jonnywinter.com.au' },
  { title: 'Lodge Marlborough', category: 'Travel & Hospitality', imageUrl: '/media/screencapture-lodgesmalbrough-2026-01-26-21_37_17-scaled.webp', liveUrl: 'https://lodgesmalbrough.com' },
  { title: 'London Property', category: 'Finance & Fintech', imageUrl: '/media/screencapture-london-property-devrobin-online-2023-06-28-23_38_27-1.webp', liveUrl: 'https://www.london-property-finance.com/' },
  { title: 'Mrs Garlic', category: 'Restaurant & Food', imageUrl: '/media/screencapture-mrsgarlic-2025-09-28-01_04_23-scaled.webp', liveUrl: 'https://mrsgarlic.com/' },
  { title: 'Nao Sushi', category: 'Restaurant & Food', imageUrl: '/media/screencapture-naosushi-dk-2024-05-20-19_28_05.webp', liveUrl: 'https://www.naosushi.dk/' },
  { title: 'North Brisbane Neurology', category: 'Medical & Healthcare', imageUrl: '/media/screencapture-northbrisbaneneurology-au-2024-05-20-18_24_29.webp', liveUrl: 'https://northbrisbaneneurology.com.au/' },
  { title: 'Patae Queso Grill', category: 'Restaurant & Food', imageUrl: '/media/screencapture-pataequesogrill-2026-01-25-20_57_18-scaled.webp', liveUrl: 'https://pataequesogrill.com/' },
  { title: 'Philipay UK', category: 'Finance & Fintech', imageUrl: '/media/screencapture-philipay-co-uk-2025-09-20-04_17_33-1.webp', liveUrl: 'https://philipay.co.uk' },
  { title: 'Property Finance', category: 'Finance & Fintech', imageUrl: '/media/screencapture-propertyfinancechoices-2025-09-28-00_45_30-scaled.webp', liveUrl: 'https://propertyfinancechoices.com/' },
  { title: 'RGI Foods', category: 'Business & Corporate', imageUrl: '/media/screencapture-rgifoods-2025-09-28-00_24_17-1-scaled.webp', liveUrl: 'https://rgifoods.com/' },
  { title: 'Roam With Rove', category: 'Travel & Hospitality', imageUrl: '/media/screencapture-roamwithrove-2025-09-28-05_17_19-scaled.webp', liveUrl: null },
  { title: 'Rockview Group', category: 'Real Estate & Construction', imageUrl: '/media/screencapture-rockviewgroupe-2026-01-25-22_11_38-scaled.webp', liveUrl: 'https://rockviewgroupe.com/' },
  { title: 'Shedsh', category: 'Restaurant & Food', imageUrl: '/media/screencapture-shedsh-2025-09-20-04_24_36.webp', liveUrl: 'https://shedsh.com' },
  { title: 'Soirée By MC', category: 'Business & Corporate', imageUrl: '/media/screencapture-soireebymc-2025-10-23-17_52_24-scaled.webp', liveUrl: 'https://soireebymc.com' },
  { title: 'Sri Lanka Lifestyle', category: 'Travel & Hospitality', imageUrl: '/media/screencapture-srilanka-lifestyle-2023-06-28-23_35_03-1.webp', liveUrl: null },
  { title: 'Sterling to USDT', category: 'Finance & Fintech', imageUrl: '/media/screencapture-sterlingtousdt-2025-09-28-01_20_33-scaled.webp', liveUrl: 'https://sterlingtousdt.com/' },
  { title: 'Strella PA', category: 'Medical & Healthcare', imageUrl: '/media/screencapture-strellapa-2025-09-28-00_11_53-scaled.webp', liveUrl: 'https://strellapa.com/' },
  { title: 'The Protein Pastry', category: 'Restaurant & Food', imageUrl: '/media/screencapture-theproteinpastry-2025-09-28-00_32_01-scaled.webp', liveUrl: 'https://theproteinpastry.com/' },
  { title: 'USDT Payments', category: 'Finance & Fintech', imageUrl: '/media/screencapture-usdtpayments-co-uk-2025-09-20-04_22_05.webp', liveUrl: 'https://usdtpayments.co.uk' },
  { title: 'Venusia', category: 'Medical & Healthcare', imageUrl: '/media/screencapture-venusia-au-2024-05-20-18_18_42.webp', liveUrl: 'https://www.venusia.com.au/' },
  { title: 'Visit LFG', category: 'Restaurant & Food', imageUrl: '/media/screencapture-visitlfg-2025-09-27-07_27_20-2-scaled.webp', liveUrl: 'https://visitlfg.com/' },
  { title: 'Vista Forge Design', category: 'Creative & Design', imageUrl: '/media/screencapture-vistaforgedesign-au-2025-09-28-05_18_57-scaled.webp', liveUrl: 'https://vistaforgedesign.com.au/' },
  { title: 'Watermark Painting', category: 'Service & Maintenance', imageUrl: '/media/screencapture-watermarkpainting-au-2024-08-28-02_49_48-scaled.webp', liveUrl: 'https://watermarkpainting.com.au' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="page-container portfolio-page">
      {/* Ambient Orbs */}
      <div className="portfolio-orb portfolio-orb-1"></div>
      <div className="portfolio-orb portfolio-orb-2"></div>

      {/* Header */}
      <section className="portfolio-hero-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className="portfolio-eyebrow gold-text">WEBSITE SHOWCASE</p>
            <h1 className="portfolio-hero-title">
              Selected <span className="gold-text">Masterpieces.</span>
            </h1>
            <p className="portfolio-hero-sub">
              A curated collection of premium websites crafted for clients worldwide. Click any project to visit the live site.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="portfolio-filter-section">
        <div className="filter-bar-wrapper">
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.toUpperCase()}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="active-pill"
                    className="active-indicator"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MacBook Mockup Grid */}
      <section className="portfolio-showcase section-padding">
        <div className="container">
          <motion.div 
            layout
            className="portfolio-grid"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => {
                const CardTag = project.liveUrl ? 'a' : 'div';
                const cardProps = project.liveUrl ? {
                  href: project.liveUrl,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {};

                return (
                  <motion.div
                    layout
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CardTag
                      {...cardProps}
                      className="portfolio-mockup-card"
                      style={{ 
                        cursor: project.liveUrl ? 'pointer' : 'default'
                      }}
                    >
                      <div className="macbook-mockup">
                        <div className="macbook-screen">
                          <div className="macbook-camera"></div>
                          <div className="macbook-display">
                            <img
                              src={project.imageUrl}
                              alt={`${project.title} full page`}
                              className="macbook-content"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="macbook-screen-blur-overlay"></div>
                          </div>
                        </div>
                        <div className="macbook-base"></div>
                      </div>
                      <h2 className="portfolio-mockup-title text-gradient">{project.title}</h2>
                    </CardTag>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
