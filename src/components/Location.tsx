import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationInputs } from '../types/rest';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import trunksIcon from '../assets/trunks.png';
import forestIcon from '../assets/forest.png';
import soilIcon from '../assets/soil.png';
import plantIcon from '../assets/plant.png';

const Location: React.FC<LocationInputs> = ({
  locationId,
  locationName,
  status,
  issueDate,
  deforestationDone,
  plantingDone,
}) => {
  const displayDeforestationDone = () => {
    return deforestationDone ? (
      <img
        className="mx-auto block h-8 w-auto"
        src={trunksIcon}
        alt="wycinka wykonana"
      />
    ) : (
      <img
        className="mx-auto block h-8 w-auto"
        src={forestIcon}
        alt="oczekuje na wycinkę"
      />
    );
  };

  const displayPlantingDone = () => {
    return plantingDone ? (
      <img
        className="mx-auto block h-8 w-auto"
        src={plantIcon}
        alt="nasadzenia wykonane"
      />
    ) : (
      <img
        className="mx-auto block h-8 w-auto"
        src={soilIcon}
        alt="oczekuje na wykonanie nasadzeń"
      />
    );
  };

  return (
    <tr className="cursor-pointer hover:bg-neutral-200">
      <td className="p-2">{locationName}</td>
      <td className="py-2">{status}</td>
      <td className="py-2">{issueDate}</td>
      <td className="py-2">{displayDeforestationDone()}</td>
      <td className="py-2">{displayPlantingDone()}</td>
      <td className="p-2">
        <FontAwesomeIcon icon={faPencil} />
      </td>
    </tr>
  );
};

export default Location;
