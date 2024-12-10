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
      {
        id: '1a',
        text: '大型社交活动或派对',
        value: 1
      },
      {
        id: '1b',
        text: '小型聚会或朋友介绍',
        value: 2
      },
      {
        id: '1c',
        text: '基于共同兴趣的活动或课程',
        value: 3
      },
      {
        id: '1d',
        text: '线上社交平台',
        value: 4
      }
    ]
  },
  // ... 可以添加更多题目
];

export const useQuestions = () => {
  const questions = useMemo(() => mockQuestions, []);

  return {
    questions
  };
}; 