import Head from '@/components/head';
import '../public/assets/css/index.css';
import TopMenu from '@/components/TopNav/TopMenu';
import { Providers } from '@/services/Redux/provider';
// Supports weights 100-900
import '@fontsource-variable/vazirmatn';

// export const metadata = {
//   title: "آسان انجام",
//   description: "پلتفرم خرید و فروش رایگان کالا و خدمات",
// };

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html dir="rtl" lang="fa">
         <Head />
         <body>
            <Providers>
               <TopMenu />
               {children}
            </Providers>
         </body>
      </html>
   );
}
