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
import AddModal from './driverDocuments/AddModal';
import DeleteDocModal from './driverDocuments/DeleteModal';
import UpdateDocModal from './driverDocuments/UpdateModal';
import UpdateModal from './UpdateModal';

const Row = (props) => {
   const { row } = props;
   const [open, setOpen] = useState(false);

   const [driverDocuments, setDriverDocuments] = useState([]);
   const [modalClosed, setModalClosed] = useState(false);
   const [schoolName, setSchoolName] = useState('');
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchDriverDocuments();
      fetchSchool();
   }, [modalClosed]);

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

   function createData(
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
   const coordinatesRows = driverDocuments.map((item) =>
      createData(
         item.driverDocumentUnique,
         item.driverUnique,
         item.documentName,
         item.file
      )
   );

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
            setSchoolName(responseData.data);
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
            <TableCell align="right" component="th" scope="row">
               {row.cityName}
            </TableCell>
            <TableCell align="right">{row.cityUnique}</TableCell>
            <TableCell align="right">{provinceName}</TableCell>
            <TableCell align="right">{row.provinceUnique}</TableCell>
            <TableCell align="right">{row.speedMin}</TableCell>
            <TableCell align="right">{row.speedMax}</TableCell>
            <TableCell align="right">
               <Box sx={{ display: 'flex', justifyContent: '' }}>
                  <UpdateModal
                     onClose={handleModalClose}
                     cityName={row.cityName}
                     cityUnique={row.cityUnique}
                     provinceUnique={row.provinceUnique}
                     speedMin={row.speedMin}
                     speedMax={row.speedMax}
                  />
                  <DeleteModal
                     onClose={handleModalClose}
                     cityName={row.cityName}
                     cityUnique={row.cityUnique}
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
                        <div>مختصات</div>
                        <div>
                           <AddModal
                              onClose={handleModalClose}
                              cityUnique={row.cityUnique}
                           />
                        </div>
                     </Box>
                     <Table size="small" aria-label="purchases">
                        <TableHead>
                           <TableRow>
                              <TableCell align="right">شناسه مختصات</TableCell>
                              <TableCell align="right">شناسه شهر</TableCell>
                              <TableCell align="right">
                                 عرض جغرافیایی(lat)
                              </TableCell>
                              <TableCell align="right">
                                 طول جغرافیایی(lon)
                              </TableCell>
                              <TableCell align="right">شماره ستون</TableCell>
                              <TableCell align="right">عملیات</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {coordinatesRows.map((item) => (
                              <TableRow key={item.cityUnique}>
                                 <TableCell align="right">
                                    {item.cityCoordinateUnique}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.cityUnique}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.latitude}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.longitude}
                                 </TableCell>
                                 <TableCell align="right">
                                    {item.rowNumber}
                                 </TableCell>
                                 <Box
                                    sx={{ display: 'flex', justifyContent: '' }}
                                 >
                                    <UpdateDocModal
                                       onClose={handleModalClose}
                                       cityCoordinateUnique={
                                          item.cityCoordinateUnique
                                       }
                                       latitude={item.latitude}
                                       longitude={item.longitude}
                                       rowNumber={item.rowNumber}
                                    />
                                    <DeleteDocModal
                                       onClose={handleModalClose}
                                       cityCoordinateUnique={
                                          item.cityCoordinateUnique
                                       }
                                    />
                                 </Box>
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
