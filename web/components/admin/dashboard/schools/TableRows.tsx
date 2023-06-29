import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';

import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const Row = (props) => {
   const { row } = props;
   const [open, setOpen] = useState(false);

   const [modalClosed, setModalClosed] = useState(false);
   const [cityName, setCityName] = useState('');
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   useEffect(() => {
      fetchCity();
   }, [modalClosed]);

   async function fetchCity() {
      try {
         const response = await fetch(
            `/api/admin/authorized/cities/read/${row.cityUnique}`,
            {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
            }
         );
         const responseData = await response.json();
         if (response.ok) {
            setCityName(responseData.data.cityName);
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
         <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
            <TableCell align="right" component="th" scope="row">
               {row.name}
            </TableCell>
            <TableCell align="right">{row.schoolUniqueId}</TableCell>
            <TableCell align="right">{row.latitude}</TableCell>
            <TableCell align="right">{row.longitude}</TableCell>
            <TableCell align="right">{cityName}</TableCell>
            <TableCell align="right">{row.cityUnique}</TableCell>
            <TableCell align="right">
               <Box sx={{ display: 'flex', justifyContent: '' }}>
                  <UpdateModal
                     onClose={handleModalClose}
                     name={row.name}
                     latitude={row.latitude}
                     longitude={row.longitude}
                     schoolUniqueId={row.schoolUniqueId}
                  />
                  <DeleteModal
                     onClose={handleModalClose}
                     name={row.name}
                     schoolUniqueId={row.schoolUniqueId}
                  />
               </Box>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
};

export default Row;
