import { useEffect, useState } from 'react'

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = ['all', 'digital art', 'illustration', 'mixed media', 'photography']

  useEffect(() => {
    loadPortfolio()
  }, [])

  const loadPortfolio = async () => {
    try {
      // This will be implemented with Supabase integration
      // For now, using placeholder data
      const placeholderItems = [
        {
          id: 1,
          title: 'Project One',
          category: 'digital art',
          description: 'Description of project one',
          imageUrl: '',
          featured: true
        },
        {
          id: 2,
          title: 'Project Two',
          category: 'illustration',
          description: 'Description of project two',
          imageUrl: '',
          featured: false
        },
        {
          id: 3,
          title: 'Project Three',
          category: 'mixed media',
          description: 'Description of project three',
          imageUrl: '',
          featured: true
        }
      ]
      setPortfolioItems(placeholderItems)
      setLoading(false)
    } catch (error) {
      console.error('Error loading portfolio:', error)
      setLoading(false)
    }
  }

  const filteredItems =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Portfolio</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore my collection of creative works spanning various mediums and
            styles
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white sticky top-16 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading portfolio...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image Placeholder */}
                    <div className="h-80 bg-gray-300 group-hover:scale-110 transition-transform duration-300">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm uppercase tracking-wide text-purple-300">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">
                No portfolio items found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <div className="mb-6">
                <div className="h-96 bg-gray-300 rounded-lg mb-6">
                  {selectedItem.imageUrl && (
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">{selectedItem.title}</h2>
                  <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold uppercase">
                    {selectedItem.category}
                  </span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Additional Details */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <span className="font-semibold">Category:</span>{' '}
                      {selectedItem.category}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span> [Date]
                    </div>
                    <div>
                      <span className="font-semibold">Medium:</span> [Medium]
                    </div>
                    <div>
                      <span className="font-semibold">Client:</span> [Client]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in My Work?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            I'm available for commissions, collaborations, and exhibitions.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
