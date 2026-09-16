import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import {
  FaClipboardList,
  FaTint,
  FaMapMarkerAlt,
  FaPhone,
  FaUserInjured,
  FaExclamationTriangle,
} from 'react-icons/fa';

function ViewRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { socket } = useSocket();

  useEffect(() => {
    fetchRequests();
  }, []);

  // Real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleNewRequest = (newRequest) => {
      setRequests((prev) => {
        if (prev.find((r) => r._id === newRequest._id)) return prev;
        return [newRequest, ...prev];
      });
    };

    const handleUpdatedRequest = (updatedRequest) => {
      setRequests((prev) =>
        prev
          .map((r) => (r._id === updatedRequest._id ? updatedRequest : r))
          .filter((r) => r.status === 'Open')
      );
    };

    socket.on('request:new', handleNewRequest);
    socket.on('request:updated', handleUpdatedRequest);

    return () => {
      socket.off('request:new', handleNewRequest);
      socket.off('request:updated', handleUpdatedRequest);
    };
  }, [socket]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data.requests);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/requests/${requestId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept request');
    }
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === 'Critical') return 'red';
    if (urgency === 'High') return 'orange';
    return 'yellow';
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Blood Requests</h1>
          <p className="text-gray-500">View and accept emergency blood requests</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading requests..." />
        ) : requests.length === 0 ? (
          <EmptyState
            icon={<FaClipboardList />}
            title="No active requests"
            description="There are no blood requests at the moment. Check back later."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Card key={request._id} hover className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {request.bloodType}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">
                        {request.hospitalName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <Badge color={getUrgencyColor(request.urgency)}>
                    <FaExclamationTriangle className="text-xs" />
                    {request.urgency}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4 flex-1 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaUserInjured className="text-gray-400" />
                    <span>Patient: <strong>{request.patientName}</strong></span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaTint className="text-red-500" />
                    <span>Units needed: <strong>{request.unitsNeeded}</strong></span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{request.city}, {request.state}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-gray-400" />
                    <span>{request.contactPhone}</span>
                  </p>
                  {request.notes && (
                    <p className="text-xs text-gray-500 italic mt-2">
                      Note: {request.notes}
                    </p>
                  )}
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleAccept(request._id)}
                >
                  Accept Request
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ViewRequestsPage;