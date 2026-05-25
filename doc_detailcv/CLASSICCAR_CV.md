# 🚗 Excise Classic Car Management System

**Role:** Full-Stack Developer / Backend Developer
**Project Type:** Enterprise Web Application & RESTful API
**Description:** ระบบจัดการข้อมูล การขึ้นทะเบียน และประเมินสภาพรถยนต์คลาสสิกสำหรับกรมสรรพสามิต (Excise Department) โดยออกแบบสถาปัตยกรรมแยกส่วน Frontend และ Backend เพื่อการจัดการข้อมูลอย่างเป็นระบบ

---

## 🛠️ Tech Stack & Architecture (เทคโนโลยีที่ใช้ในแต่ละระบบ)

### 🖥️ 1. Frontend System (ระบบส่วนหน้า)

ระบบ Frontend แยกการทำงานระหว่าง **User Portal** (สำหรับประชาชน) และ **Officer Portal** (สำหรับเจ้าหน้าที่) โดยรับผิดชอบหลักในการพัฒนา **Officer Portal** เพื่อใช้ตรวจสอบและประเมินราคา

- **Core:** React 18, TypeScript (v5.6), Vite (v5.4)
- **State Management & Data Fetching:** Zustand, React Query
- **UI / UX & Styling:** React Bootstrap 5, Styled-Components, SweetAlert2, react-hot-toast
- **Document & Data Processing:** jsPDF, pdf-lib, exceljs (สร้างเอกสาร PDF และ Excel ในฝั่ง Client)
- **Security & Routing:** React Router DOM v6 (ระบบ Route และ RBAC), devtools-detector
- **Localization:** i18next สำหรับรองรับหลายภาษา

### ⚙️ 2. Backend API System (ระบบหลังบ้าน)

พัฒนาระบบ RESTful API และจัดการ Business Logic ของระบบ

- **Core:** Node.js, Express.js, TypeScript (Strict Mode)
- **Architecture:** Controller/Service Layer Pattern, Global Middlewares, Custom Exception Handling
- **Database ORM/Query Builder:**
  - **Prisma:** ใช้เป็น Primary ORM สำหรับ API V2 และฟีเจอร์ใหม่ทั้งหมด
  - **Sequelize:** ใช้สำหรับการดูแลรักษา Legacy routes รุ่นเก่า
  - **Knex:** ใช้สำหรับการทำ Database Migrations
- **Validation:** Zod ทำ Request Validation และกำหนด Schema
- **Security & Authentication:**
  - **Firebase Admin SDK / Firebase Auth:** จัดการการยืนยันตัวตน (Authentication) และการออก/ตรวจสอบ JWT Token
  - Helmet (ตั้งค่า HTTP Headers ให้ปลอดภัย) และ CORS
- **Real-time Communication:** Socket.io
- **Logging:** Winston สำหรับจัดเก็บ Logs ของระบบ
- **Documentation:** Swagger (swagger-ui-express, swagger-jsdoc) สำหรับทำ API Documentation
- **Testing:** Jest และ Supertest สำหรับทำ Unit และ Integration Testing

### 🗄️ 3. Database & Cloud Infrastructure (ฐานข้อมูลและโครงสร้างพื้นฐาน)

- **Database:** Microsoft SQL Server (MSSQL) (เชื่อมต่อผ่าน `tedious` และ `mssql`)
- **Cloud Storage:** AWS S3 (`@aws-sdk/client-s3`) สำหรับอัปโหลดและจัดการไฟล์/รูปภาพ (ใช้งานผ่าน S3 Presigned URLs เพื่อให้ Client จัดการไฟล์ได้อย่างปลอดภัย)
- **Hosting & Deployment:**
  - **Frontend:** Firebase Hosting
  - **Backend:** ทำการ Deploy บน AWS Cloud Ecosystem (รองรับ Staging และ Production) โดยใช้ Custom Shell Scripts ในกระบวนการ CI/CD
  - **Environment:** มีการใช้งาน Docker (`start:docker`) สำหรับการพัฒนาแบบ Local

---

## 💡 Key Responsibilities & Achievements (ผลงานที่โดดเด่นสำหรับใส่ใน Resume)

**Frontend (Officer Portal):**

- พัฒนา **Officer Portal (Backoffice)** ด้วย **React 18** และ **TypeScript** สำหรับการใช้งานภายในองค์กร
- พัฒนาระบบจัดการสิทธิ์การเข้าถึงข้อมูล (RBAC) ผ่าน **React Router v6**
- จัดการ State และ API ด้วย **React Query** และ **Zustand** สำหรับการแสดงผลข้อมูล
- พัฒนาระบบสร้างรายงาน (PDF และ Excel) ในฝั่งไคลเอนต์ด้วย **jsPDF** และ **ExcelJS**
- สร้างฟอร์มและตรวจสอบข้อมูลด้วย **Zod** schema

**Backend & Infrastructure:**

- พัฒนา **RESTful API** ด้วย **Node.js, Express** และ **TypeScript**
- ปรับปรุงการจัดการฐานข้อมูล MSSQL โดยใช้ **Prisma ORM** แทน Sequelize ใน V2 เพื่อเพิ่ม Type-safety
- พัฒนาระบบยืนยันตัวตนด้วย **Firebase Auth** และ JWT
- พัฒนาระบบแจ้งเตือนแบบ Real-time ด้วย **Socket.io**
- เชื่อมต่อการจัดการไฟล์กับ **AWS S3** ด้วย Presigned URLs สำหรับฝั่ง Client
- จัดทำ API Documentation ด้วย **Swagger** และจัดการ Logs ด้วย **Winston**
- พัฒนา Test scripts ด้วย **Jest** สำหรับทดสอบ API
- จัดเตรียม Environment ด้วย **Docker** และเขียน Script สำหรับ Deploy บน **AWS**
