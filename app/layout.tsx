import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Our Love Story',
  description: 'View your shared love story — powered by Life With You',
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
