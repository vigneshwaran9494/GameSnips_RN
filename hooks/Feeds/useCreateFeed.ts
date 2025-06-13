import { getDatabase, push, ref } from "firebase/database";
import { useState } from "react";

interface CreateFeedInput {
    title: string;
    description: string;
    image: string;
    creatorName?: string;
}

interface UseCreateFeedReturn {
    createFeed: (feedData: CreateFeedInput) => Promise<{ success: boolean; error?: any }>;
    isLoading: boolean;
}

export function useCreateFeed(): UseCreateFeedReturn {
    const [isLoading, setIsLoading] = useState(false);

    const createFeed = async (feedData: CreateFeedInput) => {
        setIsLoading(true);
        try {

            const db = getDatabase();
            const feedsRef = ref(db, 'feeds');

            const newFeed = {
                id: Date.now(),
                title: feedData.title,
                description: feedData.description,
                image: 'https://picsum.photos/768/1024',
                author: {
                    id: 1,
                    name: feedData.creatorName || "Anonymous",
                    image: "https://picsum.photos/200/300?grayscale"
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                likes: 0,
                comments: 0,
                bookmarks: 0
            };

            await push(feedsRef, newFeed);
            return { success: true };
        } catch (error) {
            console.error("Error creating feed:", error);
            return { success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    return { createFeed, isLoading };
} 