'use client';
import { AppDispatch, RootState } from '@/services/Redux/store';
import { actionLogin } from '@/services/Redux/userReducer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/components/loading';
import { setSchoolAdmin } from '@/services/Redux/schoolAdminReducer';
import { ISchoolAdminSchema, Iuser } from '@/utils/types';
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
   const [userData, setUserData] = useState(null);
   const router = useRouter();
   const dispatch: AppDispatch = useDispatch();
   // const currentUser: Iuser = useSelector(user);
   const currentUser: Iuser = useSelector((state: RootState) => state.user);
   const schoolAdminState: ISchoolAdminSchema = useSelector(
      (state: RootState) => state.schoolAdmin
   );

   const getUserData = async () => {
      try {
         const response = await fetch(
            `/api/admin/check-admin/${currentUser.user.user_id}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         if (response.ok) {
            setUserData(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleRouter = async () => {
      if (userData) {
         if (userData.isAdmin === true) {
            router.push('/main-admin/dashboard');
         } else if (userData.isSchoolAdmin === true) {
            router.push('/school-admin/dashboard');
         }
      }
   };

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
                        status: res.data.status,
                        user_id: res.data.user_id,
                        usernameOrEmail: usernameOrEmail,
                        mobile: res.data.mobile,
                        uniqueCode: res.data.uniqueCode,
                     },
                     isLoggedIn: true,
                  })
               );
               setUserData(res.data);
            } else {
               setError(res.error);
               setIsLoading(false);
            }
         } else {
            setError(errorMsg);
            setIsLoading(false);
         }
      } catch (e) {
         setError(e.message);
         setIsLoading(false);
      }
   };
   useEffect(() => {
      if (currentUser.isLoggedIn === true) {
         getUserData();
      }
   });

   useEffect(() => {
      handleRouter();
   }, [userData]);
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