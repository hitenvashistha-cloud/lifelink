import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import StatsCard from '../components/common/StatsCard';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import {
  FaHeart,
  FaTint,
  FaCalendarAlt,
  FaHospital,
  FaHistory,
} from 'react-icons/fa';

function DonationHistoryPage() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [donationsRes, statsRes] = await Promise.all([
        axios.get('/api/donations', { headers }),
        axios.get('/api/donations/stats', { headers }),
      ]);

      setDonations(donationsRes.data.donations);
      setStats(statsRes.data.stats);
    } catch (err) {
      setError('Failed to load donation history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Donation History</h1>
          <p className="text-gray-500">Your complete donation records</p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Donations"
              value={stats.totalDonations}
              icon={<FaHeart />}
              color="red"
            />
            <StatsCard
              title="Total Units"
              value={stats.totalUnits}
              icon={<FaTint />}
              color="blue"
            />
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
              icon={<FaCalendarAlt />}
              color="green"
            />
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading history..." />
        ) : donations.length === 0 ? (
          <EmptyState
            icon={<FaHistory />}
            title="No donations yet"
            description="Your donation records will appear here once you donate blood"
          />
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation._id} hover>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                      {donation.bloodType}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FaHospital className="text-gray-400 text-sm" />
                        <p className="font-semibold text-gray-800">
                          {donation.hospitalName}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {donation.units} unit{donation.units > 1 ? 's' : ''} donated
                      </p>
                      {donation.notes && (
                        <p className="text-xs text-gray-400 italic mt-1">
                          {donation.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge color="green">{donation.status}</Badge>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt />
                      {new Date(donation.donationDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DonationHistoryPage;