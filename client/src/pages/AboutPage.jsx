import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaTint, FaHeart, FaUsers, FaHospital, FaBullseye, FaEye, FaCheckCircle } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaTint className="text-6xl mx-auto mb-6 text-red-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Lifelink</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Connecting blood donors with hospitals and patients across India since 2024
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Lifelink was created to solve a critical problem: the shortage of blood during emergencies in India. 
                Every year, thousands of lives are lost because patients cannot find blood donors in time.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We connect willing blood donors with hospitals and patients who need blood urgently. 
                Our platform makes it easy for donors to find requests near them and for hospitals to reach 
                the right donors quickly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Free to use for donors and hospitals</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Secure and verified user accounts</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Location-based donor matching</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <p className="text-3xl font-bold text-red-600">25K+</p>
                <p className="text-gray-600 text-sm">Lives Saved</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <p className="text-3xl font-bold text-blue-600">10K+</p>
                <p className="text-gray-600 text-sm">Active Donors</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaHospital className="text-white text-2xl" />
                </div>
                <p className="text-3xl font-bold text-green-600">500+</p>
                <p className="text-gray-600 text-sm">Hospitals</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaTint className="text-white text-2xl" />
                </div>
                <p className="text-3xl font-bold text-purple-600">50+</p>
                <p className="text-gray-600 text-sm">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <FaBullseye className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A future where no one dies due to lack of blood. We aim to create a unified blood donation 
                network across India where donors and patients connect instantly.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FaEye className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in transparency, trust, and technology. Our platform is built to be 
                accessible, reliable, and secure for all users across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
          <p className="text-lg mb-8 text-red-100">
            Be part of India's largest blood donation network
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition"
          >
            <FaHeart /> Become a Donor
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;