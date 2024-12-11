'use client'

import React from 'react';
import Link from 'next/link';

const headerStyles = {
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'var(--primary-color)',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  contact: {
    display: 'flex',
    gap: 'calc(var(--spacing-unit) * 4)',
    color: 'var(--text-secondary)',
    fontSize: '0.875rem'
  },
  author: {
    fontWeight: 500
  },
  email: {
    opacity: 0.8
  }
};

const Header: React.FC = () => {
  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.container}>
        <Link href="/" style={headerStyles.logo}>
          Love Match
        </Link>
        <div style={headerStyles.contact}>
          <span style={headerStyles.author}>作者：事有不成反求诸己</span>
          <span style={headerStyles.email}>联系方式：2487357586@qq.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 