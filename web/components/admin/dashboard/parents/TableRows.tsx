import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';

import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const Row = (props) => {
   const { onClose, row } = props;
   const [open, setOpen] = useState(false);

   const [modalClosed, setModalClosed] = useState(false);
   // const [cityName, setCityName] = useState('');
   // To fetch the data and display it after the modal has been closed and the data has been deleted.
   // useEffect(() => {
   //    fetchCity();
   // }, [modalClosed]);

   // async function fetchCity() {
   //    try {
   //       const response = await fetch(
   //          `/api/admin/authorized/cities/read/${row.cityUnique}`,
   //          {
   //             method: 'GET',
   //             headers: { 'Content-Type': 'application/json' },
   //          }
   //       );
   //       const responseData = await response.json();
   //       if (response.ok) {
   //          setCityName(responseData.data.cityName);
   //       } else {
   //          console.error(responseData.error);
   //       }
   //    } catch (error) {
   //       console.error(error);
   //    }
   // }

   function handleModalClose() {
      setModalClosed(true);
      onClose();
   }
   return (
      <React.Fragment>
         <TableRow
            key={row.parentUnique}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
            <TableCell align="right" component="th" scope="row">
               {row.userUnique}
            </TableCell>
            <TableCell align="right">{row.parentUnique}</TableCell>
            <TableCell align="right">{row.studentUnique}</TableCell>
            <TableCell align="right">
               <Box sx={{ display: 'flex', justifyContent: '' }}>
                  <UpdateModal
                     onClose={handleModalClose}
                     userUnique={row.userUnique}
                     parentUnique={row.parentUnique}
                     studentUnique={row.studentUnique}
                  />
                  <DeleteModal
                     onClose={handleModalClose}
                     parentUnique={row.parentUnique}
                  />
               </Box>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
};

export default Row;
