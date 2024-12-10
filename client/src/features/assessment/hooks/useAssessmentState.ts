import { useState, useCallback, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';

export interface AssessmentState {
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<number, any>;
  startTime?: number;
  lastSaved?: number;
  status: 'not_started' | 'in_progress' | 'paused' | 'completed';
}

const TOTAL_QUESTIONS = 15;
const AUTO_SAVE_INTERVAL = 30000; // 30秒

const initialState: AssessmentState = {
  currentQuestion: 1,
  totalQuestions: TOTAL_QUESTIONS,
  answers: {},
  startTime: Date.now(),
  status: 'not_started'
};

export const useAssessmentState = () => {
  // 从本地存储恢复状态
  const [state, setState] = useState<AssessmentState>(() => {
    const saved = storage.get<AssessmentState>(STORAGE_KEYS.ASSESSMENT.STATE);
    return saved || initialState;
  });

  // 计算进度
  const progress = (state.currentQuestion / state.totalQuestions) * 100;

  // 设置答案
  const setAnswer = useCallback((answer: any) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestion]: answer
      },
      status: 'in_progress',
      lastSaved: Date.now()
    }));
  }, []);

  // 导航控制
  const goToNext = useCallback(() => {
    if (state.currentQuestion < state.totalQuestions) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  }, [state.currentQuestion, state.totalQuestions]);

  const goToPrevious = useCallback(() => {
    if (state.currentQuestion > 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  }, [state.currentQuestion]);

  // 自动保存
  useEffect(() => {
    const saveState = () => {
      if (state.status === 'in_progress') {
        storage.set(STORAGE_KEYS.ASSESSMENT.STATE, state);
      }
    };

    const interval = setInterval(saveState, AUTO_SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [state]);

  // 手动保存
  const saveProgress = useCallback(() => {
    storage.set(STORAGE_KEYS.ASSESSMENT.STATE, {
      ...state,
      lastSaved: Date.now()
    });
  }, [state]);

  // 重置状态
  const resetAssessment = useCallback(() => {
    setState(initialState);
    storage.remove(STORAGE_KEYS.ASSESSMENT.STATE);
  }, []);

  return {
    ...state,
    progress,
    setAnswer,
    goToNext,
    goToPrevious,
    saveProgress,
    resetAssessment,
    canGoNext: state.currentQuestion < state.totalQuestions,
    canGoPrevious: state.currentQuestion > 1
  };
}; 