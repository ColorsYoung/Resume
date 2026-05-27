import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // On production: check Vercel Blob for avatar
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { head } = await import('@vercel/blob');
      try {
        const blob = await head('avatar/ProfileNoom.jpeg');
        return NextResponse.json({ url: blob.url });
      } catch {
        // Blob doesn't exist yet, use default
        return NextResponse.json({ url: '/ProfileNoom.jpeg' });
      }
    }
    // Local dev: use static file
    return NextResponse.json({ url: '/ProfileNoom.jpeg' });
  } catch {
    return NextResponse.json({ url: '/ProfileNoom.jpeg' });
  }
}
