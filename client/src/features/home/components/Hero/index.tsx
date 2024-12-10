import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          找到你的完美匹配
        </h1>
        <p className={styles.subtitle}>
          基于AI的智能匹配系统，帮助你找到最适合的伴侣
        </p>
        <button className={styles.actionButton}>
          开始测评
        </button>
      </div>
      <div className={styles.background}>
        {/* 背景设计将在后续实现 */}
      </div>
    </section>
  );
};

export default Hero; 