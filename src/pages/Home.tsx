import { lazy, Suspense } from 'react'
import HeroSection from '../components/sections/HeroSection'
import MarqueeCrossover from '../components/sections/MarqueeCrossover'
import SEO from '../components/SEO'
import Footer from '../components/layout/Footer'

const ServicesSection = lazy(() => import('../components/sections/ServicesSection'))
const FeaturedProjectsSection = lazy(() => import('../components/sections/FeaturedProjectsSection'))
const GitHubCommitActivitySection = lazy(() => import('../components/sections/GitHubCommitActivitySection'))
const TestimonialsSection = lazy(() => import('../components/sections/TestimonialsSection'))
const CTABannerSection = lazy(() => import('../components/sections/CTABannerSection'))

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
        title="Al Amin Robin | Full-Stack Developer & Web Architect"
        description="Al Amin Robin is a Full-Stack Developer and Web Architect specializing in high-performance Next.js apps, React user interfaces, custom backends, database design, and intelligent AI automation workflows."
        keywords="Full-Stack Developer, Web Architect, Next.js Developer, React Developer, Node.js Backend, Custom WordPress Theme, AI Automation, Database Optimization"
        schemaType="Person"
        schemaData={homeSchema}
      />
      <HeroSection />
      <MarqueeCrossover />
      <Suspense fallback={<div className="min-h-[2200px] w-full" />}>
        <ServicesSection />
        <FeaturedProjectsSection />
        <GitHubCommitActivitySection />
        <TestimonialsSection />
        <CTABannerSection />
        <Footer />
      </Suspense>
    </>
  )
}