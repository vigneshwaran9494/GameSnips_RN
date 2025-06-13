import BodyContainer from "@/components/ui/BodyContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";

export default function ProfileScreen() {
  
  const handleLogout = () => {
    AsyncStorage.clear();
    router.replace("/(auth_screens)/LoginScreen");
  };

  return (
    <BodyContainer>
      <Text>ProfileScreen</Text>
      <Button title="logout" onPress={handleLogout} />
    </BodyContainer>
  );
}
