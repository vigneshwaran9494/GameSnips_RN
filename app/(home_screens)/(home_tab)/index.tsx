import FeedItem from "@/components/screen_components/FeedItem";
import BodyContainer from "@/components/ui/BodyContainer";
import { useFeeds } from "@/hooks/Feeds/useFeeds";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = useBottomTabBarHeight();
  const itemHeight =
    Dimensions.get("window").height - insets.top - tabBarHeight;

  const { feeds, isLoading, error } = useFeeds();

  if (isLoading) {
    return (
      <BodyContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </BodyContainer>
    );
  }

  if (error) {
    return (
      <BodyContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Error loading feeds: {error.message}</Text>
        </View>
      </BodyContainer>
    );
  }

  return (
    <BodyContainer>
      <FlatList
        onRefresh={() => {
          console.log("refreshing");
        }}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            colors={["#ff4655"]}
            tintColor={"#ff4655"}
            onRefresh={() => {
              console.log("refreshing");
            }}
          />
        }
        data={feeds}
        keyExtractor={(item) => `${item.id}-${item.createdAt}`}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemHeight}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        renderItem={({ item }) => <FeedItem item={item} />}
      />
    </BodyContainer>
  );
}
