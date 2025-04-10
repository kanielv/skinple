import DeployButton from '@/components/deploy-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import HeaderAuth from '@/components/header-auth';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';
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
      <body className='bg-background text-foreground'>
        <main>
          <nav>
            <header className="flex justify-end items-center p-1 bg-white shadow-sm">
              <div className="ml-auto">
                <HeaderAuth />
              </div>
            </header>

            <div className="flex justify-between items-center p-1 bg-gray-50">
              <div className="flex space-x-4">
                <Link href="/protected/quiz" className="text-gray-600 hover:text-gray-800">
                  Quiz
                </Link>
                <Link href="/protected/list-maker" className="text-gray-600 hover:text-gray-800">
                  Listmaker
                </Link>
              </div>

              <div>
                <Link href="/protected/search" className="text-gray-600 hover:text-gray-800">
                  Search
                </Link>
              </div>
            </div>
          </nav>
          <div>
            {children}
          </div>

        </main>
      </body>
    </html>
  );
}
