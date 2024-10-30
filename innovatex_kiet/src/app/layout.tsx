// // // app/layout.tsx
// // "use client";

// // import '../styles/globals.css';
// // import { Inter } from 'next/font/google';
// // import { Leaderboard } from '@/components/leaderboard';
// // import Header from '@/components/header';
// // import HeaderMobile from '@/components/header-mobile';
// // import MarginWidthWrapper from '@/components/margin-width-wrapper';
// // import SideNav from '@/components/side-nav';
// // import { Providers } from './provider';
// // import ReduxProvider from '@/context/ReduxProvider';
// // import { AuthProvider } from '@/context/authProvider';
// // import { usePathname, useRouter } from 'next/navigation';
// // import ReduxPersister from '@/context/reduxPersister';
// // import bgImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg'
// // import { Router } from 'next/router';
// // import LandingPage from './user/landingPage/page';

// // const inter = Inter({ subsets: ['latin'] });

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const isLoginPage = pathname === '/user/login' || pathname === '/user/signup';



// //   return (
// //     <html lang="en">
// //       <body className={`bg-white dark:bg-gray-900 text-gray-950 ${inter.className}`}>
// //         <ReduxProvider>
// //           <AuthProvider>
// //             <ReduxPersister>
// //               <Providers>
// //                 <div>
// //                   {/* Render components conditionally */}
// //                   {!isLoginPage && (
// //                     <>
// //                        {/* <LandingPage/> */}
// //                       {/* <SideNav /> */}
// //                       {/* <Header /> */}
// //                       {/* <HeaderMobile /> */}
// //                     </>
// //                   )}
// //                   <main 
// //                     // className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500`} 
// //                     // style={{ 
// //                     //   backgroundImage: `url(${bgImage.src})`, 
// //                     //   backgroundSize: 'cover', 
// //                     //   backgroundPosition: 'center' 
// //                     // }}
// //                   >
// //                     {isLoginPage ? (
// //                       <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
// //                         {children}
// //                       </div>
// //                     ) : (
// //                       <MarginWidthWrapper>{children}</MarginWidthWrapper>
// //                     )}
// //                   </main>

// //                   {/* Render Leaderboard only on non-login pages */}
// //                   {!isLoginPage && (
// //                     <div className="hidden lg:block fixed right-0 top-0 h-full w-1/4 p-4 bg-gray-200 dark:bg-gray-800 z-10">
// //                       <Leaderboard />
// //                     </div>
// //                   )}
// //                 </div>
// //               </Providers>
// //             </ReduxPersister>
// //           </AuthProvider>
// //         </ReduxProvider>
// //       </body>
// //     </html>
// //   );
// // }
// // app/layout.tsx
// "use client";

// import '../styles/globals.css';
// import { Inter } from 'next/font/google';
// import { Leaderboard } from '@/components/leaderboard';
// import Header from '@/components/header';
// import HeaderMobile from '@/components/header-mobile';
// import MarginWidthWrapper from '@/components/margin-width-wrapper';
// import SideNav from '@/components/side-nav';
// import { Providers } from './provider';
// import ReduxProvider from '@/context/ReduxProvider';
// import { AuthProvider, useAuth } from '@/context/authProvider';
// import { usePathname } from 'next/navigation';
// import ReduxPersister from '@/context/reduxPersister';
// import bgImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg';
// import LandingPage from './user/landingPage/page';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const isLoginPage = pathname === '/user/login' || pathname === '/user/signup';

//   // Access the authentication status
//   const { isAuthenticated } = useAuth();

//   return (
//     <html lang="en">
//       <body className={`bg-white dark:bg-gray-900 text-gray-950 ${inter.className}`}>
//         <ReduxProvider>
//           <AuthProvider>
//             <ReduxPersister>
//               <Providers>
//                 <div>
//                   {/* Conditionally render components based on route */}
//                   {!isAuthenticated && !isLoginPage ? (
//                     <LandingPage/>
//                   ) : (
//                     <>
//                       {!isLoginPage && (
//                         <>
//                           <SideNav />
//                           <Header />
//                           <HeaderMobile />
//                         </>
//                       )}
//                       <main
//                         className={`flex justify-center items-center ${
//                           isLoginPage ? 'min-h-screen' : 'h-full'
//                         }`}
//                         style={{
//                           backgroundImage: !isAuthenticated || isLoginPage ? 'none' : `url(${bgImage.src})`,
//                           backgroundSize: 'cover',
//                           backgroundPosition: 'center',
//                         }}
//                       >
//                         {isLoginPage ? (
//                           <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
//                             {children}
//                           </div>
//                         ) : (
//                           <MarginWidthWrapper>{children}</MarginWidthWrapper>
//                         )}
//                       </main>
//                     </>
//                   )}

//                   {/* Render Leaderboard for authenticated users only on non-login pages */}
//                   {isAuthenticated && !isLoginPage && (
//                     <div className="hidden lg:block fixed right-0 top-0 h-full w-1/4 p-4 bg-gray-200 dark:bg-gray-800 z-10">
//                       <Leaderboard />
//                     </div>
//                   )}
//                 </div>
//               </Providers>
//             </ReduxPersister>
//           </AuthProvider>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }

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
import { AuthProvider, useAuth } from '@/context/authProvider';
import { usePathname } from 'next/navigation';
import ReduxPersister from '@/context/reduxPersister';
import bgImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg';
import LandingPage from './landingPage/page';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/user/login' || pathname === '/user/signup';

  return (
    <html lang="en">
      <body className={`bg-white dark:bg-gray-900 text-gray-950 ${inter.className}`}>
        <ReduxProvider>
          <AuthProvider> {/* Provide Auth context to the whole layout */}
            <ReduxPersister>
              <Providers>
                <AuthContentWrapper isLoginPage={isLoginPage} children={children} />
              </Providers>
            </ReduxPersister>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

// Separate component for authenticated content handling
function AuthContentWrapper({ isLoginPage, children }: { isLoginPage: boolean; children: React.ReactNode }) {
  const { isAuthenticated } = useAuth(); // This will now be used correctly within AuthProvider

  return (
    <div>
      {/* Conditionally render components based on route */}
      {!isAuthenticated && !isLoginPage ? (
        <LandingPage />
      ) : (
        <>
          {!isLoginPage && (
            <>
              <SideNav />
              <Header />
              <HeaderMobile />
            </>
          )}
          <main
            className={`flex justify-center items-center ${isLoginPage ? 'min-h-screen' : 'h-full'}`}
            style={{
              backgroundImage: !isAuthenticated || isLoginPage ? `url(${bgImage.src})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
        </>
      )}

      {/* Render Leaderboard for authenticated users only on non-login pages */}
      {isAuthenticated && !isLoginPage && (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-1/4 p-4 bg-gray-200 dark:bg-gray-800 z-10">
          <Leaderboard />
        </div>
      )}
    </div>
  );
}

