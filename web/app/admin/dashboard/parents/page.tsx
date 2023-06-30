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

import AddModal from '@/components/admin/dashboard/parents/AddModal';
import Row from '@/components/admin/dashboard/parents/TableRows';

const page = () => {
   const [parents, setParents] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchParents();
   }, [modalClosed]);

   async function fetchParents() {
      try {
         const response = await fetch('/api/admin/authorized/parents/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setParents(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }

   function createData(
      userUnique: string,
      parentUnique: string,
      studentUnique: string
   ) {
      return {
         userUnique,
         parentUnique,
         studentUnique,
      };
   }
   const rows = parents.map((parent) =>
      createData(parent.userUnique, parent.parentUnique, parent.studentUnique)
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <div className="w-full my-5">
         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
            <div>اولیا</div>
            <div>
               <AddModal onClose={handleModalClose} />
            </div>
         </Box>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="right">کد کاربری</TableCell>
                     <TableCell align="right">کد یکتا ولی</TableCell>
                     <TableCell align="right">کد یکتا دانش آموز</TableCell>
                     <TableCell align="right">عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <Row onClose={handleModalClose} key={row.parentUnique} row={row} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default page;
