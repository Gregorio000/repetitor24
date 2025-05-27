import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTutors, Tutor } from '../../contexts/TutorContext';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

const DashboardHome = () => {
  const { user } = useAuth();
  const { bookings, tutors } = useTutors();
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [recentTutors, setRecentTutors] = useState<Tutor[]>([]);
  
  useEffect(() => {
    // Получаем бронирования пользователя и сортируем по дате (ближайшие сначала)
    const userBookings = bookings
      .filter(booking => booking.studentId === user?.id)
      .filter(booking => booking.status !== 'cancelled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Получаем предстоящие бронирования (сегодня или позже)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = userBookings
      .filter(booking => new Date(booking.date) >= today)
      .slice(0, 3);
    
    setUpcomingBookings(upcoming);
    
    // Получаем репетиторов из бронирований
    const tutorIds = Array.from(new Set(userBookings.map(booking => booking.tutorId)));
    const recentTutorsList = tutorIds
      .map(id => tutors.find(tutor => tutor.id === id))
      .filter(tutor => tutor !== undefined) as Tutor[];
    
    setRecentTutors(recentTutorsList.slice(0, 3));
  }, [bookings, tutors, user]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Панель управления</h1>
      
      {/* Приветственное сообщение */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">С возвращением, {user?.name}!</h2>
        <p className="mb-4 text-primary-100">
          Отслеживайте предстоящие занятия, управляйте платежами и находите новых репетиторов в одном месте.
        </p>
        <Link 
          to="/tutors" 
          className="inline-flex items-center bg-white text-primary-700 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium"
        >
          Найти репетитора <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
      
      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 mb-2">Предстоящие занятия</h3>
          <p className="text-3xl font-semibold">{upcomingBookings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 mb-2">Завершенные занятия</h3>
          <p className="text-3xl font-semibold">
            {bookings.filter(b => b.studentId === user?.id && b.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 mb-2">Репетиторы</h3>
          <p className="text-3xl font-semibold">{recentTutors.length}</p>
        </div>
      </div>
      
      {/* Предстоящие занятия */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Предстоящие занятия</h2>
          <Link 
            to="/dashboard/bookings" 
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
          >
            Все бронирования <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="p-6">
          {upcomingBookings.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {upcomingBookings.map((booking, index) => {
                const tutor = tutors.find(t => t.id === booking.tutorId);
                
                return (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-2 md:mb-0">
                        <h3 className="font-semibold">{tutor?.name || 'Неизвестный репетитор'}</h3>
                        <p className="text-primary-600 font-medium">{booking.subject}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-1" />
                          <span>{format(new Date(booking.date), 'd MMM yyyy')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-1" />
                          <span>
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">У вас нет предстоящих занятий.</p>
              <Link to="/tutors" className="btn-primary">
                Найти репетитора
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Недавние репетиторы */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Ваши репетиторы</h2>
          <Link 
            to="/tutors" 
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
          >
            Найти еще <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="p-6">
          {recentTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTutors.map((tutor, index) => (
                <Link 
                  key={index} 
                  to={`/tutors/${tutor.id}`}
                  className="block group"
                >
                  <div className="card overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-36">
                      <img 
                        src={tutor.photo} 
                        alt={tutor.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{tutor.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < Math.floor(tutor.rating) ? "currentColor" : "none"} 
                              className={i < Math.floor(tutor.rating) ? "" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-700">{tutor.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {tutor.subjects.join(', ')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Вы еще не работали с репетиторами.</p>
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

export default DashboardHome;