import BodyContainer from "@/components/ui/BodyContainer";
import { useLoginHooks } from "@/hooks/login/useLoginHooks";
import React from "react";
import { Button, Text } from "react-native";

export default function ProfileScreen() {
  const { handleLogout } = useLoginHooks();
  

  return (
    <BodyContainer>
      <Text>ProfileScreen</Text>
      <Button title="logout" onPress={handleLogout} />
    </BodyContainer>
  );
}
