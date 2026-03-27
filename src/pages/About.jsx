import { ScrollReveal, AnimatedText, FadeIn, CountUp } from '../components/ui/Animations';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './About.css';

const education = [
  { 
    year: '2025-Present', 
    title: 'B.Sc in Computer Science', 
    institution: 'UNIVERSITY OF THE PEOPLE USA', 
    desc: 'Focusing on core computer science principles, software engineering, and modern computational theories.'
  }
];

const experience = [
  {
    year: '2023-Present',
    title: 'HEAD OF TECHNOLOGY',
    company: 'PROPERTY FINANCE CHOICES - UK',
    desc: 'At Property Finance Choices, I designed and developed a responsive, user-focused website aligned with the company\'s brand and business goals, handling front-end development, content structuring, and SEO optimization. I also manage ongoing technical support, performance improvements, and serve as the company\'s website developer and security specialist, ensuring stability, speed, and protection across all systems.'
  },
  {
    year: '2020-2024',
    title: 'IDRESSU & VENUSIA CLINIC',
    company: 'AUSTRALIA',
    desc: 'Idressu is a dress selling website and Venusia is a skin clinic at Australia did woo-commerce functionality and added appointment booking features.'
  },
  {
    year: '2021-2022',
    title: 'THE CAPSULE SHOP',
    company: 'US',
    desc: 'A shop like amazon has all the sites for all the countries you want to access from your side. Multisite functionality added. Working more to make it perfect.'
  },
  {
    year: '2023-Present',
    title: 'NETBIZ ENTERPRISES',
    company: 'BANGLADESH',
    desc: 'A company sell website development and server services along with some e-commerce products. I am doing server engineering and website development here.'
  }
];

const personalInfo = [
  { label: 'Birthday', value: '08-12-2002' },
  { label: 'Age', value: '22' },
  { label: 'Nationality', value: 'Bangladeshi' },
  { label: 'Study', value: 'University of the People' },
  { label: 'Degree', value: 'Bachelors' },
  { label: 'Freelance', value: 'Available' },
  { label: 'Email', value: 'wpdeveloper.robin@gmail.com' },
  { label: 'WhatsApp', value: '+880 1575 096 211' },
  { label: 'Fiverr', value: 'fiverr.com/shahid32324' },
];

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Design your website with Figma, Adobe XD, or Photoshop — whichever you prefer. Expert at all the software to design premium, modern web pages.',
    icon: '🎨',
  },
  {
    num: '02',
    title: 'Web Development',
    desc: 'Develop your website with WordPress, React, or custom HTML/CSS/JS. Expert at building fast, responsive, and SEO-optimized websites.',
    icon: '⚡',
  },
  {
    num: '03',
    title: 'E-Commerce',
    desc: 'Build powerful online stores with Shopify and WooCommerce. From product setup to payment gateways — a full turnkey solution.',
    icon: '🛒',
  },
  {
    num: '04',
    title: 'SEO & Speed',
    desc: 'Optimize your website for search engines and blazing-fast performance. Core Web Vitals, meta tags, schema markup — the full package.',
    icon: '🚀',
  },
];


export default function About() {
  return (
    <div className="page-container about-page">
      {/* Ambient Background */}
      <div className="about-orb about-orb-1"></div>
      <div className="about-orb about-orb-2"></div>

      {/* Hero Header */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-grid">
            {/* Left - Portrait */}
            <div className="about-hero-image-col">
              <FadeIn delay={0.2}>
                <div className="about-portrait-frame">
                  <div className="about-portrait-glow"></div>
                  <img 
                    src="/media/PXL_20251227_060959734.PORTRAIT-scaled.webp" 
                    alt="Al Amin Robin" 
                    className="about-portrait-img"
                  />
                  <div className="about-portrait-badge">
                    <span className="badge-number"><CountUp to={6} duration={1.5} />+</span>
                    <span className="badge-label">Years Exp.</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right - Info */}
            <div className="about-hero-text-col">
              <ScrollReveal>
                <p className="about-eyebrow gold-text">ABOUT ME</p>
                <h1 className="about-hero-title">
                  Al Amin{' '}
                  <span className="gold-text">Robin</span>
                </h1>
                <p className="about-hero-role">FULL STACK WEBSITE DEVELOPER</p>
              </ScrollReveal>

              <FadeIn delay={0.4}>
                <p className="about-bio">
                  Greetings! I'm a seasoned WordPress maestro, dancing in the realms of development for the past six years. Picture me as a virtuoso with a keyboard, orchestrating symphonies of code and creativity. In this digital ballet, I've choreographed over <strong className="gold-text">1,300+ websites</strong>, each a unique performance blending technology and aesthetics.
                </p>
                <p className="about-bio">
                  I work on maintaining 2 strategies: <strong>1. Listen to the client's requirements perfectly. 2. Do unlimited revisions until they are satisfied with my work.</strong> When I do those, my clients are always happy to work with me. "Best performance gives more work."
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="about-hero-stats">
                  <div className="about-stat-pill glass-panel">
                    <span className="about-stat-num gold-text"><CountUp to={1300} duration={2.5} />+</span>
                    <span className="about-stat-label">Projects</span>
                  </div>
                  <div className="about-stat-pill glass-panel">
                    <span className="about-stat-num gold-text"><CountUp to={1000} duration={2.5} />+</span>
                    <span className="about-stat-label">Clients</span>
                  </div>
                  <div className="about-stat-pill glass-panel">
                    <span className="about-stat-num gold-text">100%</span>
                    <span className="about-stat-label">Satisfaction</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Details Grid */}
      <section className="about-details-section section-padding">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">Personal <span className="gold-text">Details.</span></h2>
          </ScrollReveal>
          <div className="personal-info-grid">
            {personalInfo.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="personal-info-card glass-panel">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience Section (v6.0) */}
      <section className="about-resume-section section-padding">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">Education & <span className="gold-text">Experience.</span></h2>
          </ScrollReveal>

          <div className="resume-grid">
            {/* Education Column */}
            <div className="resume-column">
              <ScrollReveal delay={0.1}>
                <h3 className="resume-column-title"><span className="title-dot"></span> Education</h3>
              </ScrollReveal>
              <div className="resume-timeline">
                {education.map((item, idx) => (
                  <ScrollReveal key={idx} delay={0.2 + idx * 0.1}>
                    <div className="resume-item glass-panel premium-glow">
                      <div className="resume-year gold-text">{item.year}</div>
                      <h4 className="resume-title">{item.title}</h4>
                      <div className="resume-org">{item.institution}</div>
                      <p className="resume-desc">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div className="resume-column">
              <ScrollReveal delay={0.3}>
                <h3 className="resume-column-title"><span className="title-dot"></span> Experience</h3>
              </ScrollReveal>
              <div className="resume-timeline">
                {experience.map((item, idx) => (
                  <ScrollReveal key={idx} delay={0.4 + idx * 0.1}>
                    <div className="resume-item glass-panel premium-glow">
                      <div className="resume-year gold-text">{item.year}</div>
                      <h4 className="resume-title">{item.title}</h4>
                      <div className="resume-org">{item.company}</div>
                      <p className="resume-desc">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-services-section section-padding">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">My <span className="gold-text">Services.</span></h2>
            <p className="section-subtitle text-center">
              Premium digital solutions tailored to elevate your brand
            </p>
          </ScrollReveal>

          <div className="about-services-grid">
            {services.map((service, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="about-service-card glass-panel premium-glow">
                  <div className="service-card-header">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-num gold-text">{service.num}.</span>
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Bottom CTA */}
      <section className="about-cta-section section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="section-title">Ready to <span className="gold-text">Work Together?</span></h2>
            <p className="section-subtitle" style={{ maxWidth: '500px', margin: '1rem auto 2.5rem' }}>
              Let's create something extraordinary for your next project.
            </p>
            <Link to="/contact" className="btn-primary">
              Get In Touch <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
