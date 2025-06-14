import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import BodyContainer from "@/components/ui/BodyContainer";
import { hp, wp } from "@/resources/dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function LoginScreen() {
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);
  const inputOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.9);

  useEffect(() => {
    // Animate title
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleScale.value = withSpring(1, { damping: 8 });

    // Animate input with delay
    inputOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));

    // Animate button with delay
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(600, withSpring(1, { damping: 8 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const inputStyle = useAnimatedStyle(() => ({
    opacity: inputOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  const handleLogin = () => {
    router.push("/(auth_screens)/VerifyOtpScreen");
  };

  return (
    <BodyContainer>
      <ThemedView style={styles.container}>
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <ThemedText type="title" style={styles.title}>
            Welcome to GameSnips
          </ThemedText>
        </Animated.View>

        <Animated.View
          style={[
            inputStyle,
            {
              flexDirection: "row",
              gap: wp(2),
            },
          ]}
        >
          <View style={styles.countryCode}>
            <ThemedText type="default">+1</ThemedText>
          </View>
          <ThemedTextInput
            type="default"
            placeholder="Phone Number"
            style={styles.phoneNumberInput}
            placeholderTextColor="#666"
          />
        </Animated.View>

        <Animated.View style={[buttonStyle]}>
          <ThemedButton
            title="Login"
            onPress={handleLogin}
            icon={<MaterialIcons name="login" size={24} color="white" />}
          />
        </Animated.View>
      </ThemedView>
    </BodyContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    marginTop: hp(10),
    gap: hp(4),
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: hp(6),
  },
  title: {
    fontSize: wp(8),
    color: "#fff",
    textShadowColor: "rgba(0, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  countryCode: {
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 16,
  },
  subtitle: {
    fontSize: wp(4),
    color: "#666",
    marginTop: hp(1),
  },
  formContainer: {
    gap: hp(2),
  },
  phoneNumberInput: {},
  buttonContainer: {
    marginTop: hp(4),
  },
  loginButton: {},
});
