import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import LifestyleClient, { LifestyleItem, LifestyleStat } from '@/components/LifestyleClient';

function getLifestyleItems(): LifestyleItem[] {
  const dir = path.join(process.cwd(), 'data', 'lifestyle');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const slugs = new Set<string>();

  files.forEach(f => {
    if (f.endsWith('.en.md') || f.endsWith('.th.md')) {
      slugs.add(f.replace(/\.(en|th)\.md$/, ''));
    } else if (f.endsWith('.md')) {
      slugs.add(f.replace(/\.md$/, ''));
    }
  });

  return Array.from(slugs).map(slug => {
    const enFile = `${slug}.en.md`;
    const thFile = `${slug}.th.md`;
    const singleFile = `${slug}.md`;

    let enParsed: matter.GrayMatterFile<string> | null = null;
    let thParsed: matter.GrayMatterFile<string> | null = null;

    if (files.includes(enFile)) {
      const enRaw = fs.readFileSync(path.join(dir, enFile), 'utf-8');
      enParsed = matter(enRaw);
    }
    if (files.includes(thFile)) {
      const thRaw = fs.readFileSync(path.join(dir, thFile), 'utf-8');
      thParsed = matter(thRaw);
    }
    if (files.includes(singleFile)) {
      const singleRaw = fs.readFileSync(path.join(dir, singleFile), 'utf-8');
      const parsed = matter(singleRaw);
      if (!enParsed) enParsed = parsed;
      if (!thParsed) thParsed = parsed;
    }

    const primaryParsed = enParsed || thParsed;
    if (!primaryParsed) return null;

    const finalEnParsed = enParsed || primaryParsed;
    const finalThParsed = thParsed || primaryParsed;

    const enStats: LifestyleStat[] = (finalEnParsed.data.stats ?? []).map((s: LifestyleStat) => ({
      label: s.label,
      value: s.value,
    }));
    const thStats: LifestyleStat[] = (finalThParsed.data.stats ?? finalEnParsed.data.stats ?? []).map((s: LifestyleStat) => ({
      label: s.label,
      value: s.value,
    }));

    // Auto-discover images in /public/lifestyle/<slug>/
    const imagesDir = path.join(process.cwd(), "public", "lifestyle", slug);
    let images: string[] = [];
    if (fs.existsSync(imagesDir)) {
      images = fs.readdirSync(imagesDir)
        .filter(f => /\.(png|jpg|jpeg|gif|svg)$/.test(f))
        .map(f => `/lifestyle/${slug}/${f}`);
    } else if (finalEnParsed.data.image) {
      images = [finalEnParsed.data.image];
    }

    return {
      id: slug,
      title_en: finalEnParsed.data.title ?? slug,
      title_th: finalThParsed.data.title ?? finalEnParsed.data.title ?? slug,
      subtitle_en: finalEnParsed.data.subtitle ?? '',
      subtitle_th: finalThParsed.data.subtitle ?? finalEnParsed.data.subtitle ?? '',
      images: images,
      details_en: finalEnParsed.content.trim(),
      details_th: finalThParsed.content.trim(),
      stats_en: enStats,
      stats_th: thStats,
    };
  })
  .filter((item): item is LifestyleItem => item !== null);
}

export default function LifestylePage() {
  const items = getLifestyleItems();
  return <LifestyleClient items={items} />;
}
