import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
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

// Animation configuration
const ANIMATION_CONFIG = {
  SPLASH_DURATION: 5000,
  ANIMATION_DURATION: 500,
  CHARACTER_DELAY: 100,
  APP_NAME: "Game Snips",
} as const;

// Types
type AnimationConfig = typeof ANIMATION_CONFIG;

// Custom hook for fade and scale animation
const useFadeScaleAnimation = (config: Pick<AnimationConfig, 'ANIMATION_DURATION'>) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: config.ANIMATION_DURATION });
    scale.value = withTiming(1, { duration: config.ANIMATION_DURATION });
  }, [config.ANIMATION_DURATION]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
};

// Custom hook for character animation
const useCharacterAnimation = (
  index: number,
  config: Pick<AnimationConfig, 'CHARACTER_DELAY'>
) => {
  const charOpacity = useSharedValue(0);

  useEffect(() => {
    charOpacity.value = withSequence(
      withDelay(
        index * config.CHARACTER_DELAY,
        withTiming(1, { duration: 100 })
      )
    );
  }, [index, config.CHARACTER_DELAY]);

  return useAnimatedStyle(() => ({
    opacity: charOpacity.value,
  }));
};

export default function SplashScreen() {
  const { userData } = useAuth();
  const characters = ANIMATION_CONFIG.APP_NAME.split("");
  const containerStyle = useFadeScaleAnimation({
    ANIMATION_DURATION: ANIMATION_CONFIG.ANIMATION_DURATION,
  });

  useEffect(() => {
    const timer = setTimeout(redirectToScreens, ANIMATION_CONFIG.SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const redirectToScreens = () => {
    if (!_.isEmpty(userData)) {
      router.replace("/(home_screens)");
    } else {
      router.replace("/(auth_screens)/LoginScreen");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.textContainer, containerStyle]}>
        {characters.map((char, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              useCharacterAnimation(index, {
                CHARACTER_DELAY: ANIMATION_CONFIG.CHARACTER_DELAY,
              }),
            ]}
          >
            {char}
          </Animated.Text>
        ))}
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
