export const STORAGE_KEYS = {
  ASSESSMENT: {
    STATE: 'assessment_state',
    ANSWERS: 'assessment_answers',
    PROGRESS: 'assessment_progress',
    LAST_SAVED: 'assessment_last_saved'
  }
} as const;

export interface StorageData {
  version: string;
  timestamp: number;
  data: any;
}

export const storage = {
  set: (key: string, value: any) => {
    try {
      const item: StorageData = {
        version: '1.0',
        timestamp: Date.now(),
        data: value
      };
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue || null;

      const parsed: StorageData = JSON.parse(item);
      return parsed.data;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue || null;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  },

  // 获取存储使用情况
  getUsage: () => {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        total += localStorage.getItem(key)?.length || 0;
      }
    }
    return {
      used: total,
      total: 5 * 1024 * 1024, // 5MB
      percentage: (total / (5 * 1024 * 1024)) * 100
    };
  },

  // 清理过期数据
  cleanup: (maxAge: number = 7 * 24 * 60 * 60 * 1000) => {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed: StorageData = JSON.parse(item);
            if (now - parsed.timestamp > maxAge) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          console.warn('Cleanup error for key:', key, error);
        }
      }
    }
  }
}; 