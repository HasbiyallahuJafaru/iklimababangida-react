import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-sm border-b border-white/10 shadow-lg' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className={`text-2xl font-serif italic text-white hover:text-gold transition-colors duration-300 ${
            !isScrolled ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : ''
          }`}>
            Iklima Babangida
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive('/') ? 'text-gold' : 'text-white hover:text-gold'
              } ${!isScrolled ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive('/portfolio') ? 'text-gold' : 'text-white hover:text-gold'
              } ${!isScrolled ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : ''}`}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive('/about') ? 'text-gold' : 'text-white hover:text-gold'
              } ${!isScrolled ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : ''}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive('/contact') ? 'text-gold' : 'text-white hover:text-gold'
              } ${!isScrolled ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : ''}`}
            >
              Contact
            </Link>
            <Link
              to="/portfolio"
              className="bg-gold text-dark px-6 py-2.5 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-gold-light transition-all duration-300 shadow-lg"
            >
              View Portfolio →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-4 pt-4">
            <Link
              to="/"
              className={`block py-3 text-sm uppercase tracking-widest ${
                isActive('/') ? 'text-gold' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className={`block py-3 text-sm uppercase tracking-widest ${
                isActive('/portfolio') ? 'text-gold' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={`block py-3 text-sm uppercase tracking-widest ${
                isActive('/about') ? 'text-gold' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block py-3 text-sm uppercase tracking-widest ${
                isActive('/contact') ? 'text-gold' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
