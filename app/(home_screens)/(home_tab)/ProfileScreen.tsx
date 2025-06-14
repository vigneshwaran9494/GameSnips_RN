import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BodyContainer from "@/components/ui/BodyContainer";
import { useAuth } from "@/context/AuthContext";
import { useLoginHooks } from "@/hooks/login/useLoginHooks";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ProfileScreen() {
  const { handleLogout } = useLoginHooks();
  const { userData } = useAuth();

  const renderStatItem = (icon: string, value: string, label: string) => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.statItem}>
      <MaterialIcons name={icon as any} size={24} color="#ff4655" />
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </Animated.View>
  );

  const renderActionButton = (
    icon: string,
    label: string,
    onPress: () => void
  ) => (
    <AnimatedPressable
      entering={FadeInDown.delay(300)}
      style={styles.actionButton}
      onPress={onPress}
    >
      <MaterialIcons name={icon as any} size={24} color="#ff4655" />
      <ThemedText style={styles.actionButtonText}>{label}</ThemedText>
    </AnimatedPressable>
  );

  return (
    <BodyContainer>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <LinearGradient colors={["#ff4655", "#1a1a1a"]} style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={
                userData?.photoURL || "https://avatar.iran.liara.run/public"
              }
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>
                {userData?.displayName || "Anonymous"}
              </ThemedText>
              <ThemedText style={styles.userEmail}>
                {userData?.email}
              </ThemedText>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <ThemedView style={styles.statsContainer}>
          {renderStatItem("favorite", "128", "Likes")}
          {renderStatItem("bookmark", "45", "Saved")}
          {renderStatItem("share", "32", "Shared")}
        </ThemedView>

        {/* Actions Section */}
        <ThemedView style={styles.actionsContainer}>
          <ThemedText style={styles.sectionTitle}>Actions</ThemedText>
          {renderActionButton("logout", "Logout", () => {
            handleLogout();
          })}
        </ThemedView>
      </ScrollView>
    </BodyContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "white",
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    marginTop: -30,
    borderRadius: 15,
    marginHorizontal: 15,
    backgroundColor: "#1a1a1a",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  actionsContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  settingsContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    marginBottom: 10,
  },
  actionButtonText: {
    marginLeft: 15,
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 15,
  },
  logoutButton: {
    backgroundColor: "#ff4655",
  },
});
