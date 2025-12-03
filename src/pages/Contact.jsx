import { useState } from 'react'
import durbarBgImg from '../assets/images/durbar-drummers.webp'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      // This will be implemented with Supabase or email service
      // For now, simulating submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you soon.'
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      className="contact-page relative min-h-screen pt-32 pb-20 text-white -mt-[88px]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${durbarBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-bold">Let&apos;s Talk</h4>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-8">Contact</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
              I&apos;m available for both local and international projects. Use the form to inquire about rates and availability, or if you have any questions about my work.
            </p>

            <div className="mb-8">
              <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-bold">Phone</h4>
              <div className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>

            <div>
              <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-bold">Email</h4>
              <a href="mailto:iklimababangida@gmail.com" className="text-white hover:text-gold transition-colors text-lg">
                iklimababangida@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-4 text-white focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-4 text-white focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-4 text-white focus:border-gold focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#b89b5e] text-black font-bold uppercase tracking-wider py-4 rounded-full hover:bg-[#c5a86b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
