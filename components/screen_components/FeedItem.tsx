import { FeedListItem } from "@/models/FeedList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FeedAction from "./FeedAction";
import FeedHeader from "./FeedHeader";

export const ImageComponent = memo(({ source }: { source: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <View style={styles.image}>
      <Image
        source={{ uri: source }}
        style={styles.image}
        onLoad={() => {
          setIsLoaded(true);
        }}
        onError={() => {
          setIsError(true);
        }}
      />
      {!isLoaded && (
        <View style={styles.imageOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      {isError && (
        <View style={styles.imageOverlay}>
          <Text style={styles.errorText}>Error loading image</Text>
        </View>
      )}
    </View>
  );
});

const FeedItem = memo(({ item }: { item: FeedListItem }) => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const itemHeight =
    Dimensions.get("window").height - insets.top - tabBarHeight;

  return (
    <View style={[styles.container, { height: itemHeight }]}>
      <ImageComponent source={item.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.platformTag}>
            <Text style={styles.platformText}>Gaming</Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <FeedHeader data={item} />
      <FeedAction data={item} />
    </View>
  );
});

export default FeedItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flex: 1,
  },
  platformTag: {
    backgroundColor: "#ff4655",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  platformText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
