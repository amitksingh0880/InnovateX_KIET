// app/layout.tsx
"use client";

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Leaderboard } from '@/components/leaderboard';
import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import SideNav from '@/components/side-nav';
import { Providers } from './provider';
import ReduxProvider from '@/context/ReduxProvider';
import { AuthProvider } from '@/context/authProvider';
import { usePathname } from 'next/navigation';
import ReduxPersister from '@/context/reduxPersister';
import bgImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/user/login' || pathname === '/user/signup';

  return (
    <html lang="en">
      <body className={`bg-white dark:bg-gray-900 text-gray-950 ${inter.className}`}>
        <ReduxProvider>
          <AuthProvider>
            <ReduxPersister>
              <Providers>
                <div>
                  {/* Render components conditionally */}
                  {!isLoginPage && (
                    <>
                      <SideNav />
                      <Header />
                      <HeaderMobile />
                    </>
                  )}
                  <main 
                    className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500`} 
                    style={{ 
                      backgroundImage: `url(${bgImage.src})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center' 
                    }}
                  >
                    {isLoginPage ? (
                      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                        {children}
                      </div>
                    ) : (
                      <MarginWidthWrapper>{children}</MarginWidthWrapper>
                    )}
                  </main>

                  {/* Render Leaderboard only on non-login pages */}
                  {!isLoginPage && (
                    <div className="hidden lg:block fixed right-0 top-0 h-full w-1/4 p-4 bg-gray-200 dark:bg-gray-800 z-10">
                      <Leaderboard />
                    </div>
                  )}
                </div>
              </Providers>
            </ReduxPersister>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
