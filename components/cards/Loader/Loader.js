import React, { useEffect } from 'react';
import styles from './Loader.module.scss';

const Loader = ({ children, isLoading }) => {
  useEffect(() => {
    console.info('isReccsLoading: ', isLoading);
  }, [isLoading]);

  return (
    isLoading ? <div className={styles.isLoading} /> : children
  );
};

export default Loader;