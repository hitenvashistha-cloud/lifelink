import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import {
  FaHeart,
  FaTint,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
} from 'react-icons/fa';

function MyDonationsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = JSON.parse(localStorage.getItem('user')).id;
      const myDonations = response.data.requests.filter((request) =>
        request.acceptedDonors.some((donor) => donor.donor === userId)
      );

      setRequests(myDonations);
    } catch (err) {
      setError('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Fulfilled') return 'green';
    if (status === 'In Progress') return 'blue';
    if (status === 'Closed') return 'gray';
    return 'yellow';
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Donations</h1>
          <p className="text-gray-500">Blood requests you have accepted</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading donations..." />
        ) : requests.length === 0 ? (
          <EmptyState
            icon={<FaHeart />}
            title="No donations yet"
            description="You have not accepted any blood requests yet. Start saving lives today!"
            action={
              <Button variant="primary" onClick={() => navigate('/view-requests')}>
                View Requests
              </Button>
            }
          />
        ) : (
          <div className="space-y-6">
            {requests.map((request) => {
              const userId = JSON.parse(localStorage.getItem('user')).id;
              const myAcceptance = request.acceptedDonors.find(
                (d) => d.donor === userId
              );

              return (
                <Card key={request._id} hover>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
                        {request.bloodType}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {request.hospitalName}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Patient: {request.patientName}
                        </p>
                        <Badge color={getStatusColor(request.status)}>
                          <FaCheckCircle className="text-xs" /> {request.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaTint className="text-red-500" />
                      <span>Units: <strong>{request.unitsNeeded}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{request.city}, {request.state}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaPhone className="text-gray-400" />
                      <span>{request.contactPhone}</span>
                    </div>
                  </div>

                  {myAcceptance && (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3">
                      <FaCheckCircle className="text-green-600 text-xl" />
                      <div>
                        <p className="text-green-700 font-semibold text-sm">
                          You accepted this request
                        </p>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <FaCalendarAlt />
                          {new Date(myAcceptance.acceptedAt).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyDonationsPage;