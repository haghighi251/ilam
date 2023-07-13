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

import AddModal from '@/components/schoolAdmin/dashboard/drivers/AddModal';
import Row from '@/components/schoolAdmin/dashboard/drivers/TableRows';
import { RootState } from '@/services/Redux/store';
import { ISchoolAdminSchema, Iuser } from '@/utils/types';
import { useSelector } from 'react-redux';

const page: React.FC = () => {
   const [drivers, setDrivers] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   const [schoolUniqueId, setSchoolUniqueId] = useState('');
   // const currentUser = useSelector(user);
   const currentUser: Iuser = useSelector((state: RootState) => state.user);
   const schoolAdminState: ISchoolAdminSchema = useSelector(
      (state: RootState) => state.schoolAdmin
   );

   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   const getSchoolUniqueId = async () => {
      try {
         const response = await fetch(
            `/api/admin/authorized/school-admins/read/by-unique-code/${currentUser.user.uniqueCode}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         if (response.ok) {
            console.log(data.data.schoolUniqueId);
            setSchoolUniqueId(data.data.schoolUniqueId);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   };
   const fetchDrivers = async () => {
      try {
         const response = await fetch(
            `/api/admin/authorized/drivers/filter/${schoolUniqueId}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         if (response.ok) {
            setDrivers(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   function createData(
      name: string,
      driverUniqueId: string,
      schoolUniqueId: string,
      score: string
   ) {
      return {
         name,
         driverUniqueId,
         schoolUniqueId,
         score,
      };
   }
   const rows = drivers.map((driver) =>
      createData(
         driver.name,
         driver.driverUniqueId,
         driver.schoolUniqueId,
         driver.score
      )
   );
   function handleModalClose() {
      setModalClosed(true);
   }
   useEffect(() => {
      if (schoolUniqueId !== '') {
         fetchDrivers();
      }
   }, [modalClosed, schoolUniqueId]);
   useEffect(() => {
      getSchoolUniqueId();
   }, []);
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
                     <Row
                        onClose={handleModalClose}
                        key={row.driverUniqueId}
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
