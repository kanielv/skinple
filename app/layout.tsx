import DeployButton from '@/components/deploy-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import HeaderAuth from '@/components/header-auth';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
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
      <body className='bg-[#FEFCF3] text-foreground'>
        <main>
          <nav>
            <header className='flex items-center justify-end bg-[#DBA39A] p-1 shadow-sm'>
              <div className='leftspace '>
                <b> <h5>
                  &nbsp; &nbsp; &nbsp; <Link style={{color:"black"}}
                  href='/'
                  className='text-gray-600 hover:text-gray-800'
                >
                  Skinple
                </Link>
                  </h5> </b>
              </div>
              <div className='rightspace topspace ml-auto'>
                <HeaderAuth />
              </div>
            </header>

            <div className='flex items-center justify-between bg-[#F0DBDB] p-1'>
              <div className='leftspace flex space-x-4'>
                <Link
                  href='/protected/quiz'
                  className='text-gray-600 hover:text-gray-800'
                >
                  Quiz
                </Link>
                <Link
                  href='/protected/list-maker'
                  className='text-gray-600 hover:text-gray-800'
                >
                  Listmaker
                </Link>
                <Link
                  href='/protected/recommendations'
                  className='text-gray-600 hover:text-gray-800'
                >
                  Recommended
                </Link>
              </div>
              <div className='rightspace'>
                <Link
                  href='/protected/search'
                  className='text-gray-600 hover:text-gray-800'
                >
                  Search
                </Link>
              </div>
            </div>
          </nav>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
