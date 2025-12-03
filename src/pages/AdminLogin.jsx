import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/supabase'

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('Attempting login...')
      
      // Sign in with Supabase
      const { session, user } = await authService.signIn(
        credentials.email,
        credentials.password
      )

      console.log('Login response:', { session, user })

      if (session && user) {
        // Store admin status in localStorage
        localStorage.setItem('isAdmin', 'true')
        localStorage.setItem('adminSession', JSON.stringify(session))
        
        // Navigate to dashboard
        navigate('/admin/dashboard')
      } else {
        setError('Authentication failed. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      
      // Provide more specific error messages
      if (err.message?.includes('fetch')) {
        setError('Connection error. Please check your internet connection and try again.')
      } else if (err.message?.includes('Invalid')) {
        setError('Invalid email or password. Please try again.')
      } else {
        setError(err.message || 'Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif italic text-white mb-2">Admin Portal</h1>
          <p className="text-gold uppercase tracking-widest text-sm">Iklima Babangida Portfolio</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-serif text-white mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-4 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-4 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/30 text-red-400 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-dark px-6 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-gray-500 hover:text-gold transition-colors text-sm uppercase tracking-wider">
              ← Back to Website
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-gray-600 text-xs uppercase tracking-widest">
          <p>🔒 Secure Admin Access Only</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
