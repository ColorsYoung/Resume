"use client";

import React, { useState, useEffect } from 'react';
import StackIcon from 'tech-stack-icons';
import { Ollama } from '@lobehub/icons';

type Language = 'en' | 'th';
type Theme = 'dark' | 'light';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  longDescription: string;
  features: string[];
  icon: React.ReactNode;
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Translations Dictionary
  const t = {
    en: {
      role: "Programmer | Backend Developer | Software Engineer",
      intro: "I am a software developer passionate about building systems that make document workflows effortless and automated. I specialize in Backend Development, Document Processing, and Cloud Architecture (Azure).",
      contact: "Contact Me",
      downloadCV: "Download CV",
      aboutTitle: "About Me",
      aboutContent: (
        <>
          Currently, I am focusing on exploring <strong>Document AI</strong> technologies and managing file storage systems using <strong>Azure Blob Storage</strong>,
          along with designing <strong>Microservices</strong> architectures. My ultimate goal is to build a highly accurate platform that helps enterprises process documents with maximum efficiency.
          <br /><br />
          <em style={{ color: 'var(--accent-light)', fontStyle: 'italic', fontWeight: 500 }}>
            &quot;Technology is a tool that helps us build a better world.&quot; 🌟
          </em>
        </>
      ),
      expTitle: "Work Experience",
      coreTechTitle: "Core Technologies",
      viewRepo: "View Repository",
      keyFeatures: "Key Features & Integrations",
    },
    th: {
      role: "Programmer | Backend Developer | Document Automation Enthusiast",
      intro: "ผมเป็นนักพัฒนาซอฟต์แวร์ที่หลงใหลในการสร้างระบบที่ช่วยทำให้การทำงานกับเอกสารเป็นเรื่องง่ายและอัตโนมัติ เชี่ยวชาญด้าน Backend Development, Document Processing, และ Cloud Architecture (Azure)",
      contact: "Contact Me",
      downloadCV: "Download CV",
      aboutTitle: "About Me",
      aboutContent: (
        <>
          ปัจจุบันผมกำลังมุ่งเน้นการศึกษาเทคโนโลยี <strong>AI อ่านเอกสาร (Document AI)</strong> และการจัดการระบบเก็บไฟล์ด้วย <strong>Azure Blob Storage</strong>
          ตลอดจนการวางสถาปัตยกรรม <strong>Microservices</strong> เป้าหมายสูงสุดของผมคือการสร้าง Platform ที่ช่วยองค์กรประมวลผลเอกสารได้อย่างมีประสิทธิภาพ และแม่นยำสูง
          <br /><br />
          <em style={{ color: 'var(--accent-light)', fontStyle: 'italic', fontWeight: 500 }}>
            &quot;เทคโนโลยีคือเครื่องมือที่ช่วยให้เราสร้างสิ่งที่ดีขึ้นสำหรับโลก&quot; 🌟
          </em>
        </>
      ),
      expTitle: "Work Experience",
      coreTechTitle: "Core Technologies",
      viewRepo: "View Repository",
      keyFeatures: "Key Features & Integrations",
    }
  };

  const currentT = t[lang];

  const getProjects = (l: Language): Project[] => [
    {
      id: 'excise-car-system',
      title: 'Excise Classic Car System',
      description: l === 'en'
        ? 'A mission-critical tax assessment system for the Excise Department involving complex financial logic and master data management.'
        : 'ระบบประเมินราคารถยนต์และคำนวณภาษีสำหรับกรมสรรพสามิตที่มีความซับซ้อนด้าน Business Logic ทางบัญชีและภาษี',
      tags: ['Node.js', 'Prisma', 'MSSQL', 'AI Integration', 'React'],
      github: '#',
      longDescription: l === 'en'
        ? 'A comprehensive suite comprising a modular Backend API, an Admin Backoffice, and automated CronJobs. It handles intricate tax calculations including CIF, Customs Duty, and Excise Tax to determine Recommended Retail Prices.'
        : 'ระบบสรรพสามิตที่ประกอบด้วย 3 ส่วนหลัก: Backend API, Admin Backoffice และ Automated CronJobs รองรับการคำนวณภาษีที่ซับซ้อน (CIF, Customs Duty, Excise Tax) เพื่อหาราคาขายปลีกแนะนำ',
      features: l === 'en' ? [
        'Modular Backend architecture (Node.js, Prisma, MSSQL)',
        'Complex tax calculation pipeline (CIF, Material Cost, Profit Margin)',
        'AI-powered data cleaning using Local LLMs (Ollama) for raw vehicle data',
        'Automated CronJobs for currency exchange rates and workflow cleanup',
        'Secure file management integrated with AWS S3'
      ] : [
        'สถาปัตยกรรม Backend แบบ Modular (Node.js, Prisma, MSSQL)',
        'ระบบคำนวณภาษีที่ซับซ้อน (CIF, ต้นทุนวัสดุ, อัตรากำไร)',
        'ใช้ AI (Ollama) ในการทำ Data Cleaning ข้อมูลรถยนต์ดิบ',
        'ระบบ CronJobs อัตโนมัติสำหรับดึงอัตราแลกเปลี่ยนและจัดการ Workflow',
        'จัดการไฟล์อย่างปลอดภัยด้วยการเชื่อมต่อ AWS S3'
      ],
      icon: <span style={{ fontSize: '1.5rem' }}>🚗</span>
    },
    {
      id: 'excise-wine-api',
      title: 'Excise Wine Cloud API',
      description: l === 'en'
        ? 'A high-performance Serverless API built with Go to serve mobile applications with robust identity and access management.'
        : 'ระบบ API ประสิทธิภาพสูงบนสถาปัตยกรรม Serverless (Go) สำหรับ Mobile Application พร้อมระบบ IAM ที่แข็งแกร่ง',
      tags: ['Golang', 'GCP Functions', 'Docker', 'IAM', 'Serverless'],
      github: '#',
      longDescription: l === 'en'
        ? 'Developed using Go and deployed on Google Cloud Functions. Features a custom HTTP wrapper for middleware management and a comprehensive Identity and Access Management (IAM) system.'
        : 'พัฒนาด้วยภาษา Go บน Google Cloud Functions มีการสร้าง Custom Wrapper สำหรับจัดการ Middleware และระบบจัดการสิทธิ์ผู้ใช้งาน (IAM) ที่ละเอียด',
      features: l === 'en' ? [
        'Serverless architecture using Google Cloud Functions',
        'Robust IAM system (Identity and Access Management)',
        'Custom Golang middleware and RESTful handler wrappers',
        'Containerized development environment with Docker and Compose',
        'CI/CD integration using buildspec.yaml'
      ] : [
        'สถาปัตยกรรมแบบ Serverless บน Google Cloud Functions',
        'ระบบ IAM (Identity and Access Management) ที่สมบูรณ์',
        'Custom Golang Middleware และ RESTful Handler Wrapper',
        'ระบบ Containerization ด้วย Docker และ Docker Compose',
        'รองรับ CI/CD ด้วย buildspec.yaml'
      ],
      icon: <span style={{ fontSize: '1.5rem' }}>🍷</span>
    },
    {
      id: 'catfish-dashboard',
      title: 'Next.js Analytics Dashboard',
      description: l === 'en'
        ? 'A modern data management platform leveraging the latest Next.js 15 features for complex data visualization and reporting.'
        : 'แพลตฟอร์มจัดการข้อมูลสมัยใหม่ที่ใช้ฟีเจอร์ล่าสุดของ Next.js 15 สำหรับการแสดงผลข้อมูลเชิงลึกและออกรายงาน',
      tags: ['Next.js 15', 'Chakra UI', 'NextAuth v5', 'Chart.js', 'Turbopack'],
      github: '#',
      longDescription: l === 'en'
        ? 'A high-performance dashboard featuring Next.js 15 App Router and Turbopack. It integrates complex statistical visualizations and secure authentication flows.'
        : 'แดชบอร์ดประสิทธิภาพสูงที่ใช้ Next.js 15 App Router และ Turbopack พร้อมระบบแสดงผลสถิติที่ซับซ้อนและระบบยืนยันตัวตนที่ปลอดภัย',
      features: l === 'en' ? [
        'Latest Next.js 15 features including App Router and Turbopack',
        'Secure authentication using NextAuth v5 (Beta)',
        'Complex data visualization with Chart.js and custom plugins',
        'Fluid UI/UX with Chakra UI and Framer Motion animations',
        'Modular state management with Zustand'
      ] : [
        'ใช้ฟีเจอร์ล่าสุดของ Next.js 15 (App Router, Turbopack)',
        'ระบบยืนยันตัวตน NextAuth v5 (Beta)',
        'แสดงผลข้อมูลเชิงสถิติซับซ้อนด้วย Chart.js และ Custom Plugins',
        'UI/UX ที่ลื่นไหลด้วย Chakra UI และ Framer Motion',
        'จัดการ State แบบ Modular ด้วย Zustand'
      ],
      icon: <span style={{ fontSize: '1.5rem' }}>📊</span>
    },
    {
      id: 'stealth-automation',
      title: 'Stealth Web Automation',
      description: l === 'en'
        ? 'Advanced web automation scripts designed for high-concurrency booking systems with anti-bot detection evasion.'
        : 'สคริปต์ Web Automation ขั้นสูงสำหรับการจองคิวที่มีการแข่งขันสูง พร้อมระบบหลบเลี่ยงการตรวจจับบอท',
      tags: ['Node.js', 'Playwright', 'Stealth Plugins', 'Automation'],
      github: 'https://github.com/ColorsYoung/Autofill-Monjong',
      longDescription: l === 'en'
        ? 'Developed scripts for high-stakes booking scenarios using Playwright with stealth plugins to bypass anti-fingerprinting and bot detection mechanisms.'
        : 'พัฒนาสคริปต์สำหรับการจองคิวที่มีการแข่งขันสูง โดยใช้ Playwright ร่วมกับ Stealth Plugins เพื่อหลบหลี่ยงระบบตรวจจับบอทและ Anti-fingerprinting',
      features: l === 'en' ? [
        'Bot detection evasion using playwright-extra and stealth plugins',
        'High-speed DOM manipulation and automated form filling',
        'Reverse engineering of web workflows for optimized booking',
        'Headless browser automation with customized fingerprints'
      ] : [
        'หลบหลีกการตรวจจับบอทด้วย playwright-extra และ stealth plugins',
        'จัดการ DOM และกรอกข้อมูลอัตโนมัติด้วยความเร็วสูง',
        'ทำ Reverse Engineering ขั้นตอนการทำงานของเว็บเพื่อเพิ่มโอกาสในการจอง',
        'ระบบ Headless Browser Automation พร้อมการปรับแต่ง Fingerprint'
      ],
      icon: <span style={{ fontSize: '1.5rem' }}>🤖</span>
    },
    {
      id: 'trading-ollama',
      title: 'Bitkub AI Trading Bot',
      description: l === 'en'
        ? 'Automated cryptocurrency trading bot leveraging Local LLMs (Ollama) for real-time market analysis.'
        : 'บอทเทรดคริปโตอัตโนมัติที่ใช้ Local LLMs (Ollama) ในการวิเคราะห์ตลาดแบบ Real-time',
      tags: ['Python', 'Ollama', 'Bitkub API', 'Pandas', 'AI/LLM'],
      github: 'https://github.com/ColorsYoung/bitkub-ollama',
      longDescription: l === 'en'
        ? 'A sophisticated trading bot that uses local AI models to interpret market conditions and execute flexible trading strategies via Bitkub API v3.'
        : 'บอทเทรดที่ใช้ AI ประมวลผลสภาวะตลาดและปรับกลยุทธ์การเทรดผ่าน Bitkub API v3 อย่างยืดหยุ่น',
      features: l === 'en' ? [
        'AI-Powered Decisions using local LLMs (Ollama)',
        'Direct integration with Bitkub API v3',
        'Real-time Technical Analysis (RSI, EMA, MACD)',
        'Secure API management via environment variables'
      ] : [
        'ตัดสินใจเทรดด้วยพลัง AI จาก Local LLMs (Ollama)',
        'เชื่อมต่อโดยตรงกับ Bitkub API v3',
        'วิเคราะห์ทางเทคนิค (RSI, EMA, MACD) แบบ Real-time',
        'จัดการ API Keys อย่างปลอดภัยผ่าน Environment Variables'
      ],
      icon: <span style={{ fontSize: '1.5rem' }}>📈</span>
    }
  ];

  const projects = getProjects(lang);

  const getExperiences = (l: Language) => [
    {
      id: 1,
      role: l === 'en' ? 'Senior Backend Developer' : 'นักพัฒนาระบบ Backend อาวุโส',
      company: 'Excise Department Projects',
      period: '2023 - Present',
      description: l === 'en'
        ? 'Architected complex tax calculation engines and modular APIs using Node.js, Go, and Prisma. Integrated AI (Ollama) for data cleaning and automated critical financial workflows with high precision.'
        : 'ออกแบบระบบคำนวณภาษีและ API แบบ Modular ด้วย Node.js, Go และ Prisma นำ AI (Ollama) มาใช้ในการทำ Data Cleaning และสร้าง Workflow อัตโนมัติสำหรับข้อมูลทางการเงินที่มีความสำคัญสูง'
    },
    {
      id: 2,
      role: l === 'en' ? 'Full Stack Engineer' : 'วิศวกร Full Stack',
      company: 'Enterprise Analytics & Dashboards',
      period: '2022 - Present',
      description: l === 'en'
        ? 'Developed high-performance dashboards using Next.js 15 and Chakra UI. Focused on complex data visualization, secure authentication (NextAuth v5), and performance optimization with Turbopack.'
        : 'พัฒนาระบบ Dashboard ประสิทธิภาพสูงด้วย Next.js 15 และ Chakra UI เน้นการแสดงผลข้อมูลซับซ้อน ระบบยืนยันตัวตน NextAuth v5 และเพิ่มความเร็วด้วย Turbopack'
    },
    {
      id: 3,
      role: l === 'en' ? 'Automation & Cloud Specialist' : 'ผู้เชี่ยวชาญด้าน Automation และ Cloud',
      company: 'Serverless APIs & Web Automation',
      period: '2022 - 2023',
      description: l === 'en'
        ? 'Built Serverless APIs in Go for GCP. Developed stealth automation scripts using Playwright to bypass bot detection for high-concurrency booking systems and scrapers.'
        : 'สร้าง Serverless API ด้วย Go บน GCP พัฒนาสคริปต์ Automation ขั้นสูงด้วย Playwright ที่รองรับการหลบหลี่ยงระบบตรวจจับบอทสำหรับการจองคิวและการดึงข้อมูล'
    }
  ];

  const experiences = getExperiences(lang);

  // Reorganized Technologies into Logical Groups
  const techGroups = [
    {
      title: lang === 'en' ? 'Core Engineering' : 'Core Engineering',
      techs: [
        { name: 'Node.js', icon: <StackIcon name="nodejs" style={{ width: 32, height: 32 }} /> },
        { name: 'Go', icon: <StackIcon name="go" style={{ width: 32, height: 32 }} /> },
        { name: 'Python', icon: <StackIcon name="python" style={{ width: 32, height: 32 }} /> },
        { name: 'TypeScript', icon: <StackIcon name="typescript" style={{ width: 32, height: 32 }} /> },
        { name: 'Prisma', icon: <StackIcon name="prisma" style={{ width: 32, height: 32 }} /> },
      ]
    },
    {
      title: lang === 'en' ? 'Frontend & UI' : 'Frontend & UI',
      techs: [
        { name: 'Next.js 15', icon: <StackIcon name="nextjs2" style={{ width: 32, height: 32 }} /> },
        { name: 'React 19', icon: <StackIcon name="react" style={{ width: 32, height: 32 }} /> },
        { name: 'Zustand', icon: <StackIcon name="redux" style={{ width: 32, height: 32 }} /> },
        { name: 'Chakra UI', icon: <span style={{ fontSize: '32px' }}>⚡</span> },
        { name: 'Vite', icon: <StackIcon name="vitejs" style={{ width: 32, height: 32 }} /> },
      ]
    },
    {
      title: lang === 'en' ? 'Cloud & Infrastructure' : 'Cloud & Infrastructure',
      techs: [
        { name: 'AWS', icon: <StackIcon name="aws" style={{ width: 32, height: 32 }} /> },
        { name: 'Azure', icon: <StackIcon name="azure" style={{ width: 32, height: 32 }} /> },
        { name: 'GCP', icon: <span style={{ fontSize: '32px' }}>☁️</span> },
        { name: 'Docker', icon: <StackIcon name="docker" style={{ width: 32, height: 32 }} /> },
        { name: 'MSSQL', icon: <img src="/mssql.png" alt="MSSQL" style={{ width: 32, height: 32, objectFit: 'contain' }} /> },
      ]
    },
    {
      title: lang === 'en' ? 'Specialized' : 'Specialized',
      techs: [
        { name: 'Ollama', icon: <Ollama.Avatar size={32} /> },
        { name: 'Playwright', icon: <StackIcon name="playwright" style={{ width: 32, height: 32 }} /> },
        { name: 'NextAuth v5', icon: <StackIcon name="nextjs2" style={{ width: 32, height: 32 }} /> },
        { name: 'Pandas', icon: <StackIcon name="pandas" style={{ width: 32, height: 32 }} /> },
        { name: 'Firebase', icon: <StackIcon name="firebase" style={{ width: 32, height: 32 }} /> },
      ]
    }
  ];

  return (
    <main className="container" style={{ position: 'relative' }}>

      {/* Modern Sticky Navigation */}
      <nav className="nav-container">
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#tech" className="nav-link">Skills</a>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
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

          {/* Integrated Language Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <button
              onClick={() => setLang('en')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                fontWeight: lang === 'en' ? 'bold' : 'normal',
                color: lang === 'en' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              EN
            </button>
            <span style={{ color: 'var(--divider)' }}>|</span>
            <button
              onClick={() => setLang('th')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                fontWeight: lang === 'th' ? 'bold' : 'normal',
                color: lang === 'th' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              TH
            </button>
          </div>
        </div>
      </nav>

      <header>
        <h1>Chanchai Chakam</h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-light)', marginBottom: '1.5rem', fontWeight: 600 }}>
          {currentT.role}
        </h2>
        <p>{currentT.intro}</p>

        <div className="hero-actions">
          <a href="mailto:Chanchaichakam1997@gmail.com" className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            {currentT.contact}
          </a>
          <a href="https://github.com/ColorsYoung" target="_blank" rel="noopener noreferrer" className="btn btn-social">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/chanchai-chakam" target="_blank" rel="noopener noreferrer" className="btn btn-social">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>
          <a href="/resume.pdf" download className="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {currentT.downloadCV}
          </a>
        </div>
      </header>

      <section id="about" style={{ textAlign: 'center', padding: '3rem 0', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>{currentT.aboutTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          {currentT.aboutContent}
        </p>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="experience-section">
        <h2 className="section-title">{currentT.expTitle}</h2>
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
            title="Click to view details"
          >
            <h2 className="project-title">
              {project.icon}
              {project.title}
            </h2>
            <p className="project-desc">{project.description}</p>
            <div className="tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              {currentT.viewRepo}
            </a>
          </article>
        ))}
      </section>

      {/* Premium Tech Stack Display */}
      <section id="tech" className="tech-stack-section">
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>{currentT.coreTechTitle}</h2>
        <div className="tech-groups-container">
          {techGroups.map((group, _idx) => (
            <div key={_idx} className="tech-group-card">
              <h3 className="tech-group-title">{group.title}</h3>
              <div className="tech-items-grid">
                {group.techs.map((tech, techIdx) => (
                  <div key={techIdx} className="tech-item-mini" title={tech.name}>
                    {tech.icon}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>
            <div className="modal-body">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {selectedProject.icon}
                {selectedProject.title}
              </h2>
              <div className="tags" style={{ marginBottom: '1.5rem' }}>
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p>{selectedProject.longDescription}</p>

              <h3>{currentT.keyFeatures}</h3>
              <ul>
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
                style={{ marginTop: '1rem', display: 'inline-flex' }}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                {currentT.viewRepo}
              </a>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Chanchai Chakam. Built with Next.js.</p>
      </footer>
    </main>
  );
}
