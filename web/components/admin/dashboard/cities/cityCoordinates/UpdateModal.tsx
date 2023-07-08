import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import UpdateForm from './UpdateForm';

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
interface UpdateCoorModalProps {
   onClose: () => void;
}
const UpdateCoorModal: React.FC<UpdateCoorModalProps> = ({
   onClose,
   cityCoordinateUnique,
   latitude,
   longitude,
   rowNumber,
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
            startIcon={<CreateTwoToneIcon sx={{ ml: 2 }} />}
            onClick={handleOpen}
         >
            ویرایش
         </Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  ویرایش مختصات
               </Typography>

               <UpdateForm
                  handleClose={handleClose}
                  cityCoordinateUnique={cityCoordinateUnique}
                  latitude={latitude}
                  longitude={longitude}
                  rowNumber={rowNumber}
               />
            </Box>
         </Modal>
      </div>
   );
};

export default UpdateCoorModal;
