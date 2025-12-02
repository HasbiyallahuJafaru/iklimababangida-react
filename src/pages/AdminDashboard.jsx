import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio')
  const [portfolioItems, setPortfolioItems] = useState([])
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      navigate('/admin')
      return
    }

    loadData()
  }, [navigate])

  const loadData = async () => {
    try {
      // Load portfolio and articles from Supabase
      // For now, using placeholder data
      setPortfolioItems([])
      setArticles([])
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading data:', error)
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/admin')
  }

  return (
    <div className="admin-dashboard min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800"
              >
                View Website →
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'portfolio'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Portfolio Items
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'articles'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'settings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : (
            <>
              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Portfolio Management</h2>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                      + Add New Item
                    </button>
                  </div>

                  {portfolioItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {portfolioItems.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="h-48 bg-gray-300"></div>
                          <div className="p-4">
                            <h3 className="font-bold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              {item.category}
                            </p>
                            <div className="flex gap-2">
                              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                                Edit
                              </button>
                              <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600 mb-4">
                        No portfolio items yet.
                      </p>
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                        Add Your First Item
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Articles Tab */}
              {activeTab === 'articles' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Articles Management</h2>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                      + New Article
                    </button>
                  </div>

                  {articles.length > 0 ? (
                    <div className="space-y-4">
                      {articles.map((article) => (
                        <div
                          key={article.id}
                          className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-bold mb-1">{article.title}</h3>
                            <p className="text-sm text-gray-600">
                              {article.published_at}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                              Edit
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600 mb-4">No articles yet.</p>
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                        Write Your First Article
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Profile Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Display Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bio
                          </label>
                          <textarea
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="About yourself..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Social Media Links
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Instagram
                          </label>
                          <input
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Twitter
                          </label>
                          <input
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                      </div>
                    </div>

                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
