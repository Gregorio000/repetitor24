import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  author: string;
  authorImage: string;
  rating: number;
  date: string;
  content: string;
}

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const formattedDate = format(new Date(review.date), 'MMM d, yyyy');

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-start">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={review.authorImage}
              alt={review.author}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h4 className="font-semibold">{review.author}</h4>
            <span className="text-gray-500 text-sm">{formattedDate}</span>
          </div>

          <div className="flex text-yellow-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < review.rating ? "currentColor" : "none"}
                className={i < review.rating ? "" : "text-gray-300"}
              />
            ))}
          </div>

          <p className="text-gray-700">
            {review.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;