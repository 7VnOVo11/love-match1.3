'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ShareButton } from '@/components/ShareButton';
import { RadarChart } from '@/components/RadarChart';
import { CompatibilityCard } from '@/components/CompatibilityCard';
import { RecommendationCard } from '@/components/RecommendationCard';

export default function ResultPage() {
  const params = useParams();
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/result/${params.id}`);
        if (!response.ok) {
          throw new Error('获取结果失败');
        }
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [params.id]);

  if (loading) {
    return <div className={styles.loading}>正在加载结果...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!result) {
    return <div className={styles.error}>未找到结果</div>;
  }

  return (
    <div className={styles.container}>
      {/* 主要分数展示 */}
      <div className={styles.scoreSection}>
        <h1 className={styles.title}>匹配度分析报告</h1>
        <div className={styles.scoreCard}>
          <div className={styles.scoreCircle}>
            <div className={styles.scoreNumber}>{result.totalScore}</div>
            <div className={styles.scoreLabel}>总体匹配度</div>
          </div>
          <div className={styles.scoreDescription}>
            <h3>{getMatchLevelTitle(result.totalScore)}</h3>
            <p>{getMatchLevelDescription(result.totalScore)}</p>
          </div>
        </div>
      </div>

      {/* 维度分析 */}
      <div className={styles.dimensionsSection}>
        <h2>维度分析</h2>
        <div className={styles.radarChartWrapper}>
          <RadarChart
            data={result.dimensions.map(dim => ({
              name: dim.name.replace('度', ''),
              value: dim.score
            }))}
          />
        </div>
        <div className={styles.dimensionCards}>
          {result.dimensions?.map((dim: any) => (
            <CompatibilityCard
              key={dim.name}
              title={dim.name}
              score={dim.score}
              description={dim.description}
              icon={getDimensionIcon(dim.name)}
            />
          ))}
        </div>
      </div>

      {/* 关系特征分析 */}
      <div className={styles.analysisSection}>
        <h2>关系特征分析</h2>
        <div className={styles.patternCard}>
          <h3>关系模式：{result.analysis?.pattern}</h3>
          <p>{getPatternDescription(result.analysis?.pattern)}</p>
        </div>
        <div className={styles.potentialCard}>
          <h3>发展潜力</h3>
          <div className={styles.potentialLevel}>
            <span className={styles.levelIcon}>⭐</span>
            <span>{result.analysis?.potential?.level}</span>
          </div>
          <div className={styles.keyFactors}>
            <h4>关键影响因素</h4>
            <ul>
              {result.analysis?.potential?.factors.map((factor: any) => (
                <li key={factor.area} className={styles.factor}>
                  <span className={styles.factorIcon}>
                    {factor.impact === '积极' ? '✅' : '⚠️'}
                  </span>
                  <span>{factor.area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 建议与改进 */}
      <div className={styles.recommendationsSection}>
        <h2>个性化建议</h2>
        <div className={styles.recommendationCards}>
          {result.details?.strengths?.map((strength: any) => (
            <RecommendationCard
              key={strength.area}
              type="strength"
              title={`${strength.area}优势`}
              content={strength.description}
            />
          ))}
          {result.details?.challenges?.map((challenge: any) => (
            <RecommendationCard
              key={challenge.area}
              type="challenge"
              title={`${challenge.area}建议`}
              content={challenge.suggestion}
            />
          ))}
        </div>
      </div>

      {/* 分享部分 */}
      <div className={styles.shareSection}>
        <h2>分享结果</h2>
        <p>让更多人了解你们的匹配度</p>
        <div className={styles.shareButtons}>
          <ShareButton 
            title={`我们的匹配度是 ${result.totalScore}分！${getMatchLevelTitle(result.totalScore)}`}
            text="快来测测你们的匹配度吧！"
          />
        </div>
      </div>
    </div>
  );
}

// 辅助函数
function getMatchLevelTitle(score: number): string {
  if (score >= 90) return '灵魂伴侣';
  if (score >= 80) return '天作之合';
  if (score >= 70) return '默契搭档';
  if (score >= 60) return '潜力伙伴';
  return '需要磨合';
}

function getMatchLevelDescription(score: number): string {
  if (score >= 90) return '你们在多个维度都展现出极高的契合度，是难得的灵魂伴侣。';
  if (score >= 80) return '你们的关系和谐稳定，彼此理解和包容，是非常般配的一对。';
  if (score >= 70) return '你们有着良好的默契，通过沟通和理解可以建立更深层的连接。';
  if (score >= 60) return '你们的关系有发展潜力，需要更多的交流和互相了解。';
  return '你们还需要更多时间相互了解和适应，耐心是关键。';
}

function getPatternDescription(pattern: string): string {
  const descriptions: Record<string, string> = {
    '高度契合型': '你们在多个方面都表现出极高的一致性，这种和谐会让关系更加稳定。',
    '互补发展型': '你们的差异能够相互补充，这种互补性是关系的重要助力。',
    '潜力成长型': '通过共同努力，你们可以建立更深层的理解和连接。',
    '需要磨合型': '需要更多的耐心和包容，慢慢找到彼此的平衡点。'
  };
  return descriptions[pattern] || '你们的关系模式独特，需要共同探索最佳相处方式。';
}

function getDimensionIcon(dimension: string): string {
  const icons: Record<string, string> = {
    '性格匹配度': '🎭',
    '生活习惯契合度': '🏠',
    '沟通方式相容度': '💭'
  };
  return icons[dimension] || '✨';
} 