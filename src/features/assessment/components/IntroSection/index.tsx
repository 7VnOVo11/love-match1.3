import React from 'react';
import styles from './IntroSection.module.css';

interface IntroSectionProps {
  onComplete: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onComplete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>开始你的匹配之旅</h1>
        
        <div className={styles.infoCards}>
          <div className={styles.card}>
            <span className={styles.icon}>⏱️</span>
            <h3>预计用时</h3>
            <p>约10-15分钟完成测评</p>
          </div>
          
          <div className={styles.card}>
            <span className={styles.icon}>🔒</span>
            <h3>隐私保护</h3>
            <p>所有数据严格加密保存</p>
          </div>
          
          <div className={styles.card}>
            <span className={styles.icon}>📊</span>
            <h3>专业报告</h3>
            <p>AI深度分析匹配结果</p>
          </div>
        </div>

        <div className={styles.instructions}>
          <h2>测评说明</h2>
          <ul>
            <li>题目总数：15道</li>
            <li>题型：单选题</li>
            <li>可以随时保存进度</li>
            <li>请如实回答，确保匹配准确性</li>
          </ul>
        </div>
        
        <button 
          className={styles.startButton}
          onClick={onComplete}
        >
          开始测评
        </button>
      </div>
    </div>
  );
};

export default IntroSection; 