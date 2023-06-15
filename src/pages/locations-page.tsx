import axios from 'axios';
import { useEffect, useState } from 'react';
import Location from '../components/Location';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/locations`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.locations);
        setLocations(res.data.locations);
      });
  }, []);

  return (
    <div className="flex-col">
      {locations.length > 0 ? (
        locations.map((location: any) => <Location />)
      ) : (
        <h1>Nie zdefiniowałeś jeszcze żadnej inwestycji!</h1>
      )}
    </div>
  );
};

export default Locations;
