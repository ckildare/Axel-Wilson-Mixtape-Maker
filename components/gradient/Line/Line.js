import React from 'react';
import classNames from 'classnames';
import styles from './Line.module.scss';

const Line = ({
  size = 1
}) => {

  const lineSize = (size) => {
    return {
      1: styles.lineSize1,
      2: styles.lineSize2,
      3: styles.lineSize3,
      4: styles.lineSize4
    }[size];
  };

  const lineWrapper = (size) => {
    return {
      1: styles.lineWrapperSize1,
      2: styles.lineWrapperSize2,
      3: styles.lineWrapperSize3,
      4: styles.lineWrapperSize4
    }[size];
  };

  return (
    <div className={classNames(styles.lineWrapper, lineWrapper(size))}>
      <div className={classNames(styles.line1, lineSize(size))} />
      <div className={classNames(styles.line2, lineSize(size))} />
      <div className={classNames(styles.line3, lineSize(size))} />
      <div className={classNames(styles.line4, lineSize(size))} />
    </div>
  );
};

export default Line;