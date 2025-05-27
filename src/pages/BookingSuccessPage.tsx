import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingSuccessPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Бронирование подтверждено!</h2>
        <p className="text-gray-600 mb-6">
          Ваше занятие успешно забронировано. 
        </p>
        <div className="flex flex-col space-y-3">
          <Link
            to="/tutors"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Найти ещё репетиторов
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;