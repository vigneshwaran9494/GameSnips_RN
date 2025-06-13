import { Stack } from "expo-router";

export default function HomeScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home_tab)" />
      <Stack.Screen name="(screens)" />
    </Stack>
  );
}
