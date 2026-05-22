"use client";

import React from 'react';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  level: number;
}

interface TechGroup {
  title: string;
  techs: TechItem[];
}

interface SkillsProps {
  currentT: {
    coreTechTitle: string;
  };
  techGroups: TechGroup[];
}

export const Skills: React.FC<SkillsProps> = ({ currentT, techGroups }) => {
  return (
    <section id="tech" className="tech-stack-section">
      <h2 className="section-title" style={{ marginBottom: '2rem' }}>{currentT.coreTechTitle}</h2>
      <div className="tech-groups-container">
        {techGroups.map((group, _idx) => (
          <div key={_idx} className="tech-group-card animate-on-scroll">
            <h3 className="tech-group-title">{group.title}</h3>
            <div className="tech-items-grid">
              {group.techs.map((tech, techIdx) => (
                <div key={techIdx} className="tech-item-mini" title={`${tech.name} — ${tech.level}%`}>
                  {tech.icon}
                  <span>{tech.name}</span>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{ '--skill-level': `${tech.level}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
