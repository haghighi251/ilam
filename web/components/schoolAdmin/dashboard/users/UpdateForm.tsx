'use client';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

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

   const [username, setUsername] = useState<string>(props.username);
   const [mobile, setMobile] = useState<string>(props.mobile);
   const [email, setEmail] = useState<string>(props.email);
   const [password, setPassword] = useState<string>(props.password);
   const [nickname, setNickname] = useState<string>(props.nickname);
   const [picture, setPicture] = useState<string>(props.picture);
   const [isDriver, setIsDriver] = useState<boolean>(props.isDriver);
   const [isParent, setIsParent] = useState<boolean>(props.isParent);
   const [status, setStatus] = useState<boolean>(props.status);
   const [activationCode, setActivationCode] = useState<string>(
      props.activationCode
   );

   const handleSubmit = async () => {
      let errorMsg = null;

      if (errorMsg === null) {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch('/api/admin/authorized/users/update', {
               method: 'PATCH',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  username: username,
                  mobile: mobile,
                  email: email,
                  password: password,
                  nickname: nickname,
                  picture: picture,
                  isDriver: isDriver,
                  isParent: isParent,
                  uniqueCode: props.uniqueCode,
                  status: status,
                  activationCode: activationCode,
               }),
            });

            const responseData = await response.json();
            if (responseData.success) {
               setSuccessMessage('کاربر با موفقیت ثبت شد.');
               setUsername('');
               setMobile('');
               setEmail('');
               setPassword('');
               setNickname('');
               setPicture('');
               setIsDriver(false);
               setIsParent(false);
               setStatus(false);
               setActivationCode('');
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
               label="نام کاربری"
               variant="standard"
               value={username}
               name="username"
               onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
               id="input-with-sx"
               label="موبایل"
               variant="standard"
               value={mobile}
               name="mobile"
               onChange={(e) => setMobile(e.target.value)}
               required
            />
            <TextField
               id="input-with-sx"
               label="ایمیل"
               variant="standard"
               value={email}
               name="email"
               onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
               id="input-with-sx"
               label="کلمه عبور"
               variant="standard"
               value={password}
               name="password"
               onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
               id="input-with-sx"
               label="نام و نام خانوادگی"
               variant="standard"
               value={nickname}
               name="nickname"
               onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
               id="input-with-sx"
               label="عکس"
               variant="standard"
               value={picture}
               name="picture"
               onChange={(e) => setPicture(e.target.value)}
            />
            <TextField
               id="input-with-sx"
               label="کد فعال سازی"
               variant="standard"
               value={activationCode}
               name="activationCode"
               onChange={(e) => setActivationCode(e.target.value)}
               required
            />
            <FormGroup>
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={isDriver}
                        onChange={(e) => {
                           setIsDriver(e.target.checked);
                        }}
                     />
                  }
                  label="راننده"
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={isParent}
                        onChange={(e) => {
                           setIsParent(e.target.checked);
                        }}
                     />
                  }
                  label="اولیا"
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={status}
                        onChange={(e) => {
                           setStatus(e.target.checked);
                        }}
                     />
                  }
                  label="فعال"
               />
            </FormGroup>
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