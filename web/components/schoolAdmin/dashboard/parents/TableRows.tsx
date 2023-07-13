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
