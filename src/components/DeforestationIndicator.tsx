import trunksIcon from '../assets/trunks.png';
import forestIcon from '../assets/forest.png';

type DeforestationIndicatorProps = {
  deforestationDone: boolean;
  justify?: boolean;
};

const DeforestationIndicator: React.FC<DeforestationIndicatorProps> = ({
  deforestationDone,
  justify,
}) =>
  deforestationDone ? (
    <img
      className={`${justify ? 'mx-auto' : ''} block h-8 w-auto`}
      src={trunksIcon}
      alt="wycinka wykonana"
    />
  ) : (
    <img
      className={`${justify ? 'mx-auto' : ''} block h-8 w-auto`}
      src={forestIcon}
      alt="oczekuje na wycinkę"
    />
  );

export default DeforestationIndicator;
