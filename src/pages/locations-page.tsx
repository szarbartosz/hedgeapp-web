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
import { NavLink } from 'react-router-dom';
import hedgehogIcon from '../assets/hedgehog.png';

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
  }, [
    locations.isSuccess,
    locations.data,
    developers.isSuccess,
    statuses.isSuccess,
  ]);

  return (
    <>
      {mappedLocations.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex max-h-screen min-w-full flex-col items-center"
        >
          <table className="min-w-full max-w-xs table-auto divide-y divide-gray-600 text-left text-sm">
            <thead>
              <tr>
                <th className="px-2 py-4">Obiekt</th>
                <th className="hidden py-4 sm:table-cell">Status</th>
                <th className="hidden py-4 sm:table-cell">
                  Data związana ze statusem
                </th>
                <th className="py-4 text-center">Wycinka</th>
                <th className="hidden py-4 sm:table-cell">Pozostały czas</th>
                <th className="px-2 py-4 text-center">Nasadzenia</th>
                <th className="hidden py-4 sm:table-cell">Pozostały czas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {mappedLocations.map((location: LocationInputs) => (
                <LocationRow key={location.locationId} {...location} />
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : locations.isLoading ? (
        <WavingTrees />
      ) : (
        <div className="flex h-96 w-72 flex-col items-center justify-center sm:w-full">
          <img
            className="my-4 block h-16 w-auto"
            src={hedgehogIcon}
            alt="wycinka wykonana"
          />
          <p className="break-words text-center text-xl text-neutral-600">
            Nie zdefiniowałeś jeszcze żadnej inwestycji!
          </p>
          <p className="text-md mt-2 text-center text-neutral-600">
            Chcesz to zmienić?{' '}
            <NavLink to={'/locations/add'}>
              <span className="font-medium text-emerald-600 hover:text-emerald-700">
                Dodaj nowy obiekt!
              </span>
            </NavLink>
          </p>
        </div>
      )}
    </>
  );
};

export default Locations;
