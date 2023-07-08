import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Layout from "./layout/layout";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    loadFont();
  }, []);

  async function loadFont() {
    await Font.loadAsync({
      IS: require("./assets/fonts/IRANSansMobile.ttf"),
      IS_Black: require("./assets/fonts/IRANSansMobile_Black.ttf"),
      IS_Bold: require("./assets/fonts/IRANSansMobile_Bold.ttf"),
      IS_Light: require("./assets/fonts/IRANSansMobile_Light.ttf"),
      IS_Medium: require("./assets/fonts/IRANSansMobile_Medium.ttf"),
      IS_UltraLight: require("./assets/fonts/IRANSansMobile_UltraLight.ttf"),
    });
    setIsFontLoaded(true);
  }

  if (!isFontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF2171" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Layout />
      <StatusBar style="auto" />
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
