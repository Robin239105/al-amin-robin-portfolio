import Navbar from './Navbar'
import Footer from './Footer'
import ChatbotWidget from '../chatbot/ChatbotWidget'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-3d-gradient text-white relative overflow-x-hidden w-full flex flex-col justify-between">
      {/* Global Physical Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.025] pointer-events-none mix-blend-overlay z-40" />

      <div>
        <Navbar />
        <main className="relative z-10 w-full">{children}</main>
      </div>
      
      <Footer />
      <ChatbotWidget />
    </div>
  )
}