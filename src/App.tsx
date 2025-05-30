import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import TutorsPage from './pages/TutorsPage';
import TutorDetailPage from './pages/TutorDetailPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import InstructionPage from './pages/InstructionPage';
import BookingPage from './pages/BookingPage';
import BookingSuccessPage from './pages/BookingSuccessPage';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tutors" element={<TutorsPage />} />
          <Route path="tutors/:id/book" element={<BookingPage />} />
          <Route path="tutors/:id" element={<TutorDetailPage />} />
          <Route path="dashboard/*" element={<DashboardPage />} />
          <Route path="instruction/*" element={<InstructionPage />} />
          <Route path="booking-success" element={<BookingSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
