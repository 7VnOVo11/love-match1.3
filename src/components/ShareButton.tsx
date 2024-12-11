import React from 'react';
import styles from './ShareButton.module.css';

interface ShareButtonProps {
  title?: string;
  text?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title = '爱情测评',
  text = '来测测你们的匹配度吧！'
}) => {
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: window.location.origin
        });
      } else {
        // 复制链接
        await navigator.clipboard.writeText(window.location.origin);
        alert('链接已复制到剪贴板');
      }
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  return (
    <button className={styles.shareButton} onClick={share}>
      分享给朋友
    </button>
  );
}; 