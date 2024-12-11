import { NavigateFunction } from 'react-router-dom';

interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

// 路由历史记录
const routeHistory: string[] = [];

export const routeUtils = {
  // 记录路由历史
  recordRoute(path: string) {
    routeHistory.push(path);
    if (routeHistory.length > 10) {
      routeHistory.shift();
    }
  },

  // 获取上一个路由
  getPreviousRoute(): string | undefined {
    return routeHistory[routeHistory.length - 2];
  },

  // 清空路由历史
  clearHistory() {
    routeHistory.length = 0;
  },

  // 安全导航（带参数验证）
  safeNavigate(navigate: NavigateFunction, path: string, options?: NavigateOptions) {
    // 验证路径格式
    if (!path.startsWith('/')) {
      console.warn('Invalid route path:', path);
      return;
    }

    this.recordRoute(path);
    navigate(path, options);
  },

  // 构建结果页面路由
  buildResultRoute(resultId: string): string {
    return `/result/${encodeURIComponent(resultId)}`;
  },

  // 解析路由参数
  parseParams(path: string): Record<string, string> {
    const params: Record<string, string> = {};
    const searchParams = new URLSearchParams(path.split('?')[1]);
    
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    
    return params;
  },

  // 构建带参数的URL
  buildUrl(base: string, params: Record<string, string>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `${base}?${queryString}` : base;
  }
}; 