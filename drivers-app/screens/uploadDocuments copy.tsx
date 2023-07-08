import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Box, Button, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const UploadDocumentsScreen: React.FC = () => {
   const [image1, setImage1] = useState<string | null>(null);
   const [image2, setImage2] = useState<string | null>(null);
   const [image3, setImage3] = useState<string | null>(null);
   const [image4, setImage4] = useState<string | null>(null);

   const handleImagePicker = async (imageIndex: number) => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status === 'granted') {
         const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
         });

         if (!result.canceled) {
            const { uri } = result;
            const compressedImage = await manipulateAsync(
               uri,
               [{ resize: { width: 500 } }], // Set the desired width for the optimized image
               { compress: 0.7 } // Adjust the compression level as needed (0.7 is an example)
            );

            switch (imageIndex) {
               case 1:
                  setImage1(compressedImage.uri);
                  break;
               case 2:
                  setImage2(compressedImage.uri);
                  break;
               case 3:
                  setImage3(compressedImage.uri);
                  break;
               case 4:
                  setImage4(compressedImage.uri);
                  break;
            }
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
      <Box bg="one" flex={1}>
         <VStack>
            <TouchableOpacity onPress={() => handleImagePicker(1)}>
               {image1 ? (
                  <Image source={{ uri: image1 }} style={styles.imagePreview} />
               ) : (
                  <Text>Select Image 1</Text>
               )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleImagePicker(2)}>
               {image2 ? (
                  <Image source={{ uri: image2 }} style={styles.imagePreview} />
               ) : (
                  <Text>Select Image 2</Text>
               )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleImagePicker(3)}>
               {image3 ? (
                  <Image source={{ uri: image3 }} style={styles.imagePreview} />
               ) : (
                  <Text>Select Image 3</Text>
               )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleImagePicker(4)}>
               {image4 ? (
                  <Image source={{ uri: image4 }} style={styles.imagePreview} />
               ) : (
                  <Text>Select Image 4</Text>
               )}
            </TouchableOpacity>

            <Button onPress={handleSubmit}>
               <Text>Submit</Text>
            </Button>
         </VStack>
      </Box>
   );
};
const styles = StyleSheet.create({
   imagePreview: {
      width: 100,
      height: 100,
   },
});

export default UploadDocumentsScreen;
