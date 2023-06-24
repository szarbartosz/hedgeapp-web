import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DeveloperInputs } from '../types/rest';
import { useMutation } from '@tanstack/react-query';
import { addDeveloper } from '../services/restService';
import { useNavigate } from 'react-router-dom';
import excavatorIcon from '../assets/excavator.png';

const AddDeveloper: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeveloperInputs>();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addDeveloper,
    onSuccess: () => {
      navigate('/locations');
    },
  });

  const onSubmit: SubmitHandler<DeveloperInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="break-words py-4 text-center text-xl text-neutral-600">
        Zdefiniuj nowego dewelopera
      </p>
      <img
        src={excavatorIcon}
        alt="excavator icon"
        className="mx-auto mb-6 h-24 w-24"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-72 space-y-6 sm:w-96"
      >
        <div>
          <label
            htmlFor="locationName"
            className="block text-sm font-medium leading-6"
          >
            Nazwa dewelopera
          </label>
          <div className="mt-2">
            <input
              {...register('name', { required: true })}
              type="text"
              className={`${
                errors.name
                  ? 'ring-red-600 focus:ring-red-600'
                  : 'focus:ring-emerald-600'
              }
            sm:leading-6' block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset sm:text-sm`}
            />
            {errors.name && (
              <span className="block text-sm font-medium leading-6 text-red-600">
                To pole jest wymagane!
              </span>
            )}
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
  );
};

export default AddDeveloper;
