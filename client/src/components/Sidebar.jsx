import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaClipboardList,
  FaMapMarkerAlt,
  FaHistory,
  FaAward,
  FaUser,
  FaHospital,
  FaPlusCircle,
  FaBoxes,
  FaUsers,
  FaMapMarkedAlt,
  FaChartBar,
  FaCalendarAlt,
} from 'react-icons/fa';

function Sidebar({ role = 'donor' }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const donorMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/view-requests', label: 'All Requests', icon: <FaClipboardList /> },
    { path: '/nearby-requests', label: 'Near Me', icon: <FaMapMarkerAlt /> },
    { path: '/my-donations', label: 'My Donations', icon: <FaHistory /> },
    { path: '/donation-history', label: 'History', icon: <FaCalendarAlt /> },
    { path: '/donor-analytics', label: 'My Impact', icon: <FaChartBar /> },
    { path: '/view-camps', label: 'Blood Camps', icon: <FaMapMarkedAlt /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  const hospitalMenu = [
    { path: '/hospital-dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/create-request', label: 'Create Request', icon: <FaPlusCircle /> },
    { path: '/hospital-requests', label: 'My Requests', icon: <FaClipboardList /> },
    { path: '/inventory', label: 'Inventory', icon: <FaBoxes /> },
    { path: '/record-donation', label: 'Record Donation', icon: <FaHospital /> },
    { path: '/hospital-analytics', label: 'Analytics', icon: <FaChartBar /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  const adminMenu = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin-hospitals', label: 'Hospitals', icon: <FaHospital /> },
    { path: '/admin-users', label: 'Users', icon: <FaUsers /> },
    { path: '/admin-analytics', label: 'Analytics', icon: <FaChartBar /> },
    { path: '/create-camp', label: 'Create Camp', icon: <FaCalendarAlt /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  const menu =
    role === 'admin' ? adminMenu : role === 'hospital' ? hospitalMenu : donorMenu;

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Menu
        </p>
        <nav className="space-y-1">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 font-semibold shadow-sm border-l-4 border-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-red-600 hover:translate-x-0.5'
              }`}
            >
              <span
                className={
                  isActive(item.path) ? 'text-red-600' : 'text-gray-400'
                }
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;