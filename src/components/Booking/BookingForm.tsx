import { useState } from 'react';
import { Calendar, Clock, BookOpen, X } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { useTutors, Tutor } from '../../contexts/TutorContext';
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  tutor: Tutor;
  onClose?: () => void;
  onSuccess?: () => void;
  showCloseButton?: boolean;
}

const BookingForm = ({ 
  tutor, 
  onClose, 
  onSuccess, 
  showCloseButton = true 
}: BookingFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useTutors();

  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [subject, setSubject] = useState<string>(tutor.subjects[0] || '');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    const dayName = format(date, 'EEEE');
    return {
      date,
      available: tutor.availability.includes(dayName),
      formattedDate: format(date, 'yyyy-MM-dd'),
      displayDate: format(date, 'EEE, d MMM', { locale: undefined })
    };
  }).filter(d => d.available);

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const hourlyRate = tutor.hourlyRate;
  const duration = calculateDuration();
  const totalPrice = hourlyRate * duration;

  const handleTimeChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStartTime(value);
      if (value) {
        const [hours, minutes] = value.split(':');
        const endHour = (parseInt(hours) + 1).toString().padStart(2, '0');
        setEndTime(`${endHour}:${minutes}`);
      } else {
        setEndTime('');
      }
    } else {
      setEndTime(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!date || !startTime || !endTime || !subject) {
        throw new Error('Пожалуйста, заполните все обязательные поля');
      }
      if (calculateDuration() <= 0) {
        throw new Error('Время окончания должно быть позже времени начала');
      }

      const booking = {
        tutorId: tutor.id,
        tutorName: tutor.name,
        tutorPhoto: tutor.photo,
        studentId: user?.id || 'guest',
        studentName: user?.name || 'Гость',
        date,
        startTime,
        endTime,
        subject,
        notes,
        status: 'pending' as const,
        paymentStatus: 'pending' as const,
        createdAt: new Date().toISOString()
      };

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      addBooking(booking);

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/booking-success', { 
          state: { 
            bookingDetails: {
              tutorName: tutor.name,
              date: format(new Date(`${date}T${startTime}`), 'PPPp'),
              duration: calculateDuration(),
              subject,
              price: totalPrice
            }
          } 
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при бронировании');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showCloseButton && onClose && (
        <div className="flex justify-end">
          {/* <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button> */}
        </div>
      )}

{/* Выбор даты */}
<div>
  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
    <Calendar size={16} className="inline mr-2" />
    Выберите дату
  </label>
  <input
    type="date"
    id="date"
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    value={date}
    min={new Date().toISOString().split('T')[0]} // Минимальная дата - сегодня
    onChange={(e) => {
      setDate(e.target.value);
      setStartTime('');
      setEndTime('');
    }}
    required
    disabled={isSubmitting}
  />
</div>

{/* Время начала и окончания */}
<div className="grid grid-cols-2 gap-4">
  <div>
    <label htmlFor="startTime" className="block text-gray-700 font-medium mb-2">
      <Clock size={16} className="inline mr-2" />
      Время начала
    </label>
    <select
      id="startTime"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      value={startTime}
      onChange={(e) => handleTimeChange('start', e.target.value)}
      required
      disabled={isSubmitting || !date}
    >
      <option value="">Выберите время</option>
      {Array.from({ length: 13 }, (_, i) => {
        const hour = i + 9;
        return (
          <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
            {hour}:00
          </option>
        );
      })}
    </select>
  </div>

  <div>
    <label htmlFor="endTime" className="block text-gray-700 font-medium mb-2">
      <Clock size={16} className="inline mr-2" />
      Время окончания
    </label>
    <select
      id="endTime"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      value={endTime}
      onChange={(e) => handleTimeChange('end', e.target.value)}
      required
      disabled={isSubmitting || !startTime}
    >
      <option value="">Выберите время</option>
      {startTime &&
        (() => {
          const startHour = parseInt(startTime.split(':')[0]);
          return Array.from({ length: 4 }, (_, i) => {
            const hour = startHour + i + 1;
            if (hour > 22) return null;
            return (
              <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                {hour}:00
              </option>
            );
          });
        })()}
    </select>
  </div>
</div>

      {/* Предмет */}
      <div>
        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
          <BookOpen size={16} className="inline mr-2" />
          Предмет
        </label>
        <select
          id="subject"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          disabled={isSubmitting}
        >
          {tutor.subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Комментарии */}
      <div>
        <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
          Дополнительные комментарии (необязательно)
        </label>
        <textarea
          id="notes"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px] resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Уточните свои пожелания, вопросы или особенности подготовки..."
          disabled={isSubmitting}
        />
      </div>

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Сводка по цене */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Сводка по оплате</h3>
        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Стоимость за час:</span>
            <span>₽{hourlyRate.toFixed(2)}</span>
          </div>
          {startTime && endTime && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Длительность:</span>
                <span>{duration.toFixed(1)} ч.</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Итого:</span>
                  <span className="text-primary-700">
                    ₽{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Оплата будет проведена после подтверждения заявки репетитором.
        </p>
      </div>

      {/* Кнопки */}
      <div className="flex gap-3">
        <button
          type="submit"
          className={`btn-primary flex-1 py-3 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Обработка...' : 'Подтвердить бронь'}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn-outline flex-shrink-0"
            disabled={isSubmitting}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
