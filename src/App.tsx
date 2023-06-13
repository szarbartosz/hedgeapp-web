import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/developers`, {
        withCredentials: true,
      })
      .then((res) => {
        setDevelopers(res.data.developers);
        return res.data;
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container mx-4 py-8 sm:mx-6 md:mx-8 lg:mx-10">
        <h1>Fetched developers:</h1>
        {developers.map((dev) => (
          <div key={dev.id}>{dev.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
