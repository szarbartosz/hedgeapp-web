import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchDevelopers,
  fetchLocation,
  fetchStatuses,
} from '../services/restService';
import { LocationInputs } from '../types/rest';
import { useEffect, useState } from 'react';
import { mapLocation } from '../services/locationMapper';
import DeforestationIndicator from '../components/DeforestationIndicator';
import PlantingIndicator from '../components/PlantingIndicator';

const Location: React.FC = () => {
  const { locationId } = useParams();

  const [mappedLocation, setMappedLocation] = useState<LocationInputs>(
    {} as LocationInputs
  );

  const developers = useQuery(['developers'], fetchDevelopers);
  const statuses = useQuery(['statuses'], fetchStatuses);
  const location = useQuery(['location', locationId], () =>
    fetchLocation(locationId)
  );

  useEffect(() => {
    if (location.isSuccess && developers.isSuccess && statuses.isSuccess) {
      setMappedLocation(
        mapLocation(location.data, developers.data, statuses.data)
      );
    }
  }, [location.isSuccess, developers.isSuccess, statuses.isSuccess]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex max-h-screen min-w-full flex-col items-center"
      >
        <table className="w-3/4 table-auto divide-y divide-gray-600 text-left text-sm">
          <tbody className="divide-y divide-gray-600">
            <tr>
              <th className="w-1/2 p-4 text-right">Obiekt</th>
              <td className="py-2">{mappedLocation.locationName}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Deweloper</th>
              <td className="py-2">{mappedLocation.developer}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Status</th>
              <td className="py-2">{mappedLocation.status}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Data zgłoszenia wniosku</th>
              <td className="py-2">{mappedLocation.issueDate}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Data oględzin</th>
              <td className="py-2">{mappedLocation.inspectionDate}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Data wydania decyzji</th>
              {/* TODO - add date */}
              <td className="py-2">-</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Wycinka</th>
              <td className="py-2">
                <DeforestationIndicator
                  deforestationDone={mappedLocation.deforestationDone}
                />
              </td>
            </tr>
            <tr>
              <th className="p-4 text-right">Czas do wycinki</th>
              <td className="py-2">{mappedLocation.deforestationDate}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Nasadzenia zastępcze</th>
              <td className="py-2">
                <PlantingIndicator plantingDone={mappedLocation.plantingDone} />
              </td>
            </tr>
            <tr>
              <th className="p-4 text-right">
                Czas do wykonania nasadzeń zastępczych
              </th>
              <td className="py-2">{mappedLocation.plantingDate}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default Location;
