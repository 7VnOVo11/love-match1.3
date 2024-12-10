import React from 'react';
import styles from './ResultPage.module.css';
import ScoreDisplay from '../components/ScoreDisplay';
import DimensionAnalysis from '../components/DimensionAnalysis';
import Suggestions from '../components/Suggestions';
import ShareSection from '../components/ShareSection';

const ResultPage: React.FC = () => {
  // 模拟结果数据
  const result = {
    totalScore: 85,
    dimensions: [
      {
        name: '性格匹配度',
        score: 88,
        description: '你们的性格特征高度互补，能够在关系中相互成长。',
        details: '你偏外向开朗，善于表达；对方性格较为沉稳，擅长倾听。这种互补的性格特征有助于建立良好的沟通基础。'
      },
      {
        name: '价值观契合度',
        score: 92,
        description: '你们在人生重要议题上持有相似的价值观。',
        details: '在家庭、事业、生活方式等关键问题上，你们的理念高度一致，这将有助于减少未来可能的分歧。'
      },
      {
        name: '生活习惯相容度',
        score: 75,
        description: '日常生��习惯存在一定差异，但在可接受范围内。',
        details: '虽然在作息时间和生活节奏上有所不同，但双方都展现出了良好的包容性和适应能力。'
      }
    ],
    suggestions: [
      '建议在日常交流中多表达感受，加深情感连接',
      '可以一起制定共同的生活计划，增进默契',
      '注意在差异点上相互理解和包容',
      '培养共同的兴趣爱好，创造更多共处时光'
    ]
  };

  return (
    <div className={styles.container}>
      <ScoreDisplay score={result.totalScore} />
      
      <section className={styles.analysisSection}>
        <h2 className={styles.sectionTitle}>维度分析</h2>
        <div className={styles.dimensionsGrid}>
          {result.dimensions.map((dimension, index) => (
            <DimensionAnalysis
              key={dimension.name}
              dimension={dimension}
              index={index}
            />
          ))}
        </div>
      </section>

      <Suggestions suggestions={result.suggestions} />
      
      <ShareSection />

      <button 
        className={styles.retakeButton}
        onClick={() => window.location.href = '/assessment'}
      >
        重新测评
      </button>
    </div>
  );
};

export default ResultPage; 