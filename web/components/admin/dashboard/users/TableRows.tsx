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
            key={row.uniqueCode}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
            <TableCell align="right" component="th" scope="row">
               {row.username}
            </TableCell>
            <TableCell align="right">{row.mobile}</TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.password}</TableCell>
            <TableCell align="right">{row.nickname}</TableCell>
            <TableCell align="right">{row.picture}</TableCell>
            <TableCell align="right">{row.isAdmin ? 'بله' : 'خیر'}</TableCell>
            <TableCell align="right">{row.isDriver ? 'بله' : 'خیر'}</TableCell>
            <TableCell align="right">{row.isParent ? 'بله' : 'خیر'}</TableCell>
            <TableCell align="right">
               {row.isSchoolAdmin ? 'بله' : 'خیر'}
            </TableCell>
            <TableCell align="right">
               {row.isCityAdmin ? 'بله' : 'خیر'}
            </TableCell>
            <TableCell align="right">
               {row.isProvinceAdmin ? 'بله' : 'خیر'}
            </TableCell>
            <TableCell align="right">{row.uniqueCode}</TableCell>
            <TableCell align="right">{row.status ? 'بله' : 'خیر'}</TableCell>
            <TableCell align="right">{row.activationCode}</TableCell>
            <TableCell align="right">
               <Box sx={{ display: 'flex', justifyContent: '' }}>
                  <UpdateModal
                     onClose={handleModalClose}
                     username={row.username}
                     mobile={row.mobile}
                     email={row.email}
                     password={row.password}
                     nickname={row.nickname}
                     picture={row.picture}
                     isAdmin={row.isAdmin}
                     isDriver={row.isDriver}
                     isParent={row.isParent}
                     isSchoolAdmin={row.isSchoolAdmin}
                     isCityAdmin={row.isCityAdmin}
                     isProvinceAdmin={row.isProvinceAdmin}
                     uniqueCode={row.uniqueCode}
                     status={row.status}
                     activationCode={row.activationCode}
                     schoolUniqueId={schoolUniqueId}
                  />
                  <DeleteModal
                     onClose={handleModalClose}
                     uniqueCode={row.uniqueCode}
                  />
               </Box>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
};

export default Row;
