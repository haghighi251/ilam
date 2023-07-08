import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import DeleteButton from './DeleteButton';

const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};
interface DeleteModalProps {
   onClose: () => void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, uniqueCode }) => {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => {
      setOpen(false);
      onClose(); // Call the onClose prop when the modal is closed
   };

   return (
      <div>
         <Button
            sx={{ mr: 2 }}
            size="medium"
            color="error"
            variant="outlined"
            startIcon={<CreateTwoToneIcon sx={{ ml: 2 }} />}
            onClick={handleOpen}
         >
            حذف
         </Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  آیا از حذف این کاربر مطمئن هستید؟
               </Typography>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     my: 3,
                  }}
               >
                  <DeleteButton
                     handleClose={handleClose}
                     uniqueCode={uniqueCode}
                  />
                  <Button variant="contained" onClick={handleClose}>
                     خیر
                  </Button>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

export default DeleteModal;
