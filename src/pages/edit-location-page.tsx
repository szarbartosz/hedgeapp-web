import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DeveloperType, LocationInputs, StatusType } from '../types/rest';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchDevelopers,
  fetchLocation,
  fetchStatuses,
  updateLocation,
} from '../services/restService';
import { useNavigate, useParams } from 'react-router-dom';
import WavingTrees from '../components/WavingTrees';

const EditLocation: React.FC = () => {
  const { locationId } = useParams();

  const developers = useQuery(['developers'], fetchDevelopers);
  const statuses = useQuery(['statuses'], fetchStatuses);

  const formatDate = (date: string): string =>
    !!date ? new Date(date).toISOString().split('T')[0] : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationInputs>({
    defaultValues: async () => {
      const loc = await fetchLocation(locationId);
      console.log(loc);

      return {
        locationId: loc.id,
        locationName: loc.name,
        developer: loc.developer_id,
        status: loc.status_id,
        issueDate: formatDate(loc.issue_date),
        inspectionDate: formatDate(loc.inspection_date),
        deforestationDate: formatDate(loc.deforestation_date),
        plantingDate: formatDate(loc.planting_date),
        deforestationDone: loc.deforestation_done,
        plantingDone: loc.planting_done,
      };
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateLocation,
    onSuccess: () => {
      navigate(`/locations/${locationId}`);
    },
  });

  const onSubmit: SubmitHandler<LocationInputs> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <>
      {developers.isSuccess && statuses.isSuccess ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-72 space-y-6 sm:w-full"
          >
            <div>
              <label
                htmlFor="locationName"
                className="block text-sm font-medium leading-6"
              >
                Nazwa obiektu
              </label>
              <div className="mt-2">
                <input
                  {...register('locationName', { required: true })}
                  type="text"
                  className={`${
                    errors.locationName
                      ? 'ring-red-600 focus:ring-red-600'
                      : 'focus:ring-emerald-600'
                  }
            sm:leading-6' block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset sm:text-sm`}
                />
                {errors.locationName && (
                  <span className="block text-sm font-medium leading-6 text-red-600">
                    To pole jest wymagane!
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="developer"
                className="block text-sm font-medium leading-6"
              >
                Deweloper
              </label>
              <div className="mt-2">
                <select
                  defaultValue=""
                  {...register('developer', { required: true })}
                  className={`${
                    errors.developer
                      ? 'ring-red-600 focus:ring-red-600'
                      : 'focus:ring-emerald-600'
                  }
            block w-full cursor-pointer rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6`}
                >
                  <option disabled value="">
                    wybierz dewelopera
                  </option>
                  {developers.data.map((developer: DeveloperType) => (
                    <option key={developer.id} value={developer.id}>
                      {developer.name}
                    </option>
                  ))}
                </select>
                {errors.developer && (
                  <span className="block text-sm font-medium leading-6 text-red-600">
                    To pole jest wymagane!
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6"
              >
                Status
              </label>
              <div className="mt-2">
                <select
                  defaultValue=""
                  {...register('status', { required: true })}
                  className={`${
                    errors.status
                      ? 'ring-red-600 focus:ring-red-600'
                      : 'focus:ring-emerald-600'
                  }
            block w-full cursor-pointer rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6`}
                >
                  <option disabled value="">
                    wybierz status
                  </option>
                  {statuses.data.map((status: StatusType) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <span className="block text-sm font-medium leading-6 text-red-600">
                    To pole jest wymagane!
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="issueDate"
                className="block text-sm font-medium leading-6"
              >
                Data zgłoszenia wniosku
              </label>
              <div className="mt-2">
                <input
                  {...register('issueDate')}
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inspectionDate"
                className="block text-sm font-medium leading-6"
              >
                Data oględzin
              </label>
              <div className="mt-2">
                <input
                  {...register('inspectionDate')}
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="deforestationDate"
                className="block text-sm font-medium leading-6"
              >
                Termin wycinki
              </label>
              <div className="mt-2">
                <input
                  {...register('deforestationDate')}
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="plantingDate"
                className="block text-sm font-medium leading-6"
              >
                Termin nasadzeń
              </label>
              <div className="mt-2">
                <input
                  {...register('plantingDate')}
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  {...register('deforestationDone')}
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="deforestationDone" className="font-medium">
                  Wycinka wykonana
                </label>
                <p className="text-neutral-500">
                  Zaznacz to pole, jeżeli wycinka została już wykonana.
                </p>
              </div>
            </div>

            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  {...register('plantingDone')}
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="plantingDone" className="font-medium">
                  Nasadzenia wykonane
                </label>
                <p className="text-neutral-500">
                  Zaznacz to pole, jeżeli nasadzenia zostały już wykonane.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Zapisz
              </motion.div>
            </button>
          </form>
        </motion.div>
      ) : developers.isLoading ||
        developers.isSuccess ||
        statuses.isLoading ||
        statuses.isSuccess ? (
        <WavingTrees />
      ) : (
        <h1>Wystąpił błąd!</h1>
      )}
    </>
  );
};

export default EditLocation;
