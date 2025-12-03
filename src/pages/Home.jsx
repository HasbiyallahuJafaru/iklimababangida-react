import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroWeaverImg from '../assets/images/hero-weaver.webp'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = [
    { id: 1, alt: 'Durbar horseman leading the procession' },
    { id: 2, alt: 'Close-up of a decorated Durbar horse' },
    { id: 3, alt: 'Durbar riders in colorful regalia' },
    { id: 4, alt: 'Kano weaver surrounded by vibrant textiles' },
    { id: 5, alt: 'Hands kneading Kano clay into bricks' },
    { id: 6, alt: 'Market bustle in Tarkwa' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="home-page bg-dark text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroWeaverImg})`,
              filter: 'brightness(0.5)'
            }}
          />
        </div>
        
        {/* Soft blur transition at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark via-dark/80 to-transparent backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white mb-12 leading-tight">
            Storytelling through light,
            <br />
            shadow, and movement.
          </h1>
          
          <Link
            to="/portfolio"
            className="inline-block bg-gold text-dark px-12 py-5 rounded-full text-sm uppercase tracking-wider font-bold hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Portfolio
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Meet the Photographer Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">Meet the Photographer</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="aspect-[3/4] bg-dark-lighter rounded-sm overflow-hidden">
                <img 
                  src="/src/assets/images/iklima babangida.jpg"
                  alt="Iklima Babangida with her camera"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Meet Iklima Babangida</h3>
              <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">
                Storytelling that lingers long after the shutter closes.
              </p>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                I&apos;m tall enough that people always spot me first in a crowd, which is ironic considering I spend most of my time trying to disappear behind my camera. My name is Iklima, and I shoot stories from the north that refuse to be flattened into stereotypes. My grandmother left me her love for photography, though I never got to shoot alongside her. Now I carry that inheritance. I&apos;m drawn to documentary work, the kind that sits with people long enough to see past the surface. Nature teaches me patience; people teach me to stay curious.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                I don&apos;t believe in the perfect shot. I believe in showing up, in the unrelenting return, in letting stories breathe on their own terms. My camera is just the excuse. The real work is in the walking, the watching, the refusal to look away.
              </p>
              <Link
                to="/about"
                className="inline-block border-2 border-gold text-gold px-10 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Read the full story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-24 bg-dark-light">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-16">Curated Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Link to="/portfolio" className="group relative overflow-hidden rounded-sm aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
                alt="Durbar horseman leading a procession in northern Nigeria"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-serif text-white">Hawan Daushe</h3>
              </div>
            </Link>

            <Link to="/portfolio" className="group relative overflow-hidden rounded-sm aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?q=80&w=2070&auto=format&fit=crop"
                alt="Hands kneading clay bricks inside the Kano mud pit"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-serif text-white">Mud Pit in Kano</h3>
              </div>
            </Link>

            <Link to="/portfolio" className="group relative overflow-hidden rounded-sm aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop"
                alt="Tarkwa market scene awash in golden morning light"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-serif text-white">Tarkwa Beach</h3>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/portfolio"
              className="inline-block bg-transparent border-2 border-gold text-gold px-10 py-4 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Explore the full portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-[16/10] bg-dark-lighter rounded-sm overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
                alt={galleryImages[currentSlide].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <div className="text-center mt-6 text-gray-400 text-lg">
              <span className="text-white font-semibold">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="mx-2">/</span>
              <span>{String(galleryImages.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-24 bg-dark-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-gold text-center mb-12">Client Notes</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="aspect-square rounded-sm overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1610632380800-3f1473e83c90?q=80&w=2070&auto=format&fit=crop"
                    alt="Durbar drummers performing in colorful traditional attire"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed italic">
                  &quot;She has found a way to capture our stories with pictures so that people see us for who we really are and the joys that give our lives meaning.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Let&apos;s create something cinematic
          </h2>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-block bg-gold text-dark px-12 py-5 rounded-full text-sm uppercase tracking-wider font-bold hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Iklima
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
