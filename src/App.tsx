import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => (
  <>
    <Navbar />
    <div className="flex min-h-full justify-center px-6 py-6 text-neutral-600 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <Outlet />
    </div>
  </>
);

export default App;
