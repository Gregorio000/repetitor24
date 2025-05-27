import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap size={32} className="text-primary-600" />
            <span className="text-xl font-display font-bold text-gray-900">
              Репетитор24
            </span>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium hover:text-primary-600 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/tutors"
              className={({ isActive }) =>
                `font-medium hover:text-primary-600 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              Найти репетитора
            </NavLink>
            <NavLink
              to="/instruction"
              className={({ isActive }) =>
                `font-medium hover:text-primary-600 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              Инструкция
            </NavLink>
            {/* Удален блок с авторизацией и панелью управления */}
          </nav>

          {/* Кнопка мобильного меню */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильная навигация */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
          <div className="container-custom space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/tutors"
              className={({ isActive }) =>
                `block py-2 font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              Найти репетитора
            </NavLink>
            <NavLink
              to="/instruction"
              className={({ isActive }) =>
                `block py-2 font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              Инструкция
            </NavLink>
            {/* Удален блок с авторизацией и панелью управления для мобильной версии */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;