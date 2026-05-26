/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export type LifestyleStat = { label: string; value: string };

export type LifestyleItem = {
  id: string;
  title_en: string;
  title_th: string;
  subtitle_en: string;
  subtitle_th: string;
  images: string[];
  details_en: string;
  details_th: string;
  stats_en: LifestyleStat[];
  stats_th: LifestyleStat[];
  rating?: number;
};

type ConfettiPiece = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  rotation: string;
};

// ===== SVG Icon Utilities =====
const MapPinIcon = ({ size = 13, style = {} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CameraIcon = ({ size = 15, style = {} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const MountainIcon = ({ size = 15, style = {} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"></path>
  </svg>
);

const MapIcon = ({ size = 18, style = {} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
    <line x1="9" y1="3" x2="9" y2="18"></line>
    <line x1="15" y1="6" x2="15" y2="21"></line>
  </svg>
);

const CloudUploadIcon = ({ size = 28, style = {} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} style={{ color: 'var(--accent-light)', marginBottom: '6px', ...style }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const CalendarIcon = ({ size = 12, style = {} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="3" y2="10"></line>
  </svg>
);

const StarIcon = ({ size = 14, filled = false, style = {} }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "#ffc107" : "none"}
    stroke={filled ? "#ffc107" : "currentColor"}
    strokeWidth="2"
    width={size}
    height={size}
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const RatingStars = ({ val = 0, size = 14 }: { val?: number, size?: number }) => (
  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <StarIcon key={star} size={size} filled={star <= val} />
    ))}
  </div>
);

// ===== Immersive Scrapbook Journal Modal Component =====
const ScrapbookJournalModal = ({
  locale,
  item,
  onClose,
  onEdit
}: {
  locale: 'en' | 'th';
  item: LifestyleItem;
  onClose: () => void;
  onEdit: (item: LifestyleItem) => void;
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Next / Prev slide logic
  const handleNext = () => {
    if (item.images.length > 1) {
      setCurrentImgIdx(prev => (prev + 1) % item.images.length);
    }
  };

  const handlePrev = () => {
    if (item.images.length > 1) {
      setCurrentImgIdx(prev => (prev - 1 + item.images.length) % item.images.length);
    }
  };

  // Keyboard navigation event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) setIsLightboxOpen(false);
        else onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, onClose, item.images.length]);

  // Reset active image index when switching items
  useEffect(() => {
    setCurrentImgIdx(0);
  }, [item]);

  // Simple Markdown paragraph formatter
  const renderDetails = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="journal-paragraph">
        {paragraph}
      </p>
    ));
  };

  const activeTitle = locale === 'en' ? item.title_en : item.title_th;
  const activeSubtitle = locale === 'en' ? item.subtitle_en : item.subtitle_th;
  const activeDetails = locale === 'en' ? item.details_en : item.details_th;
  const activeStats = locale === 'en' ? item.stats_en : item.stats_th;

  // Retrieve location and duration if available in stats
  const locationStat = activeStats.find(s => s.label.toLowerCase().includes('location') || s.label.includes('สถานที่'));
  const durationStat = activeStats.find(s => s.label.toLowerCase().includes('duration') || s.label.includes('ระยะเวลา'));

  return (
    <div className="scrapbook-overlay" onClick={onClose}>
      <div className="scrapbook-modal" onClick={(e) => e.stopPropagation()}>
        <button className="scrapbook-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        <div className="scrapbook-split-container">

          {/* LEFT PANE: Photo Album Board (Immersive Blurred-Backdrop Design) */}
          <div className="scrapbook-photo-board">
            {item.images.length > 0 ? (
              <>
                {/* Immersive blurred backdrop mirroring the active image */}
                <div
                  className="scrapbook-blur-backdrop"
                  style={{ backgroundImage: `url(${item.images[currentImgIdx]})` }}
                />

                {/* Sharp floating active image container */}
                <div className="scrapbook-image-viewer-wrap">
                  <div className="scrapbook-image-viewer" onClick={() => setIsLightboxOpen(true)}>
                    <img
                      src={item.images[currentImgIdx]}
                      alt={`${activeTitle} preview`}
                      className="scrapbook-immersive-image"
                    />
                  </div>
                </div>

                {/* Slideshow Arrow navigation floating over the board */}
                {item.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="immersive-nav-arrow prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      aria-label="Previous image"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className="immersive-nav-arrow next"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      aria-label="Next image"
                    >
                      &gt;
                    </button>
                  </>
                )}

                {/* Photo counter index pill */}
                {item.images.length > 1 && (
                  <div className="immersive-photo-counter">
                    {currentImgIdx + 1} / {item.images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="scrapbook-no-image">
                <span>{locale === 'en' ? 'No photos loaded' : 'ไม่มีภาพถ่าย'}</span>
              </div>
            )}

            {/* Floating Filmstrip Thumbnail Grid at the bottom */}
            {item.images.length > 1 && (
              <div className="immersive-filmstrip-wrapper">
                <div className="immersive-filmstrip">
                  {item.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`immersive-thumbnail-container ${idx === currentImgIdx ? 'active' : ''}`}
                      onClick={() => setCurrentImgIdx(idx)}
                    >
                      <img src={img} alt="Thumbnail preview" className="immersive-thumbnail" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANE: Travel Diary Page */}
          <div className="scrapbook-diary-page">

            {/* Travel Tags/Header */}
            <div className="scrapbook-diary-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <span className="scrapbook-diary-badge location">
                  <MapPinIcon size={12} style={{ marginRight: '4px' }} />
                  {locationStat ? locationStat.value : (locale === 'en' ? 'Exploration' : 'การเดินทาง')}
                </span>
                {durationStat && (
                  <span className="scrapbook-diary-badge duration">
                    <CalendarIcon size={12} style={{ marginRight: '4px' }} />
                    {durationStat.value}
                  </span>
                )}
                {item.rating && item.rating > 0 && (
                  <div style={{ marginLeft: '4px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.7rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{locale === 'en' ? 'Difficulty' : 'ระดับความยาก'}</span>
                    <RatingStars val={item.rating} size={11} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="lifestyle-back-btn"
                style={{ padding: '0.35rem 0.95rem', fontSize: '0.78rem', gap: '0.35rem', cursor: 'pointer', margin: 0, height: 'auto', borderRadius: '30px' }}
              >
                ✏️ {locale === 'en' ? 'Edit' : 'แก้ไข'}
              </button>
            </div>

            {/* Travel Diary Log Content */}
            <div className="scrapbook-diary-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <h2 className="scrapbook-diary-title">{activeTitle}</h2>
              <h4 className="scrapbook-diary-subtitle">{activeSubtitle}</h4>

              <div className="scrapbook-diary-divider"></div>

              <div className="scrapbook-diary-text" style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
                {renderDetails(activeDetails)}
              </div>

              {/* Custom Travel Stats Boxes */}
              {activeStats.length > 0 && (
                <div className="scrapbook-diary-stats" style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  {activeStats.map((st, idx) => (
                    <div key={idx} className="scrapbook-diary-stat-box">
                      <div className="scrapbook-diary-stat-value">{st.value}</div>
                      <div className="scrapbook-diary-stat-label">{st.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODE WITH FULL SLIDE CONTROLS */}
      {isLightboxOpen && item.images.length > 0 && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>×</button>

          {/* Lightbox Prev Slide Arrow */}
          {item.images.length > 1 && (
            <button
              className="lightbox-arrow prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
            >
              &lt;
            </button>
          )}

          <img
            src={item.images[currentImgIdx]}
            alt="Expanded view"
            className="lightbox-image animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Lightbox Next Slide Arrow */}
          {item.images.length > 1 && (
            <button
              className="lightbox-arrow next"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
            >
              &gt;
            </button>
          )}

          {/* Active slide counter overlay */}
          {item.images.length > 1 && (
            <div className="lightbox-counter">
              {currentImgIdx + 1} / {item.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ===== Local Creator Dashboard Modal Component =====
const CreatorDashboardModal = ({
  locale,
  editItem,
  onClose,
  router
}: {
  locale: 'en' | 'th';
  editItem?: LifestyleItem;
  onClose: () => void;
  router: any;
}) => {
  const [slug, setSlug] = useState(editItem ? editItem.id : '');
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [title, setTitle] = useState(editItem ? (locale === 'en' ? editItem.title_en : editItem.title_th) : '');
  const [subtitle, setSubtitle] = useState(editItem ? (locale === 'en' ? editItem.subtitle_en : editItem.subtitle_th) : '');
  const [details, setDetails] = useState(editItem ? (locale === 'en' ? editItem.details_en : editItem.details_th) : '');
  const [rating, setRating] = useState(editItem?.rating || 0);

  // Custom stats values (automatically mapped to current language)
  const getInitialStat = (idx: number) => {
    if (!editItem) return { label: '', value: '' };
    const statsList = locale === 'en' ? editItem.stats_en : editItem.stats_th;
    return statsList[idx] || { label: '', value: '' };
  };

  const stat1 = getInitialStat(0);
  const [stat1Label, setStat1Label] = useState(editItem ? stat1.label : (locale === 'en' ? 'Location' : 'สถานที่'));
  const [stat1Val, setStat1Val] = useState(editItem ? stat1.value : '');

  const stat2 = getInitialStat(1);
  const [stat2Label, setStat2Label] = useState(editItem ? stat2.label : (locale === 'en' ? 'Duration' : 'ระยะเวลา'));
  const [stat2Val, setStat2Val] = useState(editItem ? stat2.value : '');

  const stat3 = getInitialStat(2);
  const [stat3Label, setStat3Label] = useState(editItem ? stat3.label : (locale === 'en' ? 'Peak Elevation' : 'ระดับความสูง'));
  const [stat3Val, setStat3Val] = useState(editItem ? stat3.value : '');

  // Existing files list & deletion tracker
  const [existingImages, setExistingImages] = useState<string[]>(editItem ? editItem.images : []);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  // Selected new files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean slug auto-generation from Title input
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editItem && !isSlugTouched) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-'); // replace spaces with dash
      setSlug(generatedSlug);
    }
  };
  // Image selection handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);

      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeSelectedFile = (idx: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
    URL.revokeObjectURL(previews[idx]);
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const removeExistingImage = (imgUrl: string) => {
    setExistingImages(prev => prev.filter(img => img !== imgUrl));
    setDeletedImages(prev => [...prev, imgUrl]);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !title) {
      setErrorMsg(locale === 'en' ? 'Slug and Title are required.' : 'กรุณากรอกรหัสและหัวข้อทริป');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('details', details);
    formData.append('rating', rating.toString());

    // Compile stats based on current language
    const stats = [
      { label: stat1Label || (locale === 'en' ? 'Location' : 'สถานที่'), value: stat1Val },
      { label: stat2Label || (locale === 'en' ? 'Duration' : 'ระยะเวลา'), value: stat2Val },
      { label: stat3Label || (locale === 'en' ? 'Peak Elevation' : 'ระดับความสูง'), value: stat3Val }
    ].filter(s => s.value);

    formData.append('stats', JSON.stringify(stats));
    formData.append('deletedImages', JSON.stringify(deletedImages));

    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const apiUrl = editItem ? '/api/lifestyle/edit' : '/api/lifestyle/create';
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Trigger Success Celebration
        const parentCelebrator = (window as any).triggerSuccessConfetti;
        if (parentCelebrator) parentCelebrator();

        setIsSubmitting(false);

        // Wait briefly for user to see the success state
        setTimeout(() => {
          onClose();
          router.refresh();
        }, 2000);
      } else {
        setErrorMsg(data.error || 'Failed to update memory log.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="creator-overlay" onClick={onClose}>
      <div className="creator-modal" onClick={(e) => e.stopPropagation()}>
        <button className="creator-close-btn" onClick={onClose}>×</button>

        <h2 className="creator-title">
          {editItem
            ? (locale === 'en' ? 'Edit Travel Memory' : 'แก้ไขบันทึกความทรงจำการเดินทาง')
            : (locale === 'en' ? 'Add New Travel Memory' : 'เพิ่มบันทึกความทรงจำการเดินทาง')}
        </h2>
        <p className="creator-subtitle">
          {locale === 'en'
            ? 'Publish and manage trip memories directly to the local filesystem without touching the code.'
            : 'บันทึกและจัดการทริปการท่องเที่ยวพร้อมรูปภาพเซฟตรงเข้าคอมพิวเตอร์ของคุณอัตโนมัติ'}
        </p>

        {errorMsg && <div className="creator-error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="creator-form">

          <div className="creator-form-row col-2">
            {/* Slug field */}
            <div className="creator-field-group">
              <label className="creator-label">
                {locale === 'en' ? 'Slug / Folder Name (English)' : 'รหัสอ้างอิงภาษาอังกฤษ (ชื่อโฟลเดอร์)'} *
              </label>
              <input
                type="text"
                className="creator-input font-mono"
                placeholder="e.g. khao-kho-trip"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, ''));
                  setIsSlugTouched(true);
                }}
                disabled={!!editItem}
                style={editItem ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                required
              />
            </div>

            {/* Trip Title */}
            <div className="creator-field-group">
              <label className="creator-label">
                {locale === 'en' ? 'Trip Title' : 'หัวข้อทริปท่องเที่ยว'} *
              </label>
              <input
                type="text"
                className="creator-input"
                placeholder={locale === 'en' ? 'e.g. Hiking Phu Kradueng' : 'เช่น เดินป่าพิชิตภูกระดึง'}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="creator-form-row col-2">
            <div className="creator-field-group">
              <label className="creator-label">
                {locale === 'en' ? 'Subtitle / Travel Season' : 'คำโปรยสั้นๆ / ช่วงเวลาท่องเที่ยว'}
              </label>
              <input
                type="text"
                className="creator-input"
                placeholder={locale === 'en' ? 'e.g. Pine trees and cool winter breeze' : 'เช่น ลมหนาวพัดโชยใต้ทิวสน'}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>

            {/* Rating Selector */}
            <div className="creator-field-group">
              <label className="creator-label">
                {locale === 'en' ? 'Difficulty Level' : 'ระดับความยากในการเดิน'}
              </label>
              <div style={{ display: 'flex', gap: '8px', height: '42px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <StarIcon size={24} filled={star <= rating} />
                  </button>
                ))}
                {rating > 0 && (
                  <button
                    type="button"
                    onClick={() => setRating(0)}
                    style={{ fontSize: '0.7rem', color: 'var(--accent-light)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px', cursor: 'pointer' }}
                  >
                    {locale === 'en' ? 'Reset' : 'ล้าง'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="creator-field-group">
            <label className="creator-label">
              {locale === 'en' ? 'Detailed Travel Log' : 'บันทึกความรู้สึก / รายละเอียดการผจญภัย'}
            </label>
            <textarea
              className="creator-textarea"
              placeholder={locale === 'en'
                ? 'Tell the beautiful story of your travel experience, routes, and highlights...'
                : 'บรรยายบรรยากาศธรรมชาติ เส้นทางการเดินทาง จุดประทับใจต่างๆ...'}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
            />
          </div>

          {/* Dynamic Stats Setup */}
          <div className="creator-stats-title">
            {locale === 'en' ? 'Trip Stats Highlights' : 'ข้อมูลสถิติทริปย่อ'}
          </div>
          <div className="creator-form-row col-3">
            <div className="creator-field-group">
              <input type="text" className="creator-stat-lbl-input" value={stat1Label} onChange={e => setStat1Label(e.target.value)} placeholder="Stat 1 label" />
              <input type="text" className="creator-input" placeholder={locale === 'en' ? 'e.g. Loei, Thailand' : 'เช่น เลย, ประเทศไทย'} value={stat1Val} onChange={e => setStat1Val(e.target.value)} />
            </div>
            <div className="creator-field-group">
              <input type="text" className="creator-stat-lbl-input" value={stat2Label} onChange={e => setStat2Label(e.target.value)} placeholder="Stat 2 label" />
              <input type="text" className="creator-input" placeholder={locale === 'en' ? 'e.g. 3 Days' : 'เช่น 3 วัน 2 คืน'} value={stat2Val} onChange={e => setStat2Val(e.target.value)} />
            </div>
            <div className="creator-field-group">
              <input type="text" className="creator-stat-lbl-input" value={stat3Label} onChange={e => setStat3Label(e.target.value)} placeholder="Stat 3 label" />
              <input type="text" className="creator-input" placeholder={locale === 'en' ? 'e.g. 1,285 m' : 'เช่น 1,285 ม.'} value={stat3Val} onChange={e => setStat3Val(e.target.value)} />
            </div>
          </div>

          {/* CURRENT PHOTOS LIST (Edit mode only) */}
          {existingImages.length > 0 && (
            <div className="creator-field-group" style={{ marginTop: '1.25rem' }}>
              <label className="creator-label">
                {locale === 'en' ? 'Current Photos (Click x to remove)' : 'ภาพถ่ายเดิมในอัลบั้ม (คลิก x เพื่อลบออก)'}
              </label>
              <div className="creator-preview-strip">
                {existingImages.map((src, idx) => (
                  <div key={idx} className="creator-preview-item">
                    <img src={src} alt="Current album photo" className="creator-preview-img" />
                    <button
                      type="button"
                      className="creator-preview-remove"
                      onClick={() => removeExistingImage(src)}
                      title={locale === 'en' ? 'Delete this photo' : 'ลบรูปภาพนี้'}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IMAGE UPLOADER */}
          <div className="creator-field-group" style={{ marginTop: '1.25rem' }}>
            <label className="creator-label">
              {locale === 'en' ? 'Add More Photos (Select multiple)' : 'อัปโหลดภาพถ่ายทริปเพิ่มเติม (เลือกได้หลายรูปพร้อมกัน)'}
            </label>
            <div
              className="creator-upload-zone"
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadIcon />
              <div className="upload-zone-text">
                {locale === 'en' ? 'Click to select trip photos' : 'คลิกเพื่อเลือกภาพถ่ายสถานที่ท่องเที่ยว'}
              </div>
              <span className="upload-zone-hint">PNG, JPG, JPEG, GIF</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              multiple
              accept="image/*"
            />

            {/* Live previews strip */}
            {previews.length > 0 && (
              <div className="creator-preview-strip">
                {previews.map((src, idx) => (
                  <div key={idx} className="creator-preview-item">
                    <img src={src} alt="Upload preview" className="creator-preview-img" />
                    <button
                      type="button"
                      className="creator-preview-remove"
                      onClick={() => removeSelectedFile(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions buttons */}
          <div className="creator-actions">
            <button
              type="button"
              className="creator-btn cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {locale === 'en' ? 'Cancel' : 'ยกเลิก'}
            </button>
            <button
              type="submit"
              className="creator-btn submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="creator-spinner-text">
                  <span className="creator-spinner"></span> {locale === 'en' ? 'Publishing...' : 'กำลังบันทึก...'}
                </span>
              ) : (
                editItem
                  ? (locale === 'en' ? 'Update Memory' : 'อัปเดตทริปท่องเที่ยว')
                  : (locale === 'en' ? 'Publish Memory' : 'บันทึกทริปลงอัลบั้ม')
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ===== Page Shell Main Client Component =====
export default function LifestyleClient({ items }: { items: LifestyleItem[] }) {
  const locale = useLocale() as 'en' | 'th';
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [editItem, setEditItem] = useState<LifestyleItem | undefined>(undefined);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const activeItemData = items.find(item => item.id === activeItem);

  // Sync state system with global window object to allow child modal triggering confetti
  useEffect(() => {
    (window as any).triggerSuccessConfetti = () => {
      setSuccessAnimation(true);
      // Generate 100 colorful pieces of confetti
      const pieces: ConfettiPiece[] = [];
      const colors = ['#bb86fc', '#03dac6', '#ff79c6', '#8be9fd', '#50fa7b', '#f1fa8c', '#ff5555'];
      for (let i = 0; i < 110; i++) {
        pieces.push({
          id: i,
          left: `${Math.random() * 100}vw`,
          delay: `${Math.random() * 1.5}s`,
          duration: `${1.5 + Math.random() * 2}s`,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: `${Math.random() * 720}deg`
        });
      }
      setConfetti(pieces);

      // Reset success overlays
      setTimeout(() => {
        setSuccessAnimation(false);
        setConfetti([]);
      }, 5000);
    };

    return () => {
      delete (window as any).triggerSuccessConfetti;
    };
  }, []);

  // Fetch initial theme settings
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light' || currentTheme === 'dark') {
      setTheme(currentTheme);
    }
  }, []);

  // Set page attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Premium Scroll Intersection Observer for custom card fade/slide-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const cards = document.querySelectorAll('.polaroid-wrapper');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [items]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const switchLocale = (newLocale: 'en' | 'th') => {
    router.replace(pathname, { locale: newLocale });
  };

  // Calculations for Travel Statistics Banner
  const totalDestinations = items.length;
  const totalPhotos = items.reduce((acc, item) => acc + item.images.length, 0);
  const featuredPeak = locale === 'en' ? '2,565 m (Doi Inthanon)' : '2,565 ม. (ดอยอินทนนท์)';

  return (
    <main className="lifestyle-scrapbook-main">

      {/* Dynamic Confetti Celebration Canvas */}
      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map(piece => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                left: piece.left,
                '--fall-delay': piece.delay,
                '--fall-duration': piece.duration,
                '--rotation': piece.rotation,
                background: piece.color,
                width: `${6 + Math.random() * 10}px`,
                height: `${12 + Math.random() * 10}px`,
                borderRadius: '2px'
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Dynamic success banner notification */}
      {successAnimation && (
        <div className="creator-success-toast animate-slide-down">
          {locale === 'en' ? 'Memory published successfully!' : 'บันทึกทริปสำเร็จแล้ว!'}
        </div>
      )}

      {/* Subpage Navigation Header */}
      <header className="lifestyle-header">
        <Link href="/" className="lifestyle-back-btn">
          <span>←</span> {locale === 'en' ? 'Back to Portfolio' : 'กลับหน้าหลัก'}
        </Link>

        <div className="lifestyle-nav-actions">
          {/* Creator Dash Trigger */}
          <button
            onClick={() => setIsCreatorOpen(true)}
            className="lifestyle-creator-trigger"
          >
            {locale === 'en' ? 'Add Memory' : 'เพิ่มทริปใหม่'}
          </button>

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="lifestyle-theme-btn"
            aria-label="Toggle theme"
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

          {/* Language Switch */}
          <div className="lifestyle-lang-box">
            <button onClick={() => switchLocale('en')} className={locale === 'en' ? 'active' : ''}>EN</button>
            <span>|</span>
            <button onClick={() => switchLocale('th')} className={locale === 'th' ? 'active' : ''}>TH</button>
          </div>
        </div>
      </header>

      {/* Main Title Section */}
      <section className="lifestyle-hero">
        <h1 className="lifestyle-hero-title">
          {locale === 'en' ? 'Travel Scrapbook' : 'สมุดภาพบันทึกการเดินทาง'}
        </h1>
        <p className="lifestyle-hero-subtitle">
          {locale === 'en'
            ? 'A collection of my travel memories, mountain hikes, and outdoor photography from around the world.'
            : 'พื้นที่รวบรวมบันทึกการเดินทาง การพิชิตยอดเขาสูง และภาพถ่ายธรรมชาติจากหลากหลายสถานที่ทั่วโลก'}
        </p>
      </section>

      {/* Premium Interactive Travel Stats Dashboard */}
      <section className="travel-stats-banner">
        <div className="travel-stat-card">
          <div className="travel-stat-icon">
            <MapIcon />
          </div>
          <div className="travel-stat-details">
            <span className="travel-stat-val">{totalDestinations}</span>
            <span className="travel-stat-lbl">{locale === 'en' ? 'Places Explored' : 'สถานที่ที่พิชิต'}</span>
          </div>
        </div>

        <div className="travel-stat-card">
          <div className="travel-stat-icon">
            <CameraIcon size={20} />
          </div>
          <div className="travel-stat-details">
            <span className="travel-stat-val">{totalPhotos}</span>
            <span className="travel-stat-lbl">{locale === 'en' ? 'Photos Captured' : 'ภาพถ่ายสะสม'}</span>
          </div>
        </div>

        <div className="travel-stat-card">
          <div className="travel-stat-icon">
            <MountainIcon size={20} />
          </div>
          <div className="travel-stat-details">
            <span className="travel-stat-val">{featuredPeak}</span>
            <span className="travel-stat-lbl">{locale === 'en' ? 'Peak Scaled of Thailand' : 'จุดสูงสุดยอดดอยประเทศไทย'}</span>
          </div>
        </div>
      </section>

      {/* Polaroid Scrapbook Memory Grid */}
      <section className="scrapbook-grid-section">
        <div className="lifestyle-grid">
          {items.map((item, index) => {
            const activeTitle = locale === 'en' ? item.title_en : item.title_th;
            const activeSubtitle = locale === 'en' ? item.subtitle_en : item.subtitle_th;
            const activeDetails = locale === 'en' ? item.details_en : item.details_th;
            const locationStat = (locale === 'en' ? item.stats_en : item.stats_th).find(s => s.label.toLowerCase().includes('location') || s.label.includes('สถานที่'));
            const activeStats = locale === 'en' ? item.stats_en : item.stats_th;

            return (
              <div
                key={item.id}
                className="polaroid-wrapper"
                onClick={() => setActiveItem(item.id)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Polaroid Stack Layout (displays multiple borders if item has multiple images) */}
                <div className={`scrapbook-polaroid-card ${item.images.length > 1 ? 'has-stack' : ''}`}>

                  <div className="polaroid-image-frame">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={activeTitle}
                        className="polaroid-img"
                      />
                    ) : (
                      <div className="polaroid-img-fallback">
                        <CameraIcon size={32} style={{ opacity: 0.3 }} />
                      </div>
                    )}

                    {/* Location Pin Ribbon */}
                    <div className="polaroid-location-tag">
                      <MapPinIcon size={11} style={{ marginRight: '4px' }} />
                      {locationStat ? locationStat.value : (locale === 'en' ? 'Explore' : 'ท่องเที่ยว')}
                    </div>

                    {/* Album count badge */}
                    {item.images.length > 1 && (
                      <div className="polaroid-album-badge">
                        {item.images.length} {locale === 'en' ? 'Photos' : 'รูปภาพ'}
                      </div>
                    )}
                  </div>

                  <div className="polaroid-caption">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <h3 className="polaroid-title" style={{ flex: 1 }}>{activeTitle}</h3>
                      {item.rating && item.rating > 0 && (
                        <div style={{ marginTop: '4px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                          <span style={{ fontSize: '0.6rem', opacity: 0.6, fontWeight: 600, textTransform: 'uppercase' }}>
                            {locale === 'en' ? 'Difficulty' : 'ความยาก'}
                          </span>
                          <RatingStars val={item.rating} size={11} />
                        </div>
                      )}
                    </div>
                    <p className="polaroid-subtitle">{activeSubtitle}</p>

                    {/* Description preview snippet */}
                    {activeDetails && (
                      <p className="polaroid-description-preview">
                        {activeDetails}
                      </p>
                    )}

                    {/* Render mini stats on card directly! */}
                    {activeStats.length > 0 && (
                      <div className="card-mini-stats">
                        {activeStats.map((st, sIdx) => {
                          const labelLower = st.label.toLowerCase();
                          const isLocation = labelLower.includes('location') || labelLower.includes('สถานที่');
                          const isDuration = labelLower.includes('duration') || labelLower.includes('ระยะเวลา');
                          const isElevation = labelLower.includes('elevation') || labelLower.includes('ระดับความสูง') || labelLower.includes('ความสูง');

                          return (
                            <span key={sIdx} className="card-stat-badge">
                              {isLocation && <MapPinIcon size={11} style={{ marginRight: '4px', opacity: 0.8 }} />}
                              {isDuration && <CalendarIcon size={11} style={{ marginRight: '4px', opacity: 0.8 }} />}
                              {isElevation && <MountainIcon size={11} style={{ marginRight: '4px', opacity: 0.8 }} />}
                              <strong className="badge-lbl">{st.label}:</strong> <span className="badge-val">{st.value}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <span className="polaroid-read-log">
                      {locale === 'en' ? 'Read Travel Log →' : 'อ่านบันทึกการเดินทาง →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Immersive Overlay Split Modal */}
      {activeItemData && (
        <ScrapbookJournalModal
          locale={locale}
          item={activeItemData}
          onClose={() => setActiveItem(null)}
          onEdit={(item) => {
            setActiveItem(null);
            setEditItem(item);
          }}
        />
      )}

      {/* Admin Creator Dashboard Modal Drawer */}
      {(isCreatorOpen || editItem) && (
        <CreatorDashboardModal
          locale={locale}
          editItem={editItem}
          onClose={() => {
            setIsCreatorOpen(false);
            setEditItem(undefined);
          }}
          router={router}
        />
      )}

      <footer className="lifestyle-footer">
        <p>© 2026 Chanchai Chakam. All rights reserved.</p>
      </footer>
    </main>
  );
}
