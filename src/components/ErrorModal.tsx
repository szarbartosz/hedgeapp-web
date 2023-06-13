import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type ErrorModalProps = {
  errorTitle: string;
  errorMessage: string;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({
  errorTitle,
  errorMessage,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <div
          className="fixed top-20 w-full max-w-md border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
          role="alert"
        >
          <p className="font-bold">{errorTitle}</p>
          <p>{errorMessage}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
