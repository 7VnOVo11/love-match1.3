import { storage, STORAGE_KEYS } from '@/utils/storage';
import { NavigateFunction } from 'react-router-dom';

export interface RouteGuardContext {
  navigate: NavigateFunction;
  from: string;
  to: string;
}

// 测评页面守卫
export const assessmentGuard = (context: RouteGuardContext): boolean => {
  const { navigate } = context;
  const assessmentState = storage.get(STORAGE_KEYS.ASSESSMENT.STATE);

  // 如果有未完成的测评，询问是否继续
  if (assessmentState?.status === 'in_progress') {
    const shouldContinue = window.confirm('检测到未完成的测评，是否继续？');
    if (!shouldContinue) {
      navigate('/');
      return false;
    }
  }

  return true;
};

// 结果页面守卫
export const resultGuard = (context: RouteGuardContext): boolean => {
  const { navigate, to } = context;
  const resultId = to.split('/').pop();

  // 验证结果ID
  if (!resultId || !storage.get(`${STORAGE_KEYS.ASSESSMENT.RESULTS}_${resultId}`)) {
    navigate('/404');
    return false;
  }

  return true;
};

// 路由守卫映射
export const routeGuards = {
  '/assessment': assessmentGuard,
  '/result': resultGuard
};

// 执行路由守卫
export const executeGuards = (context: RouteGuardContext): boolean => {
  const { to } = context;
  
  // 查找匹配的守卫
  const guard = Object.entries(routeGuards).find(([path]) => to.startsWith(path))?.[1];
  
  if (guard) {
    return guard(context);
  }

  return true;
}; 