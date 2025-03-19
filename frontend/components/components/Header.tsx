import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useFocusEffect } from "expo-router";

const screenHeight = Dimensions.get("window").height; // ✅ Get full screen height

const Header = ({
  showMenuIcon = true,
  showBackIcon = false,
  showLogo = true,
}) => {
  const [showMenu, setShowMenu] = useState(false); // ✅ Start with menu closed

  // Close menu when screen loses focus
  useFocusEffect(
    useCallback(() => {
      setShowMenu(false);
    }, [])
  );

  return (
    <>

        {/* ✅ Full-Screen Side Menu - Rendered Outside the Header */}
        {showMenu && (
        <MotiView
          from={{ translateX: -300 }}
          animate={{ translateX: 0 }}
          transition={{ type: "timing", duration: 270 }}
          style={[styles.sideMenu, { height: screenHeight }]} // ✅ Full screen height
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Menu</Text>

            {/* Close Menu Button */}
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowMenu(false)}
            >
              <MaterialIcons name="close" size={28} color={"white"} />
            </Pressable>
          </View>
        </MotiView>
      )}

      {/* ✅ Header Bar */}
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Back Icon */}
          {showBackIcon && (
            <Pressable>
              <MaterialIcons name="arrow-back-ios" size={28} color={"red"} />
            </Pressable>
          )}

          {/* Menu Icon */}
          {showMenuIcon && (
            <Pressable onPress={() => setShowMenu(true)}>
              <MaterialIcons name="menu" size={28} color={"red"} />
            </Pressable>
          )}

          {showLogo && <Text style={styles.logo}>Logo Here</Text>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    zIndex: 200, // ✅ Keeps it above other elements
  },
  header: {
    width: "100%",
    paddingVertical: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  /** ✅ FULL-SCREEN MENU **/
  sideMenu: {
    // position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // ✅ Semi-transparent overlay
    zIndex: 300, // ✅ Ensure it's on top
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
    alignItems: "center",
  },
  menuTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default Header;
