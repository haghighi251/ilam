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

import AddModal from '@/components/admin/dashboard/schools/AddModal';
import Row from '@/components/admin/dashboard/schools/TableRows';

const page = () => {
   const [schools, setSchools] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchSchools();
   }, [modalClosed]);

   async function fetchSchools() {
      try {
         const response = await fetch('/api/admin/authorized/schools/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setSchools(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }

   function createData(
      name: string,
      schoolUniqueId: string,
      latitude: string,
      longitude: string,
      cityUnique: string
   ) {
      return { name, schoolUniqueId, latitude, longitude, cityUnique };
   }
   const rows = schools.map((school) =>
      createData(
         school.name,
         school.schoolUniqueId,
         school.latitude,
         school.longitude,
         school.cityUnique
      )
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <div className="w-full my-5">
         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
            <div>مدرسه ها</div>
            <div>
               <AddModal onClose={handleModalClose} />
            </div>
         </Box>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="right">نام مدرسه</TableCell>
                     <TableCell align="right">کد یکتا</TableCell>
                     <TableCell align="right">عرض جغرافیایی (lat)</TableCell>
                     <TableCell align="right">طول جغرافیایی (lon)</TableCell>
                     <TableCell align="right">شهر</TableCell>
                     <TableCell align="right">کد شناسایی شهر</TableCell>
                     <TableCell align="right">عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <Row key={row.schoolUniqueId} row={row} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default page;
