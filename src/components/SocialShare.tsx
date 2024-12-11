import React from 'react';
import styles from './SocialShare.module.css';

interface SocialShareProps {
  url: string;
  title: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const shareToWeChat = () => {
    // 显示二维码
  };

  const shareToWeibo = () => {
    const weiboUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(weiboUrl);
  };

  return (
    <div className={styles.socialShare}>
      <button onClick={shareToWeChat}>
        分享到微信
      </button>
      <button onClick={shareToWeibo}>
        分享到微博
      </button>
    </div>
  );
}; 