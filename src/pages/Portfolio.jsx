import { useEffect, useState } from 'react'
import { portfolioService } from '../services/supabase'
import portfolioHeaderImg from '../assets/images/portfolio_header.webp'

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Documentary', 'Portrait', 'Culture', 'Street', 'Landscape', 'Event']

  useEffect(() => {
    loadPortfolio()
  }, [])

  const loadPortfolio = async () => {
    try {
      console.log('Loading portfolio items...')
      const items = await portfolioService.getAll()
      console.log('Portfolio items loaded:', items)
      setPortfolioItems(items || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading portfolio:', error)
      alert('Failed to load portfolio. Please check your connection.')
      setLoading(false)
    }
  }

  const filteredItems =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="portfolio-page bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={portfolioHeaderImg}
            alt="Portfolio header"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Portfolio</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore my collection of creative works
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-black/95 sticky top-16 z-40 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-[#C5A572] text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A572]"></div>
              <p className="mt-4 text-gray-400">Loading portfolio...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="space-y-24">
              {filteredItems.map((item) => (
                <div key={item.id} className="space-y-8">
                  {/* Title and Description */}
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-4xl md:text-5xl font-bold text-white">
                        {item.title}
                      </h2>
                      {item.category && (
                        <span className="px-4 py-1 bg-[#C5A572]/20 text-[#C5A572] rounded-full text-sm font-semibold uppercase border border-[#C5A572]/30">
                          {item.category}
                        </span>
                      )}
                    </div>
                    
                    {(item.content || item.story) && (
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {item.content || item.story}
                      </p>
                    )}
                    
                    {/* Meta Information */}
                    {(item.location || item.date) && (
                      <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-400">
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {item.location}
                          </div>
                        )}
                        {item.date && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Images Grid */}
                  {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {item.images.map((imageUrl, index) => (
                        <div 
                          key={index} 
                          className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-[#C5A572]/50 transition-all duration-300"
                        >
                          <img
                            src={imageUrl}
                            alt={`${item.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-8" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                No portfolio items found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white/5 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Interested in My Work?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            I&apos;m available for commissions, collaborations, and exhibitions.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#C5A572] hover:bg-[#d4b885] text-black px-8 py-3 rounded-full font-semibold transition-all"
          >
            Let&apos;s Talk
          </a>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
