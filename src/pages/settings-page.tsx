import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('hedgeAppCookie', { path: '' });
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-72 flex-col items-center space-y-6 py-6 sm:w-96"
    >
      <p className="break-words text-center text-xl text-neutral-600">
        Chcesz zasugerować zmianę?
      </p>
      <p className="text-md mt-2 text-center text-neutral-600">
        Śmiało! Zgłoś sugestię na{' '}
        <a
          href="https://github.com/szarbartosz/hedgeapp-web"
          target="_blank"
          className="font-medium text-emerald-600 hover:text-emerald-700"
        >
          githubie
        </a>
        {', '}lub wyślij mail na adres{' '}
        <a
          href="mailto:szarbartosz@gmail.com"
          className="font-medium text-emerald-600 hover:text-emerald-700"
        >
          szarbartosz@gmail.com
        </a>
        .
      </p>
      <button
        className="w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        onClick={handleLogout}
      >
        wyloguj się
      </button>
    </motion.div>
  );
};

export default Settings;
