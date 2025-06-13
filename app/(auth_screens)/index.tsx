import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import _ from "lodash";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function index() {
  // Todo: Add SplashScreen get user data from AsyncStorage
  // Todo: If user data is found, navigate to HomeScreen
  // Todo: If user data is not found, navigate to LoginScreen
  // Todo: If user data is found, navigate to HomeScreen

  useEffect(() => {
    redirectToScreens();
  }, []);

  async function redirectToScreens() {
    const userData = await AsyncStorage.getItem("userData");
    if (!_.isEmpty(userData)) {
      router.replace("/(home_screens)");
    } else {
      router.replace('/(auth_screens)/LoginScreen');
    }
  }

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
}
