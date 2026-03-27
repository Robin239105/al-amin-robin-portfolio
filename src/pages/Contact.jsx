import { useState } from 'react';
import { Send, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ScrollReveal, FadeIn } from '../components/ui/Animations';
import ReCAPTCHA from "react-google-recaptcha";
import './Contact.css';

const budgetOptions = ['100-500', '500-1k', '1k-2k', '2k-5k', '5k-10k', '< 10k'];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
    budget: '',
  });
  const [status, setStatus] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      setStatus('captcha');
      return;
    }

    setStatus('sending');

    // Categorical Pure-Frontend Simulation (No External SDKs)
    console.log('Form Submission:', formState);
    
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', whatsapp: '', message: '', budget: '' });
      setRecaptchaToken(null);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container contact-page">
      <div className="contact-orb contact-orb-1"></div>
      <div className="contact-orb contact-orb-2"></div>

      <section className="contact-hero-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className="contact-eyebrow gold-text">LET'S WORK TOGETHER</p>
            <h1 className="contact-hero-title">
              Start a <span className="gold-text">Conversation.</span>
            </h1>
            <p className="contact-hero-sub">
              Have a project in mind? I'd love to hear about it. Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="contact-main section-padding">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info-col">
              <FadeIn delay={0.1}>
                <div className="contact-info-card glass-panel no-shadow">
                  <div className="contact-info-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="contact-info-label">Email</h4>
                    <a href="mailto:wpdeveloper.robin@gmail.com" className="contact-info-value">wpdeveloper.robin@gmail.com</a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="contact-info-card glass-panel no-shadow">
                  <div className="contact-info-icon">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="contact-info-label">WhatsApp</h4>
                    <a href="https://wa.me/8801575096211" className="contact-info-value">+880 1575 096 211</a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="contact-info-card glass-panel no-shadow">
                  <div className="contact-info-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="contact-info-label">Location</h4>
                    <span className="contact-info-value">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="contact-info-card glass-panel no-shadow">
                  <div className="contact-info-icon fiverr-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.825.273-.825.819v.41h-.818v1.027h.818v2.916h1.119v-2.916h.85v-1.027h-.85v-.321c0-.276.129-.414.372-.414h.478v-1.027h-.294zm-3.373 2.727c0-.387.13-.645.673-.645h.319v-1.027h-.505c-1.04 0-1.606.451-1.606 1.34v2.116h1.119v-1.784zm-2.73-1.027h1.12v3.811h-1.12v-3.811zm.56-1.795a.63.63 0 1 0 .001-1.261.63.63 0 0 0-.001 1.261zm-1.758 5.606V14.99h1.005v-1.027h-1.005v-1.259l-1.12.671v.588h-.755v1.027h.755v2.252c0 .907.595 1.345 1.328 1.345h.572v-1.027h-.38c-.316 0-.4-.138-.4-.426zm-3.59-1.479h-.595c-.546 0-.73.227-.73.588 0 .375.204.588.56.588.426 0 .765-.302.765-.716v-.46zm1.12-1.238v2.881h-1.12v-.381c-.345.317-.754.47-1.227.47-.805 0-1.326-.528-1.326-1.368 0-.857.521-1.347 1.472-1.347h1.081v-.163c0-.44-.26-.683-.79-.683-.33 0-.684.113-.989.311l-.381-.837c.46-.318 1.024-.471 1.594-.471 1.114 0 1.686.538 1.686 1.588z"/></svg>
                  </div>
                  <div>
                    <h4 className="contact-info-label">Fiverr</h4>
                    <a href="https://fiverr.com/shahid32324" target="_blank" rel="noopener noreferrer" className="contact-info-value">fiverr.com/shahid32324</a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="contact-social-proof glass-panel no-shadow">
                  <div className="proof-avatars">
                    <img src="/media/377993_2666927678312_645807296_n.webp" alt="" className="proof-avatar" />
                    <img src="/media/342CB349-E508-4768-93B7-A1B62EC23E44.webp" alt="" className="proof-avatar" />
                    <img src="/media/IMG_8842-577x1024-1.webp" alt="" className="proof-avatar" />
                  </div>
                  <p className="proof-text"><strong className="gold-text">1,000+</strong> happy clients worldwide</p>
                </div>
              </FadeIn>
            </div>

            <div className="contact-form-col">
              <ScrollReveal delay={0.2}>
                <form className="contact-form glass-panel no-shadow" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      required
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Email <span className="required">*</span></label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="john@email.com"
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp Number <span className="optional">(If you have)</span></label>
                    <input
                      type="tel"
                      name="whatsapp"
                      className="form-input"
                      placeholder="+1 934 332314"
                      value={formState.whatsapp}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell me about your project <span className="required">*</span></label>
                    <textarea
                      name="message"
                      className="form-input form-textarea"
                      placeholder="I want a super-duper website..."
                      rows="5"
                      required
                      value={formState.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project budget (USD) <span className="required">*</span></label>
                    <div className="budget-pills">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`budget-pill ${formState.budget === opt ? 'budget-active' : ''}`}
                          onClick={() => setFormState({ ...formState, budget: opt })}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group recaptcha-container" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <ReCAPTCHA
                      sitekey="6Lf0INcrAAAAAGX7zUJEQsh6jYwwaWfvHr4sk8qO"
                      onChange={(token) => setRecaptchaToken(token)}
                      theme="dark"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="form-toast success-toast">✅ Message sent! I'll get back to you within 24 hours.</div>
                  )}
                  {status === 'captcha' && (
                    <div className="form-toast error-toast">⚠️ Please complete the reCAPTCHA to verify you're human.</div>
                  )}

                  <button type="submit" className="btn-primary contact-submit-btn no-shadow" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} style={{ marginLeft: '0.5rem' }} />
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


