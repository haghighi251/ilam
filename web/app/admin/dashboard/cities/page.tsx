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

import AddModal from '@/components/admin/dashboard/cities/AddModal';
import Row from '@/components/admin/dashboard/cities/TableRows';

const page = () => {
   const [cities, setCities] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchCities();
   }, [modalClosed]);

   async function fetchCities() {
      try {
         const response = await fetch('/api/admin/authorized/cities/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setCities(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }

   function createData(
      cityName: string,
      cityUnique: string,
      provinceUnique: string,
      speedMin: string,
      speedMax: string
   ) {
      return {
         cityName,
         cityUnique,
         provinceUnique,
         speedMin,
         speedMax,
      };
   }
   const rows = cities.map((city) =>
      createData(
         city.cityName,
         city.cityUnique,
         city.provinceUnique,
         city.speedMin,
         city.speedMax
      )
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <div className="w-full my-5">
         <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
            <div>شهر ها</div>
            <div>
               <AddModal onClose={handleModalClose} />
            </div>
         </Box>
         <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
               <TableHead>
                  <TableRow>
                     <TableCell />
                     <TableCell align="right">نام شهر</TableCell>
                     <TableCell align="right">کد شناسایی</TableCell>
                     <TableCell align="right">نام استان</TableCell>
                     <TableCell align="right">کد استان</TableCell>
                     <TableCell align="right">حداقل سرعت مجاز</TableCell>
                     <TableCell align="right">حداکثر سرعت مجاز</TableCell>
                     <TableCell align="right">عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <Row onClose={handleModalClose} key={row.cityUnique} row={row} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default page;
