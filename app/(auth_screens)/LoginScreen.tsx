import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function LoginScreen() {
  const handleLogin = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      })
    );
    router.replace("/(home_screens)");
  };

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
