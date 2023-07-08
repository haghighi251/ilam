'use client';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import Loading from '@/components/loading';

const UpdateForm = (props) => {
   // Use the handleClose function as needed
   const handleFormClose = () => {
      // Perform any necessary logic
      props.handleClose(); // Call handleClose function from props
   };
   // Component's states
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>('');
   const [successMessage, setSuccessMessage] = useState<string>('');
   const [name, setName] = useState<string>(props.name);
   const [latitude, setLatitude] = useState<string>(props.latitude);
   const [longitude, setLongitude] = useState<string>(props.longitude);

   const handleSubmit = async () => {
      let errorMsg = null;
      if (name === null || name === undefined)
         errorMsg = 'لطفا نام مدرسه را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch(
               '/api/admin/authorized/schools/update',
               {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     name: name,
                     latitude: latitude,
                     longitude: longitude,
                     schoolUniqueId: props.schoolUniqueId,
                  }),
               }
            );

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('مدرسه با موفقیت ثبت شد.');
               setName('');
               setLatitude('');
               setLongitude('');
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
         <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="mb-4">
            <TextField
               id="input-with-sx"
               label="نام مدرسه"
               variant="standard"
               value={name}
               name="name"
               onChange={(e) => setName(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="عرض جغرافیایی (lat)"
               variant="standard"
               value={latitude}
               name="latitude"
               onChange={(e) => setLatitude(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="طول جغرافیایی (lon)"
               variant="standard"
               value={longitude}
               name="longitude"
               onChange={(e) => setLongitude(e.target.value)}
               required
            />
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

export default UpdateForm;
