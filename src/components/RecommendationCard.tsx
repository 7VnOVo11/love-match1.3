import React from 'react';
import styles from './RecommendationCard.module.css';

interface RecommendationCardProps {
  type: 'strength' | 'challenge';
  title: string;
  content: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  type,
  title,
  content,
}) => {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.header}>
        <span className={styles.icon}>
          {type === 'strength' ? '💪' : '🎯'}
        </span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
}; 