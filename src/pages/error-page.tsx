import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="bold text-2xl">Aj, karramba!</p>
      <p className="py-2">
        To nie powinno tak wyglądać! Proszę skontaktować się z Bartoszem w celu
        usunięcia usterki.
      </p>
      <p className="text-sm">
        <span>komunikat błędu: </span>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
