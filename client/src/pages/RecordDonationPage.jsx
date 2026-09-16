import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FaHospital, FaUserCheck } from 'react-icons/fa';

function RecordDonationPage() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedDonor, setSelectedDonor] = useState('');
  const [units, setUnits] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data.requests);
    } catch (err) {
      setError('Failed to load requests');
    }
  };

  const selectedRequestData = requests.find((r) => r._id === selectedRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedDonor) {
      setError('Please select a donor');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/donations',
        {
          donorId: selectedDonor,
          requestId: selectedRequest || null,
          units: Number(units),
          notes,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Donation recorded successfully');
      navigate('/hospital-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Record Donation</h1>
          <p className="text-gray-500">Record a blood donation for a donor</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Request (Optional)
              </label>
              <select
                value={selectedRequest}
                onChange={(e) => {
                  setSelectedRequest(e.target.value);
                  setSelectedDonor('');
                }}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">No request (direct donation)</option>
                {requests.map((request) => (
                  <option key={request._id} value={request._id}>
                    {request.bloodType} - {request.patientName} ({request.status})
                  </option>
                ))}
              </select>
            </div>

            {selectedRequestData && selectedRequestData.acceptedDonors.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Donor *
                </label>
                <select
                  value={selectedDonor}
                  onChange={(e) => setSelectedDonor(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select donor</option>
                  {selectedRequestData.acceptedDonors.map((donor) => (
                    <option key={donor.donor} value={donor.donor}>
                      {donor.donorName} - {donor.donorPhone}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedRequest && (!selectedRequestData || selectedRequestData.acceptedDonors.length === 0) && (
              <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg mb-4 text-sm">
                No donors have accepted this request yet.
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units Donated *
              </label>
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Any additional notes"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/hospital-dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading} fullWidth>
                <FaUserCheck />
                {loading ? 'Recording...' : 'Record Donation'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default RecordDonationPage;