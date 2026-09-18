import { Link } from 'react-router-dom';
import {
  FaTint,
  FaHospital,
  FaMapMarkerAlt,
  FaHeart,
  FaAmbulance,
  FaClock,
  FaAward,
  FaCheckCircle,
  FaPhone,
  FaArrowRight,
  FaUserMd,
} from 'react-icons/fa';
import Reveal from '../components/common/Reveal';
import TypeWriter from '../components/common/TypeWriter';
import CountUp from '../components/common/CountUp';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const featureColors = {
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
};

function HomePage() {
  useSmoothScroll();

  const features = [
    {
      icon: <FaAmbulance />,
      title: 'Emergency Requests',
      desc: 'Hospitals can create emergency blood requests that reach nearby donors instantly.',
      color: 'red',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location-Based Matching',
      desc: 'Find blood donors and blood banks near your location quickly and efficiently.',
      color: 'blue',
    },
    {
      icon: <FaClock />,
      title: 'Real-Time Updates',
      desc: 'Get instant notifications about blood requests, camps, and donation reminders.',
      color: 'green',
    },
    {
      icon: <FaHospital />,
      title: 'Hospital Network',
      desc: 'Connected with hospitals and blood banks across India for faster response.',
      color: 'purple',
    },
    {
      icon: <FaAward />,
      title: 'Rewards Program',
      desc: 'Earn points and badges for every donation and redeem exciting rewards.',
      color: 'yellow',
    },
    {
      icon: <FaUserMd />,
      title: 'Verified Donors',
      desc: 'All donors are verified through OTP for safety and reliability.',
      color: 'indigo',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Register',
      desc: 'Create your profile as a donor or hospital in just a few minutes.',
    },
    {
      num: '02',
      title: 'Connect',
      desc: 'Hospitals post blood requirements and donors get notified instantly.',
    },
    {
      num: '03',
      title: 'Save Lives',
      desc: "Donors visit the hospital and donate blood to save someone's life.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HEADER ===== */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
              <FaTint className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Lifelink
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <a
              href="#features"
              className="text-sm font-semibold text-gray-600 hover:text-red-600 tracking-wide uppercase transition"
            >
              Features
            </a>
            <a
              href="#how"
              className="text-sm font-semibold text-gray-600 hover:text-red-600 tracking-wide uppercase transition"
            >
              How It Works
            </a>
            <a
              href="#impact"
              className="text-sm font-semibold text-gray-600 hover:text-red-600 tracking-wide uppercase transition"
            >
              Impact
            </a>
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-600 hover:text-red-600 tracking-wide uppercase transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-all duration-300 text-sm font-semibold tracking-wide uppercase"
            >
              Register
            </Link>
          </nav>

          <div className="md:hidden flex gap-2">
            <Link
              to="/register"
              className="bg-gray-900 text-white px-4 py-2 rounded-full font-semibold text-xs tracking-wide uppercase"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="relative z-10">
              <Reveal direction="up" delay={100}>
                <p className="text-sm font-bold text-red-600 tracking-[0.3em] uppercase mb-4">
                  # Become a Hero
                </p>
              </Reveal>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.95] mb-6 tracking-tight">
                <Reveal direction="up" delay={200}>
                  <span className="block">YOU DON'T</span>
                </Reveal>
                <Reveal direction="up" delay={350}>
                  <span className="block">HAVE TO BE</span>
                </Reveal>
                <Reveal direction="up" delay={500}>
                  <span className="block text-red-600">A DOCTOR</span>
                </Reveal>
                <Reveal direction="up" delay={650}>
                  <span className="block">
                    TO SAVE{' '}
                    <TypeWriter text="A LIFE" speed={120} delay={900} cursor={false} />
                  </span>
                </Reveal>
              </h1>

              <Reveal direction="up" delay={800}>
                <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
                  Join Lifelink and connect with hospitals and patients across India who need your
                  blood. Every drop counts. Every donor is a hero.
                </p>
              </Reveal>

              <Reveal direction="up" delay={1000}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold tracking-wide uppercase text-sm hover:bg-red-700 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-1"
                  >
                    <FaHeart />
                    Become a Donor
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/hospital-register"
                    className="inline-flex items-center justify-center gap-3 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-bold tracking-wide uppercase text-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <FaHospital />
                    Hospital Sign Up
                  </Link>
                </div>
              </Reveal>

              <Reveal direction="up" delay={1200}>
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {['Free Registration', 'Instant Alerts', 'Verified Platform'].map((text) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCheckCircle className="text-red-500" />
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right - Visual */}
            <Reveal direction="left" delay={400} duration={900}>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Rotating rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 border-red-100 animate-[spin_30s_linear_infinite]"></div>
                  </div>
                  <div className="absolute inset-8 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 border-red-200 animate-[spin_20s_linear_infinite_reverse]"></div>
                  </div>
                  <div className="absolute inset-16 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 border-red-300 animate-[spin_15s_linear_infinite]"></div>
                  </div>

                  {/* Blood drop */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 260"
                      className="w-52 h-64"
                      style={{ filter: 'drop-shadow(0 25px 50px rgba(220, 38, 38, 0.35))' }}
                    >
                      <defs>
                        <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#991b1b" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M100 0 C100 0, 0 110, 0 170 C0 220, 45 260, 100 260 C155 260, 200 220, 200 170 C200 110, 100 0, 100 0 Z"
                        fill="url(#bloodGradient)"
                      />
                      <text
                        x="100"
                        y="190"
                        textAnchor="middle"
                        fill="white"
                        fontSize="72"
                        fontWeight="900"
                        fontFamily="Inter, sans-serif"
                      >
                        O+
                      </text>
                    </svg>
                  </div>

                  {/* Floating stat 1 */}
                  <div className="absolute top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 animate-bounce [animation-duration:3s]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <FaHeart className="text-red-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Lives Saved</p>
                        <p className="text-sm font-bold text-gray-900">25,000+</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating stat 2 */}
                  <div className="absolute bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 animate-bounce [animation-duration:4s] [animation-delay:1s]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaHospital className="text-blue-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Hospitals</p>
                        <p className="text-sm font-bold text-gray-900">500+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="impact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal direction="up" delay={0}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-red-500 mb-2">
                  <CountUp end={10000} suffix="+" />
                </div>
                <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
                  Donors
                </p>
              </div>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-red-500 mb-2">
                  <CountUp end={500} suffix="+" />
                </div>
                <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
                  Hospitals
                </p>
              </div>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-red-500 mb-2">
                  <CountUp end={25000} suffix="+" />
                </div>
                <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
                  Lives Saved
                </p>
              </div>
            </Reveal>
            <Reveal direction="up" delay={300}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-red-500 mb-2">
                  <CountUp end={50} suffix="+" />
                </div>
                <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
                  Cities
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <p className="text-sm font-bold text-red-600 tracking-[0.3em] uppercase mb-4">
                Features
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                WHY CHOOSE{' '}
                <span className="text-red-600">
                  <TypeWriter text="LIFELINK?" speed={80} cursor={false} />
                </span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                We make blood donation simple, fast, and accessible for everyone.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colors = featureColors[feature.color];
              return (
                <Reveal key={index} direction="up" delay={index * 100}>
                  <div className="group bg-white rounded-2xl border border-gray-100 p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-red-100">
                    <div
                      className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 ${colors.text} text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <p className="text-sm font-bold text-red-600 tracking-[0.3em] uppercase mb-4">
                Simple Process
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                HOW IT{' '}
                <span className="text-red-600">
                  <TypeWriter text="WORKS" speed={100} cursor={false} />
                </span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Three simple steps to save lives
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>

            {steps.map((step, index) => (
              <Reveal key={index} direction="up" delay={index * 200}>
                <div className="text-center relative">
                  <div className="w-24 h-24 bg-white border-4 border-red-600 text-red-600 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl relative z-10 transition-transform duration-300 hover:scale-110">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 max-w-xs mx-auto">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOOD TYPES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                ALL BLOOD TYPES{' '}
                <span className="text-red-600">
                  <TypeWriter text="NEEDED" speed={100} cursor={false} />
                </span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Every blood type is important. Register today and help someone in need.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-4">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type, index) => (
              <Reveal key={type} direction="up" delay={index * 80}>
                <div className="w-28 h-28 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-2xl hover:shadow-red-500/40 cursor-default">
                  {type}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-10 text-[300px]">
            <FaTint />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="up">
            <FaHeart className="text-6xl mx-auto mb-6 text-red-200" />
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              READY TO{' '}
              <TypeWriter text="SAVE A LIFE?" speed={100} cursor={false} />
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-lg mb-10 text-red-100 max-w-xl mx-auto">
              Join thousands of donors and hospitals working together to save lives across India.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <Link
              to="/register"
              className="group inline-flex items-center gap-3 bg-white text-red-600 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <FaTint />
              Register Now
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <FaTint className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold">Lifelink</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Connecting blood donors with hospitals across India to save lives.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-sm tracking-widest uppercase text-gray-400">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/about" className="hover:text-red-400 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-400 transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-red-400 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-red-400 transition">
                    Become a Donor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-sm tracking-widest uppercase text-gray-400">
                Support
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/faq" className="hover:text-red-400 transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-red-400 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-red-400 transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-400 transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-sm tracking-widest uppercase text-gray-400">
                Contact
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <FaPhone className="text-red-500" />
                  <span>1800-123-4567</span>
                </li>
                <li>support@lifelink.in</li>
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>New Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 Lifelink. All rights reserved.</p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-red-500" /> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;