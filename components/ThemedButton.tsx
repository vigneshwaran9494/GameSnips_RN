import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  type ButtonProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
};

export function ThemedButton({
  lightColor,
  darkColor,
  icon,
  title,
  isLoading,
  disabled,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonBackground"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonText"
  );

  const scale = useSharedValue(1);
  const width = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    if (isLoading) {
      scale.value = withSequence(
        withTiming(0.95, { duration: 200 }),
        withSpring(1, { damping: 10 })
      );
      width.value = withTiming(20, { duration: 200 });
    } else {
      width.value = withSpring(100, { damping: 10 });
    }
    return {
      transform: [{ scale: scale.value }],
      width: `${width.value}%`,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        disabled={disabled || isLoading}
        style={[styles.container, { backgroundColor }]}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemedText type="defaultSemiBold" style={[{ color: textColor }]}>
              {title}
            </ThemedText>
            {icon && <View style={{ marginLeft: 8 }}>{icon}</View>}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
