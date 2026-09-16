import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HospitalRegisterPage from './pages/HospitalRegisterPage';
import HospitalDashboardPage from './pages/HospitalDashboardPage';
import CreateRequestPage from './pages/CreateRequestPage';
import ViewRequestsPage from './pages/ViewRequestsPage';
import NearbyRequestsPage from './pages/NearbyRequestsPage';
import HospitalRequestsPage from './pages/HospitalRequestsPage';
import MyDonationsPage from './pages/MyDonationsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import InventoryPage from './pages/InventoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminHospitalsPage from './pages/AdminHospitalsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import ProfilePage from './pages/ProfilePage';
import DonationHistoryPage from './pages/DonationHistoryPage';
import RecordDonationPage from './pages/RecordDonationPage';
import CreateCampPage from './pages/CreateCampPage';
import ViewCampsPage from './pages/ViewCampsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import HospitalAnalyticsPage from './pages/HospitalAnalyticsPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import DonorAnalyticsPage from './pages/DonorAnalyticsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/hospital-register" element={<HospitalRegisterPage />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboardPage />} />
        <Route path="/create-request" element={<CreateRequestPage />} />
        <Route path="/view-requests" element={<ViewRequestsPage />} />
        <Route path="/nearby-requests" element={<NearbyRequestsPage />} />
        <Route path="/hospital-requests" element={<HospitalRequestsPage />} />
        <Route path="/my-donations" element={<MyDonationsPage />} />
        <Route path="/donation-history" element={<DonationHistoryPage />} />
        <Route path="/record-donation" element={<RecordDonationPage />} />
        <Route path="/create-camp" element={<CreateCampPage />} />
        <Route path="/view-camps" element={<ViewCampsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-hospitals" element={<AdminHospitalsPage />} />
        <Route path="/admin-users" element={<AdminUsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/hospital-analytics" element={<HospitalAnalyticsPage />} />
        <Route path="/admin-analytics" element={<AdminAnalyticsPage />} />
        <Route path="/donor-analytics" element={<DonorAnalyticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;