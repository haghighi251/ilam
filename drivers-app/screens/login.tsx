import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Box, Center, Text, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActivationForm from '../components/LoginScreen/ActivationForm';
import LoginForm from '../components/LoginScreen/LoginForm';
import { AppDispatch } from '../services/Redux/store';
import { actionLogin, user } from '../services/Redux/userReducer';
import {
   CheckActivationCodeOnDB,
   RegisterOrLogin,
   getLoggedInUserId,
} from '../utils/functions';
import { Iuser } from '../utils/types';
import { isValidPhone } from '../utils/validation';

const LoginScreen: React.FC = () => {
   const navigation = useNavigation();

   const [mobile, setMobile] = useState<string>('');
   const [activationCode, setActivationCode] = useState<string>('');
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [showActivation, setShowActivation] = useState<boolean>(false);

   const dispatch: AppDispatch = useDispatch();
   const currentUser: Iuser = useSelector(user);
   // Call the getLoggedInUserId function to retrieve the user ID
   useCallback(async () => {
      const userId = await getLoggedInUserId();
      if (userId) {
         navigation.navigate('Main');
         console.log('User ID:', userId);
      }
   }, []);

   const setMobileChanges = useCallback((value: string) => {
      setMobile(value);
   }, []);

   const handleSubmit = useCallback(async () => {
      let errorMsg = '';
      try {
         if (mobile === null || mobile === undefined) {
            errorMsg += 'لطفا شماره همراه خود را وارد نمایید.';
         }

         if (!isValidPhone(mobile)) {
            errorMsg +=
               'شماره همراه صحیح نیست. لطفا شماره یازده رقمی که با صفر آغاز می شود را وارد کنید.';
         }

         if (errorMsg === '') {
            // Handling the submit event of the registration of the form
            setIsLoading(true);
            setError(null);
            const data = await RegisterOrLogin(mobile);
            if (data.success) {
               setShowActivation(true);
               setIsLoading(false);
            } else {
               setError(data.error);
               setIsLoading(false);
            }
         } else {
            setError(errorMsg);
            setIsLoading(false);
         }
      } catch (e) {
         setError('متاسفانه خطایی رخ داده است. لطفا لحظاتی دیگر تلاش نمایید.');
         setIsLoading(false);
      }
   }, [mobile]);

   const handleActivationCode = useCallback((value: string) => {
      setActivationCode(value);
   }, []);

   const handleActivation = useCallback(async () => {
      let errorMsg = '';
      try {
         if (activationCode === null || activationCode === undefined) {
            errorMsg += 'لطفا کد فعال سازی خود را وارد نمایید.';
         }

         if (errorMsg === '') {
            // Handling the submit event of the registration of the form
            setIsLoading(true);
            setError(null);
            const res = await CheckActivationCodeOnDB(mobile, activationCode);
            if (res.success) {
               if (res.data.isDriver) {
                  // Call the saveLoggedInUserId function with the user ID after successful login
                  dispatch(
                     actionLogin({
                        user: {
                           user_id: res.data.user_id,
                           mobile: mobile,
                           isDriver: res.data.isDriver,
                        },
                        isLoggedIn: true,
                     })
                  );
                  navigation.navigate('Main');
               } else {
                  setError('شما دسترسی به این بخش را ندارید.');
               }
               // router.push("/");
            } else {
               setError(res.error);
               setIsLoading(false);
            }
         } else {
            setError(errorMsg);
            setIsLoading(false);
         }
      } catch (e) {
         setError('متاسفانه یک خطا رخ داده است. لطفا لحظاتی دیگر تلاش نمایید.');
         setIsLoading(false);
      }
   }, [activationCode, mobile]);

   return (
      <Center w="100%" bg="one" flex={1}>
         <Box w="100%" h="270" mt={-180} bg="four">
            <LottieView
               source={require('../assets/76572-bus-tracking.json')}
               autoPlay
               loop
            />
         </Box>
         <VStack w="100%" px="10" space={1} mt={20}>
            <Text
               fontFamily="body"
               fontWeight="Medium"
               fontStyle="normal"
               fontSize="2xl"
               color="two"
            >
               راننده عزیز
            </Text>
            <Text
               fontFamily="body"
               fontWeight="Bold"
               fontStyle="normal"
               fontSize="3xl"
            >
               خوش آمدید
            </Text>
            <Text
               fontFamily="body"
               fontWeight="Light"
               fontStyle="normal"
               fontSize="sm"
            >
               لطفا وارد حساب کاربری خود شوید.
            </Text>
            {showActivation === false && (
               <LoginForm
                  mobile={mobile}
                  error={error}
                  isLoading={isLoading}
                  setMobileChanges={setMobileChanges}
                  handleSubmit={handleSubmit}
               />
            )}
            {showActivation === true && (
               <ActivationForm
                  handleActivation={handleActivation}
                  activationCode={activationCode}
                  handleActivationCode={handleActivationCode}
                  error={error}
                  isLoading={isLoading}
               />
            )}
         </VStack>
      </Center>
   );
};

export default LoginScreen;
