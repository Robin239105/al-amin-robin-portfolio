import { ScrollReveal } from '../components/ui/Animations';
import QuickFAQ from '../components/QuickFAQ';
import './FAQ.css';

export default function FAQ() {
  return (
    <div className="page-container faq-page">
      {/* Ambient Orb */}
      <div className="faq-orb"></div>

      <section className="faq-page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className="faq-eyebrow gold-text">KNOWLEDGE BASE</p>
            <h1 className="faq-page-title">
              Common <span className="gold-text">Questions.</span>
            </h1>
            <p className="faq-page-sub">
              Everything you need to know about working with me and my team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 
          Reuse the QuickFAQ component but we'll override the 'desktop-only' 
          class for this page specifically so it shows on all devices here.
      */}
      <div className="faq-page-content">
        <QuickFAQ forceShow={true} />
      </div>

      <section className="faq-more-section section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="section-title">Still Have <span className="gold-text">Questions?</span></h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '1rem auto 2.5rem' }}>
              If you couldn't find what you're looking for, feel free to reach out directly.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Support
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
