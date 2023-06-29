'use client';
import {
   Button,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
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

   const [cities, setCities] = useState([]);
   const [name, setName] = useState<string>('');
   const [latitude, setLatitude] = useState<string>('');
   const [longitude, setLongitude] = useState<string>('');
   const [cityUnique, setCityUnique] = useState<string>('');

   const handleSubmit = async () => {
      let errorMsg = null;
      if (
         name === null ||
         name === undefined ||
         cityUnique === null ||
         cityUnique === undefined
      )
         errorMsg = 'لطفا نام مدرسه و شهر را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch('/api/admin/authorized/schools/add', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  name,
                  latitude,
                  longitude,
                  cityUnique,
               }),
            });

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('مدرسه با موفقیت ثبت شد.');
               setName('');
               setLatitude('');
               setLongitude('');
               setCityUnique('');
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
   async function fetchCities() {
      try {
         const response = await fetch('/api/admin/authorized/cities/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setCities(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   useEffect(() => {
      fetchCities();
   }, []);

   const selectCity = (event: SelectChangeEvent) => {
      setCityUnique(event.target.value as string);
   };
   return (
      <div>
         {' '}
         <Box className="mb-4">
            <TextField
               id="input-with-sx"
               label="نام شهر"
               variant="standard"
               value={name}
               name="usernameOrEmail"
               onChange={(e) => setName(e.target.value)}
               required
            />
            <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">شهر</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cityUnique}
                  label="شهر"
                  onChange={selectCity}
                  required
               >
                  {cities.map((item) => (
                     <MenuItem value={item.cityUnique}>
                        {item.cityName}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <TextField
               id="input-with-sx"
               label="عرض جغرافیایی (lat)"
               variant="standard"
               value={latitude}
               name="latitude"
               onChange={(e) => setLatitude(e.target.value)}
            />
            <TextField
               id="input-with-sx"
               label="طول جغرافیایی (lon)"
               variant="standard"
               value={longitude}
               name="longitude"
               onChange={(e) => setLongitude(e.target.value)}
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

export default AddForm;
