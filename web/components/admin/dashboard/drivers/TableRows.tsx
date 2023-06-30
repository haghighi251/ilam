import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';

import DeleteModal from './DeleteModal';
import AddDocumentModal from './driverDocuments/AddModal';
import DeleteDocModal from './driverDocuments/DeleteModal';
import UpdateDocModal from './driverDocuments/UpdateModal';
import UpdateModal from './UpdateModal';

const Row = (props) => {
   const { row } = props;
   const [open, setOpen] = useState(false);
   const [modalClosed, setModalClosed] = useState(false);

   const [driverDocuments, setDriverDocuments] = useState([]);
   const [driverStudents, setDriverStudents] = useState([]);
   const [schoolName, setSchoolName] = useState('');
   const [name, setName] = useState('');

   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchDriverStudents();
      fetchDriverDocuments();
      fetchSchool();
      fetchName();
   }, [modalClosed]);
   // Create the data for the documents table.
   async function fetchDriverDocuments() {
      try {
         const response = await fetch(
            `/api/admin/authorized/drivers/documents/read/${row.driverUnique}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         if (response.ok) {
            setDriverDocuments(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   function createDocumentData(
      driverDocumentUnique: string,
      driverUnique: string,
      documentName: string,
      file: string
   ) {
      return {
         driverDocumentUnique,
         driverUnique,
         documentName,
         file,
      };
   }
   const documentsRows = driverDocuments.map((item) =>
      createDocumentData(
         item.driverDocumentUnique,
         item.driverUnique,
         item.documentName,
         item.file
      )
   );
   // Create the data for the students table.
   async function fetchDriverStudents() {
      try {
         const response = await fetch(
            `/api/admin/authorized/students/filter/driver/${row.driverUniqueId}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         if (response.ok) {
            setDriverStudents(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   function createStudentsData(
      name: string,
      nationalCode: string,
      studentUnique: string
   ) {
      return {
         name,
         nationalCode,
         studentUnique,
      };
   }
   const studentsRows = driverStudents.map((item) =>
      createStudentsData(item.name, item.nationalCode, item.studentUnique)
   );

   // To fetch school name based on it ID
   async function fetchSchool() {
      try {
         const response = await fetch(
            `/api/admin/authorized/schools/read/${row.schoolUniqueId}`,
            {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
            }
         );
         const responseData = await response.json();
         if (response.ok) {
            setSchoolName(responseData.data.name);
         } else {
            console.error(responseData.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   // To fetch driver name based on user ID.
   async function fetchName() {
      try {
         const response = await fetch(
            `/api/admin/authorized/users/read/${row.userUniqueCode}`,
            {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
            }
         );
         const responseData = await response.json();
         if (response.ok) {
            setName(responseData.data.nickname);
         } else {
            console.error(responseData.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   function handleModalClose() {
      setModalClosed(true);
   }
   return (
      <React.Fragment>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                     setOpen(!open);
                  }}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell align="right">{row.driverUniqueId}</TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{row.userUniqueCode}</TableCell>
            <TableCell align="right">{schoolName}</TableCell>
            <TableCell align="right">{row.schoolUniqueId}</TableCell>
            <TableCell align="right">{row.score}</TableCell>
            <TableCell align="right">
               <Box sx={{ display: 'flex', justifyContent: '' }}>
                  <UpdateModal
                     onClose={handleModalClose}
                     driverUniqueId={row.driverUniqueId}
                     score={row.score}
                  />
                  <DeleteModal
                     onClose={handleModalClose}
                     name={name}
                     driverUniqueId={row.driverUniqueId}
                  />
               </Box>
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           my: 3,
                        }}
                     >
                        <div>مدارک</div>
                        <div>
                           <AddDocumentModal
                              onClose={handleModalClose}
                              driverUniqueId={row.driverUniqueId}
                           />
                        </div>
                     </Box>
                     <Table size="small" aria-label="purchases">
                        <TableHead>
                           <TableRow>
                              <TableCell align="right">کد شناسایی</TableCell>
                              <TableCell align="right">نام مدرک</TableCell>
                              <TableCell align="right">فایل مدرک</TableCell>
                              <TableCell align="right">عملیات</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {documentsRows.map((item) => (
                              <TableRow key={item.driverDocumentUnique}>
                                 <TableCell align="right">
                                    {item.driverDocumentUnique}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.documentName}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.file}
                                 </TableCell>
                                 <Box
                                    sx={{ display: 'flex', justifyContent: '' }}
                                 >
                                    <UpdateDocModal
                                       onClose={handleModalClose}
                                       driverDocumentUnique={
                                          item.driverDocumentUnique
                                       }
                                       documentName={item.documentName}
                                       file={item.file}
                                    />
                                    <DeleteDocModal
                                       onClose={handleModalClose}
                                       driverDocumentUnique={
                                          item.driverDocumentUnique
                                       }
                                       documentName={item.documentName}
                                    />
                                 </Box>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </Box>
                  <Box sx={{ margin: 1 }}>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           my: 3,
                        }}
                     >
                        <div>دانش آموزان</div>
                     </Box>
                     <Table size="small" aria-label="purchases">
                        <TableHead>
                           <TableRow>
                              <TableCell align="right">نام دانش آموز</TableCell>
                              <TableCell align="right">کد ملی</TableCell>
                              <TableCell align="right">کد یکتا</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {studentsRows.map((item) => (
                              <TableRow key={item.nationalCode}>
                                 <TableCell align="right">
                                    {item.name}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.nationalCode}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.studentUnique}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
};

export default Row;
