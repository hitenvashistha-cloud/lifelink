import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/common/StatsCard';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import {
  FaUsers,
  FaHospital,
  FaClipboardList,
  FaHeart,
  FaTint,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const BLOOD_COLORS = ['#dc2626', '#ef4444', '#f97316', '#f59e0b', '#10b981', '#22c55e', '#3b82f6', '#8b5cf6'];

function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/analytics/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data.analytics);
    } catch (err) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader text="Loading analytics..." />
      </DashboardLayout>
    );
  }

  if (error || !analytics) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  const monthlyUsersData = MONTHS.map((month, index) => {
    const found = analytics.monthlyUsers.find((m) => m._id.month === index + 1);
    return {
      month,
      users: found ? found.count : 0,
    };
  }).slice(-6);

  const monthlyRequestsData = MONTHS.map((month, index) => {
    const found = analytics.monthlyRequests.find((m) => m._id.month === index + 1);
    return {
      month,
      requests: found ? found.count : 0,
    };
  }).slice(-6);

  const bloodTypeData = analytics.bloodTypeDistribution.map((b) => ({
    name: b._id,
    value: b.count,
  }));

  const cityData = analytics.cityDistribution.map((c) => ({
    city: c._id,
    donors: c.count,
  }));

  const statusData = analytics.requestsByStatus.map((s) => ({
    name: s._id,
    value: s.count,
  }));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Platform Analytics</h1>
          <p className="text-gray-500">Overview of Lifelink's growth and activity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Donors"
            value={analytics.totalDonors}
            icon={<FaUsers />}
            color="red"
          />
          <StatsCard
            title="Total Hospitals"
            value={analytics.totalHospitals}
            icon={<FaHospital />}
            color="blue"
          />
          <StatsCard
            title="Total Requests"
            value={analytics.totalRequests}
            icon={<FaClipboardList />}
            color="purple"
          />
          <StatsCard
            title="Total Donations"
            value={analytics.totalDonations}
            icon={<FaHeart />}
            color="green"
          />
        </div>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">User Growth (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyUsersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Requests (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRequestsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ fill: '#dc2626', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaTint className="text-red-500" /> Donor Blood Type Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bloodTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {bloodTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLOOD_COLORS[index % BLOOD_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Request Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLOOD_COLORS[index % BLOOD_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* City Distribution */}
        <Card>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> Top Cities by Donors
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="donors" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default AdminAnalyticsPage;