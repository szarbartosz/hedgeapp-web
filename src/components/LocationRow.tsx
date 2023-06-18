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

  return (
    <tr
      className="cursor-pointer hover:bg-neutral-200"
      onClick={() => navigate(`${locationId}`)}
    >
      <td className="p-2">{locationName}</td>
      <td className="py-2">{status}</td>
      <td className="hidden py-2 sm:block">{issueDate}</td>
      <td className="py-2">
        <DeforestationIndicator deforestationDone={deforestationDone} justify />
      </td>
      <td className="py-2">
        <PlantingIndicator plantingDone={plantingDone} justify />
      </td>
      <td className="p-2">
        <FontAwesomeIcon icon={faPencil} />
      </td>
    </tr>
  );
};

export default LocationRow;
