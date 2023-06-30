'use client';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

import AddModal from '@/components/admin/dashboard/drivers/AddModal';
import Row from '@/components/admin/dashboard/drivers/TableRows';

const page = () => {
   const [drivers, setDrivers] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchDrivers();
   }, [modalClosed]);

   async function fetchDrivers() {
      try {
         const response = await fetch('/api/admin/authorized/drivers/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setDrivers(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }

   function createData(
      name: string,
      driverUnique: string,
      schoolUniqueId: string,
      score: string
   ) {
      return {
         name,
         driverUnique,
         schoolUniqueId,
         score,
      };
   }
   const rows = drivers.map((driver) =>
      createData(
         driver.name,
         driver.driverUnique,
         driver.schoolUniqueId,
         driver.score
      )
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <div className="w-full my-5">
         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
            <div>راننده ها</div>
            <div>
               <AddModal onClose={handleModalClose} />
            </div>
         </Box>
         <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
               <TableHead>
                  <TableRow>
                     <TableCell />
                     <TableCell align="right">کد راننده</TableCell>
                     <TableCell align="right">نام کاربر</TableCell>
                     <TableCell align="right">کد کاربر</TableCell>
                     <TableCell align="right">نام مدرسه</TableCell>
                     <TableCell align="right">کد مدرسه</TableCell>
                     <TableCell align="right">امتیاز</TableCell>
                     <TableCell align="right">عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <Row row={row} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default page;
