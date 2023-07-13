'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/services/Redux/store';
import { actionLogout } from '@/services/Redux/userReducer';
import { ISchoolAdminSchema, Iuser } from '@/utils/types';
import { Button } from '@mui/material';

const TopMenu = () => {
   const currentUser: Iuser = useSelector((state: RootState) => state.user);
   const schoolAdminState: ISchoolAdminSchema = useSelector(
      (state: RootState) => state.schoolAdmin
   );
   const dispatch: AppDispatch = useDispatch();

   const logOut = async () => {
      await dispatch(actionLogout());
   };

   return (
      <div className="flex mx-auto flex-col md:flex-row p-3 md:p-5 bg-sky-300 gap-2">
         {currentUser.isLoggedIn === false && (
            <>
               <Link href="/Login">ورود</Link>
            </>
         )}
         {currentUser.isLoggedIn === true && (
            <>
               <Button onClick={logOut}>خروج</Button>
            </>
         )}
      </div>
   );
};

export default TopMenu;
