import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => (
  <div className="App">
    <Navbar />
    <div className="flex min-h-full items-center justify-center px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <Outlet />
    </div>
  </div>
);

export default App;
