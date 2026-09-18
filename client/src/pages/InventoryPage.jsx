import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import { useToast } from '../context/ToastContext';
import {
  FaBoxes,
  FaPlus,
  FaTimes,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bloodType: '',
    unitsAvailable: '',
    expiryDate: '',
  });
  const toast = useToast();
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventory(response.data.inventory);
    } catch (err) {
      setError('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/inventory', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Stock saved successfully');
      setShowForm(false);
      setFormData({ bloodType: '', unitsAvailable: '', expiryDate: '' });
      fetchInventory();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blood type from inventory?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInventory();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const getStockBadge = (units) => {
    if (units === 0) return <Badge color="red">Empty</Badge>;
    if (units <= 5) return <Badge color="yellow">Low</Badge>;
    return <Badge color="green">Available</Badge>;
  };

  const totalUnits = inventory.reduce((sum, item) => sum + item.unitsAvailable, 0);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Blood Inventory</h1>
            <p className="text-gray-500">Total {totalUnits} units across all blood types</p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <FaTimes /> Cancel
              </>
            ) : (
              <>
                <FaPlus /> Add Stock
              </>
            )}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <h2 className="text-lg font-bold mb-4">Add / Update Blood Stock</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select</option>
                    {bloodTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Units</label>
                  <input
                    type="number"
                    name="unitsAvailable"
                    value={formData.unitsAvailable}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="mt-4">
                Save Stock
              </Button>
            </form>
          </Card>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <Loader text="Loading inventory..." />
        ) : inventory.length === 0 ? (
          <EmptyState
            icon={<FaBoxes />}
            title="No inventory added"
            description="Start by adding blood stock to your inventory"
            action={
              <Button variant="primary" onClick={() => setShowForm(true)}>
                <FaPlus /> Add First Stock
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inventory.map((item) => (
              <Card key={item._id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {item.bloodType}
                  </div>
                  {getStockBadge(item.unitsAvailable)}
                </div>

                <p className="text-3xl font-bold text-gray-800 mb-1">
                  {item.unitsAvailable}
                </p>
                <p className="text-sm text-gray-500 mb-4">units available</p>

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  {item.expiryDate && (
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt />
                      Expires: {new Date(item.expiryDate).toLocaleDateString('en-IN')}
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <FaClock />
                    Updated: {new Date(item.lastUpdated).toLocaleDateString('en-IN')}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition text-sm font-semibold"
                >
                  <FaTrash /> Delete
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default InventoryPage;