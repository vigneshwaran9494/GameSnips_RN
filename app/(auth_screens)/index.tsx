import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import _ from "lodash";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function index() {
  const text = "Game Snips";
  const characters = text.split("");
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    // Start animations
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withTiming(1, { duration: 500 });

    const timer = setTimeout(() => {
      redirectToScreens();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  async function redirectToScreens() {
    const userData = await AsyncStorage.getItem("userData");
    if (!_.isEmpty(userData)) {
      router.replace("/(home_screens)");
    } else {
      router.replace("/(auth_screens)/LoginScreen");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        {characters.map((char, index) => {
          const charOpacity = useSharedValue(0);

          useEffect(() => {
            charOpacity.value = withSequence(
              withDelay(index * 100, withTiming(1, { duration: 100 }))
            );
          }, []);

          const charStyle = useAnimatedStyle(() => ({
            opacity: charOpacity.value,
          }));

          return (
            <Animated.Text key={index} style={[styles.text, charStyle]}>
              {char}
            </Animated.Text>
          );
        })}
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    fontWeight: "bold",
    color: "#9badc0",
  },
});
