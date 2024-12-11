'use client'

import React from 'react';
import styles from './NavigationControls.module.css';

interface Props {
  currentQuestion: number;
  totalQuestions: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted?: boolean;
}

const NavigationControls: React.FC<Props> = ({
  currentQuestion,
  totalQuestions,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
  isCompleted
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.navigationInfo}>
        <span className={styles.questionIndicator}>
          {currentQuestion} / {totalQuestions}
        </span>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.previousButton}
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          上一题
        </button>
        <button
          className={styles.nextButton}
          onClick={onNext}
          disabled={!canGoNext}
        >
          {isCompleted ? '完成测评' : '下一题'}
        </button>
      </div>

      <div className={styles.keyboardHint}>
        使用键盘 ← → 也可以切换题目
      </div>
    </div>
  );
};

export default NavigationControls; 