import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      <p className={styles.text}>加载中...</p>
    </div>
  );
};

export default LoadingSpinner; 