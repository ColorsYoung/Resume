# 💻 Backend Developer - Oil Tracking & Tax Management API (Multi-Cloud Architecture)

## 📝 Project Overview

พัฒนาระบบ API สำหรับบริหารจัดการเอกสาร ภาษี และคลังสินค้าสำหรับอุตสาหกรรมน้ำมัน รองรับการจัดการข้อมูลองค์กร ผลิตภัณฑ์น้ำมัน สูตรการผลิต และเชื่อมต่อระบบ **OCR (Optical Character Recognition)** เพื่ออ่านแบบฟอร์มเอกสารทางภาษีสรรพสามิตโดยอัตโนมัติ

## 🛠 Tech Stack & Technologies Used

### 1. Core Development

- **Runtime & Language:** Node.js, TypeScript (Strict Typing)
- **Web Framework:** Express.js
- **Real-time Engine:** Socket.IO (สำหรับการแจ้งเตือนหรือการอัปเดตสถานะแบบ Real-time)
- **Bundler:** ESBuild (ใช้ในการทำ Bundle และ Minify โค้ด เพื่อประสิทธิภาพในการ Deploy)

### 2. Database & ORM

- **Relational Database:** Microsoft SQL Server (MSSQL) สำหรับจัดเก็บข้อมูลหลักที่ซับซ้อน เช่น ข้อมูลองค์กร, การคำนวณภาษี, บัญชีรับจ่าย
- **NoSQL Database:** Azure Cosmos DB (สำหรับจัดเก็บข้อมูลที่มีโครงสร้างยืดหยุ่นหรือ Document-based data)
- **ORM (Object-Relational Mapping):** Prisma ORM (ใช้งาน `prisma db pull/push/generate` ในการจัดการ Database Schema และ Type-safe Database Access)

### 3. Cloud Services & Infrastructure (AWS & Azure)

- **Compute / Hosting:** AWS Elastic Beanstalk (ใช้สำหรับการ Deploy และ Scale API)
- **Storage:** Azure Blob Storage (สำหรับจัดเก็บไฟล์เอกสาร รูปภาพ และไฟล์สแกนจากระบบ OCR)
- **Security / Secrets:** AWS Secrets Manager (สำหรับการจัดการ Credentials อย่างปลอดภัย)

### 4. Utilities & Testing

- **Validation:** Zod (ตรวจสอบและ Validate Schema ของ Request/Response อย่างเข้มงวด)
- **Security:** JWT (JSON Web Token), bcrypt (Password Hashing), express-rate-limit
- **Mailing:** Nodemailer (ระบบส่งอีเมลแจ้งเตือนต่างๆ)
- **Process Manager:** PM2
- **Testing:** Jest, Supertest (สำหรับทำ Unit Test และ Integration Test API)

## 📌 Key Responsibilities & Achievements

- **System Architecture:** พัฒนาระบบด้วยสถาปัตยกรรม Serverless บน Azure และมีส่วนร่วมในการย้าย Core API ไปยัง AWS (Elastic Beanstalk)
- **Multi-Cloud Integration:** บริหารจัดการระบบแบบ Multi-Cloud (AWS และ Azure) สำหรับ Compute, Database และ Storage
- **OCR & Document Pipeline:** เชื่อมต่อ Azure AI Document Intelligence (OCR) เพื่อดึงข้อมูลแบบฟอร์มภาษีและคำนวณสต็อกน้ำมัน
- **Real-time & Background Processing:** พัฒนาระบบ Real-time ด้วย Socket.IO และจัดการ Background processing สำหรับงานเอกสาร
- **Database Management:** จัดการฐานข้อมูล Relational (MSSQL) สำหรับข้อมูลบัญชี และ NoSQL (Azure Cosmos DB) สำหรับข้อมูลเอกสาร
