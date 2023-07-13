'use client';
import { AppDispatch } from '@/services/Redux/store';
import { actionLogin, user } from '@/services/Redux/userReducer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/components/loading';
import { Iuser } from '@/utils/types';
import { isValidPassword } from '@/utils/validation';

async function DoAdminLogin(usernameOrEmail: string, password: string) {
   const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         usernameOrEmail: usernameOrEmail,
         password: password,
      }),
   });
   if (!res.ok) {
      throw new Error('خطا در ارتباط با سرور.');
   }

   return res.json();
}

const AdminLogin = () => {
   const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const router = useRouter();
   const dispatch: AppDispatch = useDispatch();
   const currentUser: Iuser = useSelector(user);
   if (currentUser.isLoggedIn !== false)
      currentUser.user.isAdmin
         ? router.push('/admin/dashboard')
         : router.push('/');

   const handleSubmit = async () => {
      let errorMsg = '';
      try {
         if (
            usernameOrEmail === null ||
            usernameOrEmail === undefined ||
            password === null ||
            password === undefined
         ) {
            errorMsg += 'لطفا شماره همراه خود را وارد نمایید.\n';
         }

         if (!isValidPassword(password)) {
            errorMsg += 'رمز عبور صحیح نیست.\n';
         }

         if (errorMsg === '') {
            // Handling the submit event of the registration of the form
            setIsLoading(true);
            setError(null);
            const res: any = await DoAdminLogin(usernameOrEmail, password);
            if (res.success) {
               dispatch(
                  actionLogin({
                     user: {
                        user_id: res.data.user_id,
                        usernameOrEmail: usernameOrEmail,
                        isAdmin: true,
                        isDriver: false,
                     },
                     isLoggedIn: true,
                  })
               );
               router.push('/admin/dashboard');
            } else {
               setError(res.error);
               setIsLoading(false);
            }
         } else {
            setError(errorMsg);
            setIsLoading(false);
         }
      } catch (e) {
         setError('متاسفانه یک خطا رخ داده است. لطفا لحظاتی دیگر تلاش نمایید.');
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col mx-auto max-w-screen-sm justify-center items-center mt-3 md:mt-5 ">
         <div className="flex flex-col items-center border border-slate-400 shadow-md py-3 md:py-6 px-3 md:px-6 rounded-md m-5">
            <Alert severity="success">ورود به پنل مدیریت</Alert>
            <Box
               sx={{ display: 'flex', alignItems: 'flex-end' }}
               className="mb-4"
            >
               <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
               <TextField
                  id="input-with-sx"
                  label="ایمیل و یا نام کاربری"
                  variant="standard"
                  value={usernameOrEmail}
                  name="usernameOrEmail"
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
               />
            </Box>
            <Box
               sx={{ display: 'flex', alignItems: 'flex-end' }}
               className="mb-4"
            >
               <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
               <TextField
                  id="input-with-sx"
                  label="رمز عبور"
                  variant="standard"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </Box>
            {error && (
               <Alert severity="error" className="mb-3 md:mb-6">
                  {error}
               </Alert>
            )}
            {!isLoading && (
               <Button variant="contained" type="submit" onClick={handleSubmit}>
                  ورود
               </Button>
            )}
            {isLoading && <Loading />}
         </div>
      </div>
   );
};

export default AdminLogin;
