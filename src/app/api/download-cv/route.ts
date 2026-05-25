import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'CV.pdf');
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Chanchai_Chakam_CV.pdf"',
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'CV file not found' },
      { status: 404 }
    );
  }
}
