import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/common/StatsCard';
import Reveal from '../components/common/Reveal';
import {
  FaUsers,
  FaHospital,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaPlusCircle,
  FaArrowRight,
  FaUserShield,
  FaCalendarAlt,
  FaChartBar,
} from 'react-icons/fa';

function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/stats', {
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
      title: 'Manage Hospitals',
      description: 'View and approve hospital registrations',
      icon: <FaHospital />,
      link: '/admin-hospitals',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Manage Users',
      description: 'View all donors and hospitals',
      icon: <FaUsers />,
      link: '/admin-users',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Analytics',
      description: 'Platform insights and growth',
      icon: <FaChartBar />,
      link: '/admin-analytics',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Create Blood Camp',
      description: 'Organize a new donation camp',
      icon: <FaCalendarAlt />,
      link: '/create-camp',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'My Profile',
      description: 'Edit your admin details',
      icon: <FaUserShield />,
      link: '/profile',
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Admin Banner */}
        <Reveal direction="up">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
              <FaUserShield className="text-9xl" />
            </div>
            <div className="relative">
              <p className="text-gray-300 mb-2 text-sm font-medium">Admin Control Panel</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-300">Manage the Lifelink platform</p>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Reveal direction="up" delay={100}>
              <StatsCard
                title="Donors"
                value={stats.totalDonors}
                icon={<FaUsers />}
                color="red"
              />
            </Reveal>
            <Reveal direction="up" delay={150}>
              <StatsCard
                title="Hospitals"
                value={stats.totalHospitals}
                icon={<FaHospital />}
                color="blue"
              />
            </Reveal>
            <Reveal direction="up" delay={200}>
              <StatsCard
                title="Pending"
                value={stats.pendingHospitals}
                icon={<FaClock />}
                color="yellow"
              />
            </Reveal>
            <Reveal direction="up" delay={250}>
              <StatsCard
                title="Requests"
                value={stats.totalRequests}
                icon={<FaClipboardList />}
                color="purple"
              />
            </Reveal>
            <Reveal direction="up" delay={300}>
              <StatsCard
                title="Open"
                value={stats.openRequests}
                icon={<FaPlusCircle />}
                color="orange"
              />
            </Reveal>
            <Reveal direction="up" delay={350}>
              <StatsCard
                title="Fulfilled"
                value={stats.fulfilledRequests}
                icon={<FaCheckCircle />}
                color="green"
              />
            </Reveal>
          </div>
        )}

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
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white text-xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
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

export default AdminDashboardPage;