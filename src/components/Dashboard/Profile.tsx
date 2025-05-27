import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Save, Lock, CreditCard } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении это обновит профиль пользователя
    setIsEditing(false);
    alert('Информация профиля обновлена!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Новые пароли не совпадают!');
      return;
    }

    // В реальном приложении это обновит пароль
    alert('Пароль успешно обновлен!');

    // Сброс формы
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Мой профиль</h1>

      {/* Заголовок профиля */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4 md:mb-0 md:mr-6">
            <User size={40} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-3">{user?.email}</p>
            <p className="text-gray-500 text-sm">
              Участник с {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-outline"
            >
              {isEditing ? 'Отмена' : 'Редактировать профиль'}
            </button>
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'personal'
              ? 'border-primary-600 text-primary-600 font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('personal')}
        >
          Личная информация
        </button>
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'security'
              ? 'border-primary-600 text-primary-600 font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('security')}
        >
          Безопасность
        </button>
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'payment'
              ? 'border-primary-600 text-primary-600 font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('payment')}
        >
          Способы оплаты
        </button>
      </div>

      {/* Содержимое вкладки */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Личная информация</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        <User size={16} className="inline mr-2" />
                        Полное имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Адрес электронной почты
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Номер телефона
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="например, (123) 456-7890"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Информация об адресе</h3>
                  <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Адрес
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Введите ваш полный адрес"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      Сохранить изменения
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Lock size={16} className="inline mr-2" />
                    Изменить пароль
                  </h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                        Текущий пароль
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                        Новый пароль
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Подтвердите новый пароль
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Обновить пароль
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  <CreditCard size={16} className="inline mr-2" />
                  Способы оплаты
                </h3>

                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">
                    У вас пока нет сохраненных способов оплаты.
                  </p>
                  <button className="btn-primary">
                    Добавить способ оплаты
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;