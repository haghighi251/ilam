import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CallUsScreen from '../screens/callUs';
import LoginScreen from '../screens/login';
import MainScreen from '../screens/main';
import RollCallScreen from '../screens/rollcall';
import TermsAndConditionsScreen from '../screens/termsConditions';
import UploadDocumentsScreen from '../screens/uploadDocuments';

const Stack = createNativeStackNavigator();
const Layout: React.FC = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen
               name="Login"
               component={LoginScreen}
               options={{ title: 'ورود' }}
            />
            <Stack.Screen
               name="UploadDocuments"
               component={UploadDocumentsScreen}
               options={{ title: 'ارسال مدارک' }}
            />
            <Stack.Screen
               name="Main"
               component={MainScreen}
               options={{ title: 'صفحه اصلی' }}
            />
            <Stack.Screen
               name="RollCallScreen"
               component={RollCallScreen}
               options={{ title: 'حضور و غیاب' }}
            />
            <Stack.Screen
               name="TermsAndConditionsScreen"
               component={TermsAndConditionsScreen}
               options={{ title: 'قوانین و مقررات' }}
            />
            <Stack.Screen
               name="CallUsScreen"
               component={CallUsScreen}
               options={{ title: 'تماس با ما' }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default Layout;
