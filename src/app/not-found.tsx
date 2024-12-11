'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <button 
        className={styles.button}
        onClick={() => router.push('/')}
      >
        返回首页
      </button>
    </div>
  );
} 