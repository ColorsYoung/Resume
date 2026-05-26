"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import PasswordPromptModal from './PasswordPromptModal';

interface HeroProps {
  currentT: {
    role: string;
    contact: string;
    downloadCV: string;
  };
  handleContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleMagneticMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMagneticLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentT,
  handleContactClick,
  handleMagneticMove,
  handleMagneticLeave
}) => {
  const locale = useLocale() as 'en' | 'th';
  const [isHovered, setIsHovered] = useState(false);
  const [showPwdPrompt, setShowPwdPrompt] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/ProfileNoom.jpeg');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAuthSuccess = () => {
    setShowPwdPrompt(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/avatar/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setAvatarUrl(`/ProfileNoom.jpeg?ts=${Date.now()}`);
      } else {
        alert('Failed to upload avatar');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <header className="hero-section-header">
      {/* 1. Animated Hero Avatar / Profile Photo with pulse/rotating neon ring glow */}
      <div 
        className="avatar-container animate-on-scroll"
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
        onClick={() => setShowPwdPrompt(true)}
      >
        <div className="avatar-ring" />
        <div className="avatar-image-wrapper">
          <Image
            className="avatar-image"
            src={avatarUrl}
            alt="Chanchai Chakam Avatar"
            fill
            sizes="155px"
            priority
          />
          {isHovered && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', zIndex: 10 }}>
              <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>{isUploading ? '...' : (locale === 'en' ? 'Edit' : 'แก้ไข')}</span>
            </div>
          )}
        </div>
      </div>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
      {showPwdPrompt && (
        <PasswordPromptModal
          locale={locale}
          onClose={() => setShowPwdPrompt(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      <h1 className="animate-on-scroll">Chanchai Chakam</h1>
      <h2 className="animate-on-scroll" style={{ fontSize: '1.5rem', color: 'var(--accent-light)', marginBottom: '1.5rem', fontWeight: 600 }}>
        {currentT.role}
      </h2>

      <div className="hero-actions animate-on-scroll">
        <a
          href="mailto:Chanchaichakam1997@gmail.com"
          onClick={handleContactClick}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="btn btn-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          {currentT.contact}
        </a>
        <a
          href="https://github.com/ColorsYoung"
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="btn btn-social"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/chanchai-chakam"
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="btn btn-social"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          LinkedIn
        </a>
        <a
          href="/api/download-cv"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="btn btn-outline"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {currentT.downloadCV}
        </a>
      </div>
    </header>
  );
};
