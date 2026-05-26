import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const details = formData.get('details') as string;
    const statsStr = formData.get('stats') as string;
    const rating = formData.get('rating') as string;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '');

    // Parse stats
    let stats = [];
    try {
      if (statsStr) stats = JSON.parse(statsStr);
    } catch (e) {
      console.error('Failed to parse stats JSON', e);
    }

    // Process images
    const images = formData.getAll('images') as File[];
    const targetDir = path.join(process.cwd(), 'public', 'lifestyle', cleanSlug);
    await fs.mkdir(targetDir, { recursive: true });

    let imageCounter = 1;
    for (const image of images) {
      if (image && image.size > 0) {
        const buffer = Buffer.from(await image.arrayBuffer());
        // Determine file extension, default to .png
        let ext = '.png';
        if (image.name) {
          const matched = image.name.match(/\.(png|jpg|jpeg|gif|svg)$/i);
          if (matched) ext = matched[0].toLowerCase();
        }
        const fileName = `${imageCounter}${ext}`;
        await fs.writeFile(path.join(targetDir, fileName), buffer);
        imageCounter++;
      }
    }

    // Save Markdown files
    const dataDir = path.join(process.cwd(), 'data', 'lifestyle');
    await fs.mkdir(dataDir, { recursive: true });

    // Generate unified markdown content
    let mdContent = `---\ntitle: ${JSON.stringify(title)}\nsubtitle: ${JSON.stringify(subtitle)}\n`;
    if (rating) mdContent += `rating: ${rating}\n`;
    if (stats.length > 0) {
      mdContent += `stats:\n`;
      stats.forEach((s: any) => {
        mdContent += `  - label: ${JSON.stringify(s.label)}\n    value: ${JSON.stringify(s.value)}\n`;
      });
    }
    mdContent += `---\n${details}\n`;

    // Write to both locales so it displays cleanly in both routing settings
    await fs.writeFile(path.join(dataDir, `${cleanSlug}.en.md`), mdContent, 'utf-8');
    await fs.writeFile(path.join(dataDir, `${cleanSlug}.th.md`), mdContent, 'utf-8');

    return NextResponse.json({ success: true, slug: cleanSlug });
  } catch (error: any) {
    console.error('Error creating lifestyle entry:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
