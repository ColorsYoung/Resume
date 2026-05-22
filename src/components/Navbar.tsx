"use client";

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  activeSection: string;
  lang: 'en' | 'th';
  theme: 'dark' | 'light';
  mobileMenuOpen: boolean;
  toggleTheme: () => void;
  setLang: (lang: 'en' | 'th') => void;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMobileLinkClick: (id: string) => void;
  handleMagneticMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMagneticLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  lang,
  theme,
  mobileMenuOpen,
  toggleTheme,
  setLang,
  setMobileMenuOpen,
  handleMobileLinkClick,
  handleMagneticMove,
  handleMagneticLeave
}) => {
  return (
    <>
      {/* Modern Sticky Navigation */}
      <nav className="nav-container">
        {/* Desktop nav-links */}
        <div className="nav-links">
          <a href="#about" className={`nav-link${activeSection === 'about' ? ' active' : ''}`}>About</a>
          <a href="#experience" className={`nav-link${activeSection === 'experience' ? ' active' : ''}`}>Experience</a>
          <a href="#projects" className={`nav-link${activeSection === 'projects' ? ' active' : ''}`}>Projects</a>
          <a href="#tech" className={`nav-link${activeSection === 'tech' ? ' active' : ''}`}>Skills</a>
          <Link href="/blog" className="nav-link">{lang === 'en' ? 'Interests' : 'สิ่งที่สนใจ'}</Link>
          <a href="#contact" className={`nav-link${activeSection === 'contact' ? ' active' : ''}`}>Contact</a>
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
              onClick={() => setLang('en')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem',
                fontWeight: lang === 'en' ? 'bold' : 'normal',
                color: lang === 'en' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              EN
            </button>
            <span style={{ color: 'var(--divider)', fontSize: '0.78rem' }}>|</span>
            <button
              onClick={() => setLang('th')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem',
                fontWeight: lang === 'th' ? 'bold' : 'normal',
                color: lang === 'th' ? 'var(--accent-light)' : 'var(--text-muted)',
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
          <button onClick={() => handleMobileLinkClick('about')} className={`mobile-drawer-link${activeSection === 'about' ? ' active' : ''}`}>About</button>
          <button onClick={() => handleMobileLinkClick('experience')} className={`mobile-drawer-link${activeSection === 'experience' ? ' active' : ''}`}>Experience</button>
          <button onClick={() => handleMobileLinkClick('projects')} className={`mobile-drawer-link${activeSection === 'projects' ? ' active' : ''}`}>Projects</button>
          <button onClick={() => handleMobileLinkClick('tech')} className={`mobile-drawer-link${activeSection === 'tech' ? ' active' : ''}`}>Skills</button>
          <button onClick={() => { setMobileMenuOpen(false); }} className="mobile-drawer-link">
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              {lang === 'en' ? 'Interests' : 'สิ่งที่สนใจ'}
            </Link>
          </button>
          <button onClick={() => handleMobileLinkClick('contact')} className={`mobile-drawer-link${activeSection === 'contact' ? ' active' : ''}`}>Contact</button>
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
                {lang === 'en' ? 'Light Mode' : 'โหมดสว่าง'}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                {lang === 'en' ? 'Dark Mode' : 'โหมดมืด'}
              </>
            )}
          </button>

          {/* Mobile Language Toggle Selector */}
          <div className="mobile-drawer-lang">
            <button
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'active' : ''}
            >
              English
            </button>
            <span>/</span>
            <button
              onClick={() => setLang('th')}
              className={lang === 'th' ? 'active' : ''}
            >
              ไทย
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
