'use client'

import React, { useEffect } from 'react';
import styles from './AssessmentPage.module.css';
import { useQuestions } from '../hooks/useQuestions';
import { useAssessmentState } from '../hooks/useAssessmentState';
import ProgressBar from '../components/ProgressBar';
import QuestionSection from '../components/QuestionSection';
import NavigationControls from '../components/NavigationControls';

const AssessmentPage: React.FC = () => {
  const { questions, totalQuestions } = useQuestions();
  const { 
    currentQuestion,
    answers,
    step,
    error,
    setAnswer,
    goToNext,
    goToPrevious,
    progress,
    canGoNext,
    canGoPrevious,
    isSubmitting
  } = useAssessmentState();

  const currentQuestionData = questions[currentQuestion - 1];

  useEffect(() => {
    console.log('Questions:', questions);
    console.log('Current Question:', currentQuestion);
    console.log('Current Question Data:', currentQuestionData);
  }, [questions, currentQuestion, currentQuestionData]);

  if (!currentQuestionData) {
    console.warn('No question data found for index:', currentQuestion - 1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.stepIndicator}>
        {step === 'self' ? '第一步：你的答案' : '第二步：伴侣的答案'}
      </div>
      <ProgressBar 
        current={currentQuestion} 
        total={totalQuestions}
        progress={progress}
      />
      
      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <QuestionSection
          question={questions[currentQuestion - 1]}
          selectedValue={answers[currentQuestion]?.value}
          onSelect={setAnswer}
          disabled={isSubmitting}
        />

        <NavigationControls
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  );
};

export default AssessmentPage; 