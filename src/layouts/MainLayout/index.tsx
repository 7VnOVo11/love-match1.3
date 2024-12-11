import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames={{
            enter: styles.pageEnter,
            enterActive: styles.pageEnterActive,
            exit: styles.pageExit,
            exitActive: styles.pageExitActive,
          }}
        >
          <main className={styles.main}>
            {children}
          </main>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default MainLayout; 