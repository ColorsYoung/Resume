# Project Experience: LuckyTabien (ระบบซื้อ-ขายทะเบียนมงคล)

**Role:** Full Stack Developer / Software Engineer (ปรับแก้ตามตำแหน่งของคุณ)
**Project Description:**
พัฒนาระบบแพลตฟอร์มซื้อ-ขายทะเบียนรถมงคล (LuckyTabien) โดยออกแบบสถาปัตยกรรมแยกส่วนระหว่างระบบสำหรับลูกค้าทั่วไปและระบบจัดการหลังบ้าน (Admin) ทำงานร่วมกับ API บน Cloud

## 🛠️ Technology Stack & Architecture

โครงการนี้ถูกแบ่งออกเป็น 3 ส่วนหลัก ได้แก่ ระบบฝั่งผู้ใช้งานทั่วไป (Frontend), ระบบจัดการหลังบ้าน (Admin Portal), และ ระบบประมวลผล (Backend API) โดยเลือกใช้เทคโนโลยีดังนี้:

### 1. Backend & API Services (`api`)

พัฒนา RESTful API สำหรับจัดการข้อมูลระบบด้วยสถาปัตยกรรม Serverless

- **Runtime & Language:** Node.js, TypeScript
- **Web Framework:** Express.js
- **Database:** MySQL
- **ORM (Object-Relational Mapping):** Sequelize
- **Cloud Services & Serverless:** Firebase Functions, Firebase Admin SDK
- **Data Validation:** AJV (JSON Schema Validator)
- **อื่นๆ:** Session & Cookie Management (`express-session`, `cookie-parser`)

### 2. Frontend: Admin Portal (`frontend_admin`)

ระบบจัดการหลังบ้านสำหรับพนักงานเพื่อจัดการข้อมูลทะเบียนรถและข้อมูลลูกค้า

- **Core Library:** React.js
- **Build Tool:** Vite
- **UI & Styling:** React Bootstrap, React Select
- **Form & Validation:** Zod
- **Data Processing:** Exceljs, FileSaver (รองรับการ Export/Import ไฟล์ Excel)
- **API Client:** Axios
- **Routing:** React Router DOM
- **Deployment:** Firebase Hosting

### 3. Frontend: Customer Portals (`frontend`, `frontend2`)

ระบบหน้าบ้านสำหรับลูกค้าทั่วไปในการค้นหาและเลือกซื้อทะเบียนรถ

- **Core Library:** React.js (Create React App)
- **UI & Styling:** Material UI (MUI) ร่วมกับ React Bootstrap และ Emotion (สำหรับการทำ Styled Components)
- **Typography & Icons:** FontAwesome, Bootstrap Icons, และ Custom Fonts (เช่น IBM Plex Sans Thai Looped)
- **API Client:** Axios
- **Routing:** React Router DOM
- **Deployment:** Firebase Hosting

## link: https://luckytabien.com/

## link: https://www.tabienhiend.com/
