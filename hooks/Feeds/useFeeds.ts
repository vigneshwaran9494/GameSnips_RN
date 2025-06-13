import { FeedListItem } from "@/models/FeedList";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";


interface UseFeedsReturn {
  feeds: FeedListItem[];
  isLoading: boolean;
  error: Error | null;
}

export function useFeeds(): UseFeedsReturn {
  const [feeds, setFeeds] = useState<FeedListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const db = getDatabase();
    const feedsRef = ref(db, 'feeds');

    const handleFeedsUpdate = (snapshot: any) => {
      try {
        const data = snapshot.val();
        if (data) {
          const feedsArray = Object.entries(data)
            .map(([id, feed]: [string, any]) => ({
              id,
              ...feed
            }))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setFeeds(feedsArray);
        } else {
          setFeeds([]);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to process feeds'));
      } finally {
        setIsLoading(false);
      }
    };

    // Set up the listener
    onValue(feedsRef, handleFeedsUpdate, (error) => {
      setError(error);
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => {
      off(feedsRef);
    };
  }, []);

  return { feeds, isLoading, error };
} 