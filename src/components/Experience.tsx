"use client";

import React from 'react';

interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
  techStack: string[];
  achievements: string[];
}

interface TestimonialItem {
  text: string;
  initials: string;
  author: string;
  role: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
  expandedExp: Set<number>;
  toggleExpand: (id: number) => void;
  currentT: {
    expTitle: string;
    expandLess: string;
    expandMore: string;
    techStack: string;
    achievements: string;
    testimonialsTitle: string;
  };
  testimonials: TestimonialItem[];
  testimonialIndex: number;
  setTestimonialIndex: (index: number) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  experiences,
  expandedExp,
  toggleExpand,
  currentT,
  testimonials,
  testimonialIndex,
  setTestimonialIndex
}) => {
  return (
    <>
      {/* Experience Timeline */}
      <section id="experience" className="experience-section">
        <h2 className="section-title">{currentT.expTitle}</h2>
        <div className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item animate-on-scroll">
              <div className="timeline-dot"></div>
              <div className="timeline-content" onClick={() => toggleExpand(exp.id)}>
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.description}</p>

                <div className={`timeline-expand-indicator${expandedExp.has(exp.id) ? ' expanded' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {expandedExp.has(exp.id) ? currentT.expandLess : currentT.expandMore}
                </div>

                <div className={`timeline-details${expandedExp.has(exp.id) ? ' expanded' : ''}`}>
                  <div className="timeline-details-inner">
                    <div className="timeline-detail-label">{currentT.techStack}</div>
                    <div className="timeline-tech-badges">
                      {exp.techStack.map(tech => (
                        <span key={tech} className="timeline-tech-badge">{tech}</span>
                      ))}
                    </div>

                    <div className="timeline-detail-label">{currentT.achievements}</div>
                    <ul className="timeline-achievements">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section animate-on-scroll">
        <h2 className="section-title">{currentT.testimonialsTitle}</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-card" key={testimonialIndex}>
            <span className="testimonial-quote-mark">&ldquo;</span>
            <p className="testimonial-text">{testimonials[testimonialIndex].text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{testimonials[testimonialIndex].initials}</div>
              <div className="testimonial-author-info">
                <div className="testimonial-author-name">{testimonials[testimonialIndex].author}</div>
                <div className="testimonial-author-role">{testimonials[testimonialIndex].role}</div>
              </div>
            </div>
          </div>
          <div className="testimonial-nav">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`testimonial-dot${idx === testimonialIndex ? ' active' : ''}`}
                onClick={() => setTestimonialIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
