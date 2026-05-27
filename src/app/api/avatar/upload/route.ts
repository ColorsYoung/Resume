import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image || image.size === 0) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const rawBuffer = Buffer.from(await image.arrayBuffer());
    // Convert any format (including HEIC from iPhone) to JPEG
    const jpegBuffer = await sharp(rawBuffer)
      .jpeg({ quality: 90 })
      .toBuffer();

    // Use Vercel Blob on production, filesystem on local dev
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const blob = await put('avatar/ProfileNoom.jpeg', jpegBuffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'image/jpeg',
      });
      return NextResponse.json({ success: true, url: blob.url });
    } else {
      // Local dev fallback: write to filesystem
      const fs = await import('fs/promises');
      const path = await import('path');
      const targetPath = path.join(process.cwd(), 'public', 'ProfileNoom.jpeg');
      await fs.writeFile(targetPath, jpegBuffer);
      return NextResponse.json({ success: true, url: `/ProfileNoom.jpeg?ts=${Date.now()}` });
    }
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
