import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import treeIcon from '../assets/tree.png';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Lista obiektów', href: '/locations' },
  { name: 'Dodaj obiekt', href: '/locations/add' },
  { name: 'Dodaj dewelopera', href: '/developers/add' },
  { name: 'Ustawienia', href: '/settings' },
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed top-0 z-10 w-full">
      <Disclosure as="nav" className="bg-neutral-100 shadow-md">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <motion.div
                  whileHover={{
                    scale: 0.9,
                    transition: { duration: 0.4 },
                  }}
                  className="absolute inset-y-0 left-0 flex items-center sm:hidden"
                >
                  <Disclosure.Button className="inline-flex w-9 items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-emerald-600 hover:text-neutral-100 focus:outline-none">
                    <span className="sr-only">Open main menu</span>

                    {open ? (
                      <XMarkIcon className="mx-auto h-6 w-6" />
                    ) : (
                      <Bars3Icon className="mx-auto h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </motion.div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={treeIcon}
                      alt="Jeżyk"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={treeIcon}
                      alt="Jeżyk"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          className={classNames(
                            item.href === pathname
                              ? 'text-emerald-600'
                              : 'text-neutral-600 hover:text-emerald-600',
                            'rounded-md px-3 py-2 text-base font-medium'
                          )}
                          aria-current={
                            item.href === pathname ? 'page' : undefined
                          }
                        >
                          <Link to={item.href}>{item.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      item.href === pathname
                        ? 'text-emerald-600'
                        : 'text-neutral-600 hover:text-emerald-600',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.href === pathname ? 'page' : undefined}
                  >
                    <div>
                      <Link to={item.href}>{item.name}</Link>
                    </div>
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
