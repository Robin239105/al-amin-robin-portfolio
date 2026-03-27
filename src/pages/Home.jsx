import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedText, FadeIn, ScrollReveal, CountUp, CharReveal } from '../components/ui/Animations';
import MagneticButton from '../components/ui/MagneticButton';
import { useState, useEffect } from 'react';
import { AiLogo, PsLogo, XdLogo, FigmaLogo, ShopifyLogo, DiviLogo } from '../components/ui/SkillIcons';
import HeroBackground from '../components/ui/HeroBackground';
import './Home.css';

// ... (technologies, expertise, reviewImages arrays remain unchanged)
const technologies = [
  { name: 'Elementor', img: '/media/Elementor-Logo-Symbol-Red.webp', percent: 98 },
  { name: 'Breakdance', img: '/media/breakdance-logo-black.webp', percent: 98 },
  { name: 'WordPress', img: '/media/wordpress.svg', percent: 98 },
  { name: 'React.js', img: 'https://cdn.worldvectorlogo.com/logos/react-2.svg', percent: 98 },
  { name: 'Next.js', img: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', percent: 95 },
  { name: 'Mern Stack', img: '/media/MERN-logo.webp', percent: 97 },
  { name: 'Node.js', img: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg', percent: 94 },
  { name: 'Tailwind', img: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg', percent: 98 },
  { name: 'Three.js', img: 'https://cdn.worldvectorlogo.com/logos/threejs-1.svg', percent: 92 },
  { name: 'GSAP', img: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg', percent: 96 },
  { name: 'Framer Motion', img: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg', percent: 98 },
  { name: 'Shopify', img: '/media/58482ec0cef1014c0b5e4a70.webp', percent: 90 },
  { name: 'HTML', img: '/media/HTML5_logo_and_wordmark.svg.webp', percent: 98 },
  { name: 'CSS', img: '/media/CSS3_logo_and_wordmark.svg.webp', percent: 99 },
  { name: 'Java Script', img: '/media/javascript-logo-javascript-icon-transparent-free-png.webp', percent: 95 },
  { name: 'Python', img: '/media/python_logo_icon_168886.webp', percent: 96 },
  { name: 'Figma', icon: <FigmaLogo />, percent: 98 },
  { name: 'Photoshop', icon: <PsLogo />, percent: 97 },
  { name: 'Illustrator', icon: <AiLogo />, percent: 95 },
  { name: 'XD', icon: <XdLogo />, percent: 92 },
  { name: 'Firebase', img: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', percent: 94 },
  { name: 'AWS', img: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', percent: 90 }
];

const expertise = [
  {
    num: '01',
    title: 'Digital Architecture',
    desc: 'Strategic digital blueprints for high-performance brands. We transform complex visions into scalable, structurally sound web environments.',
  },
  {
    num: '02',
    title: 'Premium Web Design',
    desc: 'Ultra-luxurious portfolios and corporate websites. We blend Kinetic Architect principles with high-end digital aesthetics.',
  },
  {
    num: '03',
    title: 'Full-Stack Development',
    desc: 'Robust, scaleable backend systems with personalized management dashboards for absolute content control.',
  }
];

const testimonials = [
  {
    name: "kfn2025",
    country: "United States",
    countryCode: "us",
    rating: 5,
    date: "1 month ago",
    text: "Wow!! Love This Guy! He redesigned my site and spent 2 days 8 hours training me and accepting my 1000 changes. never complained once. my site is super professional now—I only pay hosting fees. He added my blog page and uploaded my videos too.",
    stats: { price: "$100-$200", duration: "13 days", service: "WordPress" },
    highlight: "Super Professional & Full Support"
  },
  {
    name: "garrison850tg",
    country: "United States",
    countryCode: "us",
    rating: 5,
    date: "2 months ago",
    text: "He did an incredible job on my website. It looks clean, professional, and exactly how I wanted it. What really stood out was his dedication—he kept working even when he was sick just to make sure it got done on time. You don't find that kind of commitment often. I'd definitely recommend him.",
    stats: { price: "$100-$200", duration: "4 weeks", service: "WordPress" },
    highlight: "Unmatched Dedication"
  },
  {
    name: "mmthomas86",
    country: "China",
    countryCode: "cn",
    rating: 5,
    date: "1 month ago",
    text: "It was a pleasure working with Robin, he was extremely patient while we were slow with giving feedback. Love the design and quality of the website. Efficient CMS system and he even created a unique plug in for a specific use case we had. Would highly recommend this seller.",
    stats: { price: "$200-$400", duration: "6 weeks", service: "WordPress" },
    highlight: "Design Quality & Custom Solutions"
  },
  {
    name: "dnorthrup25",
    country: "United States",
    countryCode: "us",
    rating: 4,
    date: "3 months ago",
    text: "I enjoyed working with them to get my website spun-up. They provided some great expertise and were very friendly. The designer did a phenomenal job on the layout, and incorporated everything I wanted exactly how I envisioned it. They stayed on board for revisions and continue to offer support.",
    stats: { price: "$400-$600", duration: "2 weeks", service: "WordPress" },
    highlight: "expertise & Friendly Collaboration"
  },
  {
    name: "hottea2088",
    country: "Netherlands",
    countryCode: "nl",
    rating: 5,
    date: "2 months ago",
    text: "This guy designed a website for me out of my expectation. During the project there was some extra work to do, and he did it without extra costs and it took him a lot of time. Will buy again!",
    stats: { price: "$100-$200", duration: "7 weeks", service: "WordPress" },
    highlight: "Exceeded Expectations"
  },
  {
    name: "abdullahx3",
    country: "Saudi Arabia",
    countryCode: "sa",
    rating: 5,
    date: "1 month ago",
    text: "I sincerely appreciate Md. Al Amin for his outstanding work, ethical approach, and remarkable patience. Not only did he create my website, but he also dedicated time to guide and teach me how to edit elements. His support extended beyond creation, empowering me to enhance my design skills. This collaboration has been truly enriching.",
    stats: { price: "Up to $50", duration: "5 weeks", service: "WordPress" },
    highlight: "Ethical & Empowering Work"
  },
  {
    name: "cindy_palacios",
    country: "United States",
    countryCode: "us",
    rating: 5,
    date: "1 month ago",
    text: "I really appreciate all the help with fixing up my website. It had some mismatched features and looked outdated, and it's much smoother and more cohesive now. Plus he's helping train me up so that I can keep up with updates better in the future.",
    stats: { price: "$200-$400", duration: "3 weeks", service: "WordPress" },
    highlight: "Smooth & Cohesive Redesign"
  }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 60000); // 1 minute auto-play
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="testimonial-slider-wrapper">
      <div className="slider-controls-side">
        <button onClick={prev} className="slider-arrow prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>

      <div className="testimonial-main-box">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -100) {
                next();
              } else if (swipe > 100) {
                prev();
              }
            }}
            className="glass-testimonial-card cinematic-glass-v2"
            style={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <div className="review-quote-mark">“</div>
            
            <div className="testimonial-card-content">
              <div className="review-tag-v2 gold-text">
                <span className="glow-dot"></span>
                {testimonials[current].highlight}
              </div>
              
              <blockquote className="testimonial-quote">
                {testimonials[current].text}
              </blockquote>

              <div className="review-stats-grid">
                <div className="stat-pill">
                  <span className="label">Investment:</span> {testimonials[current].stats.price}
                </div>
                <div className="stat-pill">
                  <span className="label">Timeline:</span> {testimonials[current].stats.duration}
                </div>
                <div className="stat-pill">
                  <span className="label">Expertise:</span> {testimonials[current].stats.service}
                </div>
              </div>
            </div>

            <div className="testimonial-card-footer">
              <div className="client-brand">
                <div className="avatar-orb">
                  {testimonials[current].name.charAt(0).toUpperCase()}
                </div>
                <div className="brand-info">
                  <h4 className="client-name-v2">{testimonials[current].name}</h4>
                  <div className="client-meta-v2">
                    <img src={`https://flagcdn.com/16x12/${testimonials[current].countryCode}.png`} alt="" className="flag-mini" />
                    <span>{testimonials[current].country}</span>
                    <span className="dot-sep"></span>
                    <span>{testimonials[current].date}</span>
                  </div>
                </div>
              </div>
              
              <div className="rating-stars-v2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`star-svg ${i < testimonials[current].rating ? 'active' : 'inactive'}`} 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="slider-dots">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)} 
              className={`dot ${i === current ? 'active' : ''}`}
            ></button>
          ))}
        </div>
      </div>

      <div className="slider-controls-side">
        <button onClick={next} className="slider-arrow next" aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

// SkillMarquee Component v4.0.4
const SkillsMarquee = () => {
  // Duplicate for seamless loop
  const duplicateTech = [...technologies, ...technologies, ...technologies];

  return (
    <div className="skills-marquee-container">
      <div className="skills-marquee-track">
        {duplicateTech.map((skill, i) => (
          <div key={i} className="skill-marquee-item premium-glass-v2">
            <div className="skill-icon-mini">
              {skill.icon ? skill.icon : <img src={skill.img} alt={skill.name} loading="lazy" />}
            </div>
            <span className="skill-name-mini">{skill.name}</span>
            <span className="skill-percent-mini">{skill.percent}%</span>
            <div className="skill-glow-mini"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// SkillCard component remains unchanged
const SkillCard = ({ skill }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      className="skill-card premium-glass"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div 
        className="spotlight-overlay"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(250,196,47,0.15), transparent 40%)`
        }}
      />
      
      <div className="skill-content-wrapper">
        <div className="skill-logo-wrapper">
          {skill.icon ? skill.icon : <img src={skill.img} alt={skill.name} className="skill-logo" loading="lazy" />}
        </div>
        <h3 className="skill-name">{skill.name}</h3>
        <div className="skill-percent">
          <CountUp to={skill.percent} duration={2} delay={0.1} />%
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <HeroBackground />
        
        {/* Floating Decorative Coords */}
        <div className="hero-architectural-coords" style={{ top: '15%', left: '5%' }}>23.8105° N // 90.4125° E</div>
        <div className="hero-architectural-coords" style={{ bottom: '15%', right: '5%' }}>ARCH // CORE_v4.2</div>

        <div className="container hero-container">
          <div className="hero-col hero-left">
            <FadeIn delay={0.2}>
              <p className="hero-greeting">Hey, my name is</p>
              <h1 className="hero-title-main">
                <CharReveal text="AL AMIN" className="text-stroke" delay={0.5} />
                <br />
                <CharReveal text="ROBIN" className="text-gradient" delay={1.2} />
              </h1>
              
              <div className="hero-underline-wrapper">
                <svg className="hero-underline" viewBox="0 0 240 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16.5C14.5 13 28.5 8.5 40 16.5C51.5 24.5 54.5 22.5 60 16.5C65.5 10.5 76 8.5 84 12C92 15.5 100 12 110 12C120 12 135 16.5 145 16.5C155 16.5 174 8.5 186 9C198 9.5 220 12 236 12" stroke="url(#paint0_linear_hero)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_hero" x1="4" y1="14" x2="236" y2="14" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--accent-primary)"/>
                      <stop offset="1" stopColor="#FFDE82"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="hero-titles">
                <p className="hero-subtitle-chip glow-border">FULL STACK WEBSITE DEVELOPER</p>
                <p className="hero-subtitle-chip glow-border">FIVERR LEVEL 2 SELLER</p>
              </div>
            </FadeIn>
          </div>

          <div className="hero-col hero-center">
            <FadeIn delay={0.4}>
              <motion.div 
                className="hero-portrait-container"
                style={{ y: y1, opacity: heroOpacity }}
              >
                <div className="portrait-glass-ring"></div>
                <div className="hero-portrait-glow"></div>
                <div className="hero-portrait-wrapper">
                  <img 
                    src="/media/IMG-20251106-WA0016-scaled.webp" 
                    alt="Al Amin Robin" 
                    className="hero-portrait" 
                    fetchPriority="high"
                  />
                </div>
              </motion.div>
            </FadeIn>
          </div>

          <div className="hero-col hero-right">
            <FadeIn delay={0.6}>
              <div className="hero-stats">
                <div className="hero-stats-card premium-glass">
                  <span className="stat-title">Years of experience</span>
                  <span className="stat-value"><CountUp to={6} duration={1.5} />+</span>
                </div>
                <div className="hero-stats-card premium-glass">
                  <span className="stat-title">Projects done</span>
                  <span className="stat-value">1,<CountUp to={300} duration={2.5} />+</span>
                </div>
                <div className="hero-stats-card premium-glass">
                  <span className="stat-title">Clients</span>
                  <span className="stat-value">1,<CountUp to={0} duration={2.5} />00+</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cinematic Skills Marquee Hero Blend v4.0.5 */}
      <div className="skills-marquee-hero-blend">
        <SkillsMarquee />
      </div>

      {/* Featured Projects Preview (Static) */}
      <section className="work-preview-section section-padding relative-z">
        <div className="container">
          <ScrollReveal>
            <div className="work-preview-header">
              <div className="work-preview-title-wrap">
                <span className="hover-badge glow-border">HOVER TO SEE THE FULL PAGE</span>
                <h2 className="section-title">Selected <span className="gold-text">Masterpieces.</span></h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="imac-projects-grid">
            {[
              { id: 1, title: 'Visit LGF', imageUrl: '/media/screencapture-arawsupermarket-gr-2025-12-09-16_58_26-scaled-e1765279408154.webp', liveUrl: 'https://arawsupermarket.gr' },
              { id: 2, title: 'Baxter & Frost', imageUrl: '/media/screencapture-baxterandfrost-2025-09-28-01_16_43-scaled.webp', liveUrl: 'https://baxterandfrost.com/' }
            ].map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.2}>
                <div className="imac-project-card">
                  <div className="macbook-mockup">
                    <div className="macbook-screen">
                      <div className="macbook-camera"></div>
                      <div className="macbook-display">
                        <img src={project.imageUrl} alt={project.title} className="macbook-content" loading="lazy" />
                        <div className="macbook-screen-blur-overlay"></div>
                      </div>
                    </div>
                    <div className="macbook-base"></div>
                  </div>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="imac-project-link">
                    <h3 className="imac-project-title text-gradient">{project.title}</h3>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="check-all-btn-wrapper">
              <Link to="/portfolio" className="check-all-btn premium-glow">
                Check All Projects <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="expertise-section section-padding">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">My <span className="gold-text">Services.</span></h2>
          </ScrollReveal>
          
          <div className="expertise-grid">
            {expertise.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="expertise-card glass-panel premium-glow">
                  <div className="expertise-number">{service.num}</div>
                  <h3 className="expertise-card-title">{service.title}</h3>
                  <p className="expertise-card-desc">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section Upgrade v4.0 */}
      <section className="client-reviews-section section-padding">
        <div className="container">
          <ScrollReveal>
            <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="section-title" style={{ justifyContent: 'center' }}>Trusted <br/><span className="gold-text">by Clients.</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Authentic reviews extracted from real project feedback.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
