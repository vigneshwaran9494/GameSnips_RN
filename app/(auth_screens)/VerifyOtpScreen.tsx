import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BodyContainer from "@/components/ui/BodyContainer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hp, wp } from "@/resources/dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Animated from "react-native-reanimated";

export default function VerifyOtpScreen() {
  const handleVerify = () => {};

  const textColor = useThemeColor({}, "text");

  return (
    <BodyContainer>
      <ThemedView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Animated.View style={[styles.titleContainer]}>
          <ThemedText type="title" style={styles.title}>
            Welcome to GameSnips
          </ThemedText>
        </Animated.View>

        <OtpInput
          numberOfDigits={6}
          focusColor="#00BFFF"
          textProps={{
            style: {
              color: textColor,
            },
          }}
          autoFocus={false}
          hideStick={true}
          placeholder="******"
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
        />

        <Animated.View style={[]}>
          <ThemedButton title="Verify" onPress={handleVerify} />
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
