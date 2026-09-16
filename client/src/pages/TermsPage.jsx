import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaFileContract } from 'react-icons/fa';

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaFileContract className="text-6xl mx-auto mb-6 text-red-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-red-100">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Lifelink, you agree to be bound by these Terms of Service. If you do not agree 
                with any part of these terms, you may not use our platform. These terms apply to all visitors, users, 
                donors, hospitals, and others who access Lifelink.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Eligibility</h2>
              <p className="text-gray-600 leading-relaxed mb-3">To use Lifelink, you must:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Be at least 18 years of age</li>
                <li>Be a resident of India</li>
                <li>Provide accurate and complete registration information</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600 mb-3">As a user of Lifelink, you agree to:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Provide truthful and accurate information</li>
                <li>Keep your account credentials secure</li>
                <li>Not use the platform for any illegal purpose</li>
                <li>Not post false or misleading blood requests</li>
                <li>Not harass or abuse other users</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Donor Guidelines</h2>
              <p className="text-gray-600 mb-3">Blood donors on Lifelink must:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Meet all medical eligibility requirements for blood donation</li>
                <li>Wait at least 3 months between donations</li>
                <li>Only accept requests they can genuinely fulfill</li>
                <li>Notify the hospital promptly if unable to donate</li>
                <li>Follow all hospital protocols during donation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Hospital Guidelines</h2>
              <p className="text-gray-600 mb-3">Hospitals on Lifelink must:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Provide valid medical license and credentials</li>
                <li>Only create requests for genuine patient needs</li>
                <li>Treat donors with respect and professionalism</li>
                <li>Maintain accurate blood inventory records</li>
                <li>Follow all medical and safety protocols</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Prohibited Activities</h2>
              <p className="text-gray-600 mb-3">You may not:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-6">
                <li>Sell or trade blood or blood products</li>
                <li>Create fake accounts or impersonate others</li>
                <li>Post false blood requests</li>
                <li>Use the platform for commercial solicitation</li>
                <li>Attempt to hack or disrupt the platform</li>
                <li>Collect user information without permission</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Platform Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                While we strive to keep Lifelink available at all times, we do not guarantee uninterrupted access. 
                We may suspend or discontinue the platform at any time without prior notice. We are not liable for 
                any loss or damage caused by platform downtime.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                Lifelink is a platform that connects donors and hospitals. We are not a medical service provider. 
                All medical decisions, including blood compatibility and donation eligibility, must be made by 
                qualified medical professionals. Lifelink is not responsible for the outcome of any blood donation 
                or medical procedure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, Lifelink shall not be liable for any indirect, incidental, 
                special, or consequential damages arising out of or in connection with your use of the platform. 
                Our total liability shall not exceed the amount you paid to use our services, if any.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time, without notice, for conduct 
                that we believe violates these Terms of Service or is harmful to other users, us, or third parties, 
                or for any other reason.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of India. 
                Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the 
                courts of New Delhi.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                For any questions about these Terms of Service, please contact us at:
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@lifelink.in</p>
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

export default TermsPage;