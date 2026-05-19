import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const TechStack = lazy(() => import('./pages/TechStack'))
const Github = lazy(() => import('./pages/Github'))
const Contact = lazy(() => import('./pages/Contact'))

function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[#050507] z-[9999] overflow-hidden">
      <div className="h-full w-1/3 bg-gradient-to-r from-primary via-orange-500 to-primary origin-left animate-[loadingBar_1.5s_infinite_linear] rounded-r-full shadow-[0_0_8px_#FF6B35]" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/github" element={<Github />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App