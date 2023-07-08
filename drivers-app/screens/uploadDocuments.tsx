import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';
import {
   Box,
   Button,
   Divider,
   HStack,
   Icon,
   Image,
   Text,
   VStack,
} from 'native-base';
import React, { useState } from 'react';

const UploadDocumentsScreen: React.FC = () => {
   const [vehicleInspectionImage, setVehicleInspectionImage] = useState<
      string | null
   >(null);
   const [driversLicenseImage, setDriversLicenseImage] = useState<
      string | null
   >(null);
   const [personalPhoto, setPersonalPhoto] = useState<string | null>(null);
   const [carInsuranceImage, setCarInsuranceImage] = useState<string | null>(
      null
   );

   const pickImage = async (imageName: string) => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
         switch (imageName) {
            case 'vehicleInspectionImage':
               setVehicleInspectionImage(result.assets[0].uri);
               break;
            case 'driversLicenseImage':
               setDriversLicenseImage(result.assets[0].uri);
               break;
            case 'personalPhoto':
               setPersonalPhoto(result.assets[0].uri);
               break;
            case 'carInsuranceImage':
               setCarInsuranceImage(result.assets[0].uri);
               break;
         }
      }
   };
   const handleSubmit = () => {
      // Handle form submission
      console.log('Form submitted');
      console.log('Image 1:', vehicleInspectionImage);
      console.log('Image 2:', driversLicenseImage);
      console.log('Image 3:', personalPhoto);
      console.log('Image 4:', carInsuranceImage);
   };

   return (
      <Box flex={1} bg="one">
         <Box flex={1} bg="four" borderBottomRadius={30} shadow={2}>
            <Box w="100%" h="270">
               <LottieView
                  source={require('../assets/95241-uploading.json')}
                  autoPlay
                  loop
               />
            </Box>
         </Box>
         <VStack space={4} flex={2} p={10}>
            <Text
               fontFamily="body"
               fontWeight="Bold"
               fontStyle="normal"
               fontSize="xl"
               color="black"
            >
               ارسال مدارک
            </Text>
            <Divider bg="two" mb={3} />
            {/* vehicleInspectionImage */}
            <Box>
               <HStack justifyContent="space-between" alignItems="center">
                  <Button
                     onPress={() => pickImage('vehicleInspectionImage')}
                     leftIcon={
                        <Icon
                           as={Ionicons}
                           name="cloud-upload-outline"
                           size="sm"
                        />
                     }
                     variant="outline"
                     borderColor="two"
                  >
                     <Text
                        fontFamily="body"
                        fontWeight="Normal"
                        fontStyle="normal"
                        fontSize="sm"
                        color="black"
                     >
                        بارگذاری
                     </Text>
                  </Button>
                  {vehicleInspectionImage && (
                     <Image
                        source={{ uri: vehicleInspectionImage }}
                        alt="Alternate Text"
                        size="xl"
                     />
                  )}

                  <Text
                     fontFamily="body"
                     fontWeight="Light"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     معاینه فنی خودرو
                  </Text>
               </HStack>
            </Box>
            {/* driversLicenseImage */}
            <Box>
               <HStack justifyContent="space-between" alignItems="center">
                  <Button
                     onPress={() => pickImage('driversLicenseImage')}
                     leftIcon={
                        <Icon
                           as={Ionicons}
                           name="cloud-upload-outline"
                           size="sm"
                        />
                     }
                     variant="outline"
                     borderColor="two"
                  >
                     <Text
                        fontFamily="body"
                        fontWeight="Normal"
                        fontStyle="normal"
                        fontSize="sm"
                        color="black"
                     >
                        بارگذاری
                     </Text>
                  </Button>
                  {driversLicenseImage && (
                     <Image
                        source={{ uri: driversLicenseImage }}
                        alt="Alternate Text"
                        size="xl"
                     />
                  )}

                  <Text
                     fontFamily="body"
                     fontWeight="Light"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     گواهی نامه رانندگی
                  </Text>
               </HStack>
            </Box>
            {/* personalPhoto */}
            <Box>
               <HStack justifyContent="space-between" alignItems="center">
                  <Button
                     onPress={() => pickImage('personalPhoto')}
                     leftIcon={
                        <Icon
                           as={Ionicons}
                           name="cloud-upload-outline"
                           size="sm"
                        />
                     }
                     variant="outline"
                     borderColor="two"
                  >
                     <Text
                        fontFamily="body"
                        fontWeight="Normal"
                        fontStyle="normal"
                        fontSize="sm"
                        color="black"
                     >
                        بارگذاری
                     </Text>
                  </Button>
                  {personalPhoto && (
                     <Image
                        source={{ uri: personalPhoto }}
                        alt="Alternate Text"
                        size="xl"
                     />
                  )}

                  <Text
                     fontFamily="body"
                     fontWeight="Light"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     عکس ۳ در ۴
                  </Text>
               </HStack>
            </Box>
            {/* carInsuranceImage */}
            <Box>
               <HStack justifyContent="space-between" alignItems="center">
                  <Button
                     onPress={() => pickImage('carInsuranceImage')}
                     leftIcon={
                        <Icon
                           as={Ionicons}
                           name="cloud-upload-outline"
                           size="sm"
                        />
                     }
                     variant="outline"
                     borderColor="two"
                  >
                     <Text
                        fontFamily="body"
                        fontWeight="Normal"
                        fontStyle="normal"
                        fontSize="sm"
                        color="black"
                     >
                        بارگذاری
                     </Text>
                  </Button>
                  {carInsuranceImage && (
                     <Image
                        source={{ uri: carInsuranceImage }}
                        alt="Alternate Text"
                        size="xl"
                     />
                  )}

                  <Text
                     fontFamily="body"
                     fontWeight="Light"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     بیمه نامه خودرو
                  </Text>
               </HStack>
            </Box>
            <Box>
               <Button bg="two" onPress={handleSubmit} shadow={2}>
                  <Text
                     fontFamily="body"
                     fontWeight="Bold"
                     fontStyle="normal"
                     fontSize="md"
                     color="white"
                  >
                     ذخیره
                  </Text>
               </Button>
            </Box>
         </VStack>
      </Box>
   );
};

export default UploadDocumentsScreen;
