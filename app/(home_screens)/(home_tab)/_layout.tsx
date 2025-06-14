import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

interface Screen {
  name: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

/**
 * @description Home tab layout
 * @returns The home tab layout
 */
export default function HomeTabLayout() {
  const tabBarColor = useThemeColor({}, "background");
  const tabBarIconActiveColor = useThemeColor({}, "tabIconSelected");
  const tabBarIconInactiveColor = useThemeColor({}, "tabIconDefault");

  /**
   * @description Screens for the home tab
   * @type {Array<{name: string, title: string, icon: keyof typeof Ionicons.glyphMap}>}
   */
  const screens: Screen[] = [
    {
      name: "index",
      title: "Home",
      icon: "home" as keyof typeof MaterialIcons.glyphMap,
    },
    {
      name: "NewFeedScreen",
      title: "NewFeed",
      icon: "add-box" as keyof typeof MaterialIcons.glyphMap,
    },
    {
      name: "ProfileScreen",
      title: "Profile",
      icon: "person-4" as keyof typeof MaterialIcons.glyphMap,
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
    name: keyof typeof MaterialIcons.glyphMap,
    focused: boolean,
    color: string,
    size: number
  ) => {
    return <MaterialIcons name={name} color={color} size={size} />;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: tabBarColor,
        },
        tabBarActiveTintColor: tabBarIconActiveColor,
        tabBarInactiveTintColor: tabBarIconInactiveColor,
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
