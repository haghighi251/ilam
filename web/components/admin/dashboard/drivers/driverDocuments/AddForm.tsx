'use client';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import FilePicker from '@/components/general/FilePicker';
import Loading from '@/components/loading';

const AddForm = (props: { handleClose: () => void; driverUniqueId: any }) => {
   // Use the handleClose function as needed
   const handleFormClose = () => {
      // Perform any necessary logic
      props.handleClose(); // Call handleClose function from props
   };
   // Component's states
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>('');
   const [successMessage, setSuccessMessage] = useState<string>('');
   // Form inputs
   const [documentName, setDocumentName] = useState<string>('');
   const [file, setFile] = useState<string>('');

   const handleSubmit = async () => {
      let errorMsg = null;
      if (
         documentName === null ||
         documentName === undefined ||
         file === null ||
         file === undefined
      )
         errorMsg = 'لطفا تمامی فیلد ها را پر کنید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch(
               '/api/admin/authorized/drivers/documents/add',
               {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     driverUniqueId: props.driverUniqueId,
                     documentName: documentName,
                     file: file,
                  }),
               }
            );

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('مدرک با موفقیت ثبت شد.');
               setDocumentName('');
               setFile('');

               handleFormClose(); // Close the modal if desired
            } else {
               setError(responseData.error);
            }
         } catch (error) {
            console.error('Error:', error);
            setError(
               'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.'
            );
         }
         setLoading(false);
      }
   };

   return (
      <div>
         {' '}
         <Box className="mb-4">
            <TextField
               id="input-with-sx"
               label="نام مدرک"
               variant="standard"
               value={documentName}
               name="documentName"
               onChange={(e) => setDocumentName(e.target.value)}
               required
            />
            <FilePicker file={file} setFile={setFile} />
         </Box>
         {error && (
            <Alert severity="error" className="mb-3 md:mb-6">
               {error}
            </Alert>
         )}
         {successMessage && (
            <Alert severity="error" className="mb-3 md:mb-6">
               {successMessage}
            </Alert>
         )}
         {!loading && (
            <Button variant="contained" type="submit" onClick={handleSubmit}>
               ثبت
            </Button>
         )}
         {loading && <Loading />}
      </div>
   );
};

export default AddForm;
