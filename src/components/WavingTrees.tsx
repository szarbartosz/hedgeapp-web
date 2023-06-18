import { motion } from 'framer-motion';
import React from 'react';
import treeIcon from '../assets/tree.png';

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const TreeVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};

const WavingTrees: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-row items-center justify-center px-6 sm:px-8 lg:px-10"
    >
      <motion.div
        initial="initial"
        animate="animate"
        className="flex h-8 flex-row"
        variants={ContainerVariants}
      >
        <motion.img
          src={treeIcon}
          variants={TreeVariants}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
        <motion.img
          src={treeIcon}
          variants={TreeVariants}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
        <motion.img
          src={treeIcon}
          variants={TreeVariants}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WavingTrees;
