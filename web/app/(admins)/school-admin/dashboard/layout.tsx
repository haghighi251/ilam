'use client';
import { AppDispatch, RootState } from '@/services/Redux/store';
import { Iuser } from '@/utils/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const layout = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   const dispatch: AppDispatch = useDispatch();
   const currentUser: Iuser = useSelector((state: RootState) => state.user);

   // This if function checks if the user is admin or not, if not redirects it to admin login page.
   if (
      currentUser.isLoggedIn === false ||
      currentUser.user.isAdmin === false ||
      currentUser.user.isSchoolAdmin === false
   )
      router.push('/login');
   else {
      return <div className="w-full bg-slate-100 h-screen">{children}</div>;
   }
};

export default layout;
