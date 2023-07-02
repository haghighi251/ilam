import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/login";
import MainScreen from "../screens/main";
import UploadDocumentsScreen from "../screens/uploadDocuments";

const Stack = createNativeStackNavigator();

const Layout: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "ورود" }}
        />
        <Stack.Screen
          name="UploadDocuments"
          component={UploadDocumentsScreen}
          options={{ title: "ارسال مدارک" }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "صفحه اصلی" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
