import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter(); // ✅ Expo Router navigation

  // Load user from AsyncStorage on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, []);

  // ✅ Login Function (Stores user in context & AsyncStorage)
  const login = async (user) => {
    try {
      setCurrentUser(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.push("/(tabs)"); // ✅ Navigate to home (adjust based on your app structure)
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // ✅ Logout Function (Removes user from context & AsyncStorage)
  const logout = async () => {
    try {
      setCurrentUser(null);
      await AsyncStorage.removeItem("user");
      router.push("/menu"); // ✅ Navigate to login/signup screen
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
