import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image || image.size === 0) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    // Overwrite the existing ProfileNoom.jpeg file
    const targetPath = path.join(process.cwd(), 'public', 'ProfileNoom.jpeg');
    
    await fs.writeFile(targetPath, buffer);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
