import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Leaderboard } from '@/components/leaderboard';
import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import PageWrapper from '@/components/page-wrapper';
import SideNav from '@/components/side-nav';
import { Providers } from './provider';
import { UserProvider } from '@/context/userContext';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Side Nav w/ Sub Menu',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-gray-900 text-gray-950 ${inter.className}`}>
        <UserProvider>
        <Providers>
          <div className=''>
            <SideNav />
                <Header />
                <HeaderMobile />
            <main>
              <MarginWidthWrapper>
                {children}
              </MarginWidthWrapper>
            </main>
             <div className=" md:w-60 fixed right-0 top-0 h-full p-4 bg-gray-200 dark:bg-gray-800 -z-10">
                  <Leaderboard  />
              </div>
          </div>
        </Providers>
        </UserProvider>
      </body>
    </html>
  );
}