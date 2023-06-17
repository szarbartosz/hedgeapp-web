import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => (
  <>
    <Navbar />
    <div className="flex justify-center px-6 pb-6 pt-20 text-neutral-600 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      <Outlet />
    </div>
  </>
);

export default App;
