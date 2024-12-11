import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface AssessmentResult {
  id: string;
  totalScore: number;
  dimensions: Array<{
    name: string;
    score: number;
    description: string;
  }>;
  analysis: {
    pattern: string;
    potential: {
      level: string;
      factors: Array<{
        area: string;
        impact: string;
      }>;
    };
  };
  details: {
    strengths: Array<{
      area: string;
      description: string;
    }>;
    challenges: Array<{
      area: string;
      suggestion: string;
    }>;
  };
}

// 定义匹配规则类型
interface MatchRule {
  perfectMatch: number[][];
  goodMatch: number[][];
}

interface MatchingRules {
  socialPreference: MatchRule;
  decisionMaking: MatchRule;
  lifestyle: MatchRule;
  [key: string]: MatchRule;  // 添加索引签名
}

const matchingRules: MatchingRules = {
  socialPreference: {
    perfectMatch: [[1, 1], [2, 2], [3, 3]],
    goodMatch: [[1, 2], [2, 1], [2, 3], [3, 2]]
  },
  decisionMaking: {
    perfectMatch: [[1, 1], [2, 2], [3, 3]],
    goodMatch: [[1, 2], [2, 1], [2, 3], [3, 2]]
  },
  lifestyle: {
    perfectMatch: [[1, 1], [2, 2], [3, 3]],
    goodMatch: [[1, 2], [2, 1], [2, 3], [3, 2]]
  }
};

// 定义问题类型的类型
type QuestionType = 'socialPreference' | 'decisionMaking' | 'lifestyle';

// 修改 getQuestionType 函数
function getQuestionType(questionId: number): QuestionType {
  if (questionId <= 2) return 'socialPreference';
  if (questionId <= 4) return 'decisionMaking';
  return 'lifestyle';
}

// 修改 calculateMatchScore 函数的参数类型
function calculateMatchScore(questionType: QuestionType, self: number, partner: number): number {
  const rules = matchingRules[questionType];
  
  // 检查是否完美匹配
  if (rules.perfectMatch.some(match => match[0] === self && match[1] === partner)) {
    return 100;
  }
  
  // 检查是否良好匹配
  if (rules.goodMatch.some(match => match[0] === self && match[1] === partner)) {
    return 80;
  }
  
  // 其他情况
  return 60;
}

function calculateDimensionScore(questionIds: number[], selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>): number {
  let totalScore = 0;
  let count = 0;

  questionIds.forEach(id => {
    if (selfAnswers[id] !== undefined && partnerAnswers[id] !== undefined) {
      const diff = Math.abs(selfAnswers[id] - partnerAnswers[id]);
      // 计算每个问题���分数
      const questionScore = calculateMatchScore(
        getQuestionType(id),
        selfAnswers[id],
        partnerAnswers[id]
      );
      totalScore += questionScore;
      count++;
    }
  });

  return count > 0 ? Math.round(totalScore / count) : 0;
}

function calculateTotalScore(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>): number {
  let totalScore = 0;
  let weights = 0;
  
  // 社交偏好 (问题1-2)
  const socialScore = calculateMatchScore('socialPreference', selfAnswers[1], partnerAnswers[1]);
  totalScore += socialScore * 0.3;
  weights += 0.3;
  
  // 决策方式 (问题3-4)
  const decisionScore = calculateMatchScore('decisionMaking', selfAnswers[3], partnerAnswers[3]);
  totalScore += decisionScore * 0.35;
  weights += 0.35;
  
  // 生活方式 (问题5-6)
  const lifestyleScore = calculateMatchScore('lifestyle', selfAnswers[5], partnerAnswers[5]);
  totalScore += lifestyleScore * 0.35;
  weights += 0.35;
  
  // 添加随机波动 (±5分)
  const randomFactor = (Math.random() - 0.5) * 10;
  
  return Math.round(Math.max(0, Math.min(100, (totalScore / weights) + randomFactor)));
}

export async function POST(request: NextRequest) {
  try {
    const { selfAnswers, partnerAnswers } = await request.json();
    
    // 验证输入数据
    if (!selfAnswers || !partnerAnswers) {
      throw new Error('缺少必要的答案数据');
    }

    // 记录接收到的数据
    console.log('收到的答案:', {
      selfAnswers,
      partnerAnswers
    });

    // 计算匹配结果
    const result: AssessmentResult = {
      id: Date.now().toString(),
      totalScore: calculateTotalScore(selfAnswers, partnerAnswers),
      dimensions: calculateDimensions(selfAnswers, partnerAnswers),
      analysis: analyzeCompatibility(selfAnswers, partnerAnswers),
      details: generateDetails(selfAnswers, partnerAnswers)
    };

    // 记录生成的结果
    console.log('生成的结果:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('处理测评失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '处理测评失败' },
      { status: 500 }
    );
  }
}

function calculateDimensions(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>) {
  return [
    {
      name: '性格匹配度',
      score: calculateDimensionScore([1, 2], selfAnswers, partnerAnswers),
      description: getPersonalityDescription(selfAnswers, partnerAnswers)
    },
    {
      name: '生活习惯契合度',
      score: calculateDimensionScore([3, 4], selfAnswers, partnerAnswers),
      description: getLifestyleDescription(selfAnswers, partnerAnswers)
    },
    {
      name: '沟通方式相容度',
      score: calculateDimensionScore([5, 6], selfAnswers, partnerAnswers),
      description: getCommunicationDescription(selfAnswers, partnerAnswers)
    }
  ]
}

function getPersonalityDescription(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>): string {
  const score = calculateDimensionScore([1, 2], selfAnswers, partnerAnswers)
  if (score >= 90) return '你们的性格特征高度互补，能够在关系中相互成长。'
  if (score >= 75) return '你们的性格有一些差异，但这些差异可以带来互补效应。'
  if (score >= 60) return '你们的性格差异明显，需要更多的理解和包容。'
  return '你们的性格差异较大，建议多沟通以增进理解。'
}

function getLifestyleDescription(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>): string {
  const score = calculateDimensionScore([3, 4], selfAnswers, partnerAnswers)
  if (score >= 90) return '你们的生活习惯非常契合，有助于建立稳定的日常生活。'
  if (score >= 75) return '你们的生活习惯基本相似，偶尔的差异可以互相调整。'
  if (score >= 60) return '你们的生活习惯存在一定差异，需要相互体谅和适��。'
  return '你们的生活习惯差异较大，需要共同努力找到平衡点。'
}

function getCommunicationDescription(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>): string {
  const score = calculateDimensionScore([5, 6], selfAnswers, partnerAnswers)
  if (score >= 90) return '你们的沟通方式非常协调，能够很好地表达和理解彼此。'
  if (score >= 75) return '你们的沟通方式较一致，可以进行有效交流。'
  if (score >= 60) return '你们的沟通方式有所不同，但仍能基本理解对方。'
  return '你们的沟通方式存在较大差异，建议学习对方的表达和倾听方式。'
}

interface Factor {
  area: string;
  impact: string;
}

function getKeyFactors(dynamics: any): Factor[] {
  const factors: Factor[] = [];
  
  if (dynamics.socialDynamics.type === 'harmony' || dynamics.socialDynamics.type === 'complementary') {
    factors.push({
      area: '社交互动',
      impact: '积极'
    });
  }
  
  if (dynamics.decisionMaking.type === 'harmony' || dynamics.decisionMaking.type === 'complementary') {
    factors.push({
      area: '决策方式',
      impact: '积极'
    });
  }
  
  if (dynamics.lifestyleCompatibility.type === 'harmony' || dynamics.lifestyleCompatibility.type === 'complementary') {
    factors.push({
      area: '生活方式',
      impact: '积极'
    });
  }
  
  return factors;
}

interface DynamicsAnalysis {
  type: 'harmony' | 'complementary' | 'challenge';
  description: string;
  strength: string;
  challenge: string;
}

interface Dynamics {
  socialDynamics: DynamicsAnalysis;
  decisionMaking: DynamicsAnalysis;
  lifestyleCompatibility: DynamicsAnalysis;
}

function analyzeCompatibility(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>) {
  const totalScore = calculateTotalScore(selfAnswers, partnerAnswers);
  const dynamics: Dynamics = {
    socialDynamics: analyzeSocialDynamics(selfAnswers[1], partnerAnswers[1]),
    decisionMaking: analyzeDecisionMaking(selfAnswers[3], partnerAnswers[3]),
    lifestyleCompatibility: analyzeLifestyle(selfAnswers[5], partnerAnswers[5])
  };

  return {
    pattern: determinePattern(dynamics),
    potential: {
      level: getPotentialLevel(totalScore),
      factors: getKeyFactors(dynamics)
    }
  };
}

