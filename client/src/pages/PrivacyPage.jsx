import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaShieldAlt } from 'react-icons/fa';

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaShieldAlt className="text-6xl mx-auto mb-6 text-red-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-red-100">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to Lifelink. We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, and share information about you when you use our 
                blood donation platform. By using Lifelink, you agree to the practices described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
              <p className="text-gray-600 mb-3">We collect the following types of information:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li><strong>Personal Information:</strong> Name, email address, phone number, blood type, date of birth, and gender.</li>
                <li><strong>Location Data:</strong> City, state, pincode, and geographic coordinates to help match donors with nearby requests.</li>
                <li><strong>Hospital Information:</strong> Hospital name, type, license number, and address (for hospital accounts).</li>
                <li><strong>Usage Data:</strong> Information about how you use our platform, including pages visited and actions taken.</li>
                <li><strong>Device Information:</strong> Browser type, IP address, and device type.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-3">We use the information we collect to:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Connect blood donors with hospitals and patients in need</li>
                <li>Verify your identity through OTP authentication</li>
                <li>Send you notifications about blood requests and camps</li>
                <li>Improve our platform and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We do not sell your personal information. We may share your information in the following cases:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li><strong>With Hospitals:</strong> When you accept a blood request, your name and phone number are shared with that hospital.</li>
                <li><strong>With Donors:</strong> When a request is broadcast, donors can see the hospital name and location.</li>
                <li><strong>Legal Requirements:</strong> If required by law or to protect our rights.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your personal information. All data is 
                encrypted during transmission and storage. Passwords are hashed using bcrypt. However, no method of 
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-3">You have the right to:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account</li>
                <li>Opt out of promotional communications</li>
                <li>Lodge a complaint with us about data handling</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar technologies to enhance your experience on our platform. Cookies help 
                us remember your preferences and understand how you use the platform. You can disable cookies in 
                your browser settings, but some features may not work properly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Lifelink is not intended for use by anyone under the age of 18. We do not knowingly collect 
                personal information from children. If we become aware that a child has provided us with personal 
                information, we will delete it immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date. You are advised to review this 
                page periodically for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@lifelink.in</p>
                <p className="text-gray-700"><strong>Phone:</strong> 1800-123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> New Delhi, India - 110001</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PrivacyPage;