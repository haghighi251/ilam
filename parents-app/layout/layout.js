import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import VerificationScreen from "../screens/verification";
import MainScreen from "../screens/main";

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "ورود" }}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{ title: "تایید کاربری" }}
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
