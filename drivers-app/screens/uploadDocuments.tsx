import * as ImagePicker from 'expo-image-picker';
import { Box, Button, Image, Text, VStack } from 'native-base';
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
      console.log('Image 1:', image1);
      console.log('Image 2:', image2);
      console.log('Image 3:', image3);
      console.log('Image 4:', image4);
   };

   return (
      <Box flex={1} bg="one">
         <VStack space={4}>
            <Box>
               <Button
                  onPress={() => pickImage('vehicleInspectionImage')}
               ></Button>
               {vehicleInspectionImage && (
                  <Image
                     source={{ uri: vehicleInspectionImage }}
                     alt="Alternate Text"
                     size="xl"
                  />
               )}
            </Box>
            <Box>
               <Button
                  onPress={() => pickImage('driversLicenseImage')}
               ></Button>
               {driversLicenseImage && (
                  <Image
                     source={{ uri: driversLicenseImage }}
                     alt="Alternate Text"
                     size="xl"
                  />
               )}
            </Box>
            <Box>
               <Button onPress={() => pickImage('personalPhoto')}></Button>
               {personalPhoto && (
                  <Image
                     source={{ uri: personalPhoto }}
                     alt="Alternate Text"
                     size="xl"
                  />
               )}
            </Box>
            <Box>
               <Button onPress={() => pickImage('carInsuranceImage')}></Button>
               {carInsuranceImage && (
                  <Image
                     source={{ uri: carInsuranceImage }}
                     alt="Alternate Text"
                     size="xl"
                  />
               )}
            </Box>
            <Box>
               <Button onPress={handleSubmit}>
                  <Text>Submit</Text>
               </Button>
            </Box>
         </VStack>
      </Box>
   );
};

export default UploadDocumentsScreen;
