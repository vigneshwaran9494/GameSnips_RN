import {
  StyleSheet,
  TouchableOpacity,
  View,
  type ButtonProps,
} from "react-native";

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

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} {...rest}>
      <ThemedText type="defaultSemiBold" style={[{ color: textColor }]}>
        {title}
      </ThemedText>
      {icon && <View style={{ marginLeft: 8 }}>{icon}</View>}
    </TouchableOpacity>
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
