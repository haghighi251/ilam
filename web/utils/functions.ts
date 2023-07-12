import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/services/Redux/store';
import { user } from '@/services/Redux/userReducer';
import { Iuser } from '@/utils/types';

export async function RedirectWhoAreNotAdmin() {
   const router = useRouter();
   const dispatch: AppDispatch = useDispatch();
   const currentUser: Iuser = useSelector(user);

   if (currentUser.isLoggedIn === false || currentUser.user.isAdmin === false)
      router.push('/admin/login');
}

export async function convertToEnglishNumber(persianNumber: string) {
   const persianToEnglishMap = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
   };

   return persianNumber.replace(
      /[۰-۹]/g,
      (match: string | number) => persianToEnglishMap[match]
   );
}
