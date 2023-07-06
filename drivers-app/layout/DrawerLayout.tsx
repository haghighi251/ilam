import { Ionicons } from '@expo/vector-icons';
import { Box, Divider, Pressable, Text, VStack } from 'native-base';
import React, { useRef } from 'react';
import { DrawerLayoutAndroid, StyleSheet, View } from 'react-native';

const DrawerLayout = ({ children }) => {
   const drawerRef = useRef(null);

   const openDrawer = () => {
      drawerRef.current.openDrawer();
   };

   const closeDrawer = () => {
      drawerRef.current.closeDrawer();
   };
   const navigationView = () => (
      <Box bg="two" h="100%" borderLeftRadius={30}>
         <VStack mt={100}>
            <Text
               fontFamily="body"
               fontWeight="Bold"
               fontStyle="normal"
               fontSize="5xl"
               color="one"
               px={5}
               mt={3}
            >
               منو
            </Text>
            <Text
               fontFamily="body"
               fontWeight="Bold"
               fontStyle="normal"
               fontSize="xl"
               color="three"
               px={5}
               mt={3}
            >
               اپلیکیشن رانندگان
            </Text>
            <Divider my={6} bg="three" />
            <Pressable>
               <Text
                  fontFamily="body"
                  fontWeight="Normal"
                  fontStyle="normal"
                  fontSize="xl"
                  color="four"
                  px={5}
                  my={10}
               >
                  صفحه اصلی
               </Text>
            </Pressable>
            <Pressable>
               <Text
                  fontFamily="body"
                  fontWeight="Normal"
                  fontStyle="normal"
                  fontSize="xl"
                  color="white"
                  px={5}
               >
                  حضور و غیاب
               </Text>
            </Pressable>
            <Pressable>
               <Text
                  fontFamily="body"
                  fontWeight="Normal"
                  fontStyle="normal"
                  fontSize="xl"
                  color="white"
                  px={5}
                  my={10}
               >
                  قوانین و مقررات
               </Text>
            </Pressable>
            <Pressable>
               <Text
                  fontFamily="body"
                  fontWeight="Normal"
                  fontStyle="normal"
                  fontSize="xl"
                  color="white"
                  px={5}
               >
                  تماس با ما
               </Text>
            </Pressable>
         </VStack>
      </Box>
   );

   return (
      <View style={styles.container}>
         <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={300}
            drawerPosition="right"
            drawerBackgroundColor="transparent"
            renderNavigationView={navigationView}
         >
            <Pressable
               onPress={() => drawerRef.current.openDrawer()}
               borderRadius="full"
               zIndex={3}
               position="absolute"
               top={55}
               right={6}
               shadow={10}
               p={3}
               bg="two"
            >
               <Ionicons name="ios-menu-sharp" size={32} color="white" />
            </Pressable>
            {children}
         </DrawerLayoutAndroid>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   navigationContainer: {
      backgroundColor: 'gray',
      overflow: 'visible',
   },
   paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
});

export default DrawerLayout;
