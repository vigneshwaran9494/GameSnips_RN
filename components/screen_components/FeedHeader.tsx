import { FeedListItem } from "@/models/FeedList";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

export default function FeedHeader({ data }: { data: FeedListItem }) {
  const { user } = data as any;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: user?.profile_image || "https://avatar.iran.liara.run/public",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.rightContainer}>
          <ThemedText style={styles.name}>{user?.name || "Anonymous"}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  leftContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  rightContainer: {
    flex: 1,
    marginLeft: 12,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
