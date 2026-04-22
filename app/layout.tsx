import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KinderStory - Stories for Little Readers',
  description: 'Generate fun, simple stories for kindergarteners with pictures!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
