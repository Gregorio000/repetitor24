import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTutors } from '../contexts/TutorContext';
import BookingForm from '../components/Booking/BookingForm';

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getTutorById } = useTutors();
  const tutor = getTutorById(id || '');
  const navigate = useNavigate();
  const location = useLocation();

  if (!tutor) {
    navigate('/tutors');
    return null;
  }

  const handleBookingSuccess = () => {
    navigate('/booking-success');
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Забронировать занятие с {tutor.name}</h1>
          <BookingForm 
            tutor={tutor} 
            onSuccess={handleBookingSuccess}
            showCloseButton={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;