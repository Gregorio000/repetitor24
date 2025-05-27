import React from 'react';
import { BookOpen, Search, Eye, MessageSquareText, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Search size={28} className="text-blue-600" />,
    title: 'Поиск репетитора',
    description: [
      'Перейдите на главную страницу.',
      'Введите нужный предмет (например, математика, английский и т.д.).',
      'Выберите формат занятий, уровень подготовки и ценовой диапазон.',
      'Нажмите «Поиск».',
    ],
  },
  {
    icon: <Eye size={28} className="text-blue-600" />,
    title: 'Просмотр анкет репетиторов',
    description: [
      'Откройте анкету интересующего репетитора.',
      'Изучите опыт, образование, стоимость, отзывы и расписание.',
    ],
  },
  {
    icon: <MessageSquareText size={28} className="text-blue-600" />,
    title: 'Связь с репетитором',
    description: [
      'Нажмите «Написать» или «Оставить заявку».',
      'Уточните детали, задайте вопросы напрямую.',
    ],
  },
  {
    icon: <CheckCircle size={28} className="text-blue-600" />,
    title: 'Начало занятий',
    description: [
      'Согласуйте удобное время и формат.',
      'Начинайте обучение с выбранным преподавателем!',
    ],
  },
];

const InstructionPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <div className="text-center mb-10">
        <BookOpen size={40} className="mx-auto text-blue-600 mb-2" />
        <h1 className="text-4xl font-extrabold text-blue-700">Как пользоваться сайтом</h1>
        <p className="text-gray-500 mt-2">Пошаговая инструкция для быстрого старта</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center mb-4 space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">{step.icon}</div>
              <h2 className="text-xl font-semibold text-blue-700">{step.title}</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              {step.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructionPage;
