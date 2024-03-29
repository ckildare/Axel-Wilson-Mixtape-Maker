import styles from './Card.module.scss';
import classNames from 'classnames';
import React from 'react';

const Card = ({
  isInverted,
  ...props
}) => {
  return (
    <div className={classNames(props.className, classNames(styles.cardWrapper, !isInverted ? styles.cardNormal : styles.cardInverted))}>
      {props.children}
    </div>
  );
};

export default Card;