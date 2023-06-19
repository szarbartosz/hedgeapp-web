import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationInputs } from '../types/rest';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeforestationIndicator from './DeforestationIndicator';
import PlantingIndicator from './PlantingIndicator';

const LocationRow: React.FC<LocationInputs> = ({
  locationId,
  locationName,
  status,
  issueDate,
  deforestationDone,
  plantingDone,
}) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`${locationId}`);
  };

  const navigateToEdit = () => {
    navigate(`/edit/locations/${locationId}`);
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
        {issueDate ? issueDate : 'Nie sprecyzowano'}
      </td>
      <td className="py-2" onClick={navigateToDetails}>
        <DeforestationIndicator deforestationDone={deforestationDone} justify />
      </td>
      <td className="py-2" onClick={navigateToDetails}>
        <PlantingIndicator plantingDone={plantingDone} justify />
      </td>
      <td className="hidden py-2 sm:table-cell" onClick={navigateToEdit}>
        <FontAwesomeIcon icon={faPencil} />
      </td>
    </tr>
  );
};

export default LocationRow;
