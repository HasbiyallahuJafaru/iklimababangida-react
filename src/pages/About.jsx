import { useState, useEffect } from 'react'
import aboutImg1 from '../assets/images/iklima babangida 2.jpg'
import aboutImg2 from '../assets/images/iklima babangida 3.jpg'
import cameraImg from '../assets/images/camera.jpg'

function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [aboutImg1, aboutImg2]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {images.map((img, index) => (
                  <img 
                    key={index}
                    src={img}
                    alt={`Iklima Babangida ${index + 1}`}
                    className={`w-full h-auto object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  />
                ))}
                
                {/* Slideshow indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-[#C5A572] w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Behind the Lens Tag */}
              <div className="tracking-[0.3em] text-[#C5A572] text-sm font-light uppercase">
                BEHIND THE LENS
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Iklima Babangida — Visual storytelling rooted in heritage.
              </h1>

              {/* Bio Paragraphs */}
              <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>
                  Iklima Babangida is a visual storyteller whose work explores themes of identity, memory, tradition, womanhood, and personal freedom. Drawing from her Hausa-Fulani heritage in northern Nigeria, she blends documentary and creative storytelling to capture human experiences through a cultural lens.
                </p>

                <p>
                  Influenced by her late grandmother&apos;s passion for photography, Iklima&apos;s work preserves cultural narratives while challenging stereotypes and fostering cross-cultural understanding. Her photography has appeared in the 9th edition of Abuja Photo Festival (2025), the +234 Art Exhibition in Lagos (2025), the Alárà Now Exhibition (2024), and Mindscapes of the North (Arts & Vibes × British Council, Lagos, 2024). She has also been published in <em>Ake Review &apos;24</em> (Embracing Identity).
                </p>

                <p className="font-medium">
                  Iklima is a proud member of Black Women Photographers.
                </p>
              </div>

              {/* Connect Section */}
              <div className="pt-6">
                <div className="tracking-[0.2em] text-gray-400 text-xs uppercase mb-6">
                  CONNECT WITH IKLIMA
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-6">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#C5A572] transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#C5A572] transition-colors duration-300"
                    aria-label="Twitter/X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <a
                  href="/contact"
                  className="inline-block border border-gray-600 text-white px-10 py-4 rounded-full font-light tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black transition-all duration-300"
                >
                  LET&apos;S CREATE TOGETHER
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preferred Gear Section */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="tracking-[0.3em] text-[#C5A572] text-sm font-light uppercase mb-12">
              PREFERRED GEAR
            </div>

            {/* Gear Items */}
            <div className="space-y-12">
              {/* Fujifilm X-T Series */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative rounded-2xl overflow-hidden bg-[#252525] h-64 lg:h-80">
                  <img 
                    src={cameraImg}
                    alt="Fujifilm X-T Series Camera"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif">
                    Fujifilm X-T Series Body
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    The camera body keeps that classic SLR silhouette with a centered viewfinder hump and dials begging to be turned. Manual shutter speed and ISO wheels live on the top plate, alongside tactile switches that invite intentional exposure decisions. Whether it&apos;s the X-T5, X-T4, or an older sibling, the Fujifilm X-T family delivers the hybrid ergonomics and timeless styling I love.
                  </p>
                </div>
              </div>

              {/* Fujinon XF Prime */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative rounded-2xl overflow-hidden bg-[#252525] h-64 lg:h-80 lg:order-2">
                  <img 
                    src="https://thecotswoldphotographer.com/wp-content/uploads/2025/08/Featured-image-compressed.webp" 
                    alt="Fujinon XF Prime Lens"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4 lg:order-1">
                  <h3 className="text-3xl md:text-4xl font-serif">
                    Fujinon XF Prime
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    A compact Fujinon XF prime stays glued to the mount—usually the weather-sealed XF 35mm f/2 R WR or its 23mm sibling. The lens renders crisp detail with smooth falloff, perfect for the cinematic storytelling I chase in every frame.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="text-center mt-16">
              <a
                href="/contact"
                className="inline-block bg-[#C5A572] text-black px-12 py-4 rounded-full font-medium tracking-[0.2em] text-sm uppercase hover:bg-[#d4b885] transition-all duration-300"
              >
                CONTACT IKLIMA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
