import React from 'react';
import styles from './HomePage.module.css';
import Hero from './components/Hero';
import ExampleReports from './components/ExampleReports';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <ExampleReports />
      <Instructions />
      <Footer />
    </div>
  );
};

export default HomePage; 