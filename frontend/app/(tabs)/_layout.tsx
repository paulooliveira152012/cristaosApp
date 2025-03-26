import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "../../components/HapticTab";
import { IconSymbol } from "../../components/ui/IconSymbol";
import TabBarBackground from "../../components/ui/TabBarBackground";
import { Colors } from "constants/Colors";
import { useColorScheme } from "hooks/useColorScheme.web";
import { MaterialIcons } from "@expo/vector-icons";
import { getBackgroundColorAsync } from "expo-system-ui";

// import { UserProvider } from "context/UserContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // <UserProvider>
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: "#539DF3", // ativo
        tabBarInactiveTintColor: "#888888", // inativo
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass" color={color} />
          ),
        }}
      />

      {/* I want to style this one differently */}
      <Tabs.Screen
        name="newListing"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={46}
              name="plus"
              color="white"
              style={{
                backgroundColor: "#539DF3",
                borderRadius: 50,
                padding: 14,
                
                marginBottom: Platform.OS === "ios" ? 30 : 0,
                elevation: 5,
              }}
            />
          ),
          tabBarLabel: () => null, // Hide label
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bell.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="wechat" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
    // </UserProvider>
  );
}
