import { Link } from 'react-router-dom';
import { FaTint, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <FaTint className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold">Lifelink</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Connecting blood donors with hospitals across India to save lives. Every drop counts.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <FaFacebook />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Become a Donor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/faq" className="hover:text-red-400 transition">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-red-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-400 transition">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <FaPhone className="mt-1 text-red-500" />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <FaEnvelope className="mt-1 text-red-500" />
                <span>support@lifelink.in</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-red-500" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Lifelink. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <FaHeart className="text-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;