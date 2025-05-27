import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTutors, Tutor } from '../contexts/TutorContext';
import TutorCard from '../components/Tutors/TutorCard';
import { useLocation, useNavigate } from 'react-router-dom';

const TutorsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tutors, filterTutors } = useTutors();
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Состояния фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000});
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Разбор параметров запроса при начальной загрузке
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subject = params.get('subject');
    if (subject) {
      setSelectedSubject(subject);
    }

    // Применение фильтров
    applyFilters();
  }, [location.search]);

  const applyFilters = () => {
    const filters = {
      search: searchQuery,
      subject: selectedSubject,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      rating: selectedRating,
      location: selectedLocation
    };

    const filtered = filterTutors(filters);
    setFilteredTutors(filtered);

    // Обновление URL с фильтрами
    const params = new URLSearchParams();
    if (selectedSubject !== 'all') params.set('subject', selectedSubject);
    if (searchQuery) params.set('search', searchQuery);
    if (selectedLocation !== 'all') params.set('location', selectedLocation);
    if (selectedRating > 0) params.set('rating', selectedRating.toString());

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl, { replace: true });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setPriceRange({ min: 0, max: 3000});
    setSelectedRating(0);
    setSelectedLocation('all');

    // Очистка параметров URL
    navigate('/tutors', { replace: true });

    // Сброс к списку всех репетиторов
    setFilteredTutors(tutors);
  };

  // Применение фильтров при изменении любого фильтра
  useEffect(() => {
    applyFilters();
  }, [selectedSubject, priceRange, selectedRating, selectedLocation]);

  // Получение уникальных предметов от репетиторов
  const subjects = ['all', ...Array.from(new Set(tutors.flatMap(tutor => tutor.subjects)))].sort();

  // Получение уникальных местоположений от репетиторов
  const locations = ['all', ...Array.from(new Set(tutors.map(tutor => tutor.location)))].sort();

  return (
    <div className="container-custom py-12">
      <motion.h1
        className="text-3xl md:text-4xl font-display font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Найдите своего идеального репетитора
      </motion.h1>

      {/* Поле поиска */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по предмету, имени или ключевому слову..."
            className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 btn-primary py-2"
            onClick={applyFilters}
          >
            Поиск
          </button>
        </div>
      </motion.div>

      {/* Переключатель мобильного фильтра */}
      <motion.div
        className="md:hidden mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          className="w-full btn-outline flex items-center justify-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter size={18} className="mr-2" />
          {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
          {isFilterOpen ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
        </button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Боковая панель фильтров */}
        <motion.div
          className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 lg:w-1/5`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl">Фильтры</h3>
              <button
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                onClick={clearFilters}
              >
                Очистить все
              </button>
            </div>

            {/* Фильтр по предмету */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Предметы</h4>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">Все предметы</option>
                {subjects.filter(subject => subject !== 'all').map((subject, index) => (
                  <option key={index} value={subject.toLowerCase()}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Фильтр по диапазону цен */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Диапазон цен (в час)</h4>
              <div className="flex items-center justify-between mb-2">
                <span>₽{priceRange.min}</span>
                <span>₽{priceRange.max}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Фильтр по рейтингу */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Минимальный рейтинг</h4>
              <div className="flex space-x-2">
                {[0, 3, 4].map((rating) => (
                  <button
                    key={rating}
                    className={`px-3 py-1.5 rounded-lg border ${
                      selectedRating === rating
                        ? 'bg-primary-100 border-primary-500 text-primary-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRating(rating)}
                  >
                    {rating === 0 ? 'Любой' : rating+'+'}
                  </button>
                ))}
              </div>
            </div>

            {/* Фильтр по местоположению */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Местоположение</h4>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">Все города</option>
                {locations.filter(location => location !== 'all').map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Список репетиторов */}
        <motion.div
          className="w-full md:w-3/4 lg:w-4/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Информация о результатах
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Показано {filteredTutors.length} {filteredTutors.length === 1 ? 'репетитор' : 'репетиторов'}
            </p>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Сортировать по:</span>
              <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="relevance">Релевантности</option>
                <option value="price-low-high">Цена: по возрастанию</option>
                <option value="price-high-low">Цена: по убыванию</option>
                <option value="rating">Высший рейтинг</option>
              </select>
            </div>
          </div> */}

          {/* Активные фильтры */}
          {(selectedSubject !== 'all' || priceRange.max < 100 || selectedRating > 0 || selectedLocation !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-gray-600 self-center">Активные фильтры:</span>

              {selectedSubject !== 'all' && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg flex items-center">
                  Предмет: {selectedSubject}
                  <button
                    className="ml-2 text-primary-700 hover:text-primary-900"
                    onClick={() => setSelectedSubject('all')}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {priceRange.max < 100 && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg flex items-center">
                  Цена: До ₽{priceRange.max}
                  <button
                    className="ml-2 text-primary-700 hover:text-primary-900"
                    onClick={() => setPriceRange({ min: 0, max: 100 })}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedRating > 0 && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg flex items-center">
                  Рейтинг: {selectedRating}+
                  <button
                    className="ml-2 text-primary-700 hover:text-primary-900"
                    onClick={() => setSelectedRating(0)}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedLocation !== 'all' && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg flex items-center">
                  Местоположение: {selectedLocation}
                  <button
                    className="ml-2 text-primary-700 hover:text-primary-900"
                    onClick={() => setSelectedLocation('all')}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {searchQuery && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg flex items-center">
                  Поиск: {searchQuery}
                  <button
                    className="ml-2 text-primary-700 hover:text-primary-900"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <button
                className="text-gray-600 hover:text-gray-900 underline text-sm font-medium self-center"
                onClick={clearFilters}
              >
                Очистить все
              </button>
            </div>
          )}

          {/* Список репетиторов */}
          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredTutors.map((tutor, index) => (
                <motion.div
                  key={tutor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TutorCard tutor={tutor} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">Нет репетиторов, соответствующих вашим критериям поиска.</p>
              <button
                className="btn-primary"
                onClick={clearFilters}
              >
                Очистить все фильтры
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TutorsPage;