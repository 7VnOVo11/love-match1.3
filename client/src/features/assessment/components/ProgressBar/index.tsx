import React, { useMemo } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  currentQuestion,
  totalQuestions
}) => {
  const remainingTime = useMemo(() => {
    const averageTimePerQuestion = 1; // 平均每题1分钟
    const remainingQuestions = totalQuestions - currentQuestion + 1;
    return remainingQuestions * averageTimePerQuestion;
  }, [currentQuestion, totalQuestions]);

  return (
    <div className={styles.container}>
      <div className={styles.progressInfo}>
        <div className={styles.questionCount}>
          <span className={styles.current}>{currentQuestion}</span>
          <span className={styles.total}>/ {totalQuestions}</span>
        </div>
        <div className={styles.timeEstimate}>
          预计剩余时间：约 {remainingTime} 分钟
        </div>
      </div>

      <div className={styles.progressBarWrapper}>
        <div 
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        >
          <div className={styles.progressGlow} />
        </div>
      </div>

      <div className={styles.progressPercentage}>
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressBar; 