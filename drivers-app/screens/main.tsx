import { Box, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import BestDrivers from '../components/MainScreen/BestDrivers';
import Map from '../components/MainScreen/Map';
import News from '../components/MainScreen/News';
import ProfilePictureButton from '../components/MainScreen/ProfilePictureButton';
import { user } from '../services/Redux/userReducer';
import { Iuser } from '../utils/types';

const styles = StyleSheet.create({
   mapContainer: {
      width: '100%',
      height: '77%',
      overflow: 'hidden',
   },
});
const MainScreen: React.FC = () => {
   const currentUser: Iuser = useSelector(user);
   return (
      <VStack
         bg="one"
         space={0}
         alignItems="center"
         justifyContent="space-between"
         flex={1}
      >
         <ProfilePictureButton />
         <Box roundedBottom="30" shadow={2} style={styles.mapContainer}>
            <Map />
         </Box>
         <VStack w="100%" flex={1} justifyContent="flex-end">
            <BestDrivers />
            <News />
         </VStack>
      </VStack>
   );
};

export default MainScreen;
