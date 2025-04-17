import { Geist } from 'next/font/google';
import NavBar from '@/components/nav-bar';
import './globals.css';
import './../style.css';
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'skinple',
  description: 'simple way to create customized skin routines',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-[#fffafa] text-foreground'>
        <main>
          <NavBar />
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
