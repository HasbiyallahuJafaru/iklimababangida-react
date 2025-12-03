import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService, portfolioService, articlesService } from '../services/supabase'
import { cloudinaryService } from '../services/cloudinary'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio')
  const [portfolioItems, setPortfolioItems] = useState([])
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        // Check if user is authenticated with Supabase
        const session = await authService.getSession()
        
        if (!session) {
          navigate('/admin')
          return
        }

        await authService.getCurrentUser()
        
        // Load initial data
        try {
          const items = await portfolioService.getAll()
          setPortfolioItems(items || [])
          const articlesList = await articlesService.getAll()
          setArticles(articlesList || [])
          setIsLoading(false)
        } catch (error) {
          console.error('Error loading data:', error)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('adminSession')
        navigate('/admin')
      }
    }

    checkAuthAndLoadData()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await authService.signOut()
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('adminSession')
      navigate('/admin')
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if error occurs
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('adminSession')
      navigate('/admin')
    }
  }

  const handleAddNew = () => {
    setModalType('add')
    setCurrentItem(null)
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setModalType('edit')
    setCurrentItem(item)
    setShowModal(true)
  }

  const handleDelete = async (id, type = 'portfolio') => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      if (type === 'portfolio') {
        await portfolioService.delete(id)
        setPortfolioItems(portfolioItems.filter(item => item.id !== id))
      } else {
        await articlesService.delete(id)
        setArticles(articles.filter(article => article.id !== id))
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const handleImageUpload = async (file) => {
    try {
      setIsUploading(true)
      const result = await cloudinaryService.uploadImage(file, {
        folder: 'portfolio'
      })
      setIsUploading(false)
      return result.url
    } catch (error) {
      console.error('Error uploading image:', error)
      setIsUploading(false)
      throw error
    }
  }

  const handleMultipleImageUpload = async (files) => {
    try {
      setIsUploading(true)
      const uploadPromises = Array.from(files).map(file => 
        cloudinaryService.uploadImage(file, { folder: 'portfolio' })
      )
      const results = await Promise.all(uploadPromises)
      setIsUploading(false)
      return results.map(r => r.url)
    } catch (error) {
      console.error('Error uploading images:', error)
      setIsUploading(false)
      throw error
    }
  }

  const reloadPortfolioData = async () => {
    try {
      const items = await portfolioService.getAll()
      console.log('Reloaded portfolio items:', items)
      setPortfolioItems(items || [])
    } catch (error) {
      console.error('Error reloading portfolio:', error)
    }
  }

  const handleSaveItem = async (itemData) => {
    try {
      console.log('Saving item data:', itemData)
      
      if (modalType === 'add') {
        if (activeTab === 'portfolio') {
          console.log('Creating new portfolio item...')
          const newItem = await portfolioService.create(itemData)
          console.log('Portfolio item created:', newItem)
          // Reload all data to ensure we have the latest
          await reloadPortfolioData()
        } else {
          const newArticle = await articlesService.create(itemData)
          setArticles([newArticle, ...articles])
        }
      } else {
        if (activeTab === 'portfolio') {
          console.log('Updating portfolio item:', currentItem.id)
          const updatedItem = await portfolioService.update(currentItem.id, itemData)
          console.log('Portfolio item updated:', updatedItem)
          await reloadPortfolioData()
        } else {
          const updatedArticle = await articlesService.update(currentItem.id, itemData)
          setArticles(articles.map(article => 
            article.id === currentItem.id ? updatedArticle : article
          ))
        }
      }
      setShowModal(false)
      setCurrentItem(null)
      alert('Project saved successfully!')
    } catch (error) {
      console.error('Error saving item:', error)
      console.error('Error details:', error.message, error.details)
      
      // More specific error messages
      let errorMessage = 'Failed to save item. '
      if (error.message?.includes('duplicate')) {
        errorMessage += 'This item already exists.'
      } else if (error.message?.includes('permission')) {
        errorMessage += 'You do not have permission to perform this action.'
      } else if (error.message?.includes('network')) {
        errorMessage += 'Network error. Please check your connection.'
      } else {
        errorMessage += error.message || 'Please try again.'
      }
      
      alert(errorMessage)
    }
  }

  return (
    <div className="admin-dashboard min-h-screen bg-[#0a0a0a] text-white">
      {/* Modern Header */}
      <header className="bg-[#111] border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C5A572] to-[#8B7355] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Portfolio Manager</h1>
                <p className="text-xs text-gray-500">Iklima Babangida</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Modern Tabs */}
        <div className="flex gap-2 mb-8 bg-[#111] p-1.5 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'portfolio'
                ? 'bg-[#C5A572] text-black shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'articles'
                ? 'bg-[#C5A572] text-black shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Articles
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C5A572] border-t-transparent"></div>
                <p className="mt-4 text-gray-400">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-1">Projects</h2>
                      <p className="text-gray-500 text-sm">{portfolioItems.length} total projects</p>
                    </div>
                    <button 
                      onClick={handleAddNew}
                      className="bg-[#C5A572] hover:bg-[#d4b885] text-black px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Project
                    </button>
                  </div>

                  {portfolioItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {portfolioItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C5A572]/30 transition-all group"
                        >
                          <div className="h-48 bg-[#1a1a1a] relative overflow-hidden">
                            {item.image_url ? (
                              <img 
                                src={item.image_url} 
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-semibold text-lg text-white mb-2 truncate">{item.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xs px-2.5 py-1 bg-[#C5A572]/10 text-[#C5A572] rounded-md font-medium">
                                {item.category}
                              </span>
                              {item.location && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {item.location}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEdit(item)}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id, 'portfolio')}
                                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl bg-[#111]">
                      <div className="w-20 h-20 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-[#C5A572]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 mb-6 text-lg">No projects yet</p>
                      <button 
                        onClick={handleAddNew}
                        className="bg-[#C5A572] hover:bg-[#d4b885] text-black px-8 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Project
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Articles Tab */}
              {activeTab === 'articles' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-1">Articles</h2>
                      <p className="text-gray-500 text-sm">{articles.length} total articles</p>
                    </div>
                    <button 
                      onClick={handleAddNew}
                      className="bg-[#C5A572] hover:bg-[#d4b885] text-black px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Article
                    </button>
                  </div>

                  {articles.length > 0 ? (
                    <div className="space-y-3">
                      {articles.map((article) => (
                        <div
                          key={article.id}
                          className="bg-[#111] border border-white/5 rounded-xl p-5 flex justify-between items-center hover:border-[#C5A572]/30 transition-all"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-white mb-1">{article.title}</h3>
                            <p className="text-sm text-gray-500">
                              {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(article)}
                              className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(article.id, 'articles')}
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-2 rounded-lg transition-all text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl bg-[#111]">
                      <div className="w-20 h-20 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-[#C5A572]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 mb-6 text-lg">No articles yet</p>
                      <button 
                        onClick={handleAddNew}
                        className="bg-[#C5A572] hover:bg-[#d4b885] text-black px-8 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Write Your First Article
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-serif text-white mb-8">Settings</h2>
                  <div className="space-y-8 max-w-2xl">
                    <div>
                      <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">
                        Profile Settings
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Display Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Bio
                          </label>
                          <textarea
                            rows="4"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors resize-none"
                            placeholder="About yourself..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                      <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">
                        Social Media Links
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Instagram
                          </label>
                          <input
                            type="url"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Twitter
                          </label>
                          <input
                            type="url"
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button className="bg-gold text-dark px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gold-light transition-colors">
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <ModernProjectModal
          type={modalType}
          item={currentItem}
          isUploading={isUploading}
          onClose={() => {
            setShowModal(false)
            setCurrentItem(null)
          }}
          onSave={handleSaveItem}
          onUploadImage={handleImageUpload}
          onUploadMultipleImages={handleMultipleImageUpload}
          activeTab={activeTab}
        />
      )}
    </div>
  )
}

// Modern Project Modal Component
function ModernProjectModal({ type, item, isUploading, onClose, onSave, onUploadMultipleImages, activeTab }) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    article: item?.article || '',
    category: item?.category || '',
    image_url: item?.image_url || '',
    images: item?.images || [],
    location: item?.location || '',
    date: item?.date || ''
  })
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState(item?.images || [item?.image_url].filter(Boolean) || [])
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // Add new files to existing files
      setImageFiles(prev => [...prev, ...files])
      
      // Create previews for new files and add to existing previews
      const newPreviews = files.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
    }
  }

  const removeImage = (index) => {
    const preview = imagePreviews[index]
    
    // If it's a blob URL, revoke it
    if (preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview)
    }
    
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    
    // If removing from existing images (URLs), update formData
    if (!preview.startsWith('blob:')) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }))
    } else {
      // If removing from new files, update imageFiles
      const blobIndex = imagePreviews.slice(0, index).filter(p => p.startsWith('blob:')).length
      setImageFiles(prev => prev.filter((_, i) => i !== blobIndex))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Start with existing image URLs
      let imageUrls = [...(formData.images || [])]

      // Upload new images if selected and add to existing URLs
      if (imageFiles.length > 0) {
        const newImageUrls = await onUploadMultipleImages(imageFiles)
        imageUrls = [...imageUrls, ...newImageUrls]
      }

      const dataToSave = {
        ...formData,
        image_url: imageUrls[0] || formData.image_url || '',
        images: imageUrls
      }

      // Add timestamp for new items
      if (type === 'add') {
        dataToSave.created_at = new Date().toISOString()
      }

      await onSave(dataToSave)
    } catch (error) {
      console.error('Error saving:', error)
      alert('Failed to save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (activeTab === 'articles') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold text-white">
              {type === 'add' ? 'New Article' : 'Edit Article'}
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-400 mb-6">Article management coming soon...</p>
            <button
              onClick={onClose}
              className="bg-[#C5A572] hover:bg-[#d4b885] text-black px-6 py-2.5 rounded-lg font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {type === 'add' ? 'Create New Project' : 'Edit Project'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-180px)] overflow-y-auto">
          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Project Images *
            </label>
            <div className="space-y-4">
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square bg-[#111] rounded-xl overflow-hidden border border-white/10">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-[#C5A572] text-black text-xs px-2 py-1 rounded font-medium">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Upload Button */}
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#C5A572]/50 transition-all cursor-pointer bg-[#111]">
                  <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-400 mb-1">Click to upload images</p>
                  <p className="text-xs text-gray-600">PNG, JPG up to 10MB each (Multiple files allowed)</p>
                </div>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A572] focus:outline-none transition-colors"
              placeholder="Enter project title"
            />
          </div>

          {/* Article/Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Article / Project Description *
            </label>
            <textarea
              name="article"
              value={formData.article}
              onChange={handleChange}
              required
              rows="8"
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A572] focus:outline-none transition-colors resize-none"
              placeholder="Write your article or detailed description here..."
            />
            <p className="text-xs text-gray-600 mt-2">{formData.article.length} characters</p>
          </div>

          {/* Category & Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A572] focus:outline-none transition-colors"
              >
                <option value="">Select category</option>
                <option value="Documentary">Documentary</option>
                <option value="Portrait">Portrait</option>
                <option value="Culture">Culture</option>
                <option value="Street">Street</option>
                <option value="Landscape">Landscape</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A572] focus:outline-none transition-colors"
                placeholder="e.g., Kano, Nigeria"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A572] focus:outline-none transition-colors"
            />
          </div>

          {/* Short Description (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Short Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A572] focus:outline-none transition-colors resize-none"
              placeholder="Brief summary for preview cards..."
            />
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving || isUploading}
            className="flex-1 bg-[#C5A572] hover:bg-[#d4b885] text-black px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving || isUploading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isUploading ? 'Uploading...' : 'Saving...'}
              </>
            ) : (
              type === 'add' ? 'Create Project' : 'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
