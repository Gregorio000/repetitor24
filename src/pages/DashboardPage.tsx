import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, CreditCard, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardHome from '../components/Dashboard/DashboardHome';
import BookingsList from '../components/Dashboard/BookingsList';
import PaymentHistory from '../components/Dashboard/PaymentHistory';
import Profile from '../components/Dashboard/Profile';

const DashboardPage = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Закрыть мобильное меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Перенаправление на страницу входа, если не аутентифицирован
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Переключатель мобильного меню */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Панель управления</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Боковая панель */}
        <motion.div
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block lg:w-1/4 xl:w-1/5`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            {/* Информация о пользователе */}
            <div className="p-6 bg-primary-50 border-b border-primary-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 mr-4">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <BookOpen size={20} className="mr-3" />
                    <span>Обзор</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/bookings"
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Calendar size={20} className="mr-3" />
                    <span>Мои бронирования</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/payments"
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <CreditCard size={20} className="mr-3" />
                    <span>История платежей</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <User size={20} className="mr-3" />
                    <span>Мой профиль</span>
                  </NavLink>
                </li>
              </ul>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <button
                  onClick={logout}
                  className="flex items-center p-3 rounded-lg w-full text-left text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={20} className="mr-3" />
                  <span>Выйти</span>
                </button>
              </div>
            </nav>
          </div>
        </motion.div>

        {/* Основное содержимое */}
        <motion.div
          className="lg:w-3/4 xl:w-4/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="bookings" element={<BookingsList />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;