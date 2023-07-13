'use client';
import LeftSide from '@/components/schoolAdmin/dashboard/LeftSide';
import { setSchoolAdmin } from '@/services/Redux/schoolAdminReducer';
import { AppDispatch, RootState } from '@/services/Redux/store';
import { ISchoolAdminSchema, Iuser } from '@/utils/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
   const dispatch: AppDispatch = useDispatch();
   const currentUser: Iuser = useSelector((state: RootState) => state.user);
   const schoolAdminState: ISchoolAdminSchema = useSelector(
      (state: RootState) => state.schoolAdmin
   );
   const getSchoolUniqueId = async () => {
      try {
         const response = await fetch(
            `/api/admin/authorized/school-admins/read/by-unique-code/${currentUser.user.uniqueCode}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         if (response.ok) {
            dispatch(
               setSchoolAdmin({
                  schoolAdminUnique: currentUser.user.uniqueCode,
                  schoolUniqueId: data.data.schoolUniqueId,
               })
            );
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      getSchoolUniqueId();
   }, []);
   return <LeftSide />;
};

export default page;
