import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import {
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from 'react-icons/fa';

function ViewCampsPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/camps/upcoming', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCamps(response.data.camps);
    } catch (err) {
      setError('Failed to load camps');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Ongoing') return 'green';
    if (status === 'Upcoming') return 'blue';
    if (status === 'Cancelled') return 'red';
    return 'gray';
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Blood Donation Camps</h1>
          <p className="text-gray-500">Find and participate in upcoming blood donation camps</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading camps..." />
        ) : camps.length === 0 ? (
          <EmptyState
            icon={<FaMapMarkedAlt />}
            title="No upcoming camps"
            description="There are no upcoming blood donation camps at the moment"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => (
              <Card key={camp._id} hover className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                    <FaMapMarkedAlt />
                  </div>
                  <Badge color={getStatusColor(camp.status)}>{camp.status}</Badge>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  {camp.name}
                </h3>
                {camp.organizer && (
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    {camp.organizer}
                  </p>
                )}

                <div className="space-y-2 mb-4 flex-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-500" />
                    {new Date(camp.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    {camp.startTime} - {camp.endTime}
                  </p>
                  <p className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-gray-400 mt-1" />
                    <span>
                      {camp.address}
                      <br />
                      <span className="text-xs text-gray-400">
                        {camp.city}, {camp.state} - {camp.pincode}
                      </span>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    {camp.contactPhone}
                  </p>
                </div>

                {camp.description && (
                  <p className="text-xs text-gray-500 italic border-t pt-3 mt-2">
                    {camp.description}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ViewCampsPage;