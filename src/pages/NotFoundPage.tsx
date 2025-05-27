import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-20">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Страница не найдена</h2>
        <p className="text-gray-600 text-lg mb-8">
          К сожалению, мы не смогли найти страницу, которую вы ищете. Возможно, она была перемещена или не существует.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Вернуться на главную
          </Link>
          <Link
            to="/tutors"
            className="btn-outline flex items-center justify-center"
          >
            <Search size={20} className="mr-2" />
            Найти репетиторов
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;