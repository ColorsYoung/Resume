"use client";

import React, { useState, useEffect } from 'react';

const Typewriter = ({ words, loop = true, typingSpeed = 70, deletingSpeed = 40, delay = 1500 }: { words: string[], loop?: boolean, typingSpeed?: number, deletingSpeed?: number, delay?: number }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingDelay(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        if (!loop && loopNum === words.length - 1) return;
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(handleType, typingDelay);
      }
    };

    timer = setTimeout(handleType, typingDelay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingDelay, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span>
      {text}
      <span className="cursor-blink">|</span>
    </span>
  );
};

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
    
    // Initial observe
    document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
      observer.observe(el);
    });

    // Watch for new dynamically added elements
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
import StackIcon from 'tech-stack-icons';
import { Ollama } from '@lobehub/icons';

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

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [filter, setFilter] = useState<string>('All');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useScrollReveal();

  // Scroll Progress logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast Auto-hide logic
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    navigator.clipboard.writeText('Chanchaichakam1997@gmail.com')
      .then(() => {
        showToast(
          lang === 'en'
            ? 'Email copied to clipboard! 📋'
            : 'คัดลอกอีเมลแล้ว! 📋'
        );
      })
      .catch(() => {});
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

  // Particle Background with Repel Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 70;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const p of particles) {
        // Move particle naturally
        p.x += p.vx;
        p.y += p.vy;

        // Repel from cursor when mouse is active
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            const repelStrength = 1.8;
            p.x += (dx / dist) * force * repelStrength;
            p.y += (dy / dist) * force * repelStrength;
          }
        }

        // Boundary bounce check
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(187, 134, 252, 0.6)';
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(187, 134, 252, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Active Section tracking (Nav highlight)
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'tech'];
    const observers: IntersectionObserver[] = [];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Cursor Follower
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const hide = () => setCursorVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', hide);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', hide); };
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Translations Dictionary
  const t = {
    en: {
      role: "Software Engineer | Full Stack",
      contact: "Contact Me",
      downloadCV: "Download CV",
      aboutTitle: "About Me",
      aboutContent: (
        <>
          <p style={{ minHeight: '120px' }}>
            <Typewriter
              words={["Hi, I'm a Full Stack Software Engineer with a strong focus on building reliable backend systems and modern enterprise web applications. I enjoy leveraging Cloud technologies and finding practical ways to integrate AI to solve real-world business challenges. I'm passionate about writing clean, scalable code that delivers actual value."]}
              loop={false}
              typingSpeed={15}
            />
          </p>
          <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎓</span> Education
            </h3>
            <p style={{ margin: 0, lineHeight: '1.6' }}>
              <strong>B.Eng. in Computer Engineering</strong><br />
              Rajamangala University of Technology Isan (Surin Campus)
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Graduated: Nov 2020</span>
            </p>
          </div>
        </>
      ),
      expTitle: "Work Experience",
      coreTechTitle: "Core Technologies",
      viewRepo: "View Repository",
      visitWebsite: "Visit Website",
      keyFeatures: "Key Features & Integrations",
    },
    th: {
      role: "Software Engineer | Full Stack",
      contact: "Contact Me",
      downloadCV: "Download CV",
      aboutTitle: "About Me",
      aboutContent: (
        <>
          <p style={{ minHeight: '120px' }}>
            <Typewriter
              words={["สวัสดีครับ ผมเป็น Software Engineer มีประสบการณ์ทำทั้งหน้าเว็บแอปพลิเคชันและระบบหลังบ้าน (Backend) ให้กับโปรเจกต์ระดับองค์กร ผมชอบนำเทคโนโลยีอย่าง Cloud Services และ AI มาประยุกต์ใช้เพื่อแก้ปัญหาทางธุรกิจ โดยมุ่งเน้นที่การเขียนโค้ดที่ดูแลรวดเร็ว ขยายตัวได้ง่าย และตอบโจทย์การใช้งานจริง"]}
              loop={false}
              typingSpeed={15}
            />
          </p>
          <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎓</span> การศึกษา
            </h3>
            <p style={{ margin: 0, lineHeight: '1.6' }}>
              <strong>ปริญญาตรี วิศวกรรมคอมพิวเตอร์</strong><br />
              มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตสุรินทร์
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>จบการศึกษา: พฤศจิกายน 2563</span>
            </p>
          </div>
        </>
      ),
      expTitle: "Work Experience",
      coreTechTitle: "Core Technologies",
      viewRepo: "View Repository",
      visitWebsite: "เข้าสู่เว็บไซต์",
      keyFeatures: "Key Features & Integrations",
    }
  };

  const currentT = t[lang];

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

  const projects = getProjects(lang);

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
      role: l === 'en' ? 'Software Engineer' : 'นักพัฒนาซอฟต์แวร์',
      company: 'Thinkbit Co., Ltd.',
      period: l === 'en' ? '2024 - Present' : '2567 - ปัจจุบัน',
      description: l === 'en'
        ? 'Developed and maintained enterprise-level applications, encompassing complex backend systems (Node.js, Cloud Architecture), decoupled frontends, and integrated local AI for data processing.'
        : 'พัฒนาและดูแลระบบ Enterprise ให้กับลูกค้าระดับองค์กร ครอบคลุมทั้งฝั่ง Frontend และ Backend (Node.js, Cloud Architecture) รวมถึงนำ AI มาประยุกต์ใช้ในระบบ'
    },
    {
      id: 2,
      role: l === 'en' ? 'Programmer' : 'โปรแกรมเมอร์',
      company: 'Vicky Enterprise',
      period: l === 'en' ? 'Apr 2023 - May 2024' : 'เม.ย. 2566 - พ.ค. 2567',
      description: l === 'en'
        ? 'Maintained the corporate website and developed internal reporting tools using Microsoft SQL Server. Handled annual sales forecasting and provided internal IT support.'
        : 'พัฒนาและปรับปรุงเว็บไซต์องค์กร สร้างระบบรายงานผลด้วย Microsoft SQL Server จัดทำโฟกัสยอดขายรายปี และดูแลสนับสนุนงานด้าน IT ภายในบริษัท'
    },
    {
      id: 3,
      role: l === 'en' ? 'Programmer' : 'โปรแกรมเมอร์',
      company: 'Phatra Progress Co., Ltd.',
      period: l === 'en' ? 'Mar 2022 - Nov 2022' : 'มี.ค. 2565 - พ.ย. 2565',
      description: l === 'en'
        ? 'Developed modules and functions for Microsoft Dynamics 365 using X++. Built customized reports via SSRS, and provided technical support for AX system users.'
        : 'พัฒนาและออกแบบ Modules สำหรับ Microsoft Dynamics 365 ด้วยภาษา X++ สร้างรายงานด้วย SSRS และให้คำปรึกษาแก่ผู้ใช้งานระบบ AX'
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
        { name: 'GCP', icon: <img src="/GCPIcon.png" alt="GCP" style={{ width: 32, height: 32, objectFit: 'contain' }} /> },
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

      {/* Premium Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{
          width: `${scrollProgress}%`,
        }}
      />

      {/* Custom Cursor Follower */}
      <div
        className="cursor-follower"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* Full-page Particle Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.45,
        }}
      />

      {/* Modern Sticky Navigation */}
      <nav className="nav-container">
        <div className="nav-links">
          <a href="#about" className={`nav-link${activeSection === 'about' ? ' active' : ''}`}>About</a>
          <a href="#experience" className={`nav-link${activeSection === 'experience' ? ' active' : ''}`}>Experience</a>
          <a href="#projects" className={`nav-link${activeSection === 'projects' ? ' active' : ''}`}>Projects</a>
          <a href="#tech" className={`nav-link${activeSection === 'tech' ? ' active' : ''}`}>Skills</a>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
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
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
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
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
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

        <div className="hero-actions">
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
            href="/resume.pdf" 
            download 
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

      <section id="about" className="animate-on-scroll" style={{ textAlign: 'center', padding: '3rem 0', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>{currentT.aboutTitle}</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          {currentT.aboutContent}
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="experience-section">
        <h2 className="section-title">{currentT.expTitle}</h2>
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="timeline-item animate-on-scroll">
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

      <section id="projects" style={{ paddingTop: '4rem' }}>
        <h2 className="section-title animate-on-scroll">Projects</h2>

        <div className="project-filters animate-on-scroll">
          {['All', 'Frontend', 'Backend', 'AI', 'Cloud'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card animate-on-scroll"
              onClick={() => setSelectedProject(project)}
              title="Click to view details"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

                // 3D Tilt calculation
                const normX = (x / rect.width) - 0.5;
                const normY = (y / rect.height) - 0.5;
                const tiltX = -normY * 12; // max tilt 12 degrees
                const tiltY = normX * 12;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              }}
            >
              <h2 className="project-title">
                {project.title}
              </h2>
              <p className="project-desc">{project.description}</p>
              <div className="tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  {currentT.viewRepo}
                </a>
              )}
              {project.websites && project.websites.map((site, index) => (
                <a
                  key={index}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  style={{ background: 'var(--accent-light)', color: '#000', border: 'none', marginLeft: index > 0 || project.github ? '0.5rem' : '0' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.2rem' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  {site.label}
                </a>
              ))}
            </article>
          ))}
        </div>
      </section>

      {/* Premium Tech Stack Display */}
      <section id="tech" className="tech-stack-section">
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>{currentT.coreTechTitle}</h2>
        <div className="tech-groups-container">
          {techGroups.map((group, _idx) => (
            <div key={_idx} className="tech-group-card animate-on-scroll">
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

              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  style={{ marginTop: '1rem', display: 'inline-flex' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  {currentT.viewRepo}
                </a>
              )}
              {selectedProject.websites && selectedProject.websites.map((site, index) => (
                <a
                  key={index}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  style={{ marginTop: '1rem', display: 'inline-flex', background: 'var(--accent-light)', color: '#000', border: 'none', marginLeft: index > 0 || selectedProject.github ? '0.5rem' : '0' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.2rem' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  {site.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Chanchai Chakam. Built with Next.js.</p>
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
    </main>
  );
}
