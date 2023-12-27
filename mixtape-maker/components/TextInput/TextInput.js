import styles from './TextInput.module.scss';
import classNames from 'classnames';
import React from 'react';
import Link from 'next/link'

export default function TextInput({
  type = 'primary',
  placeHolder = '',
  returnInputtedText = '',
  rowNumber = 1,
  maxLength = 100,
  required,
  disabled,
  ...props
}) {
  return (
    <textarea
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      placeholder={placeHolder}
      onChange={(e => { () => { returnInputtedText = e.target.value } })}
      className={classNames(props.classNames,
        classNames(styles.textAreaWrapper,
          {
            'primary': styles.primary,
            'secondary': styles.secondary,
            'tertiary': styles.tertiary
          }[type]
        ))}
    />
  )
};