import { Link } from 'react-router-dom';
import { GraduationCap, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GraduationCap size={32} className="text-primary-400" />
              <span className="text-xl font-display font-bold text-white">
                Репетитор24
              </span>
            </Link>
            <p className="mb-4">
              Соединяем студентов с опытными репетиторами по всем основным предметам для достижения академических успехов.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Для студентов</h4>
            <ul className="space-y-3">
              <li><Link to="/tutors" className="hover:text-white transition-colors">Найти репетитора</Link></li>
              <li><Link to="/instruction" className="hover:text-white transition-colors">Как это работает</Link></li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Связаться с нами</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>support@repetitor24.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} Репетитор24. Сделано для курсовой работы</p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;