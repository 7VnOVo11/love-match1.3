import React from 'react';
import styles from './CompatibilityCard.module.css';

interface CompatibilityCardProps {
  title: string;
  score: number;
  description: string;
  icon: string;
}

export const CompatibilityCard: React.FC<CompatibilityCardProps> = ({
  title,
  score,
  description,
  icon,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.score}>
        <div className={styles.scoreValue}>{score}</div>
        <div className={styles.scoreBar}>
          <div 
            className={styles.scoreProgress} 
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}; 