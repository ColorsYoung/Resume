import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://chanchai-portfolio.vercel.app'),
  title: 'Chanchai Chakam | Software Engineer',
  description: 'Full Stack Software Engineer resume portfolio showcasing Multi-Cloud architectures, real-time backend systems, local AI integration, and responsive web platforms.',
  openGraph: {
    title: 'Chanchai Chakam | Software Engineer Portfolio',
    description: 'Full Stack Software Engineer resume portfolio showcasing Multi-Cloud architectures, real-time backend systems, local AI integration, and responsive web platforms.',
    url: 'https://chanchai-portfolio.vercel.app',
    siteName: 'Chanchai Chakam Resume',
    images: [
      {
        url: '/ProfileNoom.jpeg',
        width: 512,
        height: 512,
        alt: 'Chanchai Chakam Avatar',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Chanchai Chakam | Software Engineer Portfolio',
    description: 'Full Stack Software Engineer resume portfolio showcasing Multi-Cloud architectures, real-time backend systems, local AI integration, and responsive web platforms.',
    images: ['/ProfileNoom.jpeg'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Chanchai Chakam",
  "jobTitle": "Software Engineer | Full Stack",
  "url": "https://chanchai-portfolio.vercel.app",
  "sameAs": [
    "https://github.com/ColorsYoung",
    "https://www.linkedin.com/in/chanchai-chakam"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Rajamangala University of Technology Isan"
  },
  "knowsAbout": [
    "Software Engineering",
    "Full Stack Development",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "AWS",
    "Azure",
    "Prisma ORM",
    "MSSQL",
    "Local LLM",
    "Ollama"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#bb86fc" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/ProfileNoom.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
