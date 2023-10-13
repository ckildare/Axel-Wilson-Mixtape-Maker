import styles from './Card.module.scss';
import classNames from 'classnames';
import React from 'react';

export default function Card(props, type) {
  return (
    <div className={classNames(props.classNames, classNames(styles.cardWrapper, isInverted ? styles.cardNormal : styles.cardInverted))}>
      {props.children}
    </div>
  )
};