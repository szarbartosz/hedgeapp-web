import { useNavigate } from 'react-router';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      <h1>Ustawienia</h1>
      <button
        className="w-40 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        onClick={() => navigate('/login')}
      >
        zaloguj się
      </button>
      <button
        className="w-40 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        onClick={() => navigate('/register')}
      >
        zarejestruj się
      </button>
    </div>
  );
};

export default Settings;
