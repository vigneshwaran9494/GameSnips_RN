import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function SearchScreen() {
  const handleLogout = () => {
    AsyncStorage.clear();
    router.replace("/(auth_screens)/LoginScreen");
  };

  return (
    <View>
      <Text>SearchScreen</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
