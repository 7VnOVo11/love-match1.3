import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>404</div>
        <h1 className={styles.title}>页面不见了</h1>
        <p className={styles.description}>
          抱歉，您访问的页面可能已被移除或暂时无法访问
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            返回首页
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => navigate(-1)}
          >
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 