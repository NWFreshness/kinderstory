import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KinderStory — Tales for Little Readers',
  description: 'Generate warm, wonderful stories for kindergarteners with beautiful illustrations.',
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
