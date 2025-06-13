import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function MyShowsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>NewFeedScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
