import styles from './Button.module.scss';
import classNames from 'classnames';
import React from 'react';
import Link from 'next/link'

const Button = ({
  text = '',
  type = 'primary',
  onClick = () => null,
  href = '',
  ...props
}) => {
  return (
    <button
      href={href}
      onClick={() => onClick()}
      className={classNames(props.classNames,
        classNames(styles.buttonWrapper,
          {
            'primary': styles.primary,
            'secondary': styles.secondary,
            'tertiary': styles.tertiary
          }[type]
        ))}>
      {text}
    </button>
  )
};

export default Button;