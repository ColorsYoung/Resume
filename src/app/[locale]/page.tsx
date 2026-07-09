/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter, Link, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import StackIcon from 'tech-stack-icons';
import { Ollama } from '@lobehub/icons';

// Import modular components
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { GitHubHeatmap } from '@/components/GitHubHeatmap';
import { Quotes } from '@/components/Quotes';
import { Contact } from '@/components/Contact';
import { Typewriter } from '@/components/Typewriter';
import dynamic from 'next/dynamic';

const Galaxy = dynamic(() => import('@/components/Galaxy'), { ssr: false });

type Language = 'en' | 'th';
type Theme = 'dark' | 'light';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  websites?: { label: string; url: string }[];
  longDescription: string;
  features: string[];
};

// Hook for dynamic scroll reveal animations
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
      observer.observe(el);
    });

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            const el = node as Element;
            if (el.classList && el.classList.contains('animate-on-scroll')) {
              observer.observe(el);
            }
            const children = el.querySelectorAll?.('.animate-on-scroll:not(.is-visible)');
            children?.forEach(child => observer.observe(child));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Language;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [filter, setFilter] = useState<string>('All');
  const [activeSection, setActiveSection] = useState<string>('about');

  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Remaining features states
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [commandHighlight, setCommandHighlight] = useState(0);
  const [expandedExp, setExpandedExp] = useState<Set<number>>(new Set());
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);

  // Simulated Telemetry details
  const [liveVisitors, setLiveVisitors] = useState(3);
  const [telemetryTime, setTelemetryTime] = useState('');
  const commandInputRef = useRef<HTMLInputElement>(null);

  useScrollReveal();

  // Scroll Progress + Back to Top logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preloader Timer logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderActive(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Telemetry simulation update loop
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTelemetryTime(now.toLocaleTimeString(locale === 'en' ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const visitorInterval = setInterval(() => {
      setLiveVisitors(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(1, Math.min(8, prev + delta));
      });
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(visitorInterval);
    };
  }, [locale]);

  // Toast Auto-hide logic
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    navigator.clipboard.writeText('Chanchaichakam1997@gmail.com')
      .then(() => {
        showToast(
          locale === 'en'
            ? 'Email copied to clipboard! 📋'
            : 'คัดลอกอีเมลแล้ว! 📋'
        );
      })
      .catch(() => { });
  };

  // Reusable Magnetic Hover Handler
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    e.currentTarget.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  // Active Section tracking
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'tech', 'contact'];
    const observers: IntersectionObserver[] = [];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);



  // Timeline Active Highlight
  useEffect(() => {
    const updateItems = () => {
      const items = document.querySelectorAll('.timeline-item');
      if (items.length === 0) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.6 }
      );
      items.forEach(el => obs.observe(el));
      return obs;
    };
    const obs = updateItems();
    return () => obs?.disconnect();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Command Palette keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
        setCommandQuery('');
        setCommandHighlight(0);
        return;
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen]);

  // Focus command palette input when opened
  useEffect(() => {
    if (commandPaletteOpen && commandInputRef.current) {
      setTimeout(() => commandInputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commandPaletteOpen) return;
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowConfetti(true);
          showToast(locale === 'en' ? '🎉 Konami Code Activated! You found the Easter Egg!' : '🎉 Konami Code เปิดใช้งาน! คุณพบ Easter Egg!');
          setTimeout(() => setShowConfetti(false), 4000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [locale, commandPaletteOpen, showToast]);

  // Translations Dictionary
  const t = {
    en: {
      role: "Software Engineer | Full Stack",
      contact: "Contact Me",
      downloadCV: "Download CV",
      aboutTitle: "About Me",
      aboutContent: (
        <>
          <div style={{ minHeight: '120px' }}>
            <Typewriter
              words={["Full Stack Developer with experience in building backend systems and web applications across multiple industries. Have worked with cloud technologies (AWS & Azure) and AI integration, mainly focusing on Node.js, TypeScript, and databases. Always looking to grow and contribute to a good engineering team."]}
              loop={false}
              typingSpeed={30}
            />
          </div>
        </>
      ),
      expTitle: "Work Experience",
      coreTechTitle: "Core Technologies",
      viewRepo: "View Repository",
      visitWebsite: "Visit Website",
      keyFeatures: "Key Features & Integrations",
      contactTitle: "Get In Touch",
      contactSubtitle: "Have a project in mind or want to collaborate? Feel free to reach out!",
      contactName: "Your Name",
      contactEmail: "Your Email",
      contactMessage: "Your Message",
      contactSend: "Send Message",
      contactSending: "Sending...",
      contactSent: "Message sent successfully! I'll get back to you soon. ✅",
      contactError: "Something went wrong. Please try again or email me directly.",
      expandMore: "View Details",
      expandLess: "Hide Details",
      techStack: "Tech Stack",
      achievements: "Key Achievements",
      archTitle: "System Architecture",
      blogTitle: "Things I'm Interested In",
      readArticle: "Read Article",
    },
    th: {
      role: "Software Engineer | Full Stack",
      contact: "Contact Me",
      downloadCV: "Download CV",
      aboutTitle: "About Me",
      aboutContent: (
        <>
          <div style={{ minHeight: '120px' }}>
            <Typewriter
              words={["Full Stack Developer ที่มีประสบการณ์ในการสร้างระบบหลังบ้าน (Backend) และเว็บแอปพลิเคชันในหลากหลายอุตสาหกรรม เคยทำงานร่วมกับเทคโนโลยีคลาวด์ (AWS & Azure) และการเชื่อมต่อ AI โดยเน้นการใช้ Node.js, TypeScript และฐานข้อมูลเป็นหลัก มุ่งมั่นที่จะเรียนรู้ พัฒนาตนเอง และพร้อมที่จะสร้างประโยชน์ร่วมกับทีมวิศวกรรมที่ดี"]}
              loop={false}
              typingSpeed={30}
            />
          </div>
        </>
      ),
      expTitle: "Work Experience",
      coreTechTitle: "Core Technologies",
      viewRepo: "View Repository",
      visitWebsite: "เข้าสู่เว็บไซต์",
      keyFeatures: "Key Features & Integrations",
      contactTitle: "ติดต่อผม",
      contactSubtitle: "มีโปรเจกต์ในใจหรืออยากร่วมงานกัน? ส่งข้อความมาได้เลยครับ!",
      contactName: "ชื่อของคุณ",
      contactEmail: "อีเมลของคุณ",
      contactMessage: "ข้อความ",
      contactSend: "ส่งข้อความ",
      contactSending: "กำลังส่ง...",
      contactSent: "ส่งข้อความสำเร็จ! จะตอบกลับเร็วๆ นี้ครับ ✅",
      contactError: "เกิดข้อผิดพลาด กรุณาลองอีกครั้งหรือส่งอีเมลโดยตรง",
      expandMore: "ดูรายละเอียด",
      expandLess: "ซ่อนรายละเอียด",
      techStack: "Tech Stack",
      achievements: "ผลงานสำคัญ",
      archTitle: "สถาปัตยกรรมระบบ",
      blogTitle: "สิ่งที่กำลังสนใจอยู่",
      readArticle: "อ่านบทความ",
    }
  };

  const currentT = t[locale];

  const getProjects = (l: Language): Project[] => [
    {
      id: 'oil-tracking-api',
      title: 'Oil Tracking & Tax API',
      description: l === 'en'
        ? 'API for managing tax documents and inventory in the oil industry with Multi-Cloud architecture.'
        : 'ระบบ API สำหรับบริหารจัดการเอกสาร ภาษี และคลังสินค้าสำหรับอุตสาหกรรมน้ำมัน (Multi-Cloud)',
      tags: ['Node.js', 'Express', 'AWS', 'Azure', 'Prisma', 'MSSQL'],
      longDescription: l === 'en'
        ? 'Developed an API to manage corporate data, oil products, and connect with OCR systems for automated tax document processing.'
        : 'พัฒนาระบบ API สำหรับบริหารจัดการเอกสาร ภาษี รองรับการจัดการข้อมูลองค์กร และเชื่อมต่อระบบ OCR เพื่ออ่านแบบฟอร์มเอกสารทางภาษีสรรพสามิตโดยอัตโนมัติ',
      features: l === 'en' ? [
        'Developed Serverless architecture on Azure and migrated Core API to AWS (Elastic Beanstalk)',
        'Managed Multi-Cloud infrastructure (AWS & Azure) for Compute, Database, and Storage',
        'Integrated Azure AI Document Intelligence (OCR) for tax document data extraction',
        'Developed Real-time notifications via Socket.IO and background processing',
        'Managed both Relational (MSSQL) and NoSQL (Azure Cosmos DB) databases'
      ] : [
        'พัฒนาระบบด้วยสถาปัตยกรรม Serverless บน Azure และมีส่วนร่วมในการย้าย Core API ไปยัง AWS',
        'บริหารจัดการระบบแบบ Multi-Cloud (AWS และ Azure) สำหรับ Compute, Database และ Storage',
        'เชื่อมต่อ Azure AI Document Intelligence (OCR) เพื่อดึงข้อมูลแบบฟอร์มภาษี',
        'พัฒนาระบบ Real-time ด้วย Socket.IO และจัดการ Background processing',
        'จัดการฐานข้อมูล Relational (MSSQL) และ NoSQL (Azure Cosmos DB)'
      ]
    },
    {
      id: 'excise-car-system',
      title: 'Excise Classic Car System',
      description: l === 'en'
        ? 'Management and tax assessment system for classic cars with decoupled Frontend and Backend architecture.'
        : 'ระบบจัดการและประเมินสภาพรถยนต์คลาสสิก ออกแบบสถาปัตยกรรมแยกส่วน Frontend และ Backend อย่างเป็นระบบ',
      tags: ['React 18', 'TypeScript', 'Node.js', 'Prisma', 'MSSQL'],
      longDescription: l === 'en'
        ? 'A decoupled enterprise system for the Excise Department. Primarily responsible for developing the Officer Portal (Backoffice) and RESTful APIs.'
        : 'ระบบสำหรับกรมสรรพสามิต แยกส่วนการทำงานระหว่าง User Portal และ Officer Portal โดยรับผิดชอบหลักในการพัฒนา Officer Portal และระบบ API',
      features: l === 'en' ? [
        'Developed Officer Portal (Backoffice) using React 18 and TypeScript',
        'Implemented Role-Based Access Control (RBAC) via React Router v6',
        'Developed RESTful API with Node.js, Express, and TypeScript',
        'Optimized MSSQL database using Prisma ORM for enhanced Type-safety',
        'Built client-side PDF and Excel report generation using jsPDF and ExcelJS'
      ] : [
        'พัฒนา Officer Portal (Backoffice) ด้วย React 18 และ TypeScript สำหรับเจ้าหน้าที่',
        'พัฒนาระบบจัดการสิทธิ์การเข้าถึงข้อมูล (RBAC) ผ่าน React Router v6',
        'พัฒนา RESTful API ด้วย Node.js, Express และ TypeScript',
        'ปรับปรุงการจัดการฐานข้อมูล MSSQL โดยใช้ Prisma ORM เพื่อเพิ่ม Type-safety',
        'พัฒนาระบบสร้างรายงาน (PDF และ Excel) ในฝั่งไคลเอนต์ด้วย jsPDF และ ExcelJS'
      ]
    },
    {
      id: 'lucky-tabien',
      title: 'LuckyTabien Platform',
      description: l === 'en'
        ? 'A vehicle license plate trading platform with isolated Customer and Admin portals.'
        : 'ระบบแพลตฟอร์มซื้อ-ขายทะเบียนรถมงคล โดยออกแบบสถาปัตยกรรมแยกส่วนระหว่างระบบลูกค้าและหลังบ้าน',
      tags: ['React', 'Node.js', 'Firebase', 'MySQL', 'Sequelize'],
      websites: [
        { label: 'LuckyTabien', url: 'https://luckytabien.com/' },
        { label: 'TabienHiend', url: 'https://www.tabienhiend.com/' }
      ],
      longDescription: l === 'en'
        ? 'Developed a platform for buying and selling premium license plates. Utilized architecture to isolate customer-facing apps from the admin management portal.'
        : 'พัฒนาระบบแพลตฟอร์มซื้อ-ขายทะเบียนรถมงคล (LuckyTabien) ทำงานร่วมกับ API บน Cloud โดยแยกระบบฝั่งลูกค้า (Customer Portal) และหลังบ้าน (Admin Portal)',
      features: l === 'en' ? [
        'Developed RESTful API for system management using Serverless architecture',
        'Built Admin Portal with React, Vite, and Zod for validation',
        'Integrated Excel data processing for bulk license plate import/export',
        'Isolated Customer Portals built with React, Material UI, and Emotion',
        'Managed deployment and cloud functions via Firebase Ecosystem'
      ] : [
        'พัฒนา RESTful API สำหรับจัดการข้อมูลด้วยสถาปัตยกรรม Serverless',
        'พัฒนาระบบ Admin Portal ด้วย React, Vite และ Zod สำหรับจัดการข้อมูล',
        'ประมวลผลและจัดการข้อมูลผ่านไฟล์ Excel (Import/Export)',
        'แยกระบบหน้าบ้านสำหรับลูกค้าทั่วไป (Customer Portal) ในการค้นหาและเลือกซื้อทะเบียน',
        'ใช้งานบริการ Cloud Services และ Serverless ผ่าน Firebase Functions'
      ]
    },
    {
      id: 'trading-ollama',
      title: 'AI Trading Bot (Ollama)',
      description: l === 'en'
        ? 'Automated cryptocurrency trading bot using Local LLMs for real-time market analysis.'
        : 'บอทเทรดคริปโตอัตโนมัติใช้ Local LLMs (Ollama) ในการวิเคราะห์ตลาดและประมวลผลคำสั่งซื้อขาย',
      tags: ['Python', 'Ollama', 'Bitkub API', 'Pandas', 'AI/LLM'],
      github: 'https://github.com/ColorsYoung/bitkub-ollama',
      longDescription: l === 'en'
        ? 'Developed an automated cryptocurrency trading bot using Local LLMs (Ollama) for real-time market analysis and trade execution.'
        : 'พัฒนากลยุทธ์การเทรดด้วยการบูรณาการระบบ AI เข้ากับข้อมูลตลาดแบบ Real-time เพื่อสั่งการซื้อขายแบบอัตโนมัติผ่าน Exchange API',
      features: l === 'en' ? [
        'Integrated Local Ollama (Llama 3.1) to process market data and generate trading signals',
        'Built data processing pipeline using Pandas for technical indicators (RSI, EMA, MACD)',
        'Integrated Bitkub API v3 and Binance API (via ccxt) for trade execution',
        'Developed execution system with a "Dry Run" mode for safe strategy testing',
        'Managed API credentials securely using python-dotenv'
      ] : [
        'บูรณาการ Local Ollama เพื่อประมวลผลข้อมูลตลาดและสร้างสัญญาณเทรด',
        'พัฒนาระบบประมวลผลข้อมูลด้วย Pandas เพื่อคำนวณ Technical Indicators',
        'เชื่อมต่อระบบเข้ากับ Bitkub API และ Binance API',
        'พัฒนาระบบจัดการคำสั่งซื้อขายและจัดการความเสี่ยง (มีโหมด Dry Run)',
        'จัดการ API credentials อย่างปลอดภัยผ่าน python-dotenv'
      ]
    }
  ];

  const projects = getProjects(locale);

  const getFilteredProjects = () => {
    if (filter === 'All') return projects;
    return projects.filter(p => {
      const text = p.tags.join(' ') + ' ' + p.description;
      if (filter === 'Frontend') return text.includes('React');
      if (filter === 'Backend') return text.includes('Node.js') || text.includes('Python') || text.includes('Express');
      if (filter === 'AI') return text.includes('AI') || text.includes('Ollama') || text.includes('Document AI');
      if (filter === 'Cloud') return text.includes('Firebase') || text.includes('Azure') || text.includes('AWS');
      return false;
    });
  };
  const filteredProjects = getFilteredProjects();

  const getExperiences = (l: Language) => [
    {
      id: 1,
      role: l === 'en' ? 'Software Engineer (Full-Stack)' : 'นักพัฒนาซอฟต์แวร์ (Full-Stack)',
      company: 'Thinkbit Co., Ltd.',
      period: l === 'en' ? '2024 - Present' : '2567 - ปัจจุบัน',
      description: l === 'en'
        ? 'Developed and maintained enterprise-level applications, encompassing complex backend systems (Node.js, Cloud Architecture), decoupled frontends (React 18, Vite), and integrated local AI for data processing. Acted as Core/Lead Developer for major products: APIOil, Excise Classic Car, LuckyTabien, and the AI Trading Bot platform.'
        : 'พัฒนาและดูแลระบบ Enterprise ให้กับลูกค้าระดับองค์กร ครอบคลุมทั้งฝั่ง Frontend (React 18, Vite) และ Backend (Node.js, Cloud Architecture) รวมถึงนำ AI มาประยุกต์ใช้ในระบบ โดยทำหน้าที่เป็นนักพัฒนาหลัก (Lead Developer) ในการออกแบบสร้างแพลตฟอร์มสำคัญ ได้แก่ APIOil, Excise Classic Car, LuckyTabien และระบบบอทเทรดคริปโต AI',
      techStack: ['React 18/19', 'Zustand', 'React Query', 'Node.js', 'TypeScript', 'AWS', 'Azure', 'Prisma', 'MSSQL', 'Docker', 'Socket.IO', 'Ollama'],
      achievements: l === 'en' ? [
        'Designed and built key architectures for high-traffic products: APIOil, Classic Car, LuckyTabien, and AI Trading Bot',
        'Developed responsive user portals and admin interfaces using React 18/19, Vite, Tailwind CSS, and Material UI',
        'Optimized client-side performance and state management using Zustand and React Query, minimizing API calls',
        'Engineered dynamic client-side report generation (Excel/PDF) utilizing ExcelJS, jsPDF, and pdf-lib',
        'Architected and deployed Multi-Cloud API systems across AWS and Azure infrastructure',
        'Integrated Azure AI Document Intelligence (OCR) for automated excise tax forms processing',
        'Built real-time client notification services using Socket.IO server modules',
      ] : [
        'ออกแบบและพัฒนาสถาปัตยกรรมหลักของระบบซอฟต์แวร์หลัก: APIOil, Classic Car, LuckyTabien และบอทเทรดคริปโต AI',
        'พัฒนาระบบหน้าบ้าน (User Portal) และหลังบ้าน (Admin Portal) แบบ Responsive ด้วย React 18/19, Vite, Tailwind CSS และ MUI',
        'เพิ่มประสิทธิภาพการทำงานของระบบฝั่งหน้าบ้านด้วย Zustand และ React Query สำหรับการจัดการ State และ Caching',
        'พัฒนาระบบสร้างและส่งออกรายงาน Excel/PDF ในฝั่ง Client-side ด้วย ExcelJS, jsPDF และ pdf-lib',
        'ออกแบบและติดตั้ง (Deploy) ระบบ API แบบ Multi-Cloud บนโครงสร้างพื้นฐาน AWS และ Azure',
        'เชื่อมต่อระบบวิเคราะห์เอกสารอัจฉริยะ Azure AI Document Intelligence สำหรับประมวลผลฟอร์มภาษีสรรพสามิตอัตโนมัติ (OCR)',
        'พัฒนาโมดูลระบบแจ้งเตือน Real-time บนระบบด้วย Socket.IO',
      ],
    },
    {
      id: 2,
      role: l === 'en' ? 'Programmer' : 'โปรแกรมเมอร์',
      company: 'Vicky Enterprise',
      period: l === 'en' ? 'Apr 2023 - May 2024' : 'เม.ย. 2566 - พ.ค. 2567',
      description: l === 'en'
        ? 'Maintained the corporate website and developed internal reporting tools using Microsoft SQL Server. Handled annual sales forecasting and provided internal IT support.'
        : 'พัฒนาและปรับปรุงเว็บไซต์องค์กร สร้างระบบรายงานผลด้วย Microsoft SQL Server จัดทำโฟกัสยอดขายรายปี และดูแลสนับสนุนงานด้าน IT ภายในบริษัท',
      techStack: ['HTML/CSS', 'JavaScript', 'MSSQL', 'SQL Server', 'Excel VBA'],
      achievements: l === 'en' ? [
        'Redesigned and maintained the corporate website improving user engagement',
        'Developed automated internal reporting tools with SQL Server',
        'Created annual sales forecasting system used by management team',
        'Provided organization-wide IT support and troubleshooting',
      ] : [
        'ออกแบบใหม่และดูแลเว็บไซต์องค์กรเพื่อเพิ่มการมีส่วนร่วมของผู้ใช้',
        'พัฒนาเครื่องมือรายงานอัตโนมัติภายในด้วย SQL Server',
        'สร้างระบบพยากรณ์ยอดขายรายปีที่ใช้โดยทีมผู้บริหาร',
        'ให้การสนับสนุน IT และแก้ไขปัญหาทั่วทั้งองค์กร',
      ],
    },
    {
      id: 3,
      role: l === 'en' ? 'Programmer' : 'โปรแกรมเมอร์',
      company: 'Phatra Progress Co., Ltd.',
      period: l === 'en' ? 'Mar 2022 - Nov 2022' : 'มี.ค. 2565 - พ.ย. 2565',
      description: l === 'en'
        ? 'Developed modules and functions for Microsoft Dynamics 365 using X++. Built customized reports via SSRS, and provided technical support for AX system users.'
        : 'พัฒนาและออกแบบ Modules สำหรับ Microsoft Dynamics 365 ด้วยภาษา X++ สร้างรายงานด้วย SSRS และให้คำปรึกษาแก่ผู้ใช้งานระบบ AX',
      techStack: ['X++', 'Dynamics 365', 'SSRS', 'SQL', 'C#'],
      achievements: l === 'en' ? [
        'Developed custom modules extending Microsoft Dynamics 365 functionality',
        'Built customized SSRS reports for business intelligence needs',
        'Provided technical consultation and training for AX system users',
        'Designed efficient data processing workflows for ERP operations',
      ] : [
        'พัฒนา Module เฉพาะเพื่อขยายความสามารถของ Microsoft Dynamics 365',
        'สร้างรายงาน SSRS แบบกำหนดเองสำหรับ Business Intelligence',
        'ให้คำปรึกษาทางเทคนิคและฝึกอบรมผู้ใช้งานระบบ AX',
        'ออกแบบ Workflow การประมวลผลข้อมูลที่มีประสิทธิภาพสำหรับระบบ ERP',
      ],
    }
  ];

  const experiences = getExperiences(locale);

  const techGroups = [
    {
      title: locale === 'en' ? 'Core Engineering' : 'Core Engineering',
      techs: [
        { name: 'Node.js', icon: <StackIcon name="nodejs" style={{ width: 32, height: 32 }} />, level: 90 },
        { name: 'Go', icon: <StackIcon name="go" style={{ width: 32, height: 32 }} />, level: 55 },
        { name: 'Python', icon: <StackIcon name="python" style={{ width: 32, height: 32 }} />, level: 75 },
        { name: 'TypeScript', icon: <StackIcon name="typescript" style={{ width: 32, height: 32 }} />, level: 90 },
        { name: 'Prisma', icon: <StackIcon name="prisma" style={{ width: 32, height: 32 }} />, level: 85 },
      ]
    },
    {
      title: locale === 'en' ? 'Frontend & UI' : 'Frontend & UI',
      techs: [
        { name: 'Next.js 15', icon: <StackIcon name="nextjs2" style={{ width: 32, height: 32 }} />, level: 80 },
        { name: 'React 19', icon: <StackIcon name="react" style={{ width: 32, height: 32 }} />, level: 85 },
        { name: 'Tailwind CSS', icon: <StackIcon name="tailwindcss" style={{ width: 32, height: 32 }} />, level: 80 },
        {
          name: 'Bootstrap',
          icon: (
            <svg viewBox="0 0 16 16" width="32" height="32" fill="currentColor" style={{ color: '#7952b3' }}>
              <path d="M12.4 12.48c0 1.25-.8 2.08-2.22 2.08H3.6V2.7h6.2c1.4 0 2.16.7 2.16 1.95 0 1.05-.63 1.62-1.42 1.84.95.2 1.86.85 1.86 1.99zM5.5 5.5v2.8h3.3c.78 0 1.28-.4 1.28-1.07 0-.7-.5-1.1-1.28-1.1H5.5zm0 4.2v3.1h3.7c.83 0 1.34-.4 1.34-1.1 0-.75-.5-1.2-1.34-1.2H5.5z" />
              <path d="M0 0h16v16H0z" fill="none" />
            </svg>
          ),
          level: 75
        },
        { name: 'Zustand', icon: <StackIcon name="redux" style={{ width: 32, height: 32 }} />, level: 70 },]
    }, {
      title: locale === 'en' ? 'Cloud & Infrastructure' : 'Cloud & Infrastructure',
      techs: [
        { name: 'AWS', icon: <StackIcon name="aws" style={{ width: 32, height: 32 }} />, level: 80 },
        { name: 'Azure', icon: <StackIcon name="azure" style={{ width: 32, height: 32 }} />, level: 75 },
        { name: 'MongoDB', icon: <StackIcon name="mongodb" style={{ width: 32, height: 32 }} />, level: 75 },
        { name: 'GCP', icon: <img src="/gcp.png" alt="GCP" style={{ width: 32, height: 32, objectFit: 'contain' }} />, level: 55 },
        { name: 'Docker', icon: <StackIcon name="docker" style={{ width: 32, height: 32 }} />, level: 70 },
      ]
    },
    {
      title: locale === 'en' ? 'Specialized' : 'Specialized',
      techs: [
        { name: 'Ollama', icon: <Ollama.Avatar size={32} />, level: 65 },
        { name: 'Playwright', icon: <StackIcon name="playwright" style={{ width: 32, height: 32 }} />, level: 60 },
        { name: 'NextAuth v5', icon: <StackIcon name="nextjs2" style={{ width: 32, height: 32 }} />, level: 70 },
        { name: 'Pandas', icon: <StackIcon name="pandas" style={{ width: 32, height: 32 }} />, level: 65 },
        { name: 'Firebase', icon: <StackIcon name="firebase" style={{ width: 32, height: 32 }} />, level: 80 },
      ]
    }
  ];

  //   const architectureDiagrams: Record<string, string> = {
  //     'oil-tracking-api':
  //       `┌──────────┐    ┌──────────────┐    ┌─────────────┐
  // │  Client  │───▶│  API Gateway │───▶│  Express.js │
  // │(Frontend)│    │ (AWS/Azure)  │    │  (AWS EB)   │
  // └──────────┘    └──────────────┘    └──────┬──────┘
  //                                           │
  //                     ┌─────────────────────┼──────────┐
  //                     ▼                     ▼          ▼
  //              ┌──────────┐       ┌──────────┐  ┌──────────┐
  //              │  MSSQL   │       │Cosmos DB │  │ Azure AI │
  //              │(Primary) │       │ (NoSQL)  │  │ Doc Intel│
  //              └──────────┘       └──────────┘  └──────────┘
  //                     │
  //              ┌──────────┐
  //              │Socket.IO │
  //              │(Realtime)│
  //              └──────────┘`,

  //     'excise-car-system':
  //       `┌──────────────┐              ┌──────────────┐
  // │ User Portal  │              │Officer Portal│
  // │  (React 18)  │              │ (Backoffice) │
  // └──────┬───────┘              └──────┬───────┘
  //        │                             │
  //        └─────────────┬───────────────┘
  //                      ▼
  //              ┌──────────────┐
  //              │  RESTful API │
  //              │(Node/Express)│
  //              └──────┬───────┘
  //                     │
  //              ┌──────┴───────┐
  //              │   MSSQL DB   │
  //              │ (Prisma ORM) │
  //              └──────────────┘`,

  //     'lucky-tabien':
  //       `┌──────────────┐  ┌──────────────┐
  // │  LuckyTabien │  │ TabienHiend  │
  // │  (Customer)  │  │  (Customer)  │
  // └──────┬───────┘  └──────┬───────┘
  //        │                 │
  //        └────────┬────────┘
  //                 ▼
  //        ┌────────────────┐
  //        │  Admin Portal  │
  //        │ (React + Vite) │
  //        └───────┬────────┘
  //                 │
  //        ┌───────┴────────┐
  //        │ Serverless API │
  //        │(Firebase Func) │
  //        └───────┬────────┘
  //                 │
  //        ┌───────┴────────┐
  //        │     MySQL      │
  //        │  (Sequelize)   │
  //        └────────────────┘`,

  //     'trading-ollama':
  //       `┌──────────────┐    ┌──────────────┐
  // │  Market Data │    │   Ollama     │
  // │  (API Feed)  │    │ (Llama 3.1) │
  // └──────┬───────┘    └──────┬───────┘
  //        │                   │
  //        └─────────┬─────────┘
  //                  ▼
  //         ┌────────────────┐
  //         │Analysis Engine │
  //         │ (Pandas + TA)  │
  //         └───────┬────────┘
  //                 │
  //      ┌──────────┴──────────┐
  //      ▼                     ▼
  // ┌──────────┐        ┌──────────┐
  // │ Bitkub   │        │ Binance  │
  // │ API v3   │        │(via ccxt)│
  // └──────────┘        └──────────┘`
  //   };

  // Command palette items
  const commandItems = useMemo(() => {
    const list = [
      { icon: 'user', title: 'About', subtitle: locale === 'en' ? 'Jump to About section' : 'ไปยังส่วน About', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setCommandPaletteOpen(false); } },
      { icon: 'briefcase', title: 'Experience', subtitle: locale === 'en' ? 'Jump to Experience section' : 'ไปยังส่วน Experience', action: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); setCommandPaletteOpen(false); } },
      { icon: 'folder', title: 'Projects', subtitle: locale === 'en' ? 'Jump to Projects section' : 'ไปยังส่วน Projects', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setCommandPaletteOpen(false); } },
      { icon: 'code', title: 'Skills', subtitle: locale === 'en' ? 'Jump to Skills section' : 'ไปยังส่วน Skills', action: () => { document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' }); setCommandPaletteOpen(false); } },
      { icon: 'book-open', title: locale === 'en' ? 'Interests' : 'สิ่งที่กำลังสนใจอยู่', subtitle: locale === 'en' ? "Jump to Things I'm Interested In" : 'ไปยังส่วนสิ่งที่กำลังสนใจอยู่', action: () => { router.push('/blog'); setCommandPaletteOpen(false); } },
      { icon: 'mail', title: 'Contact', subtitle: locale === 'en' ? 'Jump to Contact section' : 'ไปยังส่วน Contact', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setCommandPaletteOpen(false); } },
      { icon: 'camera', title: locale === 'en' ? 'Lifestyle & Hobbies' : 'ไลฟ์สไตล์และกิจกรรมสุดโปรด', subtitle: locale === 'en' ? 'View my lifestyles and hobbies page' : 'ไปยังหน้าดูไลฟ์สไตล์และกิจกรรมยามว่าง', action: () => { router.push('/lifestyle'); setCommandPaletteOpen(false); } },
      { icon: 'file-text', title: locale === 'en' ? 'Download CV' : 'ดาวน์โหลด CV', subtitle: locale === 'en' ? 'Download CV as PDF' : 'ดาวน์โหลด CV เป็น PDF', action: () => { window.open('/CV.pdf', '_blank'); setCommandPaletteOpen(false); } },
      { icon: theme === 'dark' ? 'sun' : 'moon', title: locale === 'en' ? 'Toggle Theme' : 'สลับธีม', subtitle: locale === 'en' ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : `เปลี่ยนเป็นโหมด${theme === 'dark' ? 'สว่าง' : 'มืด'}`, action: () => { toggleTheme(); setCommandPaletteOpen(false); } },
      {
        icon: 'globe',
        title: locale === 'en' ? 'Toggle Language' : 'สลับภาษา',
        subtitle: locale === 'en' ? 'Switch to Thai' : 'Switch to English',
        action: () => {
          const newLocale = locale === 'en' ? 'th' : 'en';
          router.replace(pathname, { locale: newLocale });
          setCommandPaletteOpen(false);
        }
      },
      { icon: 'github', title: 'GitHub', subtitle: locale === 'en' ? 'Open GitHub profile' : 'เปิดโปรไฟล์ GitHub', action: () => { window.open('https://github.com/ColorsYoung', '_blank'); setCommandPaletteOpen(false); } },
      { icon: 'linkedin', title: 'LinkedIn', subtitle: locale === 'en' ? 'Open LinkedIn profile' : 'เปิดโปรไฟล์ LinkedIn', action: () => { window.open('https://www.linkedin.com/in/chanchai-chakam', '_blank'); setCommandPaletteOpen(false); } },
    ];
    return list;
  }, [locale, theme, toggleTheme, router, pathname]);

  const filteredCommandItems = commandItems.filter(item =>
    item.title.toLowerCase().includes(commandQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(commandQuery.toLowerCase())
  );

  // Reset highlight when query changes
  useEffect(() => {
    setCommandHighlight(0);
  }, [commandQuery]);

  // Timeline expand toggle
  const toggleExpand = (id: number) => {
    setExpandedExp(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Contact form handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '9f642124-e9c7-497c-bf72-6886d181c023',
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          from_name: 'Portfolio Contact Form',
        }),
      });
      if (res.ok) {
        setContactStatus('sent');
        setContactForm({ name: '', email: '', message: '' });
        showToast(locale === 'en' ? 'Message sent! ✉️' : 'ส่งข้อความสำเร็จ! ✉️');
        setTimeout(() => setContactStatus('idle'), 5000);
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  // Back to Top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate confetti pieces
  const confettiPieces = useMemo(() => {
    if (!showConfetti) return [];
    const colors = ['#bb86fc', '#03dac6', '#ff6b6b', '#ffd93d', '#6200ee', '#ffffff', '#e040fb', '#00e5ff'];
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      width: `${Math.random() * 8 + 5}px`,
      height: `${Math.random() * 8 + 5}px`,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      fallDuration: `${Math.random() * 2 + 2}s`,
      fallDelay: `${Math.random() * 1.5}s`,
      rotation: `${Math.random() * 1440 - 720}deg`,
    }));
  }, [showConfetti]);

  // Mobile menu navigation helper
  const handleMobileLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="container" style={{ position: 'relative' }}>

      {/* 16. Custom Page Preloader Splash Screen */}
      <div className={`preloader${!preloaderActive ? ' fade-out' : ''}`}>
        <div className="preloader-logo">&lt;CHANCHAI /&gt;</div>
        <div className="preloader-progress">
          <div className="preloader-progress-bar" />
        </div>
      </div>

      {/* Premium Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{
          width: `${scrollProgress}%`,
        }}
      />



      {/* Full-page Galaxy Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: theme === 'dark' ? 0.7 : 0.18,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={true}
          density={1.0}
          glowIntensity={0.4}
          saturation={0.7}
          hueShift={140}
          twinkleIntensity={0.7}
          rotationSpeed={0.1}
          repulsionStrength={2.0}
          autoCenterRepulsion={0}
          starSpeed={1.0}
          speed={0.5}
        />
      </div>

      {/* Modern Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
        handleMobileLinkClick={handleMobileLinkClick}
        handleMagneticMove={handleMagneticMove}
        handleMagneticLeave={handleMagneticLeave}
      />

      <Hero
        currentT={currentT}
        handleContactClick={handleContactClick}
        handleMagneticMove={handleMagneticMove}
        handleMagneticLeave={handleMagneticLeave}
      />

      {/* About Me Section (Clean Centered Layout) */}
      <About currentT={currentT} locale={locale} />
      {/* ยังไม่ใช้ */}

      {/* Experience Timeline */}
      <Experience
        experiences={experiences}
        expandedExp={expandedExp}
        toggleExpand={toggleExpand}
        currentT={currentT}
      />

      {/* Projects Section */}
      <Projects
        filter={filter}
        setFilter={setFilter}
        filteredProjects={filteredProjects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        currentT={currentT}
      // architectureDiagrams={architectureDiagrams}
      />

      {/* Tech Stack Section */}
      <Skills currentT={currentT} techGroups={techGroups} />

      {/* 12. Simulated Interactive GitHub Heatmap Section */}
      <GitHubHeatmap locale={locale} />

      {/* 13. Inspirational Quotes Section */}
      <Quotes />

      {/* Modern Glassmorphic Subpage Explore CTAs */}
      <section className="animate-on-scroll" style={{ padding: '3rem 0 1rem', maxWidth: '850px', margin: '0 auto' }}>
        <div className="cta-grid">
          {/* Blog CTA */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-sm)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {locale === 'en' ? "Interesting articles I'd like to share." : 'บทความน่าสนใจของผมที่อยากแบ่งปัน'}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '340px' }}>
                {locale === 'en'
                  ? 'This blog is a place where I collect and share articles, ideas, and experiences that I find interesting and valuable — from technology and software engineering to thoughts and stories from everyday life. I hope these writings will be useful not only for myself, but also for others who share the same interests.'
                  : 'Blog ที่ผมสร้างขึ้นเพื่อรวบรวมบทความ เรื่องราว และไอเดียที่ผมพบว่าน่าสนใจและมีคุณค่า ทั้งในโลกของเทคโนโลยี การพัฒนา Software และประสบการณ์ต่างๆที่อยากนำมาแบ่งปัน ผมหวังว่าเนื้อหาเหล่านี้จะเป็นประโยชน์ทั้งกับตัวผมเองและเพื่อนๆที่มีความสนใจเหมือนกันครับ'}
              </p>
            </div>
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--accent-light)',
              color: '#121212',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(187, 134, 252, 0.3)',
              transition: 'all 0.3s ease'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(187, 134, 252, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(187, 134, 252, 0.3)';
              }}
            >
              {locale === 'en' ? 'Open Blog →' : 'เข้าสู่บล็อก →'}
            </Link>
          </div>

          {/* Lifestyle CTA */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-sm)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {locale === 'en' ? 'My Lifestyle & Travel' : 'บันทึกเรื่องราวความทรงจำ และไลฟ์สไตล์ กิจกรรมต่างๆ ของผม'}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '340px' }}>
                {locale === 'en'
                  ? 'Step away from the computer and the world of coding! Here, I share experiences beyond programming — from hiking and street photography to many other things I’m passionate about and would love to share with everyone.'
                  : 'ก้าวออกจากคอมพิวเตอร์และโลกของการเขียนโค้ด! ร่วมแชร์ประสบการณ์ของชีวิตนอกเหนือจากเรื่องการเขียนโปรแกรม ไม่ว่าจะเป็น การเดินป่า ถ่ายรูปสตรีทและอื่นๆอีกมากมายที่ผมอยากแบ่งปันให้ทุกคนได้อ่านกันครับ'}
              </p>
            </div>
            <Link href="/lifestyle" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--accent-light)',
              color: '#121212',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(187, 134, 252, 0.3)',
              transition: 'all 0.3s ease'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(187, 134, 252, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(187, 134, 252, 0.3)';
              }}
            >
              {locale === 'en' ? 'Lifestyle and interests →' : 'ไลฟ์สไตล์ และความชอบของผม →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Contact
        currentT={currentT}
        locale={locale}
        contactForm={contactForm}
        setContactForm={setContactForm}
        contactStatus={contactStatus}
        handleContactSubmit={handleContactSubmit}
      />

      {/* Footer & Telemetry Mini Display */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Chanchai Chakam. Built with Next.js.</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
          <span>{locale === 'en' ? 'Press ' : 'กด '}</span>
          <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontFamily: 'monospace' }}>
            {navigator.platform.toUpperCase().includes('MAC') ? '⌘K' : 'Ctrl+K'}
          </kbd>
          <span> {locale === 'en' ? ' to open command menu' : ' เพื่อเปิดเมนูคำสั่ง'}</span>
        </div>
        {/* Telemetry live status overlay inside footer */}
        <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px' }}>
          <span className="pulse-active-dot" />
          <span>{locale === 'en' ? 'Live Telemetry: ' : 'ข้อมูลสดของเซิร์ฟเวอร์: '}</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-light)' }}>{liveVisitors} active visitors</span>
          <span>•</span>
          <span>{telemetryTime}</span>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`toast-notification${toast.show ? ' show' : ''}`}>
        <div className="toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="toast-message">{toast.message}</div>
      </div>

      {/* Back to Top Button */}
      <button
        className={`back-to-top${showBackToTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
        title={locale === 'en' ? 'Back to top' : 'กลับด้านบน'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Command Palette */}
      {commandPaletteOpen && (
        <div className="command-palette-overlay" onClick={() => setCommandPaletteOpen(false)}>
          <div className="command-palette" onClick={(e) => e.stopPropagation()}>

            <div className="command-palette-input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={commandInputRef}
                className="command-palette-input"
                type="text"
                placeholder={locale === 'en' ? 'Type a command...' : 'พิมพ์คำสั่ง...'}
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setCommandHighlight(prev => Math.min(prev + 1, filteredCommandItems.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setCommandHighlight(prev => Math.max(prev - 1, 0));
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    filteredCommandItems[commandHighlight]?.action();
                  }
                }}
              />
              <span className="command-palette-hint">ESC</span>
            </div>
            <div className="command-palette-results">
              {filteredCommandItems.length > 0 ? (
                filteredCommandItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`command-item${idx === commandHighlight ? ' highlighted' : ''}`}
                    onClick={() => item.action()}
                  >
                    <div className="command-item-icon" style={{ color: 'var(--accent-light)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        {item.icon === 'user' && <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>}
                        {item.icon === 'user' && <circle cx="12" cy="7" r="4"></circle>}
                        {item.icon === 'briefcase' && <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>}
                        {item.icon === 'briefcase' && <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>}
                        {item.icon === 'folder' && <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>}
                        {item.icon === 'code' && <polyline points="16 18 22 12 16 6"></polyline>}
                        {item.icon === 'code' && <polyline points="8 6 2 12 8 18"></polyline>}
                        {item.icon === 'book-open' && <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>}
                        {item.icon === 'book-open' && <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>}
                        {item.icon === 'mail' && <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>}
                        {item.icon === 'mail' && <polyline points="22,6 12,13 2,6"></polyline>}
                        {item.icon === 'camera' && <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>}
                        {item.icon === 'camera' && <circle cx="12" cy="13" r="4"></circle>}
                        {item.icon === 'file-text' && <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>}
                        {item.icon === 'file-text' && <polyline points="14 2 14 8 20 8"></polyline>}
                        {item.icon === 'sun' && <circle cx="12" cy="12" r="5"></circle>}
                        {item.icon === 'sun' && <line x1="12" y1="1" x2="12" y2="3"></line>}
                        {item.icon === 'sun' && <line x1="12" y1="21" x2="12" y2="23"></line>}
                        {item.icon === 'moon' && <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>}
                        {item.icon === 'globe' && <circle cx="12" cy="12" r="10"></circle>}
                        {item.icon === 'globe' && <path d="M2 12h20"></path>}
                        {item.icon === 'globe' && <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>}
                        {item.icon === 'github' && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>}
                        {item.icon === 'linkedin' && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>}
                        {item.icon === 'linkedin' && <rect x="2" y="9" width="4" height="12"></rect>}
                        {item.icon === 'linkedin' && <circle cx="4" cy="4" r="2"></circle>}
                      </svg>
                    </div>
                    <div className="command-item-text">
                      <div className="command-item-title">{item.title}</div>
                      <div className="command-item-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="command-palette-empty">
                  {locale === 'en' ? 'No results found' : 'ไม่พบผลลัพธ์'}
                </div>
              )}
            </div>
            <div className="command-palette-footer">
              <span><kbd>↑↓</kbd> {locale === 'en' ? 'Navigate' : 'เลื่อน'}</span>
              <span><kbd>↵</kbd> {locale === 'en' ? 'Select' : 'เลือก'}</span>
              <span><kbd>Esc</kbd> {locale === 'en' ? 'Close' : 'ปิด'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Confetti — Konami Code Easter Egg */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map(piece => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                left: piece.left,
                backgroundColor: piece.backgroundColor,
                width: piece.width,
                height: piece.height,
                borderRadius: piece.borderRadius,
                '--fall-duration': piece.fallDuration,
                '--fall-delay': piece.fallDelay,
                '--rotation': piece.rotation,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </main>
  );
}
