import React from 'react';
import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signIn } from '../services/authService';
import { AuthInputs } from '../types/auth';
import { ErrorModal } from '../components/ErrorModal';
import treeIcon from '../assets/tree.png';

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<AuthInputs> = (credentials) => {
    mutation.mutate(credentials);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-6 sm:px-8 lg:px-10">
        <div className="w-full max-w-md space-y-8">
          {mutation.isError && (
            <ErrorModal
              errorTitle="Błąd logowania"
              errorMessage="Niepoprawny email lub hasło!"
            />
          )}
          <div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                className="mx-auto h-16 w-auto"
                src={treeIcon}
                alt="Drzewogram"
              />
            </motion.div>
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Zaloguj się!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Jesteś tu pierwszy raz?{' '}
                <NavLink to={'/register'}>
                  <a className="font-medium text-emerald-600 hover:text-emerald-700">
                    Zarejestruj się!
                  </a>
                </NavLink>
              </p>
            </motion.div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adres email
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  placeholder="Adres email"
                  {...register('email')}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Hasło
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  placeholder="Hasło"
                  {...register('password')}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Zaloguj
                </motion.div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
