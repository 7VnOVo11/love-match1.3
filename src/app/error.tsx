'use client'

import { useEffect } from 'react'
import './error.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('页面错误:', {
        message: error.message,
        stack: error.stack,
        digest: error.digest
      })
    }
  }, [error])

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">
          抱歉，遇到了一些问题
        </h2>
        <p className="error-message">
          {process.env.NODE_ENV === 'development' 
            ? `错误: ${error.message}` 
            : '页面加载出错了'}
        </p>
        <div className="error-actions">
          <button
            className="error-retry-button"
            onClick={() => reset()}
          >
            重试
          </button>
          <button
            className="error-home-button"
            onClick={() => {
              window.location.href = '/'
            }}
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
} 