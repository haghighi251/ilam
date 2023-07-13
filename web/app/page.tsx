'use client';
import { Button, Container } from '@mui/material';
import { useSession } from 'next-auth/react';

const HomePage = () => {
   //  const currentUser: Iuser = useSelector(user);
   const { data: session, status } = useSession();
   if (status === 'authenticated') {
   }
   return (
      // <main className="w-full">
      //    {/* {currentUser.user.isDriver === false && <FirstPageMap />}

      //    <p>این یک متن فارسی هستش.</p> */}
      <>
         {status === 'authenticated' ? (
            <Container>
               <h1>شما قبلا وارد شده اید</h1>
               <Button>برو به داشبورد</Button>
            </Container>
         ) : (
            <Container>
               <h1>لطفا وارد شوید</h1>
               <Button>برو به صفحه ورود</Button>
            </Container>
         )}
      </>
   );
};

export default HomePage;
