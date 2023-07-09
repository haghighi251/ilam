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
interface UpdateModalProps {
   onClose: () => void;
}
const UpdateModal: React.FC<UpdateModalProps> = ({
   onClose,
   name,
   nationalCode,
   studentUnique,
   schoolUniqueId,
   driverUnique,
   parentUnique,
   homeLatitude,
   homeLongitude,
   homeDetails,
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
                  ویرایش دانش آموز
               </Typography>

               <UpdateForm
                  handleClose={handleClose}
                  name={name}
                  nationalCode={nationalCode}
                  studentUnique={studentUnique}
                  schoolUniqueId={schoolUniqueId}
                  driverUnique={driverUnique}
                  parentUnique={parentUnique}
                  homeLatitude={homeLatitude}
                  homeLongitude={homeLongitude}
                  homeDetails={homeDetails}
               />
            </Box>
         </Modal>
      </div>
   );
};

export default UpdateModal;
