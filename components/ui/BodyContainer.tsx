import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView, StyleSheet } from "react-native";

/**
 * A container that wraps the main content of the screen.
 * It also provides a safe area for the content to be displayed.
 * @param children - The children to be displayed in the container.
 * @returns A container that wraps the main content of the screen.
 */
export default function BodyContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
