/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export type LifestyleStat = { label: string; value: string };

export type LifestyleItem = {
  id: string;
  title_en: string;
  title_th: string;
  subtitle_en: string;
  subtitle_th: string;
  image: string;
  details_en: string;
  details_th: string;
  stats_en: LifestyleStat[];
  stats_th: LifestyleStat[];
};

// ===== Inner Gallery Component =====
const LifestyleGallery = ({ locale, items }: { locale: 'en' | 'th'; items: LifestyleItem[] }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const activeItemData = items.find(item => item.id === activeItem);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveItem(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="lifestyle-gallery-wrapper">
      <div className="lifestyle-grid">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`lifestyle-card${activeItem === item.id ? ' active' : ''}`}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="lifestyle-polaroid">
              <div className="lifestyle-img-container">
                <img src={item.image} alt={locale === 'en' ? item.title_en : item.title_th} className="lifestyle-img" />
                <div className="lifestyle-click-hint">
                  <span>{locale === 'en' ? 'Click to inspect 🔎' : 'คลิกเพื่อดูสถิติ 🔎'}</span>
                </div>
              </div>
              <div className="lifestyle-caption">
                <h3 className="lifestyle-title">{locale === 'en' ? item.title_en : item.title_th}</h3>
                <p className="lifestyle-subtitle">{locale === 'en' ? item.subtitle_en : item.subtitle_th}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeItemData && (
        <div className="lifestyle-details-overlay" onClick={() => setActiveItem(null)}>
          <div className="lifestyle-details-content" onClick={(e) => e.stopPropagation()}>
            <button className="lifestyle-close-btn" onClick={() => setActiveItem(null)}>×</button>
            <h4 style={{ margin: '0 0 0.5rem', color: 'var(--accent-light)', fontSize: '1.2rem' }}>
              {locale === 'en' ? activeItemData.title_en : activeItemData.title_th}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 1.25rem' }}>
              {locale === 'en' ? activeItemData.details_en : activeItemData.details_th}
            </p>
            <div className="lifestyle-stats-grid">
              {(locale === 'en' ? activeItemData.stats_en : activeItemData.stats_th).map((st, i) => (
                <div key={i} className="lifestyle-stat-box">
                  <div className="lifestyle-stat-val">{st.value}</div>
                  <div className="lifestyle-stat-lbl">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== Page Shell =====
export default function LifestyleClient({ items }: { items: LifestyleItem[] }) {
  const locale = useLocale() as 'en' | 'th';
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light' || currentTheme === 'dark') {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const switchLocale = (newLocale: 'en' | 'th') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)', transition: 'background 0.3s, color 0.3s', padding: '2rem 1rem' }}>

      {/* Subpage Header Nav */}
      <header style={{ maxWidth: '850px', margin: '0 auto 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{
          textDecoration: 'none',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--card-border)',
          padding: '0.5rem 1rem',
          borderRadius: '30px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-light)';
          e.currentTarget.style.borderColor = 'var(--accent-light)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(187, 134, 252, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.borderColor = 'var(--card-border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
        >
          <span>←</span> {locale === 'en' ? 'Back to Portfolio' : 'กลับหน้าหลัก'}
        </Link>

        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--card-border)',
              borderRadius: '50%',
              width: '38px', height: '38px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-light)';
              e.currentTarget.style.color = 'var(--accent-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <div style={{
            display: 'flex', gap: '0.45rem', padding: '0.2rem 0.5rem',
            background: 'rgba(255,255,255,0.05)', borderRadius: '20px',
            border: '1px solid var(--card-border)'
          }}>
            <button onClick={() => switchLocale('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: locale === 'en' ? 'bold' : 'normal', color: locale === 'en' ? 'var(--accent-light)' : 'var(--text-muted)', transition: 'color 0.3s' }}>EN</button>
            <span style={{ color: 'var(--card-border)', fontSize: '0.78rem' }}>|</span>
            <button onClick={() => switchLocale('th')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: locale === 'th' ? 'bold' : 'normal', color: locale === 'th' ? 'var(--accent-light)' : 'var(--text-muted)', transition: 'color 0.3s' }}>TH</button>
          </div>
        </div>
      </header>

      {/* Main Title */}
      <section style={{ maxWidth: '850px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem',
          background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          {locale === 'en' ? 'Lifestyle & Hobbies' : 'ไลฟ์สไตล์และกิจกรรมสุดโปรด'}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto' }}>
          {locale === 'en'
            ? 'A window into my passions and routines outside of software engineering — exploring ridges, street photography, and brewing specialty drip coffee.'
            : 'มุมมองไลฟ์สไตล์และสิ่งที่ชื่นชอบยามว่างจากการพัฒนาซอฟต์แวร์ — เดินป่าตามหาธรรมชาติ ถ่ายภาพบันทึกความทรงจำ และศาสตร์แห่งกาแฟดริปพิเศษ'}
        </p>
      </section>

      {/* Gallery */}
      <section style={{ maxWidth: '850px', margin: '0 auto 4rem' }}>
        <LifestyleGallery locale={locale} items={items} />
      </section>

      <footer style={{ maxWidth: '850px', margin: '4rem auto 1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <p>© 2026 Chanchai Chakam. All rights reserved.</p>
      </footer>
    </main>
  );
}
