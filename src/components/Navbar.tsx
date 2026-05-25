"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

interface NavbarProps {
  activeSection: string;
  theme: 'dark' | 'light';
  mobileMenuOpen: boolean;
  toggleTheme: () => void;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMobileLinkClick: (id: string) => void;
  handleMagneticMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMagneticLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  mobileMenuOpen,
  toggleTheme,
  setMobileMenuOpen,
  handleMobileLinkClick,
  handleMagneticMove,
  handleMagneticLeave
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const switchLocale = (newLocale: 'en' | 'th') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* Modern Sticky Navigation */}
      <nav className="nav-container">
        {/* Desktop nav-links */}
        <div className="nav-links">
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className={`nav-link${activeSection === 'about' ? ' active' : ''}`}>{t('about')}</a>
          <a href="#experience" onClick={(e) => handleLinkClick(e, 'experience')} className={`nav-link${activeSection === 'experience' ? ' active' : ''}`}>{t('experience')}</a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className={`nav-link${activeSection === 'projects' ? ' active' : ''}`}>{t('projects')}</a>
          <a href="#tech" onClick={(e) => handleLinkClick(e, 'tech')} className={`nav-link${activeSection === 'tech' ? ' active' : ''}`}>{t('skills')}</a>
          <Link href="/blog" className={`nav-link${pathname === '/blog' ? ' active' : ''}`} suppressHydrationWarning>
            {mounted ? t('blog') : 'Blog'}
          </Link>
          <Link href="/lifestyle" className={`nav-link${pathname === '/lifestyle' ? ' active' : ''}`} suppressHydrationWarning>
            {mounted ? t('lifestyle') : 'Lifestyle'}
          </Link>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className={`nav-link${activeSection === 'contact' ? ' active' : ''}`}>{t('contact')}</a>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="hide-on-mobile"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--card-border)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--accent-light)',
              transition: 'all 0.3s'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Language Toggle */}
          <div 
            className="hide-on-mobile"
            style={{ display: 'flex', gap: '0.45rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.65rem', borderRadius: '20px', border: '1px solid var(--card-border)' }}
          >
            <button
              onClick={() => switchLocale('en')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem',
                fontWeight: locale === 'en' ? 'bold' : 'normal',
                color: locale === 'en' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              EN
            </button>
            <span style={{ color: 'var(--divider)', fontSize: '0.78rem' }}>|</span>
            <button
              onClick={() => switchLocale('th')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem',
                fontWeight: locale === 'th' ? 'bold' : 'normal',
                color: locale === 'th' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              TH
            </button>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger-btn${mobileMenuOpen ? ' open' : ''}`}
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Open navigation menu"
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Sliding Navigation Drawer */}
      <div className={`mobile-drawer${mobileMenuOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-links">
          <button onClick={() => handleMobileLinkClick('about')} className={`mobile-drawer-link${activeSection === 'about' ? ' active' : ''}`}>{t('about')}</button>
          <button onClick={() => handleMobileLinkClick('experience')} className={`mobile-drawer-link${activeSection === 'experience' ? ' active' : ''}`}>{t('experience')}</button>
          <button onClick={() => handleMobileLinkClick('projects')} className={`mobile-drawer-link${activeSection === 'projects' ? ' active' : ''}`}>{t('projects')}</button>
          <button onClick={() => handleMobileLinkClick('tech')} className={`mobile-drawer-link${activeSection === 'tech' ? ' active' : ''}`}>{t('skills')}</button>
          <button onClick={() => { setMobileMenuOpen(false); }} className={`mobile-drawer-link${pathname === '/blog' ? ' active' : ''}`}>
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }} suppressHydrationWarning>{t('blog')}</Link>
          </button>
          <button onClick={() => { setMobileMenuOpen(false); }} className={`mobile-drawer-link${pathname === '/lifestyle' ? ' active' : ''}`}>
            <Link href="/lifestyle" style={{ color: 'inherit', textDecoration: 'none' }} suppressHydrationWarning>{t('lifestyle')}</Link>
          </button>
          <button onClick={() => handleMobileLinkClick('contact')} className={`mobile-drawer-link${activeSection === 'contact' ? ' active' : ''}`}>{t('contact')}</button>
        </div>

        {/* Mobile Control Dashboard */}
        <div className="mobile-drawer-controls">
          {/* Mobile Theme Toggle Button */}
          <button onClick={toggleTheme} className="mobile-drawer-control-btn">
            {theme === 'dark' ? (
              <>
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
                {t('lightMode')}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                {t('darkMode')}
              </>
            )}
          </button>

          {/* Mobile Language Toggle Selector */}
          <div className="mobile-drawer-lang">
            <button
              onClick={() => switchLocale('en')}
              className={locale === 'en' ? 'active' : ''}
            >
              English
            </button>
            <span>/</span>
            <button
              onClick={() => switchLocale('th')}
              className={locale === 'th' ? 'active' : ''}
            >
              ไทย
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
