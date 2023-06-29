'use client';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import Loading from '@/components/loading';

const UpdateForm = (props: {
   handleClose: () => void;
   latitude: string | (() => string);
   longitude: string | (() => string);
   rowNumber: string | (() => string);
   cityCoordinateUnique: any;
}) => {
   // Use the handleClose function as needed
   const handleFormClose = () => {
      // Perform any necessary logic
      props.handleClose(); // Call handleClose function from props
   };
   // Component's states
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>('');
   const [successMessage, setSuccessMessage] = useState<string>('');
   const [latitude, setLatitude] = useState<string>(props.latitude);
   const [longitude, setLongitude] = useState<string>(props.longitude);
   const [rowNumber, setRowNumber] = useState<string>(props.rowNumber);

   const handleSubmit = async () => {
      let errorMsg = null;
      if (
         latitude === null ||
         latitude === undefined ||
         longitude === null ||
         longitude === undefined
      )
         errorMsg = 'لطفا مختصات شهر را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch(
               '/api/admin/authorized/cities/coordinates/update',
               {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     cityCoordinateUnique: props.cityCoordinateUnique,
                     latitude: props.latitude,
                     longitude: props.longitude,
                     rowNumber: props.rowNumber,
                  }),
               }
            );

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('شهر با موفقیت ثبت شد.');
               setLatitude('');
               setLongitude('');
               setRowNumber('');
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
               label="عرض جغرافیایی (Lat)"
               variant="standard"
               value={latitude}
               name="usernameOrEmail"
               onChange={(e) => setLatitude(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="طول جغرافیایی (Lon)"
               variant="standard"
               value={longitude}
               name="usernameOrEmail"
               onChange={(e) => setLongitude(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="شماره ستون"
               variant="standard"
               value={rowNumber}
               name="usernameOrEmail"
               onChange={(e) => setRowNumber(e.target.value)}
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
