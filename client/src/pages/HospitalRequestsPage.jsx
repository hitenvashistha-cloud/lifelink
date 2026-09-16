import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaUserInjured,
  FaUsers,
  FaPlusCircle,
} from 'react-icons/fa';

function HospitalRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { socket } = useSocket();

  useEffect(() => {
    fetchRequests();
  }, []);

  // Real-time: Refresh when donor accepts
  useEffect(() => {
    if (!socket) return;

    const handleAccepted = () => {
      fetchRequests();
    };

    socket.on('request:accepted', handleAccepted);

    return () => {
      socket.off('request:accepted', handleAccepted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleUpdateStatus = async (requestId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/requests/${requestId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Status updated');
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update');
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Requests</h1>
            <p className="text-gray-500">View all requests and accepted donors</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/create-request')}>
            <FaPlusCircle /> New Request
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading requests..." />
        ) : requests.length === 0 ? (
          <EmptyState
            icon={<FaClipboardList />}
            title="No requests yet"
            description="Create your first blood request to get donors"
            action={
              <Button variant="primary" onClick={() => navigate('/create-request')}>
                <FaPlusCircle /> Create Request
              </Button>
            }
          />
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <Card key={request._id}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
                      {request.bloodType}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        Patient: {request.patientName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Created on {new Date(request.createdAt).toLocaleDateString('en-IN')}
                      </p>
                      <Badge color={getStatusColor(request.status)}>
                        {request.status}
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
                    <FaUserInjured className="text-gray-400" />
                    <span>Urgency: <strong>{request.urgency}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{request.city}, {request.state}</span>
                  </div>
                </div>

                {/* Accepted Donors */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <FaUsers className="text-blue-500" />
                    Accepted Donors ({request.acceptedDonors.length}/{request.unitsNeeded})
                  </h4>
                  {request.acceptedDonors.length === 0 ? (
                    <p className="text-sm text-gray-500">No donors have accepted yet</p>
                  ) : (
                    <div className="space-y-2">
                      {request.acceptedDonors.map((donor, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-3 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {donor.donorName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">
                                {donor.donorName}
                              </p>
                              <p className="text-xs text-gray-500">{donor.donorPhone}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400">
                            {new Date(donor.acceptedAt).toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Actions */}
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Update Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Open', 'In Progress', 'Fulfilled', 'Closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(request._id, status)}
                        disabled={request.status === status}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          request.status === status
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
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

export default HospitalRequestsPage;