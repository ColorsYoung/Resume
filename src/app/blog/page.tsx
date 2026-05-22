import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import BlogClient, { Article } from '@/components/BlogClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Read and parse all files (.en.md + .th.md pairs, or single .md files) from data/blog/
function getBlogArticles(): Article[] {
  const dir = path.join(process.cwd(), 'data', 'blog');
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

    return {
      id: slug,
      title_en: finalEnParsed.data.title ?? slug,
      title_th: finalThParsed.data.title ?? finalEnParsed.data.title ?? slug,
      tag: finalEnParsed.data.tag ?? 'General',
      date: finalEnParsed.data.date ?? '',
      excerpt_en: finalEnParsed.data.excerpt ?? '',
      excerpt_th: finalThParsed.data.excerpt ?? finalEnParsed.data.excerpt ?? '',
      content_en: marked(finalEnParsed.content) as string,
      content_th: marked(finalThParsed.content) as string,
    };
  })
  .filter((a): a is Article => a !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const articles = getBlogArticles();
  return <BlogClient articles={articles} />;
}
