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
      
      </View>
    </Center>
  );
};

export default MainScreen;
