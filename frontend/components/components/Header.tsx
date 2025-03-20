import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  Button,
} from "react-native";

import React, { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useFocusEffect, Link } from "expo-router";

const screenHeight = Dimensions.get("window").height; // ✅ Get full screen height
const profilePicture = require("../../assets/profile.jpg");

const User = {
  profilePicture: require("../../assets/profile.jpg"),
  name: "Paulo",
  about: "Busquem conhecimento",
};

const Header = ({
  showMenuIcon = true,
  showBackIcon = false,
  showLogo = true,
  profileImage = true,
}) => {
  const [showMenu, setShowMenu] = useState(false); // ✅ Start with menu closed

  // Close menu when screen loses focus
  useFocusEffect(
    useCallback(() => {
      setShowMenu(true); //temporarelly true to work on side menu
    }, [])
  );

  return (
    <>
      {/* ✅ Full-Screen Side Menu - Rendered Outside the Header */}
      {showMenu && (
        <MotiView
          from={{ translateX: 300 }}
          animate={{ translateX: 0 }}
          transition={{ type: "timing", duration: 270 }}
          style={[styles.sideMenu, { height: screenHeight }]} // ✅ Full screen height
        >
          {/* Parent */}
          <View style={styles.menuContent}>
            {/* Close Menu Button */}
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowMenu(false)}
            >
              <MaterialIcons name="close" size={28} color={"black"} />
            </Pressable>

            {/* Child */}
            <View style={styles.menuContentTop}>
              <View style={styles.menuContentTopCenter}>
                <Image
                  source={User.profilePicture}
                  style={styles.openMenuProfile}
                />
                <Text style={styles.username}>{User.name}</Text>
                <Text style={styles.about}>{User.about}</Text>
                <Link href={"/profile"}>
                  <Pressable style={styles.profileButton}>
                    <Text style={styles.profileButtonText}>Ver perfil</Text>
                  </Pressable>
                </Link>
              </View>
              <View style={styles.menuContentTopLeft}>
                <Text>Amigos</Text>
                <Text>Salvos</Text>
                <Text>Configurações</Text>
              </View>
            </View>

            {/* Child */}
            <View style={styles.menuContentBottom}>
              <Text>Sair</Text>
            </View>
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

          {showLogo && <Text style={styles.logo}>Logo Here</Text>}

          {/* Menu Icon */}
          {/* {showMenuIcon && (
            <Pressable onPress={() => setShowMenu(true)}>
              <MaterialIcons name="menu" size={28} color={"red"} />
            </Pressable>
          )} */}

          {/* show profile picture/menu icon*/}
          {profileImage && (
            <Pressable onPress={() => setShowMenu(true)}>
              <Image source={profilePicture} style={styles.profileMenuImage} />
            </Pressable>
          )}
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
    padding: 20,
    paddingBottom: 100,
  },
  menuContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    // alignItems: "center",
    justifyContent: "space-between",
  },
  menuContentTop: {
    // backgroundColor: "red"
  },

  username: {
    fontSize: 23,
    fontWeight: "500",
    
  },

  about: {
    color: "#A0A0A0",
  },

  profileButton: {
    // backgroundColor: "#539DF3", // ✅ Background color
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    // marginTop: 10,
  },
  profileButtonText: {
    color: "#539DF3", // ✅ Text color
    fontSize: 18, // ✅ Adjust font size
    fontWeight: "500",
  },

  menuContentTopCenter: {
    alignItems: "center",
  },

  menuContentTopLeft: {
    marginTop: 30,
  },

  openMenuProfile: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },

  menuContentBottom: {
    backgroundColor: "green",
  },

  menuTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 25,
    right: 25,
    zIndex: 100,
  },
  profileMenuImage: {
    objectFit: "cover",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default Header;
