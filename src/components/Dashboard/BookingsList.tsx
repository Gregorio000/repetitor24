import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Star, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTutors, Tutor } from '../../contexts/TutorContext';
import { useAuth } from '../../contexts/AuthContext';
import { format, isAfter, parseISO } from 'date-fns';

const BookingsList = () => {
  const { user } = useAuth();
  const { bookings, tutors, updateBookingStatus } = useTutors();
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [filter, setFilter] = useState({
    status: 'all',
    subject: 'all',
  });
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  useEffect(() => {
    // Получаем бронирования пользователя
    let filtered = bookings.filter(booking => booking.studentId === user?.id);
    
    // Фильтруем по статусу если нужно
    if (filter.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filter.status);
    }
    
    // Фильтруем по предмету если нужно
    if (filter.subject !== 'all') {
      filtered = filtered.filter(booking => booking.subject === filter.subject);
    }
    
    // Фильтруем в зависимости от активной вкладки
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(booking => 
        isAfter(parseISO(booking.date), now) || 
        (parseISO(booking.date).toDateString() === now.toDateString() && 
        booking.status !== 'completed')
      );
    } else if (activeTab === 'past') {
      filtered = filtered.filter(booking => 
        !isAfter(parseISO(booking.date), now) || booking.status === 'completed'
      );
    }
    
    // Сортируем бронирования: предстоящие сначала, затем по дате
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    
    setUserBookings(filtered);
  }, [bookings, user, activeTab, filter]);
  
  // Получаем уникальные предметы из бронирований
  const subjects = ['all', ...Array.from(new Set(bookings
    .filter(booking => booking.studentId === user?.id)
    .map(booking => booking.subject)
  ))];
  
  const cancelBooking = (bookingId: string) => {
    if (window.confirm('Вы уверены, что хотите отменить это бронирование?')) {
      updateBookingStatus(bookingId, 'cancelled');
    }
  };
  
  const getTutorById = (id: string): Tutor | undefined => {
    return tutors.find(tutor => tutor.id === id);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Мои бронирования</h1>
      
      {/* Вкладки */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'upcoming' 
              ? 'border-primary-600 text-primary-600 font-medium' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Предстоящие
        </button>
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'past' 
              ? 'border-primary-600 text-primary-600 font-medium' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Прошедшие
        </button>
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'all' 
              ? 'border-primary-600 text-primary-600 font-medium' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Все бронирования
        </button>
      </div>
      
      {/* Фильтры */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Фильтровать бронирования</h2>
          <button 
            onClick={() => setShowFilterOptions(!showFilterOptions)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showFilterOptions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        {showFilterOptions && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="statusFilter" className="block text-gray-700 font-medium mb-2">
                Статус
              </label>
              <select
                id="statusFilter"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <option value="all">Все статусы</option>
                <option value="pending">Ожидание</option>
                <option value="confirmed">Подтверждено</option>
                <option value="completed">Завершено</option>
                <option value="cancelled">Отменено</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="subjectFilter" className="block text-gray-700 font-medium mb-2">
                Предмет
              </label>
              <select
                id="subjectFilter"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={filter.subject}
                onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
              >
                <option value="all">Все предметы</option>
                {subjects.filter(s => s !== 'all').map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Список бронирований */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {userBookings.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userBookings.map((booking, index) => {
                const tutor = getTutorById(booking.tutorId);
                
                return (
                  <div key={index} className="py-6 first:pt-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 lg:w-1/5 mb-4 md:mb-0 md:mr-6">
                        <Link to={`/tutors/${tutor?.id}`}>
                          <div className="relative h-32 rounded-lg overflow-hidden">
                            <img 
                              src={tutor?.photo} 
                              alt={tutor?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <div>
                            <Link to={`/tutors/${tutor?.id}`} className="hover:text-primary-600">
                              <h3 className="text-xl font-semibold">{tutor?.name}</h3>
                            </Link>
                            <div className="flex items-center my-1">
                              <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    fill={i < Math.floor(tutor?.rating || 0) ? "currentColor" : "none"} 
                                    className={i < Math.floor(tutor?.rating || 0) ? "" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-700">{tutor?.rating} ({tutor?.reviews} отзывов)</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 md:mt-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status === 'confirmed' && <Check size={14} className="mr-1" />}
                              {booking.status === 'pending' && <Clock size={14} className="mr-1" />}
                              {booking.status === 'cancelled' && <X size={14} className="mr-1" />}
                              {booking.status === 'confirmed' ? 'Подтверждено' : 
                               booking.status === 'pending' ? 'Ожидание' : 
                               booking.status === 'completed' ? 'Завершено' : 
                               'Отменено'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-primary-600 font-medium mb-3">{booking.subject}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="flex items-center text-gray-700">
                            <Calendar size={16} className="text-primary-600 mr-2" />
                            <span>{format(new Date(booking.date), 'EEEE, d MMMM yyyy')}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock size={16} className="text-primary-600 mr-2" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <Link 
                            to={`/tutors/${tutor?.id}`} 
                            className="btn-outline py-2"
                          >
                            Посмотреть репетитора
                          </Link>
                          
                          {booking.status === 'pending' && (
                            <button 
                              onClick={() => cancelBooking(booking.id)} 
                              className="btn-outline py-2 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Отменить бронирование
                            </button>
                          )}
                          
                          {booking.status === 'completed' && (
                            <Link 
                              to={`/tutors/${tutor?.id}?review=true`} 
                              className="btn-outline py-2"
                            >
                              Оставить отзыв
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                {activeTab === 'upcoming' 
                  ? 'У вас нет предстоящих бронирований.' 
                  : activeTab === 'past' 
                    ? 'У вас нет прошедших бронирований.' 
                    : 'У вас пока нет бронирований.'}
              </p>
              <Link to="/tutors" className="btn-primary">
                Найти репетитора
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;