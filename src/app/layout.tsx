import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Portfolio Resume',
  description: 'Welcome to my dynamic web resume portfolio, showcasing projects including backend API systems, frontend dashboards, and modern web platforms.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
