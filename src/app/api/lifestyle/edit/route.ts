import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const details = formData.get('details') as string;
    const statsStr = formData.get('stats') as string;
    const rating = formData.get('rating') as string;
    const deletedImagesStr = formData.get('deletedImages') as string; // JSON array of relative paths

    if (!slug || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '');

    // Parse stats & deleted images
    let stats: any[] = [];
    let deletedImages: string[] = [];
    try {
      if (statsStr) stats = JSON.parse(statsStr);
    } catch (e) {
      console.error('Failed to parse stats JSON', e);
    }
    try {
      if (deletedImagesStr) deletedImages = JSON.parse(deletedImagesStr);
    } catch (e) {
      console.error('Failed to parse deletedImages JSON', e);
    }

    const targetDir = path.join(process.cwd(), 'public', 'lifestyle', cleanSlug);
    await fs.mkdir(targetDir, { recursive: true });

    // 1. Delete marked images
    for (const imgUrl of deletedImages) {
      // imgUrl format: "/lifestyle/doi-chiang-dao/2.png"
      const fileBaseName = path.basename(imgUrl);
      const filePath = path.join(targetDir, fileBaseName);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn(`File not found or failed to delete: ${filePath}`, err);
      }
    }

    // 2. Read remaining files in target directory to get the count
    let existingFiles: string[] = [];
    try {
      existingFiles = await fs.readdir(targetDir);
      existingFiles = existingFiles.filter(f => /\.(png|jpg|jpeg|gif|svg|webp|avif)$/i.test(f));
    } catch (e) {
      console.error('Failed to read target directory', e);
    }

    // 3. Save newly uploaded images
    const newImages = formData.getAll('images') as File[];
    // Find the next index start
    let maxCounter = 0;
    existingFiles.forEach(f => {
      const match = f.match(/^(\d+)\./);
      if (match) {
        const val = parseInt(match[1], 10);
        if (val > maxCounter) maxCounter = val;
      }
    });

    let newImageCounter = maxCounter + 1;
    for (const image of newImages) {
      if (image && image.size > 0) {
        let buffer = Buffer.from(await image.arrayBuffer());
        let ext = '.png';
        if (image.name) {
          const matched = image.name.match(/\.(png|jpg|jpeg|gif|svg|webp|heic|heif|avif)$/i);
          if (matched) ext = matched[0].toLowerCase();
        }
        // Fallback: detect from MIME type
        if (ext === '.png' && image.type) {
          const mimeMap: Record<string, string> = {
            'image/heic': '.heic', 'image/heif': '.heif',
            'image/webp': '.webp', 'image/avif': '.avif',
            'image/jpeg': '.jpg', 'image/png': '.png',
            'image/gif': '.gif', 'image/svg+xml': '.svg',
          };
          ext = mimeMap[image.type.toLowerCase()] || ext;
        }
        // Convert HEIC/HEIF to WebP for browser compatibility
        if (ext === '.heic' || ext === '.heif') {
          buffer = await sharp(buffer).webp({ quality: 85 }).toBuffer() as Buffer<ArrayBuffer>;
          ext = '.webp';
        }
        const fileName = `${newImageCounter}${ext}`;
        await fs.writeFile(path.join(targetDir, fileName), buffer);
        newImageCounter++;
      }
    }

    // 4. Sequentialize image names cleanly so there are no holes (e.g. if we deleted "2.png" but have "1.png" and "3.png")
    try {
      let finalFiles = await fs.readdir(targetDir);
      finalFiles = finalFiles.filter(f => /\.(png|jpg|jpeg|gif|svg|webp|avif)$/i.test(f));

      // Sort files numerically by name first, falling back to alphabetical
      finalFiles.sort((a, b) => {
        const numA = parseInt((a.match(/^(\d+)\./) ?? [])[1] ?? '9999', 10);
        const numB = parseInt((b.match(/^(\d+)\./) ?? [])[1] ?? '9999', 10);
        if (numA !== numB) return numA - numB;
        return a.localeCompare(b);
      });

      // Rename temporarily to avoid overwrite collisions
      const tempNames: { oldName: string; tempName: string; ext: string }[] = [];
      for (let i = 0; i < finalFiles.length; i++) {
        const oldName = finalFiles[i];
        const ext = path.extname(oldName);
        const tempName = `temp_${i}_${Date.now()}${ext}`;
        await fs.rename(path.join(targetDir, oldName), path.join(targetDir, tempName));
        tempNames.push({ oldName, tempName, ext });
      }

      // Rename from temp names to final ordered names: 1.ext, 2.ext, 3.ext...
      for (let i = 0; i < tempNames.length; i++) {
        const item = tempNames[i];
        const finalName = `${i + 1}${item.ext}`;
        await fs.rename(path.join(targetDir, item.tempName), path.join(targetDir, finalName));
      }
    } catch (err) {
      console.error('Error re-indexing and sequentializing image folder', err);
    }

    // 5. Overwrite/Save Markdown files
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

    // Overwrite both locale markdown files
    await fs.writeFile(path.join(dataDir, `${cleanSlug}.en.md`), mdContent, 'utf-8');
    await fs.writeFile(path.join(dataDir, `${cleanSlug}.th.md`), mdContent, 'utf-8');

    return NextResponse.json({ success: true, slug: cleanSlug });
  } catch (error: any) {
    console.error('Error editing lifestyle entry:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
