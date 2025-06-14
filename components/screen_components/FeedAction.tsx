import { useLikeFeed } from "@/hooks/Feeds/useLikeFeed";
import { FeedListItem } from "@/models/FeedList";
import { hp, wp } from "@/resources/dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FeedAction({ data }: { data: FeedListItem }) {
  const { likes, isLiked, toggleLike, isLoading } = useLikeFeed(data.id.toString());

  const createAnimation = () => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.9, { damping: 10 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 10 });
    };

    return { animatedStyle, handlePressIn, handlePressOut };
  };

  const likeAnimation = createAnimation();
  const shareAnimation = createAnimation();
  const bookmarkAnimation = createAnimation();

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[styles.actionContainer, likeAnimation.animatedStyle]}
        onPressIn={likeAnimation.handlePressIn}
        onPressOut={likeAnimation.handlePressOut}
        onPress={toggleLike}
        disabled={isLoading}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.1)", ""]}
          style={styles.gradient}
        >
          <MaterialIcons 
            name={isLiked ? "favorite" : "favorite-border"} 
            size={24} 
            color={isLiked ? "#ff4655" : "white"} 
          />
          <ThemedText style={styles.count}>{likes}</ThemedText>
        </LinearGradient>
      </AnimatedPressable>

      <AnimatedPressable
        style={[styles.actionContainer, shareAnimation.animatedStyle]}
        onPressIn={shareAnimation.handlePressIn}
        onPressOut={shareAnimation.handlePressOut}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.1)", ""]}
          style={styles.gradient}
        >
          <MaterialIcons name="share" size={24} color="white" />
        </LinearGradient>
      </AnimatedPressable>

      <AnimatedPressable
        style={[styles.actionContainer, bookmarkAnimation.animatedStyle]}
        onPressIn={bookmarkAnimation.handlePressIn}
        onPressOut={bookmarkAnimation.handlePressOut}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.1)", ""]}
          style={styles.gradient}
        >
          <MaterialIcons name="bookmark" size={24} color="white" />
        </LinearGradient>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    gap: hp(2),
    right: wp(2),
    height: "100%",
    zIndex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  actionContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: hp(0.5),
  },
  count: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
});
