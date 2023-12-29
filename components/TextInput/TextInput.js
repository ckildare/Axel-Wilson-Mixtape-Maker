import styles from './TextInput.module.scss';
import classNames from 'classnames';
import React, { useState } from 'react';

const TextInput = ({
  type = 'primary',
  placeHolder = '',
  onChange,
  maxLength = 100,
  required,
  disabled,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const changeInput = (value) => {
    setInputValue(value);
    onChange(value);
  };

  return (
    <input
      type={'text'}
      value={inputValue}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      placeholder={placeHolder}
      onChange={(e => changeInput(e.target.value))}
      className={classNames(props.classNames,
        classNames(styles.textAreaWrapper,
          {
            'primary': styles.primary,
            'secondary': styles.secondary,
            'tertiary': styles.tertiary
          }[type]
        ))}
    />
  );
};

export default TextInput;