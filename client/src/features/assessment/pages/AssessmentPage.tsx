import React, { useState } from 'react';
import styles from './AssessmentPage.module.css';
import IntroSection from '../components/IntroSection';
import QuestionSection from '../components/QuestionSection';
import ProgressBar from '../components/ProgressBar';
import NavigationControls from '../components/NavigationControls';
import { useAssessmentState } from '../hooks/useAssessmentState';

const AssessmentPage: React.FC = () => {
  const [isIntroCompleted, setIntroCompleted] = useState(false);
  const {
    currentQuestion,
    totalQuestions,
    progress,
    answers,
    setAnswer,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious
  } = useAssessmentState();

  if (!isIntroCompleted) {
    return <IntroSection onComplete={() => setIntroCompleted(true)} />;
  }

  return (
    <div className={styles.container}>
      <ProgressBar 
        progress={progress} 
        currentQuestion={currentQuestion} 
        totalQuestions={totalQuestions}
      />
      
      <main className={styles.main}>
        <QuestionSection
          questionNumber={currentQuestion}
          answer={answers[currentQuestion]}
          onAnswerChange={setAnswer}
        />
        
        <NavigationControls
          onNext={goToNext}
          onPrevious={goToPrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />
      </main>
    </div>
  );
};

export default AssessmentPage; 