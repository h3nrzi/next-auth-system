import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const iranSans = localFont({ src: '../../public/iranSans.ttf' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="rtl">
      <body className={iranSans.className}>{children}</body>
    </html>
  );
}
