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
   const [provinces, setProvinces] = useState([]);
   const [cityName, setCityName] = useState<string>('');
   const [speedMin, setSpeedMin] = useState<string>('');
   const [speedMax, setSpeedMax] = useState<string>('');
   const [provinceUnique, setProvinceUnique] = useState<string>('');

   const handleSubmit = async () => {
      let errorMsg = null;
      if (cityName === null || cityName === undefined)
         errorMsg = 'لطفا نام شهر را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch('/api/admin/authorized/cities/add', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  cityName: cityName,
                  provinceUnique: provinceUnique,
                  speedMin: speedMin,
                  speedMax: speedMax,
               }),
            });

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('شهر با موفقیت ثبت شد.');
               setCityName('');
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

   async function fetchProvinces() {
      try {
         const response = await fetch('/api/admin/authorized/provinces/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setProvinces(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   useEffect(() => {
      fetchProvinces();
   }, []);

   const selectProvince = (event: SelectChangeEvent) => {
      setProvinceUnique(event.target.value as string);
   };
   return (
      <div>
         {' '}
         <Box className="mb-4">
            <TextField
               id="input-with-sx"
               label="نام شهر"
               variant="standard"
               value={cityName}
               name="usernameOrEmail"
               onChange={(e) => setCityName(e.target.value)}
               required
            />
            <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">استان</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={provinceUnique}
                  label="استان"
                  onChange={selectProvince}
               >
                  {provinces.map((item) => (
                     <MenuItem value={item.provinceUnique}>
                        {item.provinceName}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <TextField
               id="input-with-sx"
               label="حداقل سرعت"
               variant="standard"
               value={speedMin}
               name="usernameOrEmail"
               onChange={(e) => setSpeedMin(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="حداکثر سرعت"
               variant="standard"
               value={speedMax}
               name="usernameOrEmail"
               onChange={(e) => setSpeedMax(e.target.value)}
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

export default AddForm;
