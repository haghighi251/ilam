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

   function handleModalClose() {
      setModalClosed(true);
      onClose();
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
            <TableCell align="right">{row.nationalCode}</TableCell>
            <TableCell align="right">{row.studentUnique}</TableCell>
            <TableCell align="right">{row.schoolUniqueId}</TableCell>
            <TableCell align="right">{row.driverUnique}</TableCell>
            <TableCell align="right">{row.parentUnique}</TableCell>
            <TableCell align="right">
               {row.homeLatitude}, {row.homeLongitude}
            </TableCell>
            <TableCell align="right">{row.homeDetails}</TableCell>
            <TableCell align="right">
               <Box sx={{ display: 'flex', justifyContent: '' }}>
                  <UpdateModal
                     onClose={handleModalClose}
                     name={row.name}
                     nationalCode={row.nationalCode}
                     studentUnique={row.studentUnique}
                     schoolUniqueId={row.schoolUniqueId}
                     driverUnique={row.driverUnique}
                     parentUnique={row.parentUnique}
                     homeLatitude={row.homeLatitude}
                     homeLongitude={row.homeLongitude}
                     homeDetails={row.homeDetails}
                  />
                  <DeleteModal
                     onClose={handleModalClose}
                     name={row.name}
                     studentUnique={row.studentUnique}
                  />
               </Box>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
};

export default Row;
