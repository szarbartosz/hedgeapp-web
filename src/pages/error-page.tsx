import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="bold text-2xl">Oops!</p>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
