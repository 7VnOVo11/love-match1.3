import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>Love Match</h3>
            <p className={styles.slogan}>找到你的完美伴侣</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>关于我们</h4>
              <a href="#">公司介绍</a>
              <a href="#">联系方式</a>
              <a href="#">加入我们</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>帮助中心</h4>
              <a href="#">使用指南</a>
              <a href="#">常见问题</a>
              <a href="#">用户反馈</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>法律信息</h4>
              <a href="#">用户协议</a>
              <a href="#">隐私政策</a>
              <a href="#">免责声明</a>
            </div>
          </div>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>© {year} Love Match. All rights reserved.</p>
            <p className={styles.icp}>京ICP备xxxxxxxx号</p>
          </div>
          
          <div className={styles.social}>
            <a href="#" className={styles.socialLink}>
              微博
            </a>
            <a href="#" className={styles.socialLink}>
              微信
            </a>
            <a href="#" className={styles.socialLink}>
              抖音
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 