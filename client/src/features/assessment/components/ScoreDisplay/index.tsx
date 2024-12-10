import React from 'react';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const getScoreLevel = (score: number) => {
    if (score >= 90) return '完美匹配';
    if (score >= 80) return '极佳匹配';
    if (score >= 70) return '良好匹配';
    return '一般匹配';
  };

  return (
    <div className={styles.container}>
      <div className={styles.scoreCircle}>
        <div className={styles.scoreContent}>
          <span className={styles.scoreNumber}>{score}</span>
          <span className={styles.scoreMax}>/100</span>
        </div>
        <div className={styles.scoreLevel}>
          {getScoreLevel(score)}
        </div>
      </div>
      <h1 className={styles.title}>
        你们的总体契合度评分
      </h1>
      <p className={styles.description}>
        基于AI深度分析，从多个维度评估你们的匹配程度
      </p>
    </div>
  );
};

export default ScoreDisplay; 