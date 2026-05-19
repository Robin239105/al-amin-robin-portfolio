import { useState, useRef } from 'react'
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin, FiSend, FiUploadCloud, FiX, FiCheck } from 'react-icons/fi'
import { PERSONAL } from '../data/constants'
import { StaggerContainer, StaggerItem } from '../components/animations/MotionWrappers'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Fullstack Web App',
    budget: '$3,000 - $5,000',
    timeline: 'Standard (1-2 months)',
    message: '',
  })

  // File upload and sending state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    // 10MB Limit
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds the 10MB limit.")
      return
    }
    setSelectedFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setErrorMessage('')

    const data = new FormData()
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('projectType', formData.projectType)
    data.append('budget', formData.budget)
    data.append('timeline', formData.timeline)
    data.append('message', formData.message)
    if (selectedFile) {
      data.append('specification', selectedFile)
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: data,
      })

      const text = await response.text()
      let result
      try {
        result = JSON.parse(text)
      } catch {
        result = { success: false, message: 'Invalid response from server.' }
      }

      if (response.ok && result.success) {
        setFormSubmitted(true)
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Connection failed. Please check your network or try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="pt-36 pb-24 px-6 relative overflow-hidden bg-transparent">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[180px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/2 rounded-full blur-[140px] pointer-events-none ambient-glow" style={{ animationDelay: '2s' }} />

      <section className="max-w-7xl mx-auto relative z-10">
        <SEO 
          title="Contact & Project Booking | Get In Touch"
          description="Get in touch with Al Amin Robin to discuss full-stack development projects, custom WordPress designs, server engineering, or consultation inquiries."
          keywords="Contact Al Amin Robin, Hire Web Developer, Project Consultation, Hire Freelancer WordPress"
          schemaType="ContactPage"
          schemaData={{
            '@type': 'ContactPage',
            'name': 'Contact Al Amin Robin',
            'description': 'Contact details, social links, and project intake form for Al Amin Robin.',
            'url': 'https://alaminrobin.com/contact'
          }}
        />
        <StaggerContainer animateOnLoad={true}>
          
          {/* Header Layout */}
          <StaggerItem className="mb-16 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold font-display">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-4 leading-tight">
              Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600 drop-shadow-[0_2px_15px_rgba(250,131,52,0.25)]">Together</span>
            </h1>
            <div className="w-16 h-[2px] bg-primary/50 mt-5 mb-6" />
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Have a project idea, consulting request, or just want to schedule an engineering review? Provide your product parameters below and let's craft something epic together.
            </p>
          </StaggerItem>
 
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.div
                key="contact-form-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Left Column: Premium Instant Connection Hub */}
                <StaggerItem className="lg:col-span-1 space-y-6">
                  
                  {/* WhatsApp Speed Channel */}
                  <a 
                    href={`https://wa.me/${PERSONAL.whatsapp}?text=Hi%20Al%20Amin,%20I've%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project...`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block glass-testimonial rounded-3xl p-6 border border-white/5 orange-glow-border shadow-lg relative overflow-hidden group hover:shadow-[0_15px_40px_rgba(37,211,102,0.15)] transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#25D366]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#25D366]/10 transition-colors" />
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-all duration-300">
                        <FaWhatsapp className="w-6 h-6 text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.4)]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">WhatsApp Consultation</p>
                        <p className="text-sm font-extrabold text-white mt-0.5 group-hover:text-primary transition-colors flex items-center gap-1.5">
                          <span>Chat on WhatsApp</span>
                          <span className="text-xs">→</span>
                        </p>
                      </div>
                    </div>
                  </a>



                  {/* Email Pod */}
                  <div className="glass-testimonial rounded-3xl p-6 border border-white/5 orange-glow-border shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300">
                        <FiMail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Email Address</p>
                        <a href={`mailto:${PERSONAL.email}`} className="text-xs sm:text-sm font-semibold text-gray-200 hover:text-primary transition-colors mt-0.5 block">
                          {PERSONAL.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Timezone Pod */}
                  <div className="glass-testimonial rounded-3xl p-6 border border-white/5 orange-glow-border shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300">
                        <FiMapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Consulting Location</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-200 mt-0.5">
                          GMT+6 • Dhaka, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social links Pod */}
                  <div className="glass-testimonial rounded-3xl p-6 border border-white/5 orange-glow-border shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                    <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest text-primary">Connect Socially</h3>
                    <div className="flex gap-4">
                      <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent flex items-center justify-center text-gray-400 hover:scale-110 shadow-lg transition-all duration-300">
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-transparent flex items-center justify-center text-gray-400 hover:scale-110 shadow-lg transition-all duration-300">
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                      <a href={PERSONAL.facebook} target="_blank" rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-[#1877F2] hover:text-white border border-white/10 hover:border-transparent flex items-center justify-center text-gray-400 hover:scale-110 shadow-lg transition-all duration-300">
                        <FaFacebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </StaggerItem>

                {/* Right Column: Highly Robust Project Parameter Ingestion Form */}
                <StaggerItem className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="glass-testimonial rounded-3xl p-8 space-y-6 border border-white/5 orange-glow-border shadow-[0_25px_60px_rgba(250,131,52,0.12)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Basic Info Rows */}
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                      <div>
                        <label htmlFor="name" className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-primary/[0.01] focus:outline-none transition-all text-sm text-white placeholder:text-gray-600 shadow-inner font-semibold"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-primary/[0.01] focus:outline-none transition-all text-sm text-white placeholder:text-gray-600 shadow-inner font-semibold"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Dynamic Project Parameters Dock */}
                    <div className="grid md:grid-cols-3 gap-6 relative z-10">
                      {/* Project/Service Selector */}
                      <div>
                        <label htmlFor="projectType" className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="appearance-none w-full px-4 py-3.5 bg-[#07070A] border border-white/10 rounded-2xl focus:border-primary/50 focus:outline-none text-sm text-gray-200 cursor-pointer hover:border-white/20 transition-all font-semibold shadow-inner bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                        >
                          <option value="Fullstack Web App">Fullstack Web App</option>
                          <option value="WordPress Website">WordPress Website</option>
                          <option value="SaaS Dashboard">SaaS Dashboard</option>
                          <option value="API & Automation">API & Automation</option>
                          <option value="UI/UX Implementation">UI/UX Implementation</option>
                          <option value="Consulting / Other">Consulting / Other</option>
                        </select>
                      </div>

                      {/* Budget Selector */}
                      <div>
                        <label htmlFor="budget" className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                          Target Budget
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="appearance-none w-full px-4 py-3.5 bg-[#07070A] border border-white/10 rounded-2xl focus:border-primary/50 focus:outline-none text-sm text-gray-200 cursor-pointer hover:border-white/20 transition-all font-semibold shadow-inner bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                        >
                          <option value="Under $1,000">Under $1,000</option>
                          <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                          <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000+">$10,000+</option>
                        </select>
                      </div>

                      {/* Urgency Selector */}
                      <div>
                        <label htmlFor="timeline" className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                          Timeline Priority
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="appearance-none w-full px-4 py-3.5 bg-[#07070A] border border-white/10 rounded-2xl focus:border-primary/50 focus:outline-none text-sm text-gray-200 cursor-pointer hover:border-white/20 transition-all font-semibold shadow-inner bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                        >
                          <option value="Super Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                          <option value="Standard (1-2 months)">Standard (1-2 mos)</option>
                          <option value="Flexible">Flexible Schedule</option>
                        </select>
                      </div>
                    </div>

                    {/* Detailed Message */}
                    <div className="relative z-10">
                      <label htmlFor="message" className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                        Detailed Message / Project Scope
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-primary/[0.01] focus:outline-none transition-all text-sm text-white placeholder:text-gray-600 h-32 resize-none shadow-inner leading-relaxed font-semibold"
                        placeholder="Detail your product parameters, required stacks, and integration specs..."
                        required
                      />
                    </div>

                    {/* Vercel Blob Custom Drag-and-Drop File Upload Target Zone */}
                    <div className="relative z-10">
                      <label className="block text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                        Attach Project Specification
                      </label>
                      
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                          dragActive 
                            ? 'border-primary bg-primary/5 scale-[1.01]' 
                            : 'border-white/10 bg-white/[0.01] hover:border-primary/30 hover:bg-white/[0.02]'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="file-upload"
                          className="hidden"
                          accept=".pdf,.docx,.zip,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                        />
                        
                        <FiUploadCloud className="w-10 h-10 text-gray-400 mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
                        
                        <p className="text-xs font-semibold text-gray-300 mb-1">
                          Drag & drop or <span className="text-primary hover:text-orange-400 transition-colors">click to select</span>
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Supports PDF, DOCX, ZIP, PNG, JPG (Max size: 10MB)
                        </p>
                      </div>

                      {/* File Feedback */}
                      {selectedFile && (
                        <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-200 truncate">{selectedFile.name}</p>
                            <p className="text-[10px] text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={removeFile}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Error Feedback Banner */}
                    {errorMessage && (
                      <div className="text-red-500 text-xs font-bold bg-red-500/10 border border-red-500/20 p-4 rounded-xl relative z-10">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Operations Button */}
                    <div className="relative z-10 pt-2">
                      <button
                        type="submit"
                        disabled={isSending}
                        className={`w-full py-4 rounded-2xl font-extrabold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-orange-500 hover:to-orange-600 text-black shadow-[0_0_25px_rgba(250,131,52,0.3)] transform hover:scale-[1.01] cursor-pointer ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                            <span>Sending Brief...</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="w-4 h-4" />
                            <span>Send Project Brief</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </StaggerItem>
              </motion.div>
            ) : (
              <motion.div
                key="contact-success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="max-w-xl mx-auto text-center p-10 rounded-3xl glass-testimonial border border-green-500/10 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Visual Checkmark */}
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto mb-6">
                  <FiCheck className="w-8 h-8 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                </div>
                
                <h2 className="text-3xl font-display font-extrabold text-white mb-4">Project Brief Dispatched!</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  Thank you for reaching out, <span className="text-primary font-extrabold">{formData.name}</span>. Your brief detailing a <span className="text-white font-bold">{formData.projectType}</span> project has been sent to Al Amin Robin. I will review your spec sheet and get back to you within 12 hours.
                </p>

                <button
                  onClick={() => {
                    setFormSubmitted(false)
                    setFormData({
                      name: '',
                      email: '',
                      projectType: 'Fullstack Web App',
                      budget: '$3,000 - $5,000',
                      timeline: 'Standard (1-2 months)',
                      message: '',
                    })
                    removeFile()
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </StaggerContainer>
      </section>
    </div>
  )
}