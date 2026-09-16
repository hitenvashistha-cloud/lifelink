import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/common/StatsCard';
import Reveal from '../components/common/Reveal';
import {
  FaPlusCircle,
  FaClipboardList,
  FaBoxes,
  FaHospital,
  FaUser,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartBar,
} from 'react-icons/fa';

function HospitalDashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalRequests: 0,
    openRequests: 0,
    totalInventory: 0,
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
      const headers = { Authorization: `Bearer ${token}` };

      const [requestsRes, inventoryRes] = await Promise.all([
        axios.get('/api/requests', { headers }),
        axios.get('/api/inventory', { headers }),
      ]);

      const requests = requestsRes.data.requests || [];
      const inventory = inventoryRes.data.inventory || [];

      setStats({
        totalRequests: requests.length,
        openRequests: requests.filter((r) => r.status === 'Open').length,
        totalInventory: inventory.reduce((sum, item) => sum + item.unitsAvailable, 0),
      });
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  if (!user) return null;

  const quickActions = [
    {
      title: 'Create Request',
      description: 'Post a new emergency blood request',
      icon: <FaPlusCircle />,
      link: '/create-request',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'My Requests',
      description: 'View all your requests and donors',
      icon: <FaClipboardList />,
      link: '/hospital-requests',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Blood Inventory',
      description: 'Manage your blood stock',
      icon: <FaBoxes />,
      link: '/inventory',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Record Donation',
      description: 'Record a completed donation',
      icon: <FaHospital />,
      link: '/record-donation',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Analytics',
      description: 'View your performance insights',
      icon: <FaChartBar />,
      link: '/hospital-analytics',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Edit Profile',
      description: 'Update hospital details',
      icon: <FaUser />,
      link: '/profile',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hospital Banner */}
        <Reveal direction="up">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
              <FaHospital className="text-9xl" />
            </div>
            <div className="relative">
              <p className="text-red-100 mb-2 text-sm font-medium">Hospital Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {user.hospitalName || user.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                {user.isVerified ? (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg border-2 border-green-400">
                    <FaCheckCircle />
                    <span className="font-semibold">Verified Hospital</span>
                  </div>
                ) : (
                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg border-2 border-yellow-400">
                    <FaExclamationTriangle />
                    <span className="font-semibold">Pending Verification</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Reveal direction="up" delay={100}>
            <StatsCard
              title="Total Requests"
              value={stats.totalRequests}
              icon={<FaClipboardList />}
              color="blue"
            />
          </Reveal>
          <Reveal direction="up" delay={200}>
            <StatsCard
              title="Open Requests"
              value={stats.openRequests}
              icon={<FaPlusCircle />}
              color="orange"
            />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <StatsCard
              title="Total Inventory"
              value={stats.totalInventory}
              subtitle="units available"
              icon={<FaBoxes />}
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

export default HospitalDashboardPage;