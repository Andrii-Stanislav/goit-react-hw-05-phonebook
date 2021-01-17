import React from 'react';

import styles from './Alert.module.css';

const Alert = ({ text }) => {
  return <div className={styles.alert}>{text}</div>;
};

export default Alert;
