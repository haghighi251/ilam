import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import AddForm from './AddForm';

const style = {
   position: 'absolute' as const,
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};
interface AddDocumentModalProps {
   onClose: () => void;
}
const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
   onClose,
   driverUniqueId,
}) => {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => {
      setOpen(false);
      onClose(); // Call the onClose prop when the modal is closed
   };

   return (
      <div>
         <Button
            variant="contained"
            startIcon={<AddIcon sx={{ ml: 2 }} />}
            onClick={handleOpen}
         >
            جدید
         </Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  ثبت مدرک
               </Typography>

               <AddForm handleClose={handleClose} driverUniqueId={driverUniqueId} />
            </Box>
         </Modal>
      </div>
   );
};

export default AddDocumentModal;
