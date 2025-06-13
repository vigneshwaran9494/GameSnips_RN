import { FeedListItem } from "@/models/FeedList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedItem({ item }: { item: FeedListItem }) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const itemHeight =
    Dimensions.get("window").height - insets.top - tabBarHeight;

  console.log(insets);

  return (
    <View style={[styles.container, { height: itemHeight }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
});
