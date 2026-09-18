import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import { useToast } from '../context/ToastContext';
import { FaHospital, FaCheckCircle, FaClock, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function AdminHospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/hospitals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(response.data.hospitals);
    } catch (err) {
      setError('Failed to load hospitals');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/hospitals/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Hospital approved successfully');
      fetchHospitals();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to approve');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hospital Management</h1>
          <p className="text-gray-500">View and approve hospital registrations</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading hospitals..." />
        ) : hospitals.length === 0 ? (
          <EmptyState
            icon={<FaHospital />}
            title="No hospitals yet"
            description="Hospitals will appear here once they register"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hospitals.map((hospital) => (
              <Card key={hospital._id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
                      <FaHospital />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{hospital.hospitalName}</h3>
                      <p className="text-sm text-gray-500">{hospital.hospitalType}</p>
                    </div>
                  </div>
                  {hospital.isVerified ? (
                    <Badge color="green">
                      <FaCheckCircle /> Verified
                    </Badge>
                  ) : (
                    <Badge color="yellow">
                      <FaClock /> Pending
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" /> {hospital.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" /> {hospital.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {hospital.city}, {hospital.state}
                  </p>
                  {hospital.licenseNumber && (
                    <p className="text-xs text-gray-400">License: {hospital.licenseNumber}</p>
                  )}
                </div>

                {!hospital.isVerified && (
                  <Button
                    variant="success"
                    fullWidth
                    onClick={() => handleApprove(hospital._id)}
                  >
                    <FaCheckCircle /> Approve Hospital
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminHospitalsPage;