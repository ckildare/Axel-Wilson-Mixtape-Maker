import styles from './Card.module.scss';
import classNames from 'classnames';
import React from 'react';

export default function Card(props) {
  return (
    <div className={classNames(props.classNames, styles.cardWrapper)}>
      {props.children}
    </div>
  )
};