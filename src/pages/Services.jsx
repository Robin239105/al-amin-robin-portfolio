import { ScrollReveal, FadeIn, CountUp } from '../components/ui/Animations';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const teamMembers = [
  {
    name: 'Md. Al Amin',
    role: 'Full Stack Website Developer',
    desc: 'Team lead with 6+ years of experience. Expert in React, WordPress, and building ultra-premium digital experiences.',
    img: '/media/IMG-20251106-WA0016-scaled.webp',
    skills: ['React', 'WordPress', 'Elementor', 'Figma'],
  },
  {
    name: 'Sameem Kuddus Nehal',
    role: 'WordPress Developer',
    desc: 'Specialist in custom WordPress themes, plugin development, and pixel-perfect Elementor implementations.',
    img: '/media/357701303_1943420286013553_5684112604640646560_n.webp',
    skills: ['WordPress', 'PHP', 'Elementor', 'WooCommerce'],
  },
  {
    name: 'J. A Khosru Jr.',
    role: 'Bricks Expert & Custom Code',
    desc: 'Master of Bricks Builder and custom CSS/JS solutions. Transforms complex designs into clean, performant code.',
    img: '/media/332604477_908289483615491_1712432023024277113_n.webp',
    skills: ['Bricks', 'Custom CSS', 'JavaScript', 'Speed Optimization'],
  },
  {
    name: 'Abu Hojayfa',
    role: 'MERN Stack Developer',
    desc: 'Focused on building responsive, accessible interfaces with modern JavaScript frameworks and clean architecture.',
    img: '/media/a-flat-design-logo-illustration-featurin_XjU2uKHqRVe3GLqGCL0nbg_yfrL3FDORUOCYNiW1RCXaQ.webp',
    skills: ['HTML/CSS', 'React', 'Tailwind', 'Git'],
  },
  {
    name: 'Shamsul Arafin Rafi',
    role: 'UI/UX Designer',
    desc: 'Creates stunning visual designs and seamless user experiences. From wireframes to polished prototypes.',
    img: '/media/WhatsApp-Image-2026-01-08-at-21.56.13.webp',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'UI Design'],
  },
  {
    name: 'Ifte Refat',
    role: 'Python and Backend Developer',
    desc: 'Builds robust server-side solutions and API integrations. Expert in database design and cloud deployments.',
    img: '/media/545453758_1790130391875259_4379892106804843093_n.webp',
    skills: ['Node.js', 'Python', 'MongoDB', 'AWS'],
  },
];

const stats = [
  { value: 6, suffix: '+', label: 'Years Combined' },
  { value: 1300, suffix: '+', label: 'Projects Delivered' },
  { value: 1000, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
];

export default function Services() {
  return (
    <div className="page-container team-page">
      {/* Ambient Orbs */}
      <div className="team-orb team-orb-1"></div>
      <div className="team-orb team-orb-2"></div>

      {/* Hero */}
      <section className="team-hero-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className="team-eyebrow gold-text">THE DREAM TEAM</p>
            <h1 className="team-hero-title">
              Meet My <span className="gold-text">Team.</span>
            </h1>
            <p className="team-hero-sub">
              A curated group of passionate developers and designers dedicated to crafting extraordinary digital experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="team-stats-section">
        <div className="container">
          <div className="team-stats-bar glass-panel">
            {stats.map((stat, idx) => (
              <div className="team-stat-item" key={idx}>
                <span className="team-stat-value gold-text">
                  <CountUp to={stat.value} duration={2} />{stat.suffix}
                </span>
                <span className="team-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid-section section-padding">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="team-card">
                  <div className="team-card-image-wrapper">
                    <img src={member.img} alt={member.name} className="team-card-image" loading="lazy" />
                    <div className="team-card-overlay">
                      <div className="team-card-skills">
                        {member.skills.map((skill, i) => (
                          <span key={i} className="team-skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="team-card-info">
                    <h3 className="team-card-name">{member.name}</h3>
                    <p className="team-card-role gold-text">{member.role}</p>
                    <p className="team-card-desc">{member.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="team-cta-section section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="section-title">Want to <span className="gold-text">Join Our Team?</span></h2>
            <p className="section-subtitle" style={{ maxWidth: '500px', margin: '1rem auto 2.5rem' }}>
              We're always looking for talented people. Let's build something great together.
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
