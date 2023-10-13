import styles from './Button.module.scss';
import classNames from 'classnames';
import React from 'react';
import Link from 'next/link'

export default function Button({
  text = '',
  type = 'primary',
  href = '',
  ...props
}) {
  return (
    <Link
      href={href}
      className={classNames(props.classNames,
        classNames(styles.buttonWrapper,
          {
            'primary': styles.primary,
            'secondary': styles.secondary,
            'tertiary': styles.tertiary
          }[type]
        ))}>
      {text}
    </Link>
  )
};