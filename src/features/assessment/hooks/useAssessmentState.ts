import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestions } from './useQuestions';

interface Answer {
  value: number;
  timestamp: number;
}

export const useAssessmentState = () => {
  const router = useRouter();
  const { questions, totalQuestions } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [step, setStep] = useState<'self' | 'partner'>('self');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 从本地存储恢复状态
  useEffect(() => {
    if (step === 'partner') {
      const savedAnswers = localStorage.getItem('selfAnswers');
      if (!savedAnswers) {
        setStep('self');
        setCurrentQuestion(1);
        setAnswers({});
      }
    }
  }, [step]);

  const setAnswer = useCallback((value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: {
        value,
        timestamp: Date.now()
      }
    }));
    setError(null);
  }, [currentQuestion]);

  const validateAnswers = useCallback((answers: Record<number, Answer>) => {
    const answeredQuestions = Object.keys(answers).length;
    if (answeredQuestions !== totalQuestions) {
      throw new Error(`请回答所有问题 (已回答 ${answeredQuestions}/${totalQuestions})`);
    }
  }, [totalQuestions]);

  const goToNext = useCallback(() => {
    try {
      if (currentQuestion < totalQuestions) {
        if (!answers[currentQuestion]) {
          throw new Error('请先回答当前问题');
        }
        setCurrentQuestion(prev => prev + 1);
      } else {
        validateAnswers(answers);
        if (step === 'self') {
          // 完成自己的测评，开始伴侣的测评
          localStorage.setItem('selfAnswers', JSON.stringify(
            Object.entries(answers).reduce((acc, [key, { value }]) => ({
              ...acc,
              [key]: value
            }), {})
          ));
          setStep('partner');
          setCurrentQuestion(1);
          setAnswers({});
        } else {
          submitAssessment();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  }, [currentQuestion, totalQuestions, answers, step, validateAnswers]);

  const submitAssessment = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const savedAnswers = localStorage.getItem('selfAnswers');
      if (!savedAnswers) {
        throw new Error('找不到第一位测试者的答案');
      }

      const selfAnswers = JSON.parse(savedAnswers);
      const partnerAnswers = Object.entries(answers).reduce((acc, [key, { value }]) => ({
        ...acc,
        [key]: value
      }), {});

      validateAnswers(answers);

      console.log('提交的数据:', {
        selfAnswers,
        partnerAnswers
      });

      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          selfAnswers,
          partnerAnswers 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '提交失败');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // 清理本地存储
      localStorage.removeItem('selfAnswers');
      
      // 跳转到结果页面
      router.push(`/result/${data.id}`);
    } catch (error) {
      console.error('提交测评失败:', error);
      setError(error instanceof Error ? error.message : '未知错误');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, router, isSubmitting, validateAnswers]);

  return {
    currentQuestion,
    totalQuestions,
    answers,
    step,
    error,
    setAnswer,
    goToNext,
    goToPrevious: useCallback(() => {
      if (currentQuestion > 1) {
        setCurrentQuestion(prev => prev - 1);
        setError(null);
      }
    }, [currentQuestion]),
    progress: (currentQuestion / totalQuestions) * 100,
    isSubmitting,
    canGoNext: !!answers[currentQuestion],
    canGoPrevious: currentQuestion > 1,
    isCompleted: Object.keys(answers).length === totalQuestions
  };
}; 