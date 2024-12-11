import React from 'react';
import styles from './ExampleReports.module.css';
import Section from '../Section';
import ReportCard from './ReportCard';

const ExampleReports: React.FC = () => {
  const reports = [
    {
      id: 1,
      title: '性格匹配报告',
      description: '深入分析性格特征,找到最适合的伴侣类型',
      score: 85,
      matchType: '理想匹配'
    },
    {
      id: 2,
      title: '价值观报告',
      description: '价值观契合度分析,确保长期关系稳定',
      score: 92,
      matchType: '完美匹配'
    }
  ];

  return (
    <Section
      title="测评报告示例"
      subtitle="通过AI分析,为你生成专业的匹配报告"
    >
      <div className={styles.reportsGrid}>
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </Section>
  );
};

export default ExampleReports; 