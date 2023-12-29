import styles from './Button.module.scss';
import classNames from 'classnames';
import React from 'react';

const Button = ({
  text = '',
  type = 'primary',
  onClick = () => null,
  href = '',
  disabled
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
      disabled={disabled}
      onClick={() => onClick()}
      className={buttonClasses()}>
      {text}
    </button>
  );
};

export default Button;