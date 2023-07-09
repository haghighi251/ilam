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

import AddModal from '@/components/admin/dashboard/students/AddModal';
import Row from '@/components/admin/dashboard/students/TableRows';

const page = () => {
   const [students, setStudents] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchStudents();
   }, [modalClosed]);

   async function fetchStudents() {
      try {
         const response = await fetch('/api/admin/authorized/students/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setStudents(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }

   function createData(
      name: string,
      nationalCode: string,
      studentUnique: string,
      schoolUniqueId: string,
      driverUnique: string,
      parentUnique: string
   ) {
      return {
         name,
         nationalCode,
         studentUnique,
         schoolUniqueId,
         driverUnique,
         parentUnique,
      };
   }
   const rows = students.map((student) =>
      createData(
         student.name,
         student.nationalCode,
         student.studentUnique,
         student.schoolUniqueId,
         student.driverUnique,
         student.parentUnique
      )
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <div className="w-full my-5">
         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
            <div>دانش آموزان</div>
            <div>
               <AddModal onClose={handleModalClose} />
            </div>
         </Box>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="right">نام</TableCell>
                     <TableCell align="right">کد ملی</TableCell>
                     <TableCell align="right">کد یکتا</TableCell>
                     <TableCell align="right">کد مدرسه</TableCell>
                     <TableCell align="right">کد راننده</TableCell>
                     <TableCell align="right">کد اولیا</TableCell>
                     <TableCell align="right">موقعیت خانه</TableCell>
                     <TableCell align="right">اطلاعات اضافی خانه</TableCell>
                     <TableCell align="right">عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <Row
                        onClose={handleModalClose}
                        key={row.studentUnique}
                        row={row}
                     />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default page;
