import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaTint } from 'react-icons/fa';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[150px] md:text-[200px] font-bold text-red-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12">
                <FaTint className="text-white text-5xl md:text-6xl" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <FaHome /> Go to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-red-500 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              <FaSearch /> Contact Support
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-4">Popular Pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="text-red-600 hover:underline text-sm font-medium">Home</Link>
              <span className="text-gray-300">•</span>
              <Link to="/login" className="text-red-600 hover:underline text-sm font-medium">Login</Link>
              <span className="text-gray-300">•</span>
              <Link to="/register" className="text-red-600 hover:underline text-sm font-medium">Register</Link>
              <span className="text-gray-300">•</span>
              <Link to="/about" className="text-red-600 hover:underline text-sm font-medium">About Us</Link>
              <span className="text-gray-300">•</span>
              <Link to="/faq" className="text-red-600 hover:underline text-sm font-medium">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;