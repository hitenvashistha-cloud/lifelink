import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaHeart } from 'react-icons/fa';

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is Lifelink?',
          a: 'Lifelink is a blood donation platform that connects blood donors with hospitals and patients in need across India. It makes it easy for donors to find requests near them and for hospitals to reach the right donors quickly.',
        },
        {
          q: 'Is Lifelink free to use?',
          a: 'Yes, Lifelink is completely free for both donors and hospitals. There are no hidden charges for registration or using the platform.',
        },
        {
          q: 'How do I register on Lifelink?',
          a: 'Click on the Register button on the home page. Choose whether you are a donor or a hospital. Fill in the required details, verify your phone number with OTP, and your account will be created.',
        },
      ],
    },
    {
      category: 'For Donors',
      questions: [
        {
          q: 'Who can donate blood?',
          a: 'Generally, anyone between 18-65 years of age, weighing at least 50 kg, and in good health can donate blood. There should be a gap of at least 3 months between two donations.',
        },
        {
          q: 'How often can I donate blood?',
          a: 'You can donate blood every 3 months (90 days). This gives your body enough time to replenish the donated blood.',
        },
        {
          q: 'Will donating blood harm my health?',
          a: 'No, donating blood is safe and does not harm your health. Your body replaces the donated blood within a few weeks. In fact, regular donation can have health benefits.',
        },
        {
          q: 'How do I find blood requests near me?',
          a: 'After logging in, click on "Near Me" in the sidebar. Allow location access, and you will see all blood requests within your selected radius. You can adjust the radius from 5 km to 100 km.',
        },
        {
          q: 'What happens after I accept a request?',
          a: 'Once you accept a request, your contact details are shared with the hospital. You can then visit the hospital at the specified time and donate blood. The hospital will mark the donation as completed.',
        },
      ],
    },
    {
      category: 'For Hospitals',
      questions: [
        {
          q: 'How do I register my hospital?',
          a: 'Click on "Register Hospital" on the home page. Fill in your hospital details including name, type, license number, and address. After registration, our admin team will verify and approve your account.',
        },
        {
          q: 'How long does hospital verification take?',
          a: 'Hospital verification usually takes 24-48 hours. You will be notified once your account is verified. Until then, you can still explore the platform but cannot create requests.',
        },
        {
          q: 'How do I create an emergency blood request?',
          a: 'After logging in, click on "Create Request" in the sidebar. Fill in the patient details, blood type needed, units required, and urgency level. Your request will be broadcast to matching donors nearby.',
        },
        {
          q: 'Can I manage my blood inventory on Lifelink?',
          a: 'Yes! Lifelink has a complete inventory management system. Go to "Inventory" in the sidebar to add, update, or remove blood stock by type. You will also get low stock alerts.',
        },
      ],
    },
    {
      category: 'Safety & Privacy',
      questions: [
        {
          q: 'Is my personal information safe?',
          a: 'Yes, we take your privacy seriously. All personal information is encrypted and stored securely. Your contact details are only shared with verified hospitals when you accept a request.',
        },
        {
          q: 'How do you verify users?',
          a: 'We verify all users through OTP sent to their registered phone number. Hospitals go through an additional verification process where our admin team checks their license and details.',
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you can request account deletion by contacting our support team at support@lifelink.in. Your data will be removed from our systems within 7 working days.',
        },
      ],
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaQuestionCircle className="text-6xl mx-auto mb-6 text-red-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Find answers to common questions about Lifelink
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                {section.category}
              </h2>

              <div className="space-y-3">
                {section.questions.map((faq, faqIndex) => {
                  const globalIndex = `${sectionIndex}-${faqIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={faqIndex}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                        <span className="text-red-600 flex-shrink-0">
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 pt-0 text-gray-600 border-t border-gray-100">
                          <p className="pt-4 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Contact Us
            </Link>
            <Link
              to="/register"
              className="bg-white border-2 border-red-500 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <FaHeart /> Join Lifelink
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FAQPage;