import { NextResponse } from 'next/server';
import { getLifestyleItems } from '@/utils/lifestyle';

export async function GET() {
  try {
    const items = getLifestyleItems();
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
