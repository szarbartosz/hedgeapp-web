import { LocationInputs } from '../types/rest';
import { useNavigate } from 'react-router-dom';
import DeforestationIndicator from './DeforestationIndicator';
import PlantingIndicator from './PlantingIndicator';
import { PencilIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../services/locationMapper';
import DaysLeft from './DaysLeft';

const LocationRow: React.FC<LocationInputs> = ({
  locationId,
  locationName,
  status,
  issueDate,
  deforestationDone,
  deforestationDate,
  plantingDone,
  plantingDate,
}) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`${locationId}`);
  };

  const navigateToEdit = () => {
    navigate(`/locations/${locationId}/edit`);
  };

  return (
    <tr className="cursor-pointer hover:bg-neutral-200">
      <td className="p-2" onClick={navigateToDetails}>
        {locationName}
      </td>
      <td className="hidden py-2 sm:table-cell" onClick={navigateToDetails}>
        {status}
      </td>
      <td className="hidden py-2 sm:table-cell" onClick={navigateToDetails}>
        {issueDate ? formatDate(issueDate) : 'Nie sprecyzowano'}
      </td>
      <td className="py-2" onClick={navigateToDetails}>
        <DeforestationIndicator deforestationDone={deforestationDone} justify />
      </td>
      <td className="hidden py-2 sm:table-cell" onClick={navigateToDetails}>
        <DaysLeft deadline={deforestationDate} />
      </td>
      <td className="py-2" onClick={navigateToDetails}>
        <PlantingIndicator plantingDone={plantingDone} justify />
      </td>
      <td className="hidden py-2 sm:table-cell" onClick={navigateToDetails}>
        <DaysLeft deadline={plantingDate} />
      </td>
      <td
        className="hidden py-2 hover:bg-neutral-300 sm:table-cell"
        onClick={navigateToEdit}
      >
        <PencilIcon className="mx-auto h-5 w-5" />
      </td>
    </tr>
  );
};

export default LocationRow;
