import { useEffect, useState } from 'react';
import { Developer, LocationInputs, Status } from '../types/rest';
import {
  fetchDevelopers,
  fetchLocations,
  fetchStatuses,
} from '../services/restService';
import { mapLocation } from '../mappers/locationMapper';
import Location from '../components/Location';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<LocationInputs[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    fetchDevelopers().then((developers) => {
      if (Array.isArray(developers) && developers.length) {
        setDevelopers(developers);
      }
    });

    fetchStatuses().then((statuses) => {
      if (Array.isArray(statuses) && statuses.length) {
        setStatuses(statuses);
      }
    });
  }, []);

  useEffect(() => {
    fetchLocations().then((locations) => {
      if (Array.isArray(locations) && locations.length) {
        setLocations(
          locations.map((location) =>
            mapLocation(location, developers, statuses)
          )
        );
      }
    });
  }, [developers, statuses]);

  return (
    <>
      {locations.length > 0 ? (
        <div className="flex max-h-screen min-w-full flex-col items-center">
          <table className="w-3/4 table-auto divide-y divide-gray-600 text-left text-sm">
            <thead>
              <tr>
                <th className="px-2 py-4">Obiekt</th>
                <th className="py-4">Status</th>
                <th className="py-4">Data związana ze statusem</th>
                <th className="py-4 text-center">Wycinka</th>
                <th className="px-2 py-4 text-center">Nasadzenia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {locations.map((location: LocationInputs) => (
                <Location {...location} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Nie zdefiniowałeś jeszcze żadnej inwestycji!</h1>
      )}
    </>
  );
};

export default Locations;
