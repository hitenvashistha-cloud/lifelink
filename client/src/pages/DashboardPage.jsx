import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/common/StatsCard';
import Card from '../components/common/Card';
import Reveal from '../components/common/Reveal';
import CountUp from '../components/common/CountUp';
import {
  FaClipboardList,
  FaMapMarkerAlt,
  FaHistory,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaTint,
  FaHeart,
  FaAward,
  FaUser,
  FaArrowRight,
} from 'react-icons/fa';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalUnits: 0,
    lastDonationDate: null,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);

    if (storedUser.id) {
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/donations/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.stats);
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  if (!user) return null;

  const quickActions = [
    {
      title: 'All Requests',
      description: 'View all open blood requests',
      icon: <FaClipboardList />,
      link: '/view-requests',
      color: 'red',
    },
    {
      title: 'Requests Near Me',
      description: 'Find requests near your location',
      icon: <FaMapMarkerAlt />,
      link: '/nearby-requests',
      color: 'orange',
    },
    {
      title: 'My Donations',
      description: 'Requests you have accepted',
      icon: <FaHistory />,
      link: '/my-donations',
      color: 'blue',
    },
    {
      title: 'Donation History',
      description: 'Your donation records',
      icon: <FaCalendarAlt />,
      link: '/donation-history',
      color: 'purple',
    },
    {
      title: 'Blood Camps',
      description: 'Upcoming donation camps',
      icon: <FaMapMarkedAlt />,
      link: '/view-camps',
      color: 'green',
    },
    {
      title: 'My Impact',
      description: 'See your analytics and badge',
      icon: <FaAward />,
      link: '/donor-analytics',
      color: 'indigo',
    },
  ];

  const colorMap = {
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <Reveal direction="up">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
              <FaTint className="text-9xl" />
            </div>
            <div className="relative">
              <p className="text-red-100 mb-2 text-sm font-medium">Welcome back,</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{user.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                  <FaTint />
                  <span>
                    Blood Type: <strong>{user.bloodType || 'Not set'}</strong>
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span>
                    {user.city || 'Location not set'}
                    {user.state ? `, ${user.state}` : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Reveal direction="up" delay={100}>
            <StatsCard
              title="Total Donations"
              value={stats.totalDonations}
              icon={<FaHeart />}
              color="red"
            />
          </Reveal>
          <Reveal direction="up" delay={200}>
            <StatsCard
              title="Total Units"
              value={stats.totalUnits}
              icon={<FaTint />}
              color="blue"
            />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <StatsCard
              title="Last Donation"
              value={
                stats.lastDonationDate
                  ? new Date(stats.lastDonationDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'N/A'
              }
              icon={<FaAward />}
              color="green"
            />
          </Reveal>
        </div>

        {/* Quick Actions */}
        <Reveal direction="up" delay={400}>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Reveal key={index} direction="up" delay={500 + index * 80}>
              <Link to={action.link} className="group block h-full">
                <div className="bg-white rounded-xl border border-gray-100 p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-100">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[action.color]} flex items-center justify-center text-white text-xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      {action.icon}
                    </div>
                    <FaArrowRight className="text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;