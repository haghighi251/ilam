'use client';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

import AddModal from '@/components/admin/dashboard/users/AddModal';
import Row from '@/components/admin/dashboard/users/TableRows';

const page = () => {
   const [users, setUsers] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchUsers();
   }, [modalClosed]);

   async function fetchUsers() {
      try {
         const response = await fetch('/api/admin/authorized/users/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setUsers(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }

   function createData(
      username: string,
      mobile: string,
      email: string,
      password: string,
      nickname: string,
      picture: string,
      isAdmin: boolean,
      isDriver: boolean,
      isParent: boolean,
      isSchoolAdmin: boolean,
      isCityAdmin: boolean,
      isProvinceAdmin: boolean,
      uniqueCode: string,
      status: boolean,
      activationCode: string
   ) {
      return {
         username,
         mobile,
         email,
         password,
         nickname,
         picture,
         isAdmin,
         isDriver,
         isParent,
         isSchoolAdmin,
         isCityAdmin,
         isProvinceAdmin,
         uniqueCode,
         status,
         activationCode,
      };
   }
   const rows = users.map((user) =>
      createData(
         user.username,
         user.mobile,
         user.email,
         user.password,
         user.nickname,
         user.picture,
         user.isAdmin,
         user.isDriver,
         user.isParent,
         user.isSchoolAdmin,
         user.isCityAdmin,
         user.isProvinceAdmin,
         user.uniqueCode,
         user.status,
         user.activationCode
      )
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <div className="w-full my-5">
         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
            <div>کاربران</div>
            <div>
               <AddModal onClose={handleModalClose} />
            </div>
         </Box>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="right">کد کاربری</TableCell>
                     <TableCell align="right">موبایل</TableCell>
                     <TableCell align="right">ایمیل</TableCell>
                     <TableCell align="right">کلمه عبور</TableCell>
                     <TableCell align="right">نام و نام خانوادگی</TableCell>
                     <TableCell align="right">عکس</TableCell>
                     <TableCell align="right">ادمین؟</TableCell>
                     <TableCell align="right">راننده؟</TableCell>
                     <TableCell align="right">اولیا؟</TableCell>
                     <TableCell align="right">ادمین مدرسه؟</TableCell>
                     <TableCell align="right">ادمین شهر؟</TableCell>
                     <TableCell align="right">ادمین استان؟</TableCell>
                     <TableCell align="right">کد یکتا</TableCell>
                     <TableCell align="right">فعال؟</TableCell>
                     <TableCell align="right">کد فعالسازی</TableCell>
                     <TableCell align="right">عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <Row onClose={handleModalClose} key={row.mobile} row={row} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default page;
