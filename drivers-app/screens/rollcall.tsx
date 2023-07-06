import { Box, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import BestDrivers from '../components/BestDrivers';
import Map from '../components/Map';
import News from '../components/News';
import ProfilePictureButton from '../components/ProfilePictureButton';

const styles = StyleSheet.create({
   mapContainer: {
      width: '100%',
      height: '73%',
      overflow: 'hidden',
   },
});
const RollCallScreen: React.FC = () => {
   return (
      <VStack bg="one" space={0} alignItems="center" flex={1}>
         <ProfilePictureButton />
         <Box roundedBottom="30" shadow={2} style={styles.mapContainer}>
            <Map />
         </Box>
         <VStack w="100%" flex={1}>
            <BestDrivers />
            <News />
         </VStack>
      </VStack>
   );
};

export default RollCallScreen;
