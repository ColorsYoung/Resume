/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export type Article = {
  id: string;
  title_en: string;
  title_th: string;
  tag: string;
  date: string;
  excerpt_en: string;
  excerpt_th: string;
  content_en: string; // HTML string from marked
  content_th: string; // HTML string from marked
};

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

export default function BlogClient({ articles }: { articles: Article[] }) {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // Initial Theme Load
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light' || currentTheme === 'dark') {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Initial Load with Query Parameters (Deep Linking)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const postParam = params.get('post');
      if (postParam && articles.some(a => a.id === postParam)) {
        setSelectedArticleId(postParam);
      } else if (articles.length > 0) {
        setSelectedArticleId(articles[0].id);
      }
    }
  }, [articles]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Handle Article Selection
  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    setIsSidebarOpen(false); // Close mobile sidebar
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('post', id);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Scroll to top when article changes
  useEffect(() => {
    if (!selectedArticleId) return;

    const scrollToTop = () => {
      // 1. Try scrolling the content area div (internal scroll)
      const contentArea = document.querySelector('.docs-content-area');
      if (contentArea) {
        contentArea.scrollTop = 0;
      }
      // 2. Also try scrolling the window (standard scroll)
      window.scrollTo(0, 0);
    };

    // Execute immediately and again after a short delay to ensure DOM is ready
    scrollToTop();
    const timeout = setTimeout(scrollToTop, 10);
    return () => clearTimeout(timeout);
  }, [selectedArticleId]);

  // Find active article
  const activeArticle = useMemo(() => {
    return articles.find(a => a.id === selectedArticleId) || articles[0];
  }, [articles, selectedArticleId]);

  // Filter and Group articles for sidebar
  const filteredGroupedArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const groups: Record<string, Article[]> = {};

    articles.forEach(article => {
      const title = (lang === 'en' ? article.title_en : article.title_th).toLowerCase();
      const excerpt = (lang === 'en' ? article.excerpt_en : article.excerpt_th).toLowerCase();
      const tag = article.tag.toLowerCase();

      if (!query || title.includes(query) || excerpt.includes(query) || tag.includes(query)) {
        const artTag = article.tag || 'General';
        if (!groups[artTag]) groups[artTag] = [];
        groups[artTag].push(article);
      }
    });

    return groups;
  }, [articles, searchQuery, lang]);

  // Parse Headings & Inject Copy Buttons
  useEffect(() => {
    if (!activeArticle) return;

    const timer = setTimeout(() => {
      // 1. Scan headings for Table of Contents
      const articleBody = document.querySelector('.docs-article-body');
      if (articleBody) {
        const headingElements = articleBody.querySelectorAll('h2, h3');
        const list: HeadingItem[] = [];
        headingElements.forEach((el, index) => {
          const text = el.textContent || '';
          const id = el.id || `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          el.id = id;
          list.push({
            id,
            text,
            level: parseInt(el.tagName.replace('H', ''), 10)
          });
        });
        setHeadings(list);
      }

      // 2. Add copy button to code blocks
      const preElements = document.querySelectorAll('.docs-article-body pre');
      preElements.forEach((pre) => {
        // Prevent duplicate copy buttons
        if (pre.querySelector('.copy-code-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.innerText = lang === 'en' ? 'Copy' : 'คัดลอก';
        btn.style.position = 'absolute';
        btn.style.right = '0.75rem';
        btn.style.top = '0.75rem';
        btn.style.padding = '0.25rem 0.6rem';
        btn.style.fontSize = '0.75rem';
        btn.style.background = 'rgba(255, 255, 255, 0.08)';
        btn.style.border = '1px solid var(--card-border)';
        btn.style.borderRadius = '6px';
        btn.style.color = 'var(--text-secondary)';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.2s';

        btn.addEventListener('mouseenter', () => {
          btn.style.background = 'var(--accent-light)';
          btn.style.color = '#000';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.background = 'rgba(255, 255, 255, 0.08)';
          btn.style.color = 'var(--text-secondary)';
        });

        btn.addEventListener('click', () => {
          const codeText = pre.querySelector('code')?.innerText || '';
          navigator.clipboard.writeText(codeText);
          btn.innerText = lang === 'en' ? 'Copied!' : 'คัดลอกแล้ว!';
          setTimeout(() => {
            btn.innerText = lang === 'en' ? 'Copy' : 'คัดลอก';
          }, 2000);
        });

        pre.appendChild(btn);
      });

    }, 100);

    return () => clearTimeout(timer);
  }, [activeArticle, lang]);

  // Scrollspy to highlight active TOC heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entriesWithTop = entries.map(entry => ({
          entry,
          top: entry.boundingClientRect.top
        }));

        const visibleEntries = entriesWithTop.filter(({ entry }) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Find the one closest to the top of the viewport
          const topEntry = visibleEntries.reduce((prev, curr) =>
            curr.top < prev.top ? curr : prev
          );
          setActiveHeadingId(topEntry.entry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -65% 0px', // Matches near top of reading viewport
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings, activeArticle]);

  return (
    <div className="docs-container">
      <div className="docs-container-noise" />

      {/* Top Navbar */}
      <header className="docs-navbar">
        <div className="docs-navbar-left">
          <Link href="/" className="docs-back-btn">
            <span>←</span> {lang === 'en' ? 'Back to Portfolio' : 'กลับหน้าหลัก'}
          </Link>
          <span style={{ color: 'var(--card-border)', fontSize: '1.2rem' }}>|</span>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {lang === 'en' ? 'Engineering Notes' : 'บันทึกวิศวกรรม'}
          </span>
        </div>

        <div className="docs-navbar-right">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--card-border)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Language Switcher */}
          <div style={{
            display: 'flex', gap: '0.2rem', padding: '0.15rem 0.4rem',
            background: 'rgba(255,255,255,0.04)', borderRadius: '20px',
            border: '1px solid var(--card-border)'
          }}>
            <button
              onClick={() => setLang('en')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem',
                padding: '0.2rem 0.4rem',
                fontWeight: lang === 'en' ? 'bold' : 'normal',
                color: lang === 'en' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              EN
            </button>
            <span style={{ color: 'var(--card-border)', fontSize: '0.75rem', alignSelf: 'center' }}>|</span>
            <button
              onClick={() => setLang('th')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem',
                padding: '0.2rem 0.4rem',
                fontWeight: lang === 'th' ? 'bold' : 'normal',
                color: lang === 'th' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              TH
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Toggle Bar */}
      <div className="docs-mobile-header">
        <button className="docs-mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          {lang === 'en' ? 'Topics' : 'หัวข้อบทความ'}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>
          {activeArticle ? (lang === 'en' ? activeArticle.title_en : activeArticle.title_th) : ''}
        </span>
      </div>

      {/* Main Layout Grid */}
      <div className="docs-layout">

        {/* Mobile Sidebar Backdrop */}
        <div
          className={`docs-sidebar-backdrop ${isSidebarOpen ? 'open' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Left Sidebar */}
        <aside className={`docs-sidebar ${isSidebarOpen ? 'open' : ''}`}>

          {/* Search Input */}
          <div className="docs-search-container">
            <svg className="docs-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="docs-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search articles...' : 'ค้นหาบทความ...'}
            />
          </div>

          {/* Grouped Article Links */}
          {Object.keys(filteredGroupedArticles).map(tag => (
            <div className="docs-sidebar-group" key={tag}>
              <h4 className="docs-sidebar-group-title">{tag}</h4>
              <ul className="docs-sidebar-list">
                {filteredGroupedArticles[tag].map(art => (
                  <li key={art.id}>
                    <button
                      className={`docs-sidebar-link ${selectedArticleId === art.id ? 'active' : ''}`}
                      onClick={() => handleSelectArticle(art.id)}
                      style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', font: 'inherit' }}
                    >
                      <span>{lang === 'en' ? art.title_en : art.title_th}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {Object.keys(filteredGroupedArticles).length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {lang === 'en' ? 'No articles match query.' : 'ไม่พบควิรีที่ตรงกัน'}
            </div>
          )}
        </aside>

        {/* Middle Reading Panel */}
        <main className="docs-content-area">
          <div className="docs-content-inner">
            {activeArticle ? (
              <article className="docs-article" key={activeArticle.id}>
                <header className="docs-article-header">
                  <h1 className="docs-article-title">
                    {lang === 'en' ? activeArticle.title_en : activeArticle.title_th}
                  </h1>
                  <div className="docs-article-meta">
                    <span className="blog-tag">{activeArticle.tag}</span>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                  </div>
                </header>

                <div
                  className="docs-article-body"
                  dangerouslySetInnerHTML={{
                    __html: lang === 'en' ? activeArticle.content_en : activeArticle.content_th
                  }}
                />
              </article>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Please select an article.' : 'โปรดเลือกบทความที่ต้องการอ่าน'}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar (Table of Contents) */}
        {headings.length > 0 && (
          <aside className="docs-toc">
            <h4 className="docs-toc-title">
              {lang === 'en' ? 'On this page' : 'ในหน้านี้'}
            </h4>
            <ul className="docs-toc-list">
              {headings.map(h => (
                <li
                  key={h.id}
                  className="docs-toc-item"
                  style={{ paddingLeft: h.level === 3 ? '1.5rem' : '0rem' }}
                >
                  <a
                    href={`#${h.id}`}
                    className={`docs-toc-link ${activeHeadingId === h.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(h.id);
                      if (target) {
                        // Offset scroll to account for header heights
                        const yOffset = -80;
                        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                        setActiveHeadingId(h.id);
                      }
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

      </div>
    </div>
  );
}
