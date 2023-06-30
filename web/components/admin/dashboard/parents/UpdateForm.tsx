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

   const [userUnique, setUserUnique] = useState<string>(props.userUnique);
   const [studentUnique, setStudentUnique] = useState<string>(
      props.studentUnique
   );
   const handleSubmit = async () => {
      let errorMsg = null;
      if (
         userUnique === null ||
         userUnique === undefined ||
         studentUnique === null ||
         studentUnique === undefined
      )
         errorMsg = 'لطفا کد کاربری و کد دانش آموز را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch(
               '/api/admin/authorized/parents/update',
               {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     userUnique: userUnique,
                     studentUnique: studentUnique,
                     parentUnique: props.parentUnique,
                  }),
               }
            );

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('کاربر با موفقیت ثبت شد.');
               setUserUnique('');
               setStudentUnique('');
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
               label="کد کاربری"
               variant="standard"
               value={userUnique}
               name="userUnique"
               onChange={(e) => setUserUnique(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="کد دانش آموز"
               variant="standard"
               value={studentUnique}
               name="studentUnique"
               onChange={(e) => setStudentUnique(e.target.value)}
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
