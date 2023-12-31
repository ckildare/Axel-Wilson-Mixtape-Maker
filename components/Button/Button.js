import styles from './Button.module.scss';
import classNames from 'classnames';
import React from 'react';

const Button = ({
  text = '',
  type = 'primary',
  onClick = () => null,
  href = '',
  disabled,
  isLoading
}) => {
  const buttonClasses = () => {
    return classNames(disabled ? styles.disabled : '',
      classNames(styles.buttonWrapper,
        {
          'primary': styles.primary,
          'secondary': styles.secondary,
          'tertiary': styles.tertiary
        }[type]
      ));
  };
  return (
    <button
      href={href}
      disabled={disabled || isLoading}
      onClick={() => onClick()}
      className={buttonClasses()}>
      {isLoading ? <div className={styles.loader}><div/><div/><div/><div/><div/></div> : text}
    </button>
  );
};

export default Button;