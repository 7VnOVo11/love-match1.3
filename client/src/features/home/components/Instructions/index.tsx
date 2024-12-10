import React from 'react';
import styles from './Instructions.module.css';
import Section from '../Section';
import StepCard from './StepCard';

const Instructions: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: '开始测评',
      description: '简单填写基本信息，开启你的匹配之旅',
      icon: '👤'
    },
    {
      number: '02', 
      title: '回答问题',
      description: '完成精心设计的测评问题，展现真实的自己',
      icon: '✍️'
    },
    {
      number: '03',
      title: 'AI分析',
      description: '智能算法深度分析你的性格特征和价值观',
      icon: '🤖'
    },
    {
      number: '04',
      title: '查看报告',
      description: '获取专业的匹配报告，找到最适合的伴侣类型',
      icon: '📊'
    }
  ];

  return (
    <Section
      title="简单四步"
      subtitle="轻松完成测评，开启你的心动之旅"
      className={styles.instructions}
    >
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <StepCard 
            key={step.number}
            step={step}
            className={styles.stepCard}
          />
        ))}
      </div>
    </Section>
  );
};

export default Instructions; 