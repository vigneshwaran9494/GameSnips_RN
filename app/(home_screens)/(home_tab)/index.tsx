import FeedItem from "@/components/screen_components/FeedItem";
import BodyContainer from "@/components/ui/BodyContainer";
import { FeedList } from "@/models/FeedList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mockData: FeedList = {
  items: [
    {
      id: 1,
      title: "The Last of Us",
      description:
        "The Last of Us is a 2023 post-apocalyptic action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      likes: 10,
      comments: 10,
      bookmarks: 10,
      author: {
        id: 1,
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 2,
      title: "God of War: Ragnarok",
      description:
        "Kratos and Atreus return in this mythological action-adventure sequel set in the Norse realm.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-02-01",
      updatedAt: "2021-02-01",
      likes: 25,
      comments: 14,
      bookmarks: 12,
      author: {
        id: 2,
        name: "Jane Smith",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 3,
      title: "Horizon Forbidden West",
      description:
        "Explore a post-apocalyptic world full of mechanical beasts in this sequel to Horizon Zero Dawn.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-03-01",
      updatedAt: "2021-03-01",
      likes: 30,
      comments: 22,
      bookmarks: 19,
      author: {
        id: 3,
        name: "Alice Johnson",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 4,
      title: "Elden Ring",
      description:
        "A dark fantasy open-world RPG co-created by Hidetaka Miyazaki and George R.R. Martin.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-04-01",
      updatedAt: "2021-04-01",
      likes: 50,
      comments: 40,
      bookmarks: 33,
      author: {
        id: 4,
        name: "Rick Sanchez",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 5,
      title: "Cyberpunk 2077",
      description:
        "Set in Night City, this RPG offers futuristic combat and deep narrative choices.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-05-01",
      updatedAt: "2021-05-01",
      likes: 40,
      comments: 30,
      bookmarks: 20,
      author: {
        id: 5,
        name: "Morty Smith",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 6,
      title: "Red Dead Redemption 2",
      description:
        "A Western-themed action-adventure game known for its deep story and immersive world.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-06-01",
      updatedAt: "2021-06-01",
      likes: 60,
      comments: 35,
      bookmarks: 25,
      author: {
        id: 6,
        name: "Lara Croft",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 7,
      title: "Assassin's Creed Valhalla",
      description:
        "Join Eivor, a Viking raider, as you explore and conquer parts of England.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-07-01",
      updatedAt: "2021-07-01",
      likes: 33,
      comments: 18,
      bookmarks: 16,
      author: {
        id: 7,
        name: "Ezio Auditore",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 8,
      title: "Ghost of Tsushima",
      description:
        "Jin Sakai defends Tsushima Island from Mongol invaders in feudal Japan.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
      likes: 45,
      comments: 28,
      bookmarks: 22,
      author: {
        id: 8,
        name: "Samurai Jack",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 9,
      title: "Spider-Man: Miles Morales",
      description:
        "Discover Miles Morales’ powers as he protects New York City in this superhero adventure.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
      likes: 38,
      comments: 21,
      bookmarks: 17,
      author: {
        id: 9,
        name: "Peter Parker",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 10,
      title: "Resident Evil Village",
      description:
        "A gothic survival horror experience featuring castles, monsters, and mystery.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-10-01",
      updatedAt: "2021-10-01",
      likes: 29,
      comments: 19,
      bookmarks: 14,
      author: {
        id: 10,
        name: "Leon Kennedy",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 11,
      title: "Death Stranding",
      description:
        "Hideo Kojima’s unique delivery-based survival game set in a fractured world.",
      image: "https://picsum.photos/1280/720",
      createdAt: "2021-11-01",
      updatedAt: "2021-11-01",
      likes: 35,
      comments: 23,
      bookmarks: 18,
      author: {
        id: 11,
        name: "Norman Reedus",
        image: "https://via.placeholder.com/150",
      },
    },
  ],
};

export default function index() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = useBottomTabBarHeight();
  const itemHeight =
    Dimensions.get("window").height - insets.top - tabBarHeight;

  return (
    <BodyContainer>
      <FlatList
        style={{}}
        data={mockData.items}
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
