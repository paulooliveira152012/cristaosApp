import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const Header = ({
  showMenuIcon = true,
  showBackIcon = false,
  showLogo = true,
}) => {
  const [showMenu, setShowMenu] = useState(false); // ✅ Start with menu closed

  // whenever screen looses focus setShowMenu to false
  useFocusEffect(
    useCallback(() => {
      setShowMenu(false)
    },[])
  )

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {showLogo && <Text style={{ color: "white" }}>Logo Here</Text>}
      </View>

      {/* Full-Screen Side Menu */}
      {showMenu && (
        <MotiView
          from={{ translateX: -300 }} // Start off-screen
          animate={{ translateX: showMenu ? 0 : -300 }} // Slide in/out
          transition={{ type: "timing", duration: 270 }} // Smooth timing transition
          style={styles.sideMenu}
        >
          <SafeAreaView style={styles.menuContent}>
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
          </SafeAreaView>
        </MotiView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute", // ✅ Keeps it at the top
    // backgroundColor: "red",
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 200, // ✅ Certifica que está acima de tudo
  },
  header: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    paddingVertical: 15, // ✅ Adds some padding inside the header
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  /** ✅ FULL-SCREEN MENU **/
  sideMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(0, 0, 0)", // ✅ Dark overlay
    zIndex: 200, // ✅ Above everything
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
