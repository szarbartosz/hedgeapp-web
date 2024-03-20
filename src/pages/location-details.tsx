import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteLocation,
  fetchDevelopers,
  fetchLocation,
  fetchStatuses,
} from '../services/restService';
import { LocationInputs } from '../types/rest';
import { useEffect, useState } from 'react';
import { formatDate, mapLocation } from '../services/locationMapper';
import DeforestationIndicator from '../components/DeforestationIndicator';
import PlantingIndicator from '../components/PlantingIndicator';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '../components/ConfirmationModal';
import DaysLeft from '../components/DaysLeft';

const Location: React.FC = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();

  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [mappedLocation, setMappedLocation] = useState<LocationInputs>(
    {} as LocationInputs
  );

  const developers = useQuery(['developers'], fetchDevelopers);
  const statuses = useQuery(['statuses'], fetchStatuses);
  const location = useQuery(['location', locationId], () =>
    fetchLocation(locationId)
  );

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      navigate(`/locations`);
    },
  });

  useEffect(() => {
    if (location.isSuccess && developers.isSuccess && statuses.isSuccess) {
      setMappedLocation(
        mapLocation(location.data, developers.data, statuses.data)
      );
    }
  }, [location.isSuccess, developers.isSuccess, statuses.isSuccess]);

  return (
    <>
      {deleteMode && (
        <ConfirmationModal
          isOpen={deleteMode}
          onCancel={() => setDeleteMode(false)}
          onConfirm={() => deleteMutation.mutate(locationId)}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex max-h-screen min-w-full flex-col items-center"
      >
        <table className="min-w-full max-w-xs table-auto divide-y divide-gray-600 text-left text-sm sm:min-w-max">
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
              <td className="py-2">{formatDate(mappedLocation.issueDate)}</td>
            </tr>
            <tr>
              <th className="p-4 text-right">Data oględzin</th>
              <td className="py-2">
                {formatDate(mappedLocation.inspectionDate)}
              </td>
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
              <td className="py-2">
                <DaysLeft deadline={mappedLocation.deforestationDate} />
              </td>
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
              <td className="py-2">
                <DaysLeft deadline={mappedLocation.plantingDate} />
              </td>
            </tr>
            <tr className="bg-neutral-200">
              <th
                className="cursor-pointer p-8 hover:bg-neutral-300"
                onClick={() => navigate(`/locations/${locationId}/edit`)}
              >
                <div className="flex content-center justify-center">
                  <p>Edytuj</p>
                  <PencilIcon className="mx-2 h-5 w-5" />
                </div>
              </th>
              <th
                className="cursor-pointer p-8 hover:bg-neutral-300"
                onClick={() => setDeleteMode(true)}
              >
                <div className="flex content-center justify-center">
                  <p>Usuń</p>
                  <TrashIcon className="mx-2 h-5 w-5" />
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default Location;
