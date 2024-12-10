import React, { useState, useCallback } from 'react';
import styles from './ShareSection.module.css';

const ShareSection: React.FC = () => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  
  const shareUrl = window.location.href;
  
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [shareUrl]);

  const handleShare = useCallback((platform: string) => {
    const shareText = '我在Love Match完成了匹配测评，快来看看我的结果！';
    const hashtags = 'LoveMatch,匹配测评';
    
    let shareUrl = '';
    switch (platform) {
      case 'weibo':
        shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'wechat':
        // 实际项目中需要集成微信SDK
        alert('请点击右上角菜单进行分享');
        return;
      case 'qq':
        shareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>分享结果</h2>
      
      <div className={styles.shareCard}>
        <div className={styles.linkSection}>
          <input
            type="text"
            readOnly
            value={shareUrl}
            className={styles.linkInput}
          />
          <button
            className={styles.copyButton}
            onClick={handleCopyLink}
          >
            {showCopySuccess ? '已复制' : '复制链接'}
          </button>
        </div>

        <div className={styles.divider}>
          <span>或通过社交平台分享</span>
        </div>

        <div className={styles.socialButtons}>
          <button
            className={`${styles.socialButton} ${styles.weibo}`}
            onClick={() => handleShare('weibo')}
          >
            微博
          </button>
          <button
            className={`${styles.socialButton} ${styles.wechat}`}
            onClick={() => handleShare('wechat')}
          >
            微信
          </button>
          <button
            className={`${styles.socialButton} ${styles.qq}`}
            onClick={() => handleShare('qq')}
          >
            QQ
          </button>
        </div>
      </div>

      <p className={styles.hint}>
        分享结果，让更多人了解你的匹配类型
      </p>
    </section>
  );
};

export default ShareSection; 