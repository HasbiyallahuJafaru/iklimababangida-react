import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-white/10 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Iklima Babangida. All rights reserved.
          </p>
          <p className="mt-2">
            <Link to="/admin" className="text-gray-500 hover:text-gold transition text-xs">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
