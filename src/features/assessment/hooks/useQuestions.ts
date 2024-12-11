import { useMemo } from 'react';
import { Question } from '../types';

// 模拟题目数据
const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'single',
    title: '你更倾向于在什么场合认识新朋友？',
    description: '选择最符合你性格的社交场景',
    dimension: '社交偏好',
    required: true,
    options: [
      { id: '1a', text: '大型社交活动或派对', value: 1 },
      { id: '1b', text: '小型聚会或朋友介绍', value: 2 },
      { id: '1c', text: '基于共同兴趣的活动或课程', value: 3 },
      { id: '1d', text: '线上社交平台', value: 4 }
    ]
  },
  {
    id: 2,
    type: 'single',
    title: '在做重要决定时，你通常会？',
    description: '选择最符合你决策风格的选项',
    dimension: '决策方式',
    required: true,
    options: [
      { id: '2a', text: '依靠直觉和感受', value: 1 },
      { id: '2b', text: '收集信息，理性分析', value: 2 },
      { id: '2c', text: '征求他人意见', value: 3 },
      { id: '2d', text: '权衡利弊，综合考虑', value: 4 }
    ]
  },
  {
    id: 3,
    type: 'single',
    title: '在空闲时间，你最喜欢？',
    description: '选择最能代表你休闲方式的选项',
    dimension: '生活方式',
    required: true,
    options: [
      { id: '3a', text: '外出探索新地方', value: 1 },
      { id: '3b', text: '在家放松休息', value: 2 },
      { id: '3c', text: '与朋友聚会', value: 3 },
      { id: '3d', text: '独处，发展个人兴趣', value: 4 }
    ]
  },
  {
    id: 4,
    type: 'single',
    title: '面对压力时，你通常会？',
    description: '选择最符合你压力应对方式的选项',
    dimension: '压力应对',
    required: true,
    options: [
      { id: '4a', text: '寻求他人支持和建议', value: 1 },
      { id: '4b', text: '独自思考和解决问题', value: 2 },
      { id: '4c', text: '通过运动或娱乐放松', value: 3 },
      { id: '4d', text: '制定计划，逐步解决', value: 4 }
    ]
  },
  {
    id: 5,
    type: 'single',
    title: '在与他人交流时，你更注重？',
    description: '选择你最看重的沟通特质',
    dimension: '沟通方式',
    required: true,
    options: [
      { id: '5a', text: '表达自己的想法和感受', value: 1 },
      { id: '5b', text: '倾听和理解对方', value: 2 },
      { id: '5c', text: '寻找共同话题', value: 3 },
      { id: '5d', text: '解决实际问题', value: 4 }
    ]
  },
  {
    id: 6,
    type: 'single',
    title: '对于未来的规划，你更倾向于？',
    description: '选择最符合你规划方式的选项',
    dimension: '规划倾向',
    required: true,
    options: [
      { id: '6a', text: '制定详细的长期计划', value: 1 },
      { id: '6b', text: '设定大致方向，保持灵活', value: 2 },
      { id: '6c', text: '随遇而安，顺其自然', value: 3 },
      { id: '6d', text: '根据当前情况随时调整', value: 4 }
    ]
  }
];

export const useQuestions = () => {
  const questions = useMemo(() => mockQuestions, []);

  return {
    questions,
    totalQuestions: questions.length
  };
}; 