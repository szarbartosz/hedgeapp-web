import soilIcon from '../assets/soil.png';
import plantIcon from '../assets/plant.png';

type PlantingIndicatorProps = {
  plantingDone: boolean;
  justify?: boolean;
};

const PlantingIndicator: React.FC<PlantingIndicatorProps> = ({
  plantingDone,
  justify,
}) =>
  plantingDone ? (
    <img
      className={`${justify ? 'mx-auto' : ''} block h-8 w-auto`}
      src={plantIcon}
      alt="nasadzenia wykonane"
    />
  ) : (
    <img
      className={`${justify ? 'mx-auto' : ''} block h-8 w-auto`}
      src={soilIcon}
      alt="oczekuje na wykonanie nasadzeń"
    />
  );

export default PlantingIndicator;
