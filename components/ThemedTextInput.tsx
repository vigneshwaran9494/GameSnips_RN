import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { hp } from "@/resources/dimensions";
import { ThemedText } from "./ThemedText";

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  error?: string;
  touched?: boolean;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  error,
  touched,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textPlaceholder"
  );

  return (
    <View style={{ gap: hp(1) }}>
      <View
        style={[
          styles.container,
          { borderColor: color },
          error && touched && { borderColor: "red" },
        ]}
      >
        <TextInput
          placeholderTextColor={placeholderColor}
          style={[
            { color, width: "100%" },
            type === "default" ? styles.default : undefined,
            type === "title" ? styles.title : undefined,
            type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
            type === "subtitle" ? styles.subtitle : undefined,
            type === "link" ? styles.link : undefined,
            style,
          ]}
          {...rest}
        />
      </View>
      {error && touched && (
        <ThemedText style={styles.error}>{error}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Poppins-SemiBold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "Poppins-Regular",
  },
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
   
  },
});
