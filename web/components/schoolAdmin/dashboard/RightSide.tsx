'use client';
import { AccountBalance, Newspaper } from '@mui/icons-material';
import Dashboard from '@mui/icons-material/Dashboard';
import FamilyRestroom from '@mui/icons-material/FamilyRestroom';
import LocalTaxi from '@mui/icons-material/LocalTaxi';
import School from '@mui/icons-material/School';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const RightSide = () => {
   const routerPath = usePathname();

   // Function to check if a specific route is active
   const isRouteActive = (pathname: string) => {
      return routerPath === pathname;
   };

   return (
      <div className="basis-1/4 bg-white w-full h-screen">
         <Link href={`/school-admin/dashboard/`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <Dashboard sx={{ my: 0.3 }} />
                  آمار
               </div>
            </div>
         </Link>
         <Link href={`/school-admin/dashboard/users`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/users')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <School sx={{ my: 0.3 }} />
                  یوزر ها
               </div>
            </div>
         </Link>
         <Link href={`/school-admin/dashboard/drivers`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/drivers')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <LocalTaxi sx={{ my: 0.3 }} />
                  رانندگان
               </div>
            </div>
         </Link>
         <Link href={`/school-admin/dashboard/parents`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/parents')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <FamilyRestroom sx={{ my: 0.3 }} />
                  اولیا
               </div>
            </div>
         </Link>
         <Link href={`/school-admin/dashboard/students`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/students')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <FamilyRestroom sx={{ my: 0.3 }} />
                  دانش آموزان
               </div>
            </div>
         </Link>
         <Link href={`/`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <AccountBalance sx={{ my: 0.3 }} />
                  حسابداری
               </div>
            </div>
         </Link>
         <Link href={`/school-admin/dashboard/news`}>
            <div
               className={`rightMenuLink ${
                  isRouteActive('/school-admin/dashboard/news')
                     ? 'rightMenuLinkActive'
                     : ''
               }`}
            >
               <div className="rightMenuLinkInternally">
                  <Newspaper sx={{ my: 0.3 }} />
                  اخبار
               </div>
            </div>
         </Link>
      </div>
   );
};

export default RightSide;
