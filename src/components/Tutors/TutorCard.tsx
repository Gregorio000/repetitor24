import { Star, Clock, Users, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tutor } from '../../contexts/TutorContext';

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5">
          <div className="h-48 md:h-full relative">
            <img
              src={tutor.photo}
              alt={tutor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 rounded-bl-lg font-medium">
              ₽{tutor.hourlyRate}/час
            </div>
          </div>
        </div>

        <div className="p-6 md:w-3/4 lg:w-4/5 flex flex-col">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
              <div className="flex items-center mb-2">
                <MapPin size={16} className="text-gray-500 mr-1" />
                <span className="text-gray-600">{tutor.location}</span>
              </div>
            </div>

            <div className="flex items-center mt-2 md:mt-0">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(tutor.rating) ? "currentColor" : "none"}
                    className={i < Math.floor(tutor.rating) ? "" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-700">
                {tutor.rating} ({tutor.reviews} отзывов)
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">
            {tutor.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center text-gray-700">
              <Award size={16} className="text-primary-600 mr-2" />
              <span>{tutor.education[0]}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock size={16} className="text-primary-600 mr-2" />
              <span>{tutor.availability.length} дней доступно</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users size={16} className="text-primary-600 mr-2" />
              <span>{tutor.experience.split(' ')[0]} лет опыта</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <Link
              to={`/tutors/${tutor.id}`}
              className="btn-primary flex items-center justify-center"
            >
              Просмотреть профиль
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;