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

   const [schools, setSchools] = useState([]);
   const [drivers, setDrivers] = useState([]);
   const [parents, setParents] = useState([]);

   const [name, setName] = useState<string>(props.name);
   const [nationalCode, setNationalCode] = useState<string>(props.nationalCode);
   const [schoolUniqueId, setSchoolUniqueId] = useState<string>(
      props.schoolUniqueId
   );
   const [driverUnique, setDriverUnique] = useState<string>(props.driverUnique);
   const [parentUnique, setParentUnique] = useState<string>(props.parentUnique);
   const [homeLatitude, setHomeLatitude] = useState<string>(props.homeLatitude);
   const [homeLongitude, setHomeLongitude] = useState<string>(
      props.homeLongitude
   );
   const [homeDetails, setHomeDetails] = useState<string>(props.homeDetails);

   const handleSubmit = async () => {
      let errorMsg = null;
      if (name === null || name === undefined)
         errorMsg = 'لطفا نام و کد ملی دانش آموز را وارد نمایید.';
      setError(errorMsg);

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch(
               '/api/admin/authorized/students/update',
               {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     name: name,
                     nationalCode: nationalCode,
                     studentUnique: props.studentUnique,
                     schoolUniqueId: schoolUniqueId,
                     driverUnique: driverUnique,
                     parentUnique: parentUnique,
                     homeLatitude: homeLatitude,
                     homeLongitude: homeLongitude,
                     homeDetails: homeDetails,
                  }),
               }
            );

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('دانش آموز با موفقیت ثبت شد.');
               setName('');
               setNationalCode('');
               setSchoolUniqueId('');
               setDriverUnique('');
               setParentUnique('');
               setHomeLatitude('');
               setHomeLongitude('');
               setHomeDetails('');
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
   async function fetchDrivers() {
      try {
         const response = await fetch('/api/admin/authorized/drivers/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setDrivers(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   async function fetchParents() {
      try {
         const response = await fetch('/api/admin/authorized/parents/all', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (response.ok) {
            setParents(data.data);
         } else {
            console.error(data.error);
         }
      } catch (error) {
         console.error(error);
      }
   }
   useEffect(() => {
      fetchSchools();
      fetchDrivers();
      fetchParents();
   }, []);

   const selectSchool = (event: SelectChangeEvent) => {
      setSchoolUniqueId(event.target.value as string);
   };
   const selectDriver = (event: SelectChangeEvent) => {
      setDriverUnique(event.target.value as string);
   };
   const selectParent = (event: SelectChangeEvent) => {
      setParentUnique(event.target.value as string);
   };
   return (
      <div>
         <Box className="mb-4">
            <TextField
               id="input-with-sx"
               label="نام و نام خانوادگی"
               variant="standard"
               value={name}
               name="name"
               onChange={(e) => setName(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="کد ملی"
               variant="standard"
               value={nationalCode}
               name="nationalCode"
               onChange={(e) => setNationalCode(e.target.value)}
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
                  required
               >
                  {schools.map((item) => (
                     <MenuItem value={item.schoolUniqueId}>
                        {item.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">راننده</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={driverUnique}
                  label="راننده"
                  onChange={selectDriver}
                  required
               >
                  {drivers.map((item) => (
                     <MenuItem value={item.driverUniqueId}>
                        {item.driverUniqueId}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">اولیا</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={parentUnique}
                  label="اولیا"
                  onChange={selectParent}
                  required
               >
                  {parents.map((item) => (
                     <MenuItem value={item.parentUnique}>
                        {item.parentUnique}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <TextField
               id="input-with-sx"
               label="عرض جغرافیایی"
               variant="standard"
               value={homeLatitude}
               name="homeLatitude"
               onChange={(e) => setHomeLatitude(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="طول جغرافیایی"
               variant="standard"
               value={homeLongitude}
               name="homeLongitude"
               onChange={(e) => setHomeLongitude(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="توضیحات اضافی"
               variant="standard"
               value={homeDetails}
               name="homeDetails"
               onChange={(e) => setHomeDetails(e.target.value)}
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
