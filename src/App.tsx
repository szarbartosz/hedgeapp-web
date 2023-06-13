import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => (
  <div className="App">
    <Navbar />
    <div className="container mx-4 py-8 sm:mx-6 md:mx-8 lg:mx-10">
      <Outlet />
    </div>
  </div>
);

export default App;
