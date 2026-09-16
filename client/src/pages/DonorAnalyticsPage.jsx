import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/common/StatsCard';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import {
  FaHeart,
  FaTint,
  FaClipboardCheck,
  FaAward,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function DonorAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/analytics/donor', {
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
        <Loader text="Loading your analytics..." />
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

  const monthlyData = MONTHS.map((month, index) => {
    const found = analytics.monthlyDonations.find((m) => m._id.month === index + 1);
    return {
      month,
      donations: found ? found.count : 0,
    };
  }).slice(-6);

  const livesSaved = analytics.totalUnits * 3;

  // Badge calculation
  const getBadge = () => {
    const count = analytics.totalDonations;
    if (count >= 20) return { name: 'Platinum', color: 'text-gray-700', bg: 'bg-gray-200' };
    if (count >= 10) return { name: 'Gold', color: 'text-yellow-700', bg: 'bg-yellow-200' };
    if (count >= 5) return { name: 'Silver', color: 'text-gray-600', bg: 'bg-gray-200' };
    if (count >= 1) return { name: 'Bronze', color: 'text-orange-700', bg: 'bg-orange-200' };
    return { name: 'Beginner', color: 'text-gray-500', bg: 'bg-gray-100' };
  };

  const badge = getBadge();

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Impact</h1>
          <p className="text-gray-500">See how your donations are saving lives</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Donations"
            value={analytics.totalDonations}
            icon={<FaHeart />}
            color="red"
          />
          <StatsCard
            title="Units Donated"
            value={analytics.totalUnits}
            icon={<FaTint />}
            color="blue"
          />
          <StatsCard
            title="Requests Accepted"
            value={analytics.acceptedRequests}
            icon={<FaClipboardCheck />}
            color="purple"
          />
          <StatsCard
            title="Lives Saved"
            value={livesSaved}
            subtitle="Each unit saves up to 3 lives"
            icon={<FaAward />}
            color="green"
          />
        </div>

        {/* Badge Card */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-24 h-24 ${badge.bg} rounded-2xl flex items-center justify-center shadow-md`}>
              <FaAward className={`text-4xl ${badge.color}`} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm text-gray-500 font-medium mb-1">Your Current Badge</p>
              <h2 className={`text-3xl font-bold ${badge.color} mb-2`}>
                {badge.name} Donor
              </h2>
              <p className="text-gray-600">
                {analytics.totalDonations >= 20
                  ? 'Amazing! You are a true hero.'
                  : `Donate ${
                      analytics.totalDonations >= 10
                        ? 20 - analytics.totalDonations
                        : analytics.totalDonations >= 5
                        ? 10 - analytics.totalDonations
                        : analytics.totalDonations >= 1
                        ? 5 - analytics.totalDonations
                        : 1
                    } more time(s) to reach the next badge level.`}
              </p>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Donation Trend (Last 6 Months)</h3>
            {analytics.monthlyDonations.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No donations in the last 6 months
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#dc2626"
                    strokeWidth={3}
                    dot={{ fill: '#dc2626', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Donations</h3>
            {analytics.monthlyDonations.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No donations in the last 6 months
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="donations" fill="#dc2626" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DonorAnalyticsPage;