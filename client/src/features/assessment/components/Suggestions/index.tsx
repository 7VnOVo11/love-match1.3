import React from 'react';
import styles from './Suggestions.module.css';

interface SuggestionsProps {
  suggestions: string[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>改善建议</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className={styles.item}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.bullet}>
                {index + 1}
              </div>
              <p>{suggestion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Suggestions; 