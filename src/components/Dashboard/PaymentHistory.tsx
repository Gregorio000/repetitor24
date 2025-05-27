import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUp, Download, FileText, DollarSign, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useTutors } from '../../contexts/TutorContext';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

const PaymentHistory = () => {
  const { user } = useAuth();
  const { bookings, tutors, updatePaymentStatus } = useTutors();
  const [payments, setPayments] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState({
    status: 'all',
    date: 'all',
  });

  useEffect(() => {
    // Получение платежей из бронирований
    let filtered = bookings
      .filter(booking => booking.studentId === user?.id)
      .map(booking => {
        const tutor = tutors.find(t => t.id === booking.tutorId);

        // Расчет часов
        const start = new Date(`2000-01-01T${booking.startTime}`);
        const end = new Date(`2000-01-01T${booking.endTime}`);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        // Расчет суммы
        const amount = hours * (tutor?.hourlyRate || 0);

        return {
          ...booking,
          tutorName: tutor?.name || 'Неизвестный репетитор',
          amount,
          date: new Date(booking.date),
          paymentDate: new Date(booking.date),
        };
      });

    // Применение фильтра по статусу
    if (filter.status !== 'all') {
      filtered = filtered.filter(payment => payment.paymentStatus === filter.status);
    }

    // Применение фильтра по дате
    const now = new Date();
    if (filter.date === 'month') {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getMonth() === now.getMonth() &&
               paymentDate.getFullYear() === now.getFullYear();
      });
    } else if (filter.date === 'quarter') {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        const quarter = Math.floor(now.getMonth() / 3);
        const paymentQuarter = Math.floor(paymentDate.getMonth() / 3);
        return paymentQuarter === quarter &&
               paymentDate.getFullYear() === now.getFullYear();
      });
    } else if (filter.date === 'year') {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getFullYear() === now.getFullYear();
      });
    }

    // Сортировка по дате
    filtered.sort((a, b) => {
      const dateA = new Date(a.paymentDate);
      const dateB = new Date(b.paymentDate);
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    setPayments(filtered);
  }, [bookings, tutors, user, sortOrder, filter]);

  const handlePayNow = (bookingId: string) => {
    if (window.confirm('Оплатить сейчас?')) {
      updatePaymentStatus(bookingId, 'paid');
    }
  };

  // Расчет итогов
  const totalAmount = payments.reduce((sum, payment) =>
    payment.paymentStatus === 'paid' ? sum + payment.amount : sum, 0);
  const pendingAmount = payments.reduce((sum, payment) =>
    payment.paymentStatus === 'pending' ? sum + payment.amount : sum, 0);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">История платежей</h1>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 mb-2">Всего оплачено</h3>
          <p className="text-3xl font-semibold">₽{totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 mb-2">Ожидающие платежи</h3>
          <p className="text-3xl font-semibold">₽{pendingAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 mb-2">Завершенные сессии</h3>
          <p className="text-3xl font-semibold">
            {payments.filter(p => p.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Фильтры платежей</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="statusFilter" className="block text-gray-700 font-medium mb-2">
                Статус платежа
              </label>
              <select
                id="statusFilter"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <option value="all">Все статусы</option>
                <option value="paid">Оплачено</option>
                <option value="pending">В ожидании</option>
                <option value="refunded">Возвращено</option>
              </select>
            </div>

            <div>
              <label htmlFor="dateFilter" className="block text-gray-700 font-medium mb-2">
                Диапазон дат
              </label>
              <select
                id="dateFilter"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              >
                <option value="all">Все время</option>
                <option value="month">Этот месяц</option>
                <option value="quarter">Этот квартал</option>
                <option value="year">Этот год</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Таблица транзакций */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Транзакции</h2>
            <div className="flex items-center">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                Сортировать по дате
                {sortOrder === 'asc' ? (
                  <ArrowUp size={16} className="ml-1" />
                ) : (
                  <ArrowDown size={16} className="ml-1" />
                )}
              </button>
            </div>
          </div>

          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Транзакция
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                            <FileText size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Сессия с {payment.tutorName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.subject}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(payment.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          payment.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.paymentStatus === 'paid' && <Check size={12} className="mr-1" />}
                          {payment.paymentStatus === 'pending' && <Clock size={12} className="mr-1" />}
                          {payment.paymentStatus.charAt(0).toUpperCase() + payment.paymentStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payment.paymentStatus === 'paid' ? (
                          <button className="text-primary-600 hover:text-primary-900 mr-4">
                            <Download size={16} className="inline mr-1" />
                            Квитанция
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePayNow(payment.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <DollarSign size={16} className="inline mr-1" />
                            Оплатить
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                Записи о платежах не найдены.
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

export default PaymentHistory;