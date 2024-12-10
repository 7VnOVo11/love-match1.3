import React from 'react';
import styles from './QuestionSection.module.css';
import { Question, Option } from '../../types';
import { useQuestions } from '../../hooks/useQuestions';

interface QuestionSectionProps {
  questionNumber: number;
  answer: string | null;
  onAnswerChange: (answer: string) => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  questionNumber,
  answer,
  onAnswerChange
}) => {
  const { questions } = useQuestions();
  const question = questions[questionNumber - 1];

  if (!question) return null;

  return (
    <div className={styles.container}>
      <div className={styles.questionHeader}>
        <div className={styles.dimension}>{question.dimension}</div>
        <h2 className={styles.title}>{question.title}</h2>
        {question.description && (
          <p className={styles.description}>{question.description}</p>
        )}
      </div>

      <div className={styles.options}>
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`${styles.option} ${
              answer === option.id ? styles.selected : ''
            }`}
            onClick={() => onAnswerChange(option.id)}
          >
            <div className={styles.optionContent}>
              <div className={styles.radioOuter}>
                <div className={styles.radioInner} />
              </div>
              <span className={styles.optionText}>{option.text}</span>
            </div>
            <div className={styles.selectionEffect} />
          </button>
        ))}
      </div>

      {question.required && (
        <div className={styles.requiredHint}>
          * 此题为必答题
        </div>
      )}
    </div>
  );
};

export default QuestionSection; 