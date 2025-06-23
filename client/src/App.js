import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import HotelBookingPage from './pages/HotelBookingPage';
import HotelAdminDashboard from './pages/HotelAdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/register' element={<SignupPage />} />
        <Route path="/hotel/:id/book" element={<HotelBookingPage />} />

        <Route path="/hoteladmin/dashboard" element={<HotelAdminDashboard />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}
export default App;