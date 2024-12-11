import React from 'react';
import styles from './StepCard.module.css';

interface StepCardProps {
  step: {
    number: string;
    title: string;
    description: string;
    icon: string;
  };
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.content}>
        <span className={styles.number}>{step.number}</span>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{step.icon}</span>
        </div>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.description}>{step.description}</p>
      </div>
      <div className={styles.glassEffect} />
    </div>
  );
};

export default StepCard; 