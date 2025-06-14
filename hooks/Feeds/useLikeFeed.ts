import { useAuth } from "@/context/AuthContext";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";

interface UseLikeFeedReturn {
  likes: number;
  isLiked: boolean;
  toggleLike: () => Promise<void>;
  isLoading: boolean;
}

export function useLikeFeed(feedId: string): UseLikeFeedReturn {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useAuth();

  useEffect(() => {
    const db = getDatabase();
    const feedRef = ref(db, `feeds/${feedId}`);
    const likesRef = ref(db, `feeds/${feedId}/likes`);
    const userLikeRef = ref(db, `userLikes/${userData?.uid}/${feedId}`);

    // Listen for likes count changes
    const unsubscribeLikes = onValue(likesRef, (snapshot) => {
      const likesCount = snapshot.val() || 0;
      setLikes(likesCount);
      setIsLoading(false);
    });

    // Listen for user's like status
    const unsubscribeUserLike = onValue(userLikeRef, (snapshot) => {
      setIsLiked(snapshot.val() === true);
    });

    return () => {
      unsubscribeLikes();
      unsubscribeUserLike();
    };
  }, [feedId, userData?.uid]);

  const toggleLike = async () => {
    if (!userData) return;

    const db = getDatabase();
    const feedRef = ref(db, `feeds/${feedId}`);
    const userLikeRef = ref(db, `userLikes/${userData.uid}/${feedId}`);

    try {
      setIsLoading(true);
      const newLikeStatus = !isLiked;
      const newLikesCount = likes + (newLikeStatus ? 1 : -1);

      // Update both the likes count and user's like status
      await Promise.all([
        set(ref(db, `feeds/${feedId}/likes`), newLikesCount),
        set(userLikeRef, newLikeStatus)
      ]);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { likes, isLiked, toggleLike, isLoading };
} 