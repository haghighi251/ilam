'use client';
import TopMenu from '@/components/TopNav/TopMenu';
import Head from '@/components/head';
import { Providers } from '@/services/Redux/provider';
import '../public/assets/css/index.css';
// Supports weights 100-900
import '@fontsource-variable/vazirmatn';
import { ThemeProvider, createTheme } from '@mui/material';

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
            <Providers>
               <ThemeProvider theme={theme}>
                  <TopMenu />
                  {children}
               </ThemeProvider>
            </Providers>
         </body>
      </html>
   );
}
