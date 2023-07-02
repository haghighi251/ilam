import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import 'react-native-dotenv';
import Layout from "./layout/layout";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    IS_UltraLight: require("./assets/fonts/IRANSansMobile_UltraLight.ttf"),
    IS_Light: require("./assets/fonts/IRANSansMobile_Light.ttf"),
    IS: require("./assets/fonts/IRANSansMobile.ttf"),
    IS_Medium: require("./assets/fonts/IRANSansMobile_Medium.ttf"),
    IS_Black: require("./assets/fonts/IRANSansMobile_Black.ttf"),
    IS_Bold: require("./assets/fonts/IRANSansMobile_Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const theme = extendTheme({
    colors: {
      // Add new color
      one: "#E7CEA6",
      two: "#0A6EBD",
      three: "#5A96E3",
      four: "#A1C2F1",
    },
    fontConfig: {
      IS: {
        UltraLight: {
          normal: "IS_UltraLight",
        },
        Light: {
          normal: "IS_Light",
        },
        Normal: {
          normal: "IS",
        },
        Medium: {
          normal: "IS_Medium",
        },
        Black: {
          normal: "IS_Black",
        },
        Bold: {
          normal: "IS_Bold",
        },
      },
    },
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "IS",
      body: "IS",
      mono: "IS",
      main: "IS",
    },
  });

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NativeBaseProvider theme={theme}>
        <Layout />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
