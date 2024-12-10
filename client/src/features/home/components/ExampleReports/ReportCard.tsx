import React from 'react';
import styles from './ReportCard.module.css';

interface ReportCardProps {
  report: {
    title: string;
    description: string;
    score: number;
    matchType: string;
  };
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <div className={styles.card}>
      <div className={styles.scoreCircle}>
        <span className={styles.score}>{report.score}</span>
        <span className={styles.maxScore}>/100</span>
      </div>
      <h3 className={styles.title}>{report.title}</h3>
      <p className={styles.description}>{report.description}</p>
      <div className={styles.matchType}>{report.matchType}</div>
    </div>
  );
};

export default ReportCard; 