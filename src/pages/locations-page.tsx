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
        setLocations(res.data.locations);
        return res.data;
      });
  }, []);

  return (
    <>
      {locations.length > 0 ? (
        locations.map((loccation: any) => {
          <Location />;
        })
      ) : (
        <h1>Nie zdefiniowałeś jeszcze żadnej inwestycji!</h1>
      )}
    </>
  );
};

export default Locations;
