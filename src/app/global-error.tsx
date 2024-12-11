'use client'

import styles from './error.module.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.icon}>⚠️</div>
            <h2 className={styles.title}>
              系统出现问题
            </h2>
            <p className={styles.message}>
              {process.env.NODE_ENV === 'development' 
                ? `错误: ${error.message}` 
                : '系统暂时无法访问'}
            </p>
            <div className={styles.actions}>
              <button
                className={styles.retryButton}
                onClick={() => reset()}
              >
                重试
              </button>
              <button
                className={styles.homeButton}
                onClick={() => {
                  window.location.href = '/'
                }}
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 