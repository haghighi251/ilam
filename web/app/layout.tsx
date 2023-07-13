'use client';
import Head from '@/components/head';
import '../public/assets/css/index.css';
// Supports weights 100-900
import '@fontsource-variable/vazirmatn';
import { ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

// export const metadata = {
//   title: "آسان انجام",
//   description: "پلتفرم خرید و فروش رایگان کالا و خدمات",
// };

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const theme = createTheme({
      typography: {
         fontFamily: ['Vazirmatn Variable'].join(','),
      },
   });
   return (
      <html dir="rtl" lang="fa">
         <Head />
         <body>
            {/* <Providers>
               <ThemeProvider theme={theme}>
                  <TopMenu />
                  {children}
               </ThemeProvider>
            </Providers> */}
            <SessionProvider>
               <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </SessionProvider>
         </body>
      </html>
   );
}
