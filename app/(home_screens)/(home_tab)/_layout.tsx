import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

interface Screen {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

/**
 * @description Home tab layout
 * @returns The home tab layout
 */
export default function HomeTabLayout() {
  /**
   * @description Screens for the home tab
   * @type {Array<{name: string, title: string, icon: keyof typeof Ionicons.glyphMap}>}
   */
  const screens: Screen[] = [
    {
      name: "index",
      title: "Home",
      icon: "home" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "SearchScreen",
      title: "Search",
      icon: "search" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "NewFeedScreen",
      title: "NewFeed",
      icon: "add-circle" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "ProfileScreen",
      title: "Profile",
      icon: "person" as keyof typeof Ionicons.glyphMap,
    },
  ];

  /**
   * @description Get the tab bar icon for the given name, focused, color, and size
   * @param name - The name of the icon to display
   * @param focused - Whether the tab is focused
   * @param color - The color of the icon
   * @param size - The size of the icon
   * @returns The icon component
   */
  const getTabBarIcon = (
    name: keyof typeof Ionicons.glyphMap,
    focused: boolean,
    color: string,
    size: number
  ) => {
    return <Ionicons name={name} color={color} size={size} />;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, size, focused }) =>
              getTabBarIcon(screen.icon, focused, color, size),
          }}
        />
      ))}
    </Tabs>
  );
}
