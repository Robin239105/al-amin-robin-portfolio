import { EXPERIENCES, EDUCATION, PERSONAL } from '../data/constants'
import { StaggerContainer, StaggerItem } from '../components/animations/MotionWrappers'
import TechIcon from '../components/TechIcon'
import SEO from '../components/SEO'

export default function About() {
  const aboutSchema = {
    '@type': 'ProfilePage',
    'name': 'About Al Amin Robin',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Al Amin Robin',
      'jobTitle': 'Full-Stack Developer & Web Architect',
      'description': 'Head of Technology and Server Engineer specializing in high-performance digital architectures.',
      'url': 'https://alaminrobin.com/about'
    }
  }

  return (
    <div className="pt-36 pb-24 px-6 relative overflow-hidden bg-transparent">
      <SEO 
        title="About Al Amin Robin | Web Architect & Server Engineer"
        description="Explore Al Amin Robin's professional trajectory, core technical pillars, enterprise experience, and academic achievements."
        keywords="Al Amin Robin Profile, Web Developer Trajectory, Server Engineer Experience, Head of Technology UK"
        schemaType="ProfilePage"
        schemaData={aboutSchema}
      />
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[180px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/2 rounded-full blur-[140px] pointer-events-none ambient-glow" style={{ animationDelay: '2s' }} />

      <section className="max-w-7xl mx-auto relative z-10">
        <StaggerContainer animateOnLoad={true}>
          
          {/* Header Layout */}
          <StaggerItem className="mb-16 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold font-display">About Me</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-4 leading-tight">
              Engineering Sleek <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Digital Systems</span>
            </h1>
            <div className="w-16 h-[2px] bg-primary/50 mt-5 mb-6" />
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Discover my professional trajectory, core business philosophies, engineering pillars, and consulting availability.
            </p>
          </StaggerItem>

          {/* Premium Developer Authority Metrics Grid */}
          <StaggerItem className="mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl">
              <div className="text-center md:text-left flex flex-col justify-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">6+</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mt-2">Years Industry Experience</span>
              </div>
              <div className="text-center md:text-left flex flex-col justify-center border-l border-white/10 pl-6">
                <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">13k+</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mt-2">Platforms Shipped Globally</span>
              </div>
              <div className="text-center md:text-left flex flex-col justify-center border-l border-white/10 pl-6">
                <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">800+</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mt-2">Happy Clients Served</span>
              </div>
              <div className="text-center md:text-left flex flex-col justify-center border-l border-white/10 pl-6">
                <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">99.9%</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mt-2">App Performance & Uptime</span>
              </div>
            </div>
          </StaggerItem>

          {/* Biography and Contact details grid */}
          <StaggerContainer staggerTime={0.1} animateOnLoad={true}>
            <div className="grid lg:grid-cols-12 gap-12 mb-28 items-start">
              {/* Left Column: Portrait Photo */}
              <StaggerItem className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="relative group w-full max-w-[300px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 orange-glow-border shadow-2xl hover:shadow-[0_20px_50px_rgba(250,131,52,0.15)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <img 
                    src="/robin.webp" 
                    alt="Al Amin Robin Profile" 
                    width={3024}
                    height={4032}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Bottom Text overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <h3 className="text-lg font-bold text-white font-display leading-tight">{PERSONAL.name}</h3>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1">{PERSONAL.title}</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Middle Column: Biography Paragraphs */}
              <StaggerItem className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">
                  Translating complex business issues into elegant, maintainable code structures.
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  I am a professional Full-Stack Developer with 6+ years of active industry experience developing enterprise-grade web applications, custom API integrations, and automated digital backbones. I specialize in Next.js, React, Node.js, and scalable cloud architectures.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  My digital journey started back in 2019. Since then, I have successfully engineered and shipped over 13k projects for clients internationally, maintaining clean five-star feedback scores across global freelancing networks. I thrive on translating intricate problems into clean, high-performance logic.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  Outside of coding, you will find me reviewing latest technological integrations, upgrading my deployment configurations, and studying artificial intelligence.
                </p>
              </StaggerItem>

              {/* Right Column: Key Consulting & Availability Info Cards */}
              <StaggerItem className="lg:col-span-3 space-y-6">
                {/* Contact Details Card */}
                <div className="glass-testimonial rounded-3xl p-6 border border-white/5 orange-glow-border shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                  <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-2 uppercase tracking-widest text-primary font-display">Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col bg-white/[0.01] border border-white/5 p-3 rounded-2xl gap-1">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Email Address</span>
                      <a href={`mailto:${PERSONAL.email}`} className="text-xs font-semibold text-gray-200 hover:text-primary transition-colors truncate">
                        {PERSONAL.email}
                      </a>
                    </div>
                    <div className="flex flex-col bg-white/[0.01] border border-white/5 p-3 rounded-2xl gap-1">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Local Timezone</span>
                      <span className="text-xs font-semibold text-gray-200">
                        {PERSONAL.timezone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consulting Status Card */}
                <div className="glass-testimonial rounded-3xl p-6 border border-white/5 orange-glow-border shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                  <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-2 uppercase tracking-widest text-primary font-display">Consulting Status</h3>
                  {PERSONAL.available ? (
                    <div className="flex items-center gap-3.5 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl">
                      <span className="relative flex h-3 w-3 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Available for Hire</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Fully Booked</span>
                    </div>
                  )}
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>

          {/* Three Core Engineering Pillars Section */}
          <StaggerItem className="mb-28">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-display block text-center mb-4">Core Competencies</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-center mb-12">My Professional Pillars</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Pillar 1: Enterprise Web Architecture */}
              <div className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_20px_50px_rgba(250,131,52,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-3">Enterprise Systems</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Engineering high-availability architectures using Next.js and robust serverless microservices that scale perfectly to handle millions of active users.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Complex API & Automations */}
              <div className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_20px_50px_rgba(250,131,52,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-3">API & Automations</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Crafting clean RESTful endpoints, robust GraphQL schemas, and dynamic business automation flows using n8n and advanced AI pipelines.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Performance & Uptime Optimization */}
              <div className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_20px_50px_rgba(250,131,52,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-3">Speed Optimization</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Maximizing website metrics, fine-tuning caching mechanisms, and delivering perfect 100/100 Lighthouse performance scores.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>

      {/* Experience Timeline Section */}
      <section className="max-w-7xl mx-auto mb-28 relative z-10">
        <StaggerContainer>
          <StaggerItem className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-display">Experience</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-4">Career Timeline</h2>
          </StaggerItem>

          <StaggerContainer staggerTime={0.12}>
            <div className="space-y-8">
              {EXPERIENCES.filter((exp) => exp.type === 'work').map((exp) => (
                <StaggerItem key={exp.id}>
                  <div className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_25px_60px_rgba(250,131,52,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                      <div>
                        <h3 className="text-2xl font-extrabold text-white group-hover:text-primary transition-colors">{exp.title}</h3>
                        <p className="text-base text-primary/80 font-bold mt-1 uppercase tracking-widest font-display">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-gray-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full self-start md:self-auto">{exp.period}</span>
                    </div>

                    <ul className="space-y-4 mb-6 relative z-10">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-sm sm:text-base text-gray-300 flex items-start gap-3.5 leading-relaxed">
                          <span className="text-primary font-bold mt-1 text-xs select-none">→</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/5">
                        {exp.tech.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 bg-white/5 rounded-full text-gray-300 border border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:text-white flex items-center gap-1.5 transition-all duration-300"
                          >
                            <TechIcon name={tech} className="w-3.5 h-3.5" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </StaggerContainer>
      </section>

      {/* Academic Background section */}
      <section className="max-w-7xl mx-auto relative z-10">
        <StaggerContainer>
          <StaggerItem className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-display">Education</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mt-4">Academic Credentials</h2>
          </StaggerItem>

          <StaggerContainer staggerTime={0.1}>
            <div className={`grid gap-8 ${
              EDUCATION.length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto' 
                : EDUCATION.length === 2 
                  ? 'md:grid-cols-2 max-w-4xl mx-auto' 
                  : 'md:grid-cols-3'
            }`}>
              {EDUCATION.map((edu) => (
                <StaggerItem key={edu.id}>
                  <div className="glass-testimonial rounded-3xl p-8 border border-white/5 orange-glow-border hover:shadow-[0_25px_60px_rgba(250,131,52,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group h-full flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div>
                      <h3 className="text-xl font-extrabold text-white mb-2 leading-snug group-hover:text-primary transition-colors">{edu.degree}</h3>
                      <p className="text-sm font-semibold text-primary/80 uppercase tracking-widest mb-2 font-display">{edu.institution}</p>
                      {edu.description && (
                        <p className="text-gray-400 text-xs sm:text-sm mt-4 leading-relaxed font-normal">
                          {edu.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded">{edu.year}</span>
                      {edu.gpa && (
                        <span className="text-xs font-semibold text-gray-300 bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </StaggerContainer>
      </section>
    </div>
  )
}