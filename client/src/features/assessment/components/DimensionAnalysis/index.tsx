import React from 'react';
import styles from './DimensionAnalysis.module.css';

interface DimensionProps {
  dimension: {
    name: string;
    score: number;
    description: string;
    details: string;
  };
  index: number;
}

const DimensionAnalysis: React.FC<DimensionProps> = ({ dimension, index }) => {
  return (
    <div 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.header}>
        <div className={styles.scoreSection}>
          <div className={styles.score}>
            {dimension.score}
            <span className={styles.maxScore}>/100</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${dimension.score}%` }}
            />
          </div>
        </div>
        <h3 className={styles.name}>{dimension.name}</h3>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          {dimension.description}
        </p>
        <div className={styles.divider} />
        <p className={styles.details}>
          {dimension.details}
        </p>
      </div>
    </div>
  );
};

export default DimensionAnalysis; 