import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Calendar, Award, X, DollarSign, Languages, Check} from 'lucide-react';
import { useTutors } from '../contexts/TutorContext';
import BookingForm from '../components/Booking/BookingForm';
import ReviewItem from '../components/Tutors/ReviewItem';


const TutorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getTutorById } = useTutors();

  const [tutor, setTutor] = useState(() => getTutorById(id || ''));
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('about');


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('book') === 'true') {
      setShowBookingForm(true);
    }
  }, [location]);

  useEffect(() => {
    if (!tutor) {
      navigate('/tutors', { replace: true });
    }
  }, [tutor, navigate]);

  if (!tutor) return null;

  // Моковые данные отзывов
  const reviews = [
    {
      id: '1',
      author: 'Иван Клюев',
      rating: 5,
      date: '2025-03-03',
      content: 'Исключительный репетитор. Большой опыт. Объясняет сложные концепции понятным образом. Моя оценка по исчислению улучшилась с 2 до 5 после всего шести занятий!',
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      author: 'Дарья Полякова',
      rating: 4,
      date: '2025-02-02',
      content: 'Очень знающий и терпеливый. Помог моей дочери подготовиться к экзаменам, и ее оценка значительно улучшилась. Очень рекомендую.',
      authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      author: 'Максим Малахов',
      rating: 5,
      date: '2025-04-04',
      content: 'Абсолютно лучший репетитор, которого у меня когда-либо был. Делает сложные темы простыми и очень гибкий в планировании. Стоит каждой копейки.',
      authorImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // Карта доступности на текущей неделе
  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  
  const handleBookNow = () => {
    setShowBookingForm(true);
  };
  
  return (
<div className="container-custom py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-6 font-medium"
        >
          ← Назад к репетиторам
        </button>

 <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-64 lg:h-80 bg-gradient-to-r from-primary-700 to-primary-900">
            <div className="absolute inset-0 flex items-end pb-8 px-8">
              <div className="flex flex-col md:flex-row md:items-end w-full">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl border-4 border-white overflow-hidden shadow-lg mb-4 md:mb-0 md:mr-6">
                  <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{tutor.name}</h1>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < Math.floor(tutor.rating) ? "currentColor" : "none"}
                          className={i < Math.floor(tutor.rating) ? "" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span>{tutor.rating} ({tutor.reviews} отзывов)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{tutor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-1" />
                      <span>₽{tutor.hourlyRate}/час</span>
                    </div>
                    <div className="flex items-center">
                      <Languages size={16} className="mr-1" />
                      <span>{tutor.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="lg:w-2/3">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex -mb-px space-x-8">
                {['about', 'reviews', 'availability'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm sm:text-base ${
                      activeTab === tab
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab === 'about' && 'Обо мне'}
                    {tab === 'reviews' && `Отзывы (${reviews.length})`}
                    {tab === 'availability' && 'Доступность'}
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Обо мне</h2>
                  <p className="text-gray-700 whitespace-pre-line">{tutor.bio}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Образование</h2>
                  <ul className="space-y-3">
                    {tutor.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <Award size={20} className="text-primary-600 mr-3 mt-1" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Опыт</h2>
                  <p className="text-gray-700">{tutor.experience}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Предметы</h2>
                  <div className="flex flex-wrap gap-3">
                    {tutor.subjects.map((subject, index) => (
                      <span key={index} className="bg-primary-50 text-primary-700 px-3 py-2 rounded-lg text-base font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Отзывы</h2>
                {reviews.map(review => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Еженедельная доступность</h2>
                <div className="grid grid-cols-7 gap-2">
                  {daysOfWeek.map(day => (
                    <div
                      key={day}
                      className={`p-4 rounded-lg text-center ${
                        tutor.availability.includes(day)
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <p className="font-medium mb-2">{day.slice(0, 3)}</p>
                      {tutor.availability.includes(day) ? (
                        <Check size={20} className="text-green-600 mx-auto" />
                      ) : (
                        <X size={20} className="text-gray-400 mx-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="lg:w-1/3">
            {showBookingForm ? (
              <div className="bg-white rounded-xl shadow-md sticky top-24 p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Бронирование</h2>
                  <button onClick={() => setShowBookingForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
                <BookingForm tutor={tutor} onClose={() => setShowBookingForm(false)} />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md sticky top-24 p-6">
                <h2 className="text-xl font-semibold mb-4">Информация о бронировании</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Почасовая ставка:</span>
                    <span className="font-semibold">₽{tutor.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Доступность:</span>
                    <span>{tutor.availability.length} дней в неделю</span>
                  </div>
                </div>
                <button onClick={handleBookNow} className="btn-primary w-full py-3">
                  Забронировать сейчас
                </button>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">
                    <Clock size={16} className="inline mr-2" />
                    Время ответа
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Обычно отвечает в течение 12 часов.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorDetailPage;