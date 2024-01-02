import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ children, isLoading }) => {
  return (
    isLoading ? <div className={styles.isLoading} /> : children
  );
};

export default Loader;