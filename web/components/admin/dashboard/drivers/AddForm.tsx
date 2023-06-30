'use client';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import Loading from '@/components/loading';

const AddForm = (props) => {
   // Use the handleClose function as needed
   const handleFormClose = () => {
      // Perform any necessary logic
      props.handleClose(); // Call handleClose function from props
   };
   // Component's states
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>('');
   const [successMessage, setSuccessMessage] = useState<string>('');

   const [schools, setSchools] = useState([]);
   const [mobile, setMobile] = useState<string>('');
   const [schoolUniqueId, setSchoolUniqueId] = useState<string>('');

   const handleSubmit = async () => {
      let errorMsg = null;
      if (
         mobile === null ||
         mobile === undefined ||
         schoolUniqueId === null ||
         schoolUniqueId === undefined
      )
         errorMsg = 'لطفا نام راننده و مدرسه را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch('/api/admin/authorized/school/add', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  mobile: mobile,
                  schoolUniqueId: schoolUniqueId,
               }),
            });

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('راننده با موفقیت ثبت شد.');
               setMobile('');
               setSchoolUniqueId('');
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

   async function fetchSchools() {
      try {
         const response = await fetch('/api/admin/authorized/schools/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setSchools(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   useEffect(() => {
      fetchSchools();
   }, []);

   const selectSchool = (event: SelectChangeEvent) => {
      setSchoolUniqueId(event.target.value as string);
   };
   return (
      <div>
         {' '}
         <Box className="mb-4">
            <TextField
               id="input-with-sx"
               label="موبایل"
               variant="standard"
               value={mobile}
               name="mobile"
               onChange={(e) => setMobile(e.target.value)}
               required
            />
            <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">مدرسه</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={schoolUniqueId}
                  label="مدرسه"
                  onChange={selectSchool}
               >
                  {schools.map((item) => (
                     <MenuItem value={item.schoolUniqueId}>
                        {item.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
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