function analyzeSocialDynamics(self: number, partner: number): DynamicsAnalysis {
  if (self === partner) {
    return {
      type: 'harmony',
      description: '你们有着相似的社交需求',
      strength: '能够很好地理解对方的社交需求',
      challenge: '可能需要注意拓展社交圈子'
    };
  }
  
  if (Math.abs(self - partner) === 1) {
    return {
      type: 'complementary',
      description: '你们的社交方式互补',
      strength: '能够帮助对方成长',
      challenge: '需要理解并尊重对方的社交方式'
    };
  }
  
  return {
    type: 'challenge',
    description: '你们的社交需求差异较大',
    strength: '可以带来新的视角',
    challenge: '需要找到平衡点'
  };
}

function analyzeDecisionMaking(self: number, partner: number): DynamicsAnalysis {
  if (self === partner) {
    return {
      type: 'harmony',
      description: '你们在决策方式上有着相似的偏好',
      strength: '能够很好地理解对方的决策方式',
      challenge: '可能需要注意在不同类型的决策中分别发挥各自的优势'
    };
  }
  
  if (Math.abs(self - partner) === 1) {
    return {
      type: 'complementary',
      description: '你们的决策方式互补',
      strength: '能够帮助对方成长',
      challenge: '需要理解并尊重对方的决策方式'
    };
  }
  
  return {
    type: 'challenge',
    description: '你们的决策方式差异较大',
    strength: '可以带来新的视角',
    challenge: '需要找到平衡点'
  };
}

function analyzeLifestyle(self: number, partner: number): DynamicsAnalysis {
  if (self === partner) {
    return {
      type: 'harmony',
      description: '你们在生活方式上有着相似的偏好',
      strength: '能够很好地理解对方的生活方式',
      challenge: '可能需要注意在不同类型的活动中找到平衡点'
    };
  }
  
  if (Math.abs(self - partner) === 1) {
    return {
      type: 'complementary',
      description: '你们的生活方式互补',
      strength: '能够帮助对方成长',
      challenge: '需要理解并尊重对方的生活方式'
    };
  }
  
  return {
    type: 'challenge',
    description: '你们的生活方式差异较大',
    strength: '可以带来新的视角',
    challenge: '需要找到平衡点'
  };
}

function determinePattern(analysis: any) {
  if (analysis.socialDynamics.type === 'harmony' && analysis.decisionMaking.type === 'harmony' && analysis.lifestyleCompatibility.type === 'harmony') {
    return '高度契合型';
  }
  
  if (analysis.socialDynamics.type === 'complementary' && analysis.decisionMaking.type === 'complementary' && analysis.lifestyleCompatibility.type === 'complementary') {
    return '互补发展型';
  }
  
  if (analysis.socialDynamics.type === 'challenge' && analysis.decisionMaking.type === 'challenge' && analysis.lifestyleCompatibility.type === 'challenge') {
    return '挑战较大型';
  }
  
  return '潜力成长型';
}

function getPotentialLevel(score: number): string {
  if (score >= 90) return '极高发展潜力';
  if (score >= 80) return '良好发展潜力';
  if (score >= 70) return '中等发展潜力';
  if (score >= 60) return '需要共同努力';
  return '面临较大挑战';
}

function generateDetails(selfAnswers: Record<string, number>, partnerAnswers: Record<string, number>) {
  const dimensions = calculateDimensions(selfAnswers, partnerAnswers)
  
  return {
    strengths: dimensions
      .filter(dim => dim.score >= 80)
      .map(dim => ({
        area: dim.name.replace('度', ''),
        description: dim.description
      })),
    challenges: dimensions
      .filter(dim => dim.score < 70)
      .map(dim => ({
        area: dim.name.replace('度', ''),
        suggestion: getSuggestion(dim.name, dim.score)
      }))
  }
}

function getSuggestion(dimension: string, score: number): string {
  const suggestions = {
    '性格匹配度': '建议多了解对方的性格特点，学会欣赏彼此的不同。',
    '生活习惯契合度': '可以尝试制定共同的生活计划，逐步调整彼此的习惯。',
    '沟通方式相容度': '建议多进行深入交流，理解对方的表达方式和沟通需求。'
  }
  
  return suggestions[dimension] || '建议多沟通交流增进相互理解。'
}