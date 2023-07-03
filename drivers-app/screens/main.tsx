import MapView from '@splicer97/react-native-osmdroid';
import { Center, View } from "native-base";
import React from "react";
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
})
const MainScreen: React.FC = () => {
  return (
    <Center w="100%" bg="one" flex={1}>
      <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />;
      </View>
    </Center>
  );
};

export default MainScreen;
