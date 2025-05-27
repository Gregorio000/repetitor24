import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tutor } from '../../contexts/TutorContext';

interface FeaturedTutorCardProps {
  tutor: Tutor;
}

const FeaturedTutorCard = ({ tutor }: FeaturedTutorCardProps) => {
  return (
    <div className="card overflow-hidden group hover:transform hover:scale-[1.02] transition-all">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tutor.photo}
          alt={tutor.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 rounded-bl-lg font-medium">
          ₽{tutor.hourlyRate}/час
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl">{tutor.name}</h3>

        <div className="mb-2 flex items-center">
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

        <p className="text-gray-500 mb-3">{tutor.location}</p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tutor.subjects.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-sm font-medium"
              >
                {subject}
              </span>
            ))}
            {tutor.subjects.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-medium">
                +{tutor.subjects.length - 3} еще
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/tutors/${tutor.id}`}
          className="btn-primary w-full text-center"
        >
          Просмотреть профиль
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTutorCard;