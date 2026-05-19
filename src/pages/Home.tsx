import HeroSection from '../components/sections/HeroSection'
import MarqueeCrossover from '../components/sections/MarqueeCrossover'
import ServicesSection from '../components/sections/ServicesSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import GitHubCommitActivitySection from '../components/sections/GitHubCommitActivitySection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTABannerSection from '../components/sections/CTABannerSection'
import SEO from '../components/SEO'

export default function Home() {
  const homeSchema = {
    '@type': 'Person',
    'name': 'Al Amin Robin',
    'jobTitle': 'Full-Stack Developer & Web Architect',
    'url': 'https://alaminrobin.com',
    'sameAs': [
      'https://github.com/Robin239105',
      'https://www.linkedin.com/in/al-amin-wordpress-website-developer',
      'https://www.facebook.com/wpdeveloper.robin',
      'https://www.fiverr.com/shahid32324'
    ],
    'knowsAbout': [
      'React', 'Next.js', 'WordPress', 'WooCommerce', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Docker', 'AI Automation', 'SEO'
    ]
  }

  return (
    <>
      <SEO 
        title="Premium Full-Stack Developer & Web Architect"
        description="Al Amin Robin is a premium Full-Stack Developer specializing in high-performance Next.js apps, React user interfaces, custom backends, database design, and intelligent AI automation workflows."
        keywords="Full-Stack Developer, Web Architect, Next.js Developer, React Developer, Node.js Backend, Custom WordPress Theme, AI Automation, Database Optimization"
        schemaType="Person"
        schemaData={homeSchema}
      />
      <HeroSection />
      <MarqueeCrossover />
      <ServicesSection />
      <FeaturedProjectsSection />
      <GitHubCommitActivitySection />
      <TestimonialsSection />
      <CTABannerSection />
    </>
  )
}