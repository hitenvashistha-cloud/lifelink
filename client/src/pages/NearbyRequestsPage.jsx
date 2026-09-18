import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import MapView from '../components/MapView';
import { useToast } from '../context/ToastContext';
import {
  FaMapMarkerAlt,
  FaTint,
  FaUserInjured,
  FaPhone,
  FaExclamationTriangle,
} from 'react-icons/fa';

function NearbyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [radius, setRadius] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [noLocationSet, setNoLocationSet] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (
      storedUser.location &&
      storedUser.location.coordinates &&
      storedUser.location.coordinates[0] !== 0
    ) {
      const coords = [
        storedUser.location.coordinates[1],
        storedUser.location.coordinates[0],
      ];
      setUserLocation(coords);
      fetchNearbyRequests(coords);
    } else {
      setNoLocationSet(true);
      setLoading(false);
    }
  }, []);

  const fetchNearbyRequests = async (coords, radiusValue = radius) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [lat, lng] = coords;
      const response = await axios.get(
        `/api/requests/nearby?lat=${lat}&lng=${lng}&radius=${radiusValue}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(response.data.requests);
    } catch (err) {
      setError('Failed to load nearby requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (userLocation) fetchNearbyRequests(userLocation, newRadius);
  };

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/requests/${requestId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      if (userLocation) fetchNearbyRequests(userLocation);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept');
    }
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === 'Critical') return 'red';
    if (urgency === 'High') return 'orange';
    return 'yellow';
  };

  const markers = requests
    .filter((r) => r.location && r.location.coordinates[0] !== 0)
    .map((r) => ({
      position: [r.location.coordinates[1], r.location.coordinates[0]],
      title: `${r.hospitalName} - ${r.bloodType}`,
      description: `Patient: ${r.patientName}`,
    }));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Requests Near Me</h1>
            <p className="text-gray-500">Blood requests within your selected radius</p>
          </div>
          {userLocation && (
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <label className="text-sm font-medium text-gray-700">Radius:</label>
              <select
                value={radius}
                onChange={(e) => handleRadiusChange(Number(e.target.value))}
                className="bg-transparent focus:outline-none font-semibold text-red-600"
              >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
              </select>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {noLocationSet ? (
          <EmptyState
            icon={<FaMapMarkerAlt />}
            title="Location Not Set"
            description="Please set your location in your profile to find blood requests near you"
            action={
              <Button variant="primary" onClick={() => navigate('/profile')}>
                Update Profile
              </Button>
            }
          />
        ) : loading ? (
          <Loader text="Finding requests near you..." />
        ) : (
          <>
            {userLocation && (
              <Card className="mb-6 p-0 overflow-hidden">
                <MapView
                  markers={[
                    {
                      position: userLocation,
                      title: 'Your Location',
                      description: 'You are here',
                    },
                    ...markers,
                  ]}
                  center={userLocation}
                  zoom={11}
                  height="400px"
                />
              </Card>
            )}

            {requests.length === 0 ? (
              <EmptyState
                icon={<FaMapMarkerAlt />}
                title="No requests found"
                description={`No blood requests found within ${radius} km of your location`}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
                        <span>Units: <strong>{request.unitsNeeded}</strong></span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>{request.city}, {request.state}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-gray-400" />
                        <span>{request.contactPhone}</span>
                      </p>
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default NearbyRequestsPage;