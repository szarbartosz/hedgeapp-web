import trunkIcon from '../assets/404.png';

const PageNotFound: React.FC = () => {
  return (
    <div className="mt-10 flex h-96 flex-col items-center justify-center space-y-4">
      <img className="block h-16 w-auto" src={trunkIcon} alt="Jeżyk" />
      <h1 className="text-4xl text-neutral-600">błąd 404</h1>
      <h2 className="text-xl text-neutral-600">nie znaleziono strony!</h2>
    </div>
  );
};

export default PageNotFound;
