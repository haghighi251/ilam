import { Ionicons } from '@expo/vector-icons';
import { Button, Pressable } from 'native-base';
import React, { useRef } from 'react';
import {
   Animated,
   DrawerLayoutAndroid,
   PanResponder,
   StyleSheet,
   Text,
   View,
} from 'react-native';

const DrawerLayout = ({ children }) => {
   const drawerRef = useRef(null);
   const pan = useRef(new Animated.ValueXY()).current;

   const openDrawer = () => {
      drawerRef.current.openDrawer();
   };

   const closeDrawer = () => {
      drawerRef.current.closeDrawer();
   };

   const panResponder = useRef(
      PanResponder.create({
         onMoveShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gestureState) => {
            pan.setValue({ x: gestureState.dx, y: gestureState.dy });
            openDrawer();
         },
         onPanResponderRelease: () => {
            // closeDrawer();
            pan.setValue({ x: 0, y: 0 });
         },
      })
   ).current;

   const navigationView = () => (
      <View style={[styles.container, styles.navigationContainer]}>
         <Text style={styles.paragraph}>I'm in the Drawer!</Text>
         <Button
            ml={-20}
            style={styles.button2}
            onPress={() => drawerRef.current?.closeDrawer()}
         >
            <Text>draaag</Text>
         </Button>
      </View>
   );

   return (
      <View style={styles.container}>
         <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={200}
            drawerPosition="right"
            renderNavigationView={navigationView}
         >
            <Animated.View
               style={[
                  styles.button,
                  { transform: pan.getTranslateTransform() },
                  { zIndex: 10 },
               ]}
               {...panResponder.panHandlers}
            >
               <Pressable
                  onPress={() => drawerRef.current.openDrawer()}
                  borderRadius="full"
                  zIndex={0}
                  position="absolute"
                  top={0}
                  right={6}
                  shadow={10}
                  p={3}
                  bg="two"
               >
                  <Ionicons name="ios-menu-sharp" size={32} color="black" />
               </Pressable>
            </Animated.View>
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
   button: {
      position: 'absolute',
      top: 55,
      right: 6,
   },
});

export default DrawerLayout;
