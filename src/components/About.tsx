"use client";

import React from 'react';
// import { AnimatedCounter } from './AnimatedCounter';

interface AboutProps {
  currentT: {
    aboutTitle: string;
    aboutContent: React.ReactNode;
  };
  locale: 'en' | 'th';
}

export const About: React.FC<AboutProps> = ({ currentT, locale }) => {
  return (
    <>
      {/* About Me Section (Clean Centered Layout) */}
      <section id="about" className="animate-on-scroll" style={{ padding: '3rem 0', maxWidth: '850px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>{currentT.aboutTitle}</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          {currentT.aboutContent}
        </div>
      </section>

      {/* 
      <section className="stats-section animate-on-scroll">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">
              <AnimatedCounter target={3} />
            </div>
            <div className="stat-label">{locale === 'en' ? 'Years of Experience' : 'ปีที่สั่งสมประสบการณ์'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ display: 'flex', justifyContent: 'center' }}>
              <AnimatedCounter target={10} />+
            </div>
            <div className="stat-label">{locale === 'en' ? 'Projects Delivered' : 'โปรเจกต์เสร็จสมบูรณ์'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ display: 'flex', justifyContent: 'center' }}>
              <AnimatedCounter target={15} />+
            </div>
            <div className="stat-label">{locale === 'en' ? 'Cloud Services Used' : 'บริการ Cloud ที่ชำนาญ'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ display: 'flex', justifyContent: 'center' }}>
              <AnimatedCounter target={1420} duration={1500} />+
            </div>
            <div className="stat-label">{locale === 'en' ? 'Commits Written' : 'จำนวนคอมมิทที่เขียน'}</div>
          </div>
        </div>
      </section>
      */}
    </>
  );
};
