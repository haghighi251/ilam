import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import DrawerContent from '../components/DrawerContent';
import AttendanceScreen from '../screens/attendance';
import CallUsScreen from '../screens/callUs';
import LoginScreen from '../screens/login';
import MainScreen from '../screens/main';
import TermsAndConditionsScreen from '../screens/termsConditions';
import UploadDocumentsScreen from '../screens/uploadDocuments';
import { user } from '../services/Redux/userReducer';
import { Iuser } from '../utils/types';

const Drawer = createDrawerNavigator();

const Layout: React.FC = () => {
   const currentUser: Iuser = useSelector(user);
   return (
      <NavigationContainer>
         <Drawer.Navigator
            initialRouteName={currentUser.isLoggedIn ? 'Main' : 'Login'}
            useLegacyImplementation
            screenOptions={{
               headerShown: false,
               drawerType: 'slide',
               drawerPosition: 'right',
               drawerStyle: {
                  backgroundColor: '#A1C2F1',
                  width: 240,
               },
            }}
            drawerContent={
               currentUser.isLoggedIn
                  ? (props) => <DrawerContent {...props} />
                  : undefined
            }
         >
            {currentUser.isLoggedIn ? (
               <>
                  <Drawer.Screen
                     name="UploadDocuments"
                     component={UploadDocumentsScreen}
                     options={{ title: 'ارسال مدارک' }}
                  />
                  <Drawer.Screen
                     name="Main"
                     component={MainScreen}
                     options={{ title: 'صفحه اصلی' }}
                  />
                  <Drawer.Screen
                     name="Attendance"
                     component={AttendanceScreen}
                     options={{ title: 'حضور و غیاب' }}
                  />
                  <Drawer.Screen
                     name="TermsAndConditions"
                     component={TermsAndConditionsScreen}
                     options={{ title: 'قوانین و مقررات' }}
                  />
                  <Drawer.Screen
                     name="CallUs"
                     component={CallUsScreen}
                     options={{ title: 'تماس با ما' }}
                  />
               </>
            ) : (
               <>
                  <Drawer.Screen
                     name="Login"
                     component={LoginScreen}
                     options={{ title: 'ورود' }}
                  />
               </>
            )}
         </Drawer.Navigator>
      </NavigationContainer>
   );
};

export default Layout;
