import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // รหัสผ่านนี้จะทำงานฝั่ง Server เท่านั้น คนที่กด F12 จะมองไม่เห็น
    // แนะนำให้ตั้งค่า ADMIN_PASSWORD ในไฟล์ .env.local 
    const validPassword = process.env.ADMIN_PASSWORD;

    if (password === validPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
