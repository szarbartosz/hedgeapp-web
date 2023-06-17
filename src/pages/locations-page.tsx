import { useEffect, useState } from 'react';
import { LocationInputs, LocationType } from '../types/rest';
import {
  fetchDevelopers,
  fetchLocations,
  fetchStatuses,
} from '../services/restService';
import Location from '../components/Location';
import { useQuery } from '@tanstack/react-query';
import { mapLocation } from '../mappers/locationMapper';
import WavingTrees from '../components/WavingTrees';
import { motion } from 'framer-motion';

const Locations: React.FC = () => {
  const [mappedLocations, setMappedLocations] = useState<LocationInputs[]>([]);

  const developers = useQuery(['developers'], fetchDevelopers);
  const statuses = useQuery(['statuses'], fetchStatuses);
  const locations = useQuery(['locations'], fetchLocations);

  useEffect(() => {
    if (developers.isSuccess && locations.isSuccess) {
      fetchLocations().then((locations) => {
        setMappedLocations(
          locations.map((location: LocationType) =>
            mapLocation(location, developers.data, statuses.data)
          )
        );
      });
    }
  }, [developers, statuses]);

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
                <th className="py-4">Data związana ze statusem</th>
                <th className="py-4 text-center">Wycinka</th>
                <th className="px-2 py-4 text-center">Nasadzenia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {mappedLocations.map((location: LocationInputs) => (
                <Location {...location} />
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
