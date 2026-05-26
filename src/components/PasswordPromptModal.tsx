"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function PasswordPromptModal({
  locale,
  onClose,
  onSuccess
}: {
  locale: 'en' | 'th';
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError(true);
        setPwd('');
      }
    } catch (err) {
      setError(true);
      setPwd('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="creator-overlay" onClick={onClose} style={{ zIndex: 11000 }}>
      <div className="creator-modal" style={{ maxWidth: '400px', height: 'auto', padding: '2.5rem' }} onClick={(e) => e.stopPropagation()}>
        <button className="creator-close-btn" onClick={onClose}><X size={16} /></button>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>
          {locale === 'en' ? 'Admin Access Required' : 'ยืนยันสิทธิ์ผู้ดูแลระบบ'}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {locale === 'en' ? 'Please enter the password to modify content.' : 'กรุณาใส่รหัสผ่านเพื่อแก้ไขเนื้อหา'}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            autoFocus
            className="creator-input"
            style={{ marginBottom: '1rem', borderColor: error ? '#ff5555' : '' }}
            placeholder={locale === 'en' ? 'Password' : 'รหัสผ่าน'}
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(false); }}
          />
          {error && (
            <div style={{ color: '#ff5555', fontSize: '0.75rem', marginBottom: '1rem' }}>
              {locale === 'en' ? 'Incorrect password. Please try again.' : 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่'}
            </div>
          )}
          <button type="submit" className="creator-btn submit" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
            {isSubmitting ? (locale === 'en' ? 'Verifying...' : 'กำลังตรวจสอบ...') : (locale === 'en' ? 'Authenticate' : 'ยืนยัน')}
          </button>
        </form>
      </div>
    </div>
  );
}
