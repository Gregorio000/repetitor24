import { Link } from 'react-router-dom';
import { Search, BookOpen, Calendar, CreditCard, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTutors } from '../contexts/TutorContext';
import FeaturedTutorCard from '../components/Tutors/FeaturedTutorCard';

const HomePage = () => {
  const { featuredTutors } = useTutors();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div>
      {/* Раздел Hero */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="container-custom py-20 md:py-28 flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6">
              Найдите идеального репетитора для вашего обучения
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Свяжитесь с опытными репетиторами по любому предмету, которые помогут вам достичь ваших академических целей. Независимо от того, нужна ли вам помощь по конкретному предмету или постоянная поддержка, мы вас обеспечим.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/tutors" className="btn-accent py-3 px-6 text-lg">
                Найти репетитора сейчас
              </Link>
              <Link to="/instruction" className="btn bg-white text-primary-800 hover:bg-gray-100 py-3 px-6 text-lg">
                Как это работает
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-primary-800 mb-4">Быстрый поиск</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-black mb-2">Предмет</label>
                  <select
                    id="subject"
                    className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Выберите предмет</option>
                    <option value="mathematics">Математика</option>
                    <option value="english">Наука</option>
                    <option value="science">Информатика</option>
                    <option value="history">История</option>
                    <option value="language">Языки</option>
                    <option value="economy">Экономика</option>
                    <option value="music">Музыка</option>
                    <option value="art">Искусство</option>
                    <option value="programming">Программирования</option>
                    <option value="finance">Финансы</option>
                    <option value="psychology">Психология</option>
                    <option value="philosophy">Философия</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-black mb-2">Местоположение</label>
                  <select
                    id="location"
                    className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Выберите местоположение</option>
                    <option value="moscow">Москва</option>
                    <option value="saint-petersburg">Санкт-Петербург</option>
                    <option value="novosibirsk">Новосибирск</option>
                    <option value="samara">Самара</option>
                    <option value="kazan">Казань</option>
                    <option value="ulianovsk">Ульяновск</option>
                    <option value="ekaterinburg">Екатеринбург</option>
                    <option value="pskov">Псков</option>
                    <option value="vladivostok">Владивосток</option>
                  </select>
                </div>
                <Link
                  to="/tutors"
                  className="btn-primary w-full py-3 text-center text-lg flex items-center justify-center"
                >
                  <Search className="mr-2" size={20} />
                  Поиск репетиторов
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Раздел "Как это работает" */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              className="mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Как работает Репетитор24
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Наш простой процесс из 4 шагов делает поиск и работу с идеальным репетитором быстрым и легким.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Search size={28} />
              </div>
              <h4 className="mb-2">Поиск</h4>
              <p className="text-gray-600">Просматривайте профили квалифицированных репетиторов на основе вашего предмета, бюджета и графика.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card p-6 text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 mx-auto mb-4">
                <BookOpen size={28} />
              </div>
              <h4 className="mb-2">Связь</h4>
              <p className="text-gray-600">Просматривайте профили репетиторов, их квалификации и рейтинги, чтобы найти идеальное соответствие.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card p-6 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 mx-auto mb-4">
                <Calendar size={28} />
              </div>
              <h4 className="mb-2">График</h4>
              <p className="text-gray-600">Бронируйте сессии в удобное для вас время с мгновенным подтверждением.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <CreditCard size={28} />
              </div>
              <h4 className="mb-2">Учитесь и платите</h4>
              <p className="text-gray-600">Посещайте сессии и платите безопасно через нашу платформу с гарантией удовлетворенности.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Раздел "Рекомендуемые репетиторы" */}
      <section className="section">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Рекомендуемые репетиторы
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/tutors" className="btn-outline flex items-center">
                Просмотреть всех репетиторов <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeaturedTutorCard tutor={tutor} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Раздел "Популярные предметы" */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.h2
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Популярные предметы
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: "Математика", icon: "📊" },
              { name: "Наука", icon: "🔬" },
              { name: "Информатика", icon: "💻" },
              { name: "История", icon: "🏛️" },
              { name: "Языки", icon: "🗣️" },
              { name: "Экономика", icon: "💰" },
              { name: "Музыка", icon: "🎵" },
              { name: "Искусство", icon: "🎨" },
              { name: "Программирования", icon: "👩‍💻" },
              { name: "Финансы", icon: "📈" },
              { name: "Психология", icon: "👨‍🏫" },
              { name: "Философия", icon: "☯️" },
            ].map((subject, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-6 text-center hover:bg-primary-50 hover:border-primary-200 border border-transparent transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3">{subject.icon}</div>
                <h4 className="mb-1">{subject.name}</h4>
                <Link to={`/tutors?subject=${subject.name.toLowerCase()}`} className="text-primary-600 font-medium hover:text-primary-800">
                  Найти репетиторов
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="section">
        <div className="container-custom">
          <motion.h2
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Что говорят наши студенты
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Джессика Л.",
                role: "Ученица старшей школы",
                text: "У меня были проблемы с исчислением, и я проваливала свой класс. После всего месяца с моим репетитором от Репетитор24, я улучшила свою оценку с 3 до 5. Персонализированная помощь сделала всю разницу!",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                name: "Маркус Т.",
                role: "Студент колледжа",
                text: "Найти подходящего репетитора по испанскому было решающим для моих языковых навыков. Мой репетитор создает индивидуальные уроки, сфокусированные на разговоре, и теперь я чувствую себя уверенно, говоря по-испански в реальных ситуациях.",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                name: "Сара К.",
                role: "Родитель",
                text: "Как родитель, я беспокоилась о понимании чтения моим сыном. Его репетитор сделал чтение снова веселым, и его уверенность сильно выросла. Его учитель заметил значительное улучшение!",
                image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-0.5">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.text}</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Раздел CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container-custom text-center">
          <motion.h2
            className="mb-6 mx-auto max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Готовы к успехам в учебе?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto text-primary-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Присоединяйтесь к тысячам студентов, которые улучшили свои оценки и уверенность с Репетитор24.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/tutors" className="btn-accent py-3 px-8 text-lg">
              Просмотреть репетиторов
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Раздел "Почему выбрать нас" */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              className="mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Почему выбрать Репетитор24
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Мы стремимся предоставить высший уровень опыта репетиторства для студентов всех возрастов.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="card p-6 flex"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mr-4 text-primary-600">
                <Check size={24} />
              </div>
              <div>
                <h4 className="mb-2">Проверенные эксперты</h4>
                <p className="text-gray-600">Все репетиторы проходят тщательный отбор, включая проверку анкетных данных, подтверждение квалификации и оценку преподавательских навыков.</p>
              </div>
            </motion.div>

            <motion.div
              className="card p-6 flex"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mr-4 text-primary-600">
                <Check size={24} />
              </div>
              <div>
                <h4 className="mb-2">Персонализированное соответствие</h4>
                <p className="text-gray-600">Наш алгоритм находит репетиторов, которые соответствуют вашему стилю обучения, академическим потребностям и предпочтениям по графику.</p>
              </div>
            </motion.div>

            <motion.div
              className="card p-6 flex"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mr-4 text-primary-600">
                <Check size={24} />
              </div>
              <div>
                <h4 className="mb-2">Гарантия удовлетворенности</h4>
                <p className="text-gray-600">Если вы не полностью удовлетворены своей первой сессией, мы зачислим средства на ваш счет для будущей сессии.</p>
              </div>
            </motion.div>

            <motion.div
              className="card p-6 flex"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mr-4 text-primary-600">
                <Check size={24} />
              </div>
              <div>
                <h4 className="mb-2">Безопасные платежи</h4>
                <p className="text-gray-600">Все платежи обрабатываются безопасно, и средства передаются репетиторам только после завершения сессий.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;