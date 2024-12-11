'use client'

import React from 'react';
import styles from './QuestionSection.module.css';
import { Question } from '../../types';

interface Props {
  question: Question;
  selectedValue?: number;
  onSelect: (value: number) => void;
}

const QuestionSection: React.FC<Props> = ({ question, selectedValue, onSelect }) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionHeader}>
        <span className={styles.dimension}>{question.dimension}</span>
        <h2 className={styles.title}>{question.title}</h2>
        <p className={styles.description}>{question.description}</p>
      </div>

      <div className={styles.options}>
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`${styles.option} ${selectedValue === option.value ? styles.selected : ''}`}
            onClick={() => onSelect(option.value)}
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

      {question.required && !selectedValue && (
        <p className={styles.requiredHint}>* 请选择一个选项</p>
      )}
    </div>
  );
};

export default QuestionSection; 