"use client";

import React, { useState, useEffect } from 'react';

interface QuoteItem {
  text: string;
  author: string;
}

export const Quotes: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes: QuoteItem[] = [
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "Any sufficiently advanced technology is indistinguishable from magic.",
      author: "Arthur C. Clarke"
    },
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay"
    },
    {
      text: "Talk is cheap. Show me the code.",
      author: "Linus Torvalds"
    },
    {
      text: "Persistence is very important. You should not give up unless you are forced to give up.",
      author: "Elon Musk"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section className="testimonial-section animate-on-scroll">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          display: 'inline-block',
          position: 'relative'
        }}>
          Quotes That Inspire
          <span style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            background: 'var(--accent-light)',
            borderRadius: '2px'
          }}></span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', fontSize: '1rem', fontStyle: 'italic' }}>
          &lt; Words from builders who shaped our world /&gt;
        </p>
      </div>

      <div className="testimonial-carousel">
        <div className="testimonial-card" key={quoteIndex}>
          <span className="testimonial-quote-mark">&ldquo;</span>
          <p className="testimonial-text">
            {quotes[quoteIndex].text}
          </p>
          <div className="testimonial-author" style={{ justifyContent: 'center' }}>
            <div className="testimonial-author-info" style={{ textAlign: 'center' }}>
              <div className="testimonial-author-name" style={{ fontSize: '1.1rem', color: 'var(--accent-light)' }}>
                — {quotes[quoteIndex].author}
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-nav">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              className={`testimonial-dot${idx === quoteIndex ? ' active' : ''}`}
              onClick={() => setQuoteIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
