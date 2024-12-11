'use client'

import React from 'react';
import styles from './HomePage.module.css';
import Hero from '../components/Hero';
import ExampleReports from '../components/ExampleReports';
import Instructions from '../components/Instructions';
import { shareWebsite } from '@/utils/share';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <ExampleReports />
      <Instructions />
      
      <div className={styles.shareSection}>
        <button 
          className={styles.shareButton}
          onClick={shareWebsite}
        >
          分享给朋友
        </button>
      </div>
    </div>
  );
};

export default HomePage; 