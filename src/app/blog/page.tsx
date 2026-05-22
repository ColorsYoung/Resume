/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type Article = {
  id: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  emoji: string;
  excerpt: string;
  content: React.ReactNode;
};

export default function BlogPage() {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Initial load sync with system data attributes if set
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light' || currentTheme === 'dark') {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Blog Articles dictionary
  const articles: Article[] = useMemo(() => [
    {
      id: 'multicloud-api',
      title: lang === 'en' 
        ? "Designing Multi-Cloud APIs: AWS + Azure Architectures" 
        : "การออกแบบ Multi-Cloud APIs: สถาปัตยกรรม AWS + Azure",
      tag: "Cloud Architecture",
      date: "May 10, 2026",
      readTime: "5 min read",
      emoji: "☁️",
      excerpt: lang === 'en'
        ? "Explore design principles for building serverless endpoints that migrate easily between AWS Elastic Beanstalk and Azure Functions."
        : "สำรวจหลักการออกแบบระบบเพื่อสร้างระบบ API แบบไร้เซิร์ฟเวอร์ที่สามารถทำงานสลับกันได้อย่างลงตัวระหว่าง AWS และ Azure.",
      content: lang === 'en' ? (
        <div className="blog-article-body">
          <p>Modern enterprise demands high reliability, which often translates to active backup architectures across multiple cloud ecosystems. When we built the core <strong>Oil Tracking & Tax API</strong>, the key goal was zero single-point failure across hosting giants Azure and AWS.</p>
          <h3>Decoupling Computes</h3>
          <p>By leveraging Serverless endpoints on Azure Functions alongside Docker-based runtime layers deployed via AWS Elastic Beanstalk, we ensured identical execution environments. Abstracting platform specifics inside adapter hooks allows developers to run standard, clean code without hardcoding vendor APIs.</p>
          <h3>Data Synchrony Challenges</h3>
          <p>Using relational MSSQL databases as primary storage required robust data-replication setups. Integrating automated OCR steps via Azure AI Document Intelligence allowed document scanning tasks to act as an asynchronous microservice. If Azure services faced transient outages, traffic instantly routed to AWS, queuing non-critical processing tasks inside backup SQS relays.</p>
          <h3>Key Takeaways</h3>
          <ul>
            <li>Maintain Docker/Container symmetry across clouds for easy migrations.</li>
            <li>Rely on ORMs (like Prisma) to write engine-agnostic relational queries.</li>
            <li>Isolate third-party services (like AI OCR engines) behind custom API boundaries.</li>
          </ul>
        </div>
      ) : (
        <div className="blog-article-body">
          <p>ระบบองค์กรในปัจจุบันต้องการความเสถียรและความพร้อมใช้งานสูง ซึ่งมักหมายถึงการวางสถาปัตยกรรมบนคลาวด์หลายแห่ง (Multi-Cloud) เมื่อเราพัฒนา <strong>Oil Tracking & Tax API</strong> เป้าหมายหลักคือการป้องกันระบบล่มโดยสิ้นเชิงจากการหยุดให้บริการของคลาวด์เจ้าใดเจ้าหนึ่ง</p>
          <h3>การแยกส่วนประมวลผล (Decoupling Compute)</h3>
          <p>การใช้สถาปัตยกรรมไร้เซิร์ฟเวอร์บน Azure Functions ควบคู่กับการทำงานแบบตู้คอนเทนเนอร์ (Docker) บน AWS Elastic Beanstalk ช่วยให้ระบบประมวลผลทำงานอย่างเหมือนกันทุกประการ การห่อหุ้มคำสั่งเฉพาะของแต่ละคลาวด์ไว้ภายใต้ Service Hook ช่วยให้เราสามารถเปลี่ยนทราฟฟิกไปมาได้โดยไม่มีผลกระทบต่อแกนหลักของโค้ด</p>
          <h3>ความท้าทายเรื่องความพร้อมกันของข้อมูล (Data Synchrony)</h3>
          <p>การใช้ MSSQL เป็นฐานข้อมูลหลักจำเป็นต้องมีการทำสำเนาข้อมูลที่เสถียร การแยกงานอ่านเอกสารด้วย Azure AI Document Intelligence ออกมาเป็นไมโครเซอร์วิสอิสระ ทำให้แม้บริการ Azure จะหยุดทำงานชั่วคราว แกนของ API บน AWS ก็ยังสามารถทำงานได้ตามปกติ โดยระบบจะเก็บบันทึกข้อมูลที่ต้องทำ OCR ไว้ในคิวสำรองรอส่งคำขอประมวลผลใหม่</p>
          <h3>สรุปประเด็นสำคัญ</h3>
          <ul>
            <li>รักษาความสมมาตรของสภาพแวดล้อมโดยใช้ Docker Container บนทุกคลาวด์</li>
            <li>ใช้ ORM (เช่น Prisma) เพื่อช่วยให้คำสั่ง SQL ทำงานเข้ากันได้ง่ายกับทุกประเภทฐานข้อมูล</li>
            <li>แยกฟังก์ชัน AI หรือภายนอกไว้หลังระบบ Wrapper API เพื่อให้ง่ายต่อการปรับเปลี่ยน</li>
          </ul>
        </div>
      )
    },
    {
      id: 'local-llm-trading',
      title: lang === 'en'
        ? "Integrating Local LLMs (Ollama) in Python Automated Bots"
        : "การรวม Local LLMs (Ollama) ในบอทเทรดอัตโนมัติภาษา Python",
      tag: "AI & Automation",
      date: "Apr 22, 2026",
      readTime: "6 min read",
      emoji: "🤖",
      excerpt: lang === 'en'
        ? "Learn how to feed technical indicators (RSI, MACD) to local Llama models and execute automated trades via APIs safely."
        : "เรียนรู้วิธีการวิเคราะห์ข้อมูลตัวชี้วัดตลาดเชิงเทคนิค (RSI, MACD) ร่วมกับโมเดลโลคอล Llama เพื่อส่งคำสั่งซื้อขายอัตโนมัติผ่าน Exchange API.",
      content: lang === 'en' ? (
        <div className="blog-article-body">
          <p>Integrating Artificial Intelligence into trading systems usually involves expensive remote API calls and data privacy concerns. By running local models (like <strong>Llama 3.1</strong> via Ollama), we achieve high-speed inference on private servers with zero API transaction costs.</p>
          <h3>The Analysis Pipeline</h3>
          <p>Before triggering the AI model, raw cryptocurrency ticks are collected and processed using <code>Pandas</code>. We calculate technical indicators like Relative Strength Index (RSI), Exponential Moving Averages (EMA), and MACD. Instead of letting the model read raw charts, we feed it a structured text prompt summarizing the metrics.</p>
          <h3>Command Execution & Safety</h3>
          <p>To avoid hallucinations causing fatal trades, the LLM is restricted to returning structured JSON. Using strict prompt rules, the model acts purely as a sentiment and strategy advisor: returning <code>{"{ \"action\": \"BUY\" / \"SELL\" / \"HOLD\", \"confidence\": 0-100 }"}</code>. Crucially, we build a <strong>&ldquo;Dry Run&rdquo;</strong> validation wrapper that tests all signals on mock accounts first.</p>
          <h3>Advantages</h3>
          <ul>
            <li>Zero cost per token, enabling continuous 24/7 scanning.</li>
            <li>Private and localized market metrics analysis.</li>
            <li>Highly customizable trading behavior by adjustment of system prompts.</li>
          </ul>
        </div>
      ) : (
        <div className="blog-article-body">
          <p>การนำปัญญาประดิษฐ์เข้ามาใช้วิเคราะห์เพื่อส่งคำสั่งเทรด มักจะมาพร้อมกับค่าบริการคลาวด์ที่สูงและความปลอดภัยของข้อมูลที่เป็นความลับ การรันปัญญาประดิษฐ์แบบโลคอลด้วย <strong>Llama 3.1</strong> ผ่าน Ollama จึงเข้ามาตอบโจทย์การประมวลผลที่รวดเร็ว ปลอดภัย และไม่มีค่าบริการราย token</p>
          <h3>ระบบท่อส่งข้อมูลการวิเคราะห์ (Analysis Pipeline)</h3>
          <p>ก่อนที่ระบบจะเรียกใช้ AI ข้อมูลราคาแบบเรียลไทม์จะถูกคำนวณและประมวลผลผ่านไลบรารี <code>Pandas</code> เพื่อดึงตัวชี้วัดทางเทคนิค (เช่น RSI, EMA, MACD) โดยเราจะไม่ส่งกราฟราคาดิบเข้าไปยังโมเดล แต่จะสรุปข้อมูลเป็นโครงสร้างข้อความที่กระชับเพื่อส่งต่อไปประเมินต่อ</p>
          <h3>ความปลอดภัยในการตัดสินใจซื้อขาย</h3>
          <p>เพื่อหลีกเลี่ยงการประมวลผลที่ผิดพลาดหรือ &ldquo;การหลอน&rdquo; (Hallucination) ของ AI เราได้จำกัดให้โมเดลตอบกลับมาในรูปแบบโครงสร้าง JSON เท่านั้น เช่น <code>{"{ \"action\": \"BUY\" / \"SELL\" / \"HOLD\", \"confidence\": 0-100 }"}</code> และที่สำคัญที่สุดคือการพัฒนาระบบ <strong>&ldquo;Dry Run&rdquo;</strong> เพื่อใช้จำลองการเทรดในพอร์ตสมมติก่อนการเทรดจริง</p>
          <h3>ข้อดีสำคัญ</h3>
          <ul>
            <li>ไม่มีค่าธรรมเนียมต่อการประมวลผลคำ ทำงานได้ตลอด 24 ชั่วโมงโดยไม่มีค่าส่งคำสั่ง</li>
            <li>ข้อมูลกลยุทธ์การเทรดเป็นส่วนตัว รันในเครื่องเซิร์ฟเวอร์แบบปิด</li>
            <li>ปรับแต่งพฤเบอกบอทได้อย่างเสรีผ่านการตั้งค่า System Prompt</li>
          </ul>
        </div>
      )
    },
    {
      id: 'prisma-mssql-performance',
      title: lang === 'en'
        ? "Optimizing MSSQL Databases at Scale with Prisma ORM"
        : "การปรับปรุงประสิทธิภาพฐานข้อมูล MSSQL ด้วย Prisma ORM",
      tag: "Database",
      date: "Mar 15, 2026",
      readTime: "4 min read",
      emoji: "⚡",
      excerpt: lang === 'en'
        ? "Practical query tuning tips including indexed schema design, relation filtering, and raw query overrides."
        : "เคล็ดลับการจูนคิวรีข้อมูลที่ใช้งานได้จริง รวมถึงการออกแบบ Index บน Schema, การกรองความสัมพันธ์ และการเขียนคิวรีดิบเสริม.",
      content: lang === 'en' ? (
        <div className="blog-article-body">
          <p>Prisma is a fantastic ORM for type-safety and developer speed. However, as tables grow into millions of rows in corporate tax reporting portals, simple abstractions can lead to underperforming N+1 query patterns.</p>
          <h3>1. Index and Relations</h3>
          <p>Ensure fields frequently used inside <code>where</code> statements and foreign keys are explicitly indexed in your <code>schema.prisma</code> file. Adding <code>@@index([productId, status])</code> at the block level creates proper compound indexes inside MSSQL server, dropping lookup times from seconds to single-digit milliseconds.</p>
          <h3>2. Selective Fetching</h3>
          <p>Avoid fetch-all patterns. Always pass explicit <code>select</code> blocks to return only mandatory fields:
          <code>{"prisma.taxRecord.findMany({ select: { id: true, taxAmount: true } })"}</code>. This significantly reduces data transfer size and network overhead.</p>
          <h3>3. Direct Raw Fallbacks</h3>
          <p>For high-performance aggregations and complex groupings, do not hesitate to drop down to raw SQL using <code>prisma.$queryRaw</code>. Database engines compile and cache execution plans for raw procedures far better than dynamic client-generated queries.</p>
        </div>
      ) : (
        <div className="blog-article-body">
          <p>Prisma เป็น ORM ที่ยอดเยี่ยมมากในเรื่องความปลอดภัยของประเภทข้อมูล (Type-Safety) และความรวดเร็วในการพัฒนา อย่างไรก็ตาม เมื่อตารางขยายใหญ่ขึ้นจนมีข้อมูลนับล้านเรคคอร์ดในระบบจัดการภาษี การเรียกคิวรีข้อมูลผ่าน abstraction ทั่วไปอาจส่งผลให้เกิดปัญหาประสิทธิภาพช้าลงจากรูปแบบคิวรี N+1</p>
          <h3>1. การสร้างดัชนี (Index) บน Schema</h3>
          <p>การทำให้ฟิลด์ข้อมูลที่ถูกค้นหาบ่อยครั้งในคำสั่ง <code>where</code> หรือฟิลด์คีย์นอก (Foreign Keys) มีดัชนีระบุไว้ในไฟล์ <code>schema.prisma</code> อย่างชัดเจน เช่น <code>@@index([productId, status])</code> จะช่วยให้ระบบฐานข้อมูล MSSQL เข้าถึงข้อมูลได้รวดเร็วขึ้นอย่างมหาศาล จากการค้นหาระดับวินาทีเหลือเพียงเสี้ยววินาที</p>
          <h3>2. การเลือกดึงเฉพาะข้อมูลที่จำเป็น (Selective Fetching)</h3>
          <p>หลีกเลี่ยงการดึงข้อมูลแบบครอบจักรวาล ควรระบุเฉพาะเจาะจงในบล็อก <code>select</code> เสมอ: <code>{"prisma.taxRecord.findMany({ select: { id: true, taxAmount: true } })"}</code> ซึ่งช่วยลดขนาดไฟล์ข้อมูลที่วิ่งผ่านเครือข่ายลงได้อย่างเป็นรูปธรรม</p>
          <h3>3. การใช้ SQL แบบดิบในจุดวิกฤต</h3>
          <p>สำหรับการคำนวณและกรุ๊ปข้อมูลที่ซับซ้อนและมีขนาดใหญ่มาก การเลือกเปลี่ยนมาเขียนคำสั่ง SQL แบบดิบผ่าน <code>prisma.$queryRaw</code> จะให้ประสิทธิภาพที่ยอดเยี่ยมกว่า เนื่องจากเครื่องยนต์ฐานข้อมูลสามารถคอมไพล์และแคชแผนการรันคำสั่งได้มีประสิทธิภาพดีกว่า</p>
        </div>
      )
    }
  ], [lang]);

  // Unique tags for filters
  const tags = useMemo(() => {
    return ['All', 'Cloud Architecture', 'AI & Automation', 'Database'];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    if (selectedTag === 'All') return articles;
    return articles.filter(a => a.tag === selectedTag);
  }, [articles, selectedTag]);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)', transition: 'background 0.3s, color 0.3s', padding: '2rem 1rem' }}>
      
      {/* Subpage Header Nav */}
      <header style={{ maxWidth: '850px', margin: '0 auto 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{
          textDecoration: 'none',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--card-border)',
          padding: '0.5rem 1rem',
          borderRadius: '30px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-light)';
          e.currentTarget.style.borderColor = 'var(--accent-light)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(187, 134, 252, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.borderColor = 'var(--card-border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
        >
          <span>←</span> {lang === 'en' ? 'Back to Resume' : 'กลับหน้าหลัก'}
        </Link>

        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--card-border)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-light)';
              e.currentTarget.style.color = 'var(--accent-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
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

          {/* Bilingual Language Selector */}
          <div style={{
            display: 'flex', gap: '0.45rem', padding: '0.2rem 0.5rem',
            background: 'rgba(255,255,255,0.05)', borderRadius: '20px',
            border: '1px solid var(--card-border)'
          }}>
            <button
              onClick={() => setLang('en')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem',
                padding: '0.2rem 0.4rem',
                fontWeight: lang === 'en' ? 'bold' : 'normal',
                color: lang === 'en' ? 'var(--accent-light)' : 'var(--text-muted)',
                transition: 'color 0.3s'
              }}
            >
              EN
            </button>
            <span style={{ color: 'var(--card-border)', fontSize: '0.78rem', alignSelf: 'center' }}>|</span>
            <button
              onClick={() => setLang('th')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem',
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

      {/* Main Title Section */}
      <section style={{ maxWidth: '850px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '1rem',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {lang === 'en' ? "Things I'm Interested In" : "สิ่งที่ผมกำลังสนใจอยู่"}
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          maxWidth: '650px',
          margin: '0 auto 2rem'
        }}>
          {lang === 'en' 
            ? 'My personal engineering blog where I share notes on architecture, performance tuning, and practical AI systems I discover and build.'
            : 'บล็อกแบ่งปันเรื่องราว เทคโนโลยีใหม่ๆ และสิ่งที่น่าสนใจที่ผมได้เรียนรู้ ทั้งสถาปัตยกรรมคลาวด์ การจูนฐานข้อมูล และ AI'}
        </p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              style={{
                background: selectedTag === t ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedTag === t ? '#121212' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: selectedTag === t ? 'var(--accent-light)' : 'var(--card-border)',
                padding: '0.45rem 1rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedTag !== t) {
                  e.currentTarget.style.borderColor = 'var(--accent-light)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTag !== t) {
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {t === 'All' ? (lang === 'en' ? 'All Articles' : 'บทความทั้งหมด') : t}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Articles */}
      <section style={{ maxWidth: '850px', margin: '0 auto 4rem' }}>
        <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {filteredArticles.map((article) => (
            <article 
              key={article.id} 
              className="blog-card"
              onClick={() => setSelectedArticle(article)}
              style={{ cursor: 'pointer' }}
            >
              <div className="blog-card-img">
                {article.emoji}
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-tag">{article.tag}</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="blog-title">{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <div className="blog-read-more">
                  {lang === 'en' ? 'Read Article' : 'อ่านบทความ'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            {lang === 'en' ? 'No articles found in this category.' : 'ไม่พบรายการบทความในหมวดหมู่นี้'}
          </div>
        )}
      </section>

      {/* Blog Modal Overlay */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content blog-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>
              &times;
            </button>
            <div className="modal-body">
              <div className="blog-meta" style={{ marginBottom: '0.75rem' }}>
                <span className="blog-tag">{selectedArticle.tag}</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h2>
              {selectedArticle.content}
            </div>
          </div>
        </div>
      )}

      <footer style={{ maxWidth: '850px', margin: '4rem auto 1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <p>© 2026 Chanchai Chakam. All rights reserved.</p>
      </footer>
    </main>
  );
}
