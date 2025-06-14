import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import BodyContainer from "@/components/ui/BodyContainer";
import { useLoginHooks } from "@/hooks/login/useLoginHooks";
import { hp, wp } from "@/resources/dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Yup from "yup";

// Move validation schema to a separate file in the future
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// Custom hook for animations
const useLoginAnimations = () => {
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);
  const emailInputOpacity = useSharedValue(0);
  const passwordInputOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.9);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleScale.value = withSpring(1, { damping: 8 });
    emailInputOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    passwordInputOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(600, withSpring(1, { damping: 8 }));
  }, []);

  return {
    titleStyle: useAnimatedStyle(() => ({
      opacity: titleOpacity.value,
      transform: [{ scale: titleScale.value }],
    })),
    emailInputStyle: useAnimatedStyle(() => ({
      opacity: emailInputOpacity.value,
    })),
    passwordInputStyle: useAnimatedStyle(() => ({
      opacity: passwordInputOpacity.value,
    })),
    buttonStyle: useAnimatedStyle(() => ({
      opacity: buttonOpacity.value,
      transform: [{ scale: buttonScale.value }],
    })),
  };
};

export default function LoginScreen() {
  const { handleLogin, loading } = useLoginHooks();
  const { titleStyle, emailInputStyle, passwordInputStyle, buttonStyle } = useLoginAnimations();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      const user = await handleLogin(values.email, values.password);
      if (user) {
        console.log("user", user);
      }
    },
  });

  return (
    <BodyContainer>
      <ThemedView style={styles.container}>
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <ThemedText type="title" style={styles.title}>
            Welcome to GameSnips
          </ThemedText>
        </Animated.View>

        <View style={styles.formContainer}>
          <Animated.View style={[styles.animatedContainer, emailInputStyle]}>
            <ThemedTextInput
              type="default"
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#666"
              value={values.email}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
            />
          </Animated.View>

          <Animated.View style={[styles.animatedContainer, passwordInputStyle]}>
            <ThemedTextInput
              type="default"
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#666"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
            />
          </Animated.View>

          <Animated.View style={[styles.animatedButtonContainer, buttonStyle]}>
            <ThemedButton
              title="Login"
              onPress={handleSubmit}
              isLoading={loading}
              disabled={loading}
              icon={<MaterialIcons name="login" size={24} color="white" />}
            />
          </Animated.View>
        </View>
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
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: hp(2),
    width: "100%",
  },
  animatedContainer: {
    width: "100%",
  },
  animatedButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
});
