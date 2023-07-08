import { Ionicons } from '@expo/vector-icons';
import { DrawerItem, useDrawerProgress } from '@react-navigation/drawer';
import { Divider, Pressable, Text, VStack } from 'native-base';
import Animated from 'react-native-reanimated';

const DrawerContent: React.FC = (props) => {
   const progress = useDrawerProgress();

   const translateX = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [+100, 0],
   });
   const screenIndex = props.navigation.getState().index;
   const screenName = props.navigation.getState().routeNames[screenIndex];
   return (
      <Animated.View style={{ transform: [{ translateX }] }}>
         <VStack>
            <Text
               fontFamily="body"
               fontWeight="Bold"
               fontStyle="normal"
               fontSize="5xl"
               color="two"
               px={5}
               mt={100}
            >
               منو
            </Text>
            <Text
               fontFamily="body"
               fontWeight="Bold"
               fontStyle="normal"
               fontSize="xl"
               color="one"
               px={5}
               mt={1}
            >
               اپلیکیشن رانندگان
            </Text>
            <Divider my={10} />
            <DrawerItem
               label={() => (
                  <Text
                     fontFamily="body"
                     fontWeight="Normal"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     صفحه اصلی
                  </Text>
               )}
               onPress={() => {
                  // console.log(screenName);
                  props.navigation.navigate('Main');
               }}
               focused={screenName === 'Main'}
            />
            <DrawerItem
               label={() => (
                  <Text
                     fontFamily="body"
                     fontWeight="Normal"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     ارسال مدارک
                  </Text>
               )}
               onPress={() => {
                  // console.log(screenName);
                  props.navigation.navigate('UploadDocuments');
               }}
               focused={screenName === 'UploadDocuments'}
            />
            <DrawerItem
               label={() => (
                  <Text
                     fontFamily="body"
                     fontWeight="Normal"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     حضور غیاب
                  </Text>
               )}
               onPress={() => {
                  props.navigation.navigate('Attendance');
               }}
               focused={screenName === 'Attendance'}
            />
            <DrawerItem
               label={() => (
                  <Text
                     fontFamily="body"
                     fontWeight="Normal"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     قوانین و مقررات
                  </Text>
               )}
               onPress={() => {
                  props.navigation.navigate('TermsAndConditions');
               }}
               focused={screenName === 'TermsAndConditions'}
            />
            <DrawerItem
               label={() => (
                  <Text
                     fontFamily="body"
                     fontWeight="Normal"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     تماس با ما
                  </Text>
               )}
               onPress={() => {
                  props.navigation.navigate('CallUs');
               }}
               focused={screenName === 'CallUs'}
            />
         </VStack>
         <Pressable
            onPress={() => props.navigation.toggleDrawer()}
            borderRadius="full"
            zIndex={0}
            position="absolute"
            top={55}
            right={366}
            shadow={10}
            p={3}
            bg="two"
         >
            <Ionicons name="ios-menu-sharp" size={32} color="white" />
         </Pressable>
      </Animated.View>
   );
};
export default DrawerContent;
