import React, { useEffect } from 'react';
import styles from './NavigationControls.module.css';

interface NavigationControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentQuestion: number;
  totalQuestions: number;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  currentQuestion,
  totalQuestions
}) => {
  // 键盘导航支持
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && canGoNext) {
        onNext();
      } else if (event.key === 'ArrowLeft' && canGoPrevious) {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext, onPrevious, canGoNext, canGoPrevious]);

  return (
    <div className={styles.container}>
      <div className={styles.navigationInfo}>
        <span className={styles.questionIndicator}>
          {currentQuestion} / {totalQuestions}
        </span>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.previousButton}`}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          aria-label="上一题"
        >
          <span className={styles.buttonIcon}>←</span>
          <span className={styles.buttonText}>上一题</span>
        </button>

        <button
          className={`${styles.button} ${styles.nextButton}`}
          onClick={onNext}
          disabled={!canGoNext}
          aria-label={currentQuestion === totalQuestions ? "完成测评" : "下一题"}
        >
          <span className={styles.buttonText}>
            {currentQuestion === totalQuestions ? "完成测评" : "下一题"}
          </span>
          <span className={styles.buttonIcon}>→</span>
        </button>
      </div>

      <div className={styles.keyboardHint}>
        使用键盘 ← → 快速切换题目
      </div>
    </div>
  );
};

export default NavigationControls; 