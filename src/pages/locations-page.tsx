import { LocationInputs } from '../types/rest';
import {
  fetchDevelopers,
  fetchLocations,
  fetchStatuses,
} from '../services/restService';
import LocationRow from '../components/LocationRow';
import { useQuery } from '@tanstack/react-query';
import { mapLocations } from '../services/locationMapper';
import WavingTrees from '../components/WavingTrees';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Locations: React.FC = () => {
  const [mappedLocations, setMappedLocations] = useState<LocationInputs[]>([]);

  const developers = useQuery(['developers'], fetchDevelopers);
  const statuses = useQuery(['statuses'], fetchStatuses);
  const locations = useQuery(['locations'], fetchLocations);

  useEffect(() => {
    if (locations.isSuccess && developers.isSuccess && statuses.isSuccess) {
      setMappedLocations(
        mapLocations(locations.data, developers.data, statuses.data)
      );
    }
  }, [locations.isSuccess, developers.isSuccess, statuses.isSuccess]);

  return (
    <>
      {mappedLocations.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex max-h-screen min-w-full flex-col items-center"
        >
          <table className="w-3/4 table-auto divide-y divide-gray-600 text-left text-sm">
            <thead>
              <tr>
                <th className="px-2 py-4">Obiekt</th>
                <th className="py-4">Status</th>
                <th className="hidden py-4 sm:block">
                  Data związana ze statusem
                </th>
                <th className="py-4 text-center">Wycinka</th>
                <th className="px-2 py-4 text-center">Nasadzenia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {mappedLocations.map((location: LocationInputs) => (
                <LocationRow key={location.locationId} {...location} />
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : locations.isLoading || locations.isSuccess ? (
        <WavingTrees />
      ) : (
        <h1>Nie zdefiniowałeś jeszcze żadnej inwestycji!</h1>
      )}
    </>
  );
};

export default Locations;
