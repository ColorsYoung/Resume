"use client";

import React from 'react';

interface ContactProps {
  currentT: {
    contactTitle: string;
    contactSubtitle: string;
    contactName: string;
    contactEmail: string;
    contactMessage: string;
    contactSend: string;
    contactSending: string;
    contactSent: string;
    contactError: string;
  };
  locale: 'en' | 'th';
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
  setContactForm: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    message: string;
  }>>;
  contactStatus: 'idle' | 'sending' | 'sent' | 'error';
  handleContactSubmit: (e: React.FormEvent) => void;
}

export const Contact: React.FC<ContactProps> = ({
  currentT,
  locale,
  contactForm,
  setContactForm,
  contactStatus,
  handleContactSubmit
}) => {
  return (
    <section id="contact" className="contact-section animate-on-scroll">
      <h2 className="section-title">{currentT.contactTitle}</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
        {currentT.contactSubtitle}
      </p>
      <div className="contact-form-card">
        <form onSubmit={handleContactSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">{currentT.contactName}</label>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder={locale === 'en' ? 'John Doe' : 'ชื่อ-นามสกุล'}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">{currentT.contactEmail}</label>
              <input
                id="contact-email"
                className="form-input"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">{currentT.contactMessage}</label>
            <textarea
              id="contact-message"
              className="form-textarea"
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              required
              placeholder={locale === 'en' ? "Tell me about your project or idea..." : "เล่าเกี่ยวกับโปรเจกต์หรือไอเดียของคุณ..."}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={contactStatus === 'sending'}
              style={{ minWidth: '200px', justifyContent: 'center' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              {contactStatus === 'sending' ? currentT.contactSending : currentT.contactSend}
            </button>
          </div>
          {contactStatus === 'sent' && (
            <div className="form-status success">{currentT.contactSent}</div>
          )}
          {contactStatus === 'error' && (
            <div className="form-status error">{currentT.contactError}</div>
          )}
        </form>
      </div>
    </section>
  );
};
