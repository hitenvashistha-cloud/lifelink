import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/common/StatsCard';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import {
  FaClipboardList,
  FaHeart,
  FaUsers,
  FaCheckCircle,
  FaTint,
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
const COLORS = ['#dc2626', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
const STATUS_COLORS = {
  Open: '#f59e0b',
  'In Progress': '#3b82f6',
  Fulfilled: '#10b981',
  Closed: '#6b7280',
};
const URGENCY_COLORS = {
  Critical: '#dc2626',
  High: '#f97316',
  Medium: '#f59e0b',
};

function HospitalAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/analytics/hospital', {
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

  // Format monthly requests data
  const monthlyData = MONTHS.map((month, index) => {
    const found = analytics.monthlyRequests.find((m) => m._id.month === index + 1);
    return {
      month,
      requests: found ? found.count : 0,
    };
  }).slice(-6);

  // Format requests by status
  const statusData = analytics.requestsByStatus.map((s) => ({
    name: s._id,
    value: s.count,
    color: STATUS_COLORS[s._id] || '#6b7280',
  }));

  // Format requests by urgency
  const urgencyData = analytics.requestsByUrgency.map((u) => ({
    name: u._id,
    value: u.count,
    color: URGENCY_COLORS[u._id] || '#6b7280',
  }));

  // Format requests by blood type
  const bloodTypeData = analytics.requestsByBloodType.map((b) => ({
    bloodType: b._id,
    count: b.count,
  }));

  // Format inventory data
  const inventoryData = analytics.inventory.map((i) => ({
    bloodType: i.bloodType,
    units: i.unitsAvailable,
  }));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-500">Insights and performance metrics for your hospital</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Requests"
            value={analytics.totalRequests}
            icon={<FaClipboardList />}
            color="blue"
          />
          <StatsCard
            title="Total Donations"
            value={analytics.totalDonations}
            icon={<FaHeart />}
            color="red"
          />
          <StatsCard
            title="Accepted Donors"
            value={analytics.totalAcceptedDonors}
            icon={<FaUsers />}
            color="purple"
          />
          <StatsCard
            title="Fulfillment Rate"
            value={`${analytics.fulfillmentRate}%`}
            icon={<FaCheckCircle />}
            color="green"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Requests Line Chart */}
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Requests (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
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
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Request Status Pie Chart */}
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Request Status Breakdown</h3>
            {statusData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Requests by Blood Type Bar Chart */}
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Requests by Blood Type</h3>
            {bloodTypeData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bloodTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="bloodType" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#dc2626" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Urgency Distribution */}
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Urgency Distribution</h3>
            {urgencyData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={urgencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {urgencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>

        {/* Inventory Chart */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaTint className="text-red-500" /> Current Blood Inventory
            </h3>
            {inventoryData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No inventory data. Add blood stock to see analytics.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="bloodType" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="units" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HospitalAnalyticsPage;