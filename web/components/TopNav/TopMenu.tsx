'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/services/Redux/store';
import { actionLogout, user } from '@/services/Redux/userReducer';
import { Iuser } from '@/utils/types';

const TopMenu = () => {
   const currentUser: Iuser = useSelector(user);
   const dispatch: AppDispatch = useDispatch();

   const logOut = async () => {
      await dispatch(actionLogout());
   };

   return (
      <div className="flex mx-auto flex-col md:flex-row p-3 md:p-5 bg-sky-300 gap-2">
         <Link href="/">شروع</Link>
         {currentUser.isLoggedIn === false && (
            <>
               <Link href="/Login">ورود</Link>
            </>
         )}
         {currentUser.isLoggedIn === true && (
            <>
               {(currentUser.user.isDriver === false) !== false && (
                  <>
                     <Link href="#" onClick={logOut}>
                        خروج
                     </Link>
                  </>
               )}
               {(currentUser.user.isDriver === true) === true && (
                  <>
                     <Link href="#" onClick={logOut}>
                        خروج راننده
                     </Link>
                  </>
               )}
            </>
         )}
      </div>
   );
};

export default TopMenu;
