import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  Button,
} from "react-native";

import React, { useState, useCallback, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useFocusEffect, Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, usePathname } from "expo-router";

import { useUser } from "context/UserContext";
import { useRoom } from "context/RoomContext";

const screenHeight = Dimensions.get("window").height; // ✅ Get full screen height

const Header = ({
  showMenuIcon = true,
  showBackIcon = true,
  showLogo = true,
  profileImage = true,
  showRoomTitle = true,
  roomMock = null,
  exitRoom = true,
  settingsGear = true
  
}) => {
  const [showMenu, setShowMenu] = useState(false); // ✅ Start with menu closed
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { currentRoomTitle } = useRoom();

  // optional mock fallback title
  const fallbackRoomTitle = "Sala sem nome";

  console.log("log dos parametros", useLocalSearchParams());

  // 1 access to user in context
  const user = useUser();
  // console.log("user in header:", user);
  // console.log("current user in header:", user?.currentUser)
  if (user?.currentUser) {
    console.log("profile image:", user.currentUser.profileImage);
    console.log("✅", user.currentUser._id)
  }

  
  // 2 have a default image when no user is online

  const placeholder = require("../../assets/images/placeholder.png");

  // 3 have defined profile picture (if existent)

  // const profilePicture = user?.currentUser.profileImage

  // const profilePicture = user?.currentUser.profileImage

  // console.log("LoggedIn user's profile", profilePicture)

  // display go back icon only if not in one of these screens: "/", "/explore", "/chat", "/newListing", "/notification"
  const displayGoBack =
    pathname !== "/" &&
    pathname !== "/explore" &&
    pathname !== "/newListing" &&
    pathname !== "/notification" &&
    pathname !== "/chat";

  // display logo on specific pages
  const displayLogo =
    pathname == "/" ||
    pathname == "/explore" ||
    pathname == "/newListing" ||
    pathname == "/notification" ||
    pathname == "/chat";

    // display profile image / menu icon on all but pages except...
    const displayProfileImage = 
    !pathname.startsWith("/room/") &&
    pathname !== `/profile/${user?.currentUser?._id}`;

    const displaySettingsGear =
    pathname.startsWith("/profile/") &&
    pathname === `/profile/${user?.currentUser?._id}`;



  // Close menu when screen loses focus
  useFocusEffect(
    useCallback(() => {
      setShowMenu(true); //temporarelly true to work on side menu
    }, [])
  );

  return (
    <>
      {/* ✅ Full-Screen Side Menu - Rendered Outside the Header */}
      {showMenu && user?.currentUser && (
        <View style={[styles.fullScreenSafeArea, { paddingTop: insets.top }]}>
          <View style={styles.sideMenu}>
            {/* Static Overlay Area (left 10%) */}
            <View style={{ flex: 0.1 }} />

            {/* Animated Side Menu (right 90%) */}
            <MotiView
              from={{ translateX: 300 }}
              animate={{ translateX: 0 }}
              transition={{ type: "timing", duration: 270 }}
              style={styles.menuWrapper}
            >
              <View style={[styles.menuContent, { paddingTop: insets.top }]}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setShowMenu(false)}
                >
                  <MaterialIcons name="close" size={28} color={"black"} />
                </Pressable>

                {/* Top */}
                <View style={styles.menuContentTop}>
                  <View style={styles.menuContentTopCenter}>
                    <Image
                      source={
                        user?.currentUser?.profileImage
                          ? { uri: user.currentUser.profileImage }
                          : placeholder
                      }
                      style={styles.openMenuProfile}
                       resizeMode="cover" // ✅ Aqui!
                    />

                    <Text style={styles.username}>
                      {user?.currentUser.firstName}
                    </Text>
                    <Text style={styles.about}>{user?.currentUser.bio}</Text>
                    <Link href={"/profile"}>
                      <Pressable
                        style={styles.profileButton}
                        onPress={() => {
                          setShowMenu(false);
                          router.push(`/profile/${user.currentUser._id}`);
                        }}
                      >
                        <Text style={styles.profileButtonText}>Ver perfil</Text>
                      </Pressable>
                    </Link>
                  </View>
                  <View style={styles.menuContentTopLeft}>
                    <Pressable>
                      <Text style={styles.textStyle}>Amigos</Text>
                    </Pressable>

                    <Pressable>
                      <Text style={styles.textStyle}>Salvos</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setShowMenu(false);
                        router.push("/SettingsMain");
                      }}
                    >
                      <Text style={styles.textStyle}>Settings</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Bottom */}
                <View style={styles.menuContentBottom}>
                  <Text style={styles.logoutBtn}>Sair</Text>
                </View>
              </View>
            </MotiView>
          </View>
        </View>
      )}

      {showMenu && !user?.currentUser && (
        <View style={[styles.fullScreenSafeArea, { paddingTop: insets.top }]}>
          <View style={styles.sideMenu}>
            <MotiView
              from={{ translateX: 300 }}
              animate={{ translateX: 0 }}
              transition={{ type: "timing", duration: 270 }}
              style={styles.menuWrapper}
            >
              <View style={[styles.menuContent, { paddingTop: insets.top }]}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setShowMenu(false)}
                >
                  <MaterialIcons name="close" size={28} color={"black"} />
                </Pressable>

                <View style={styles.menuContentTopCenter}>
                  <Text style={styles.username}>Olá!</Text>
                  <Pressable
                    style={styles.profileButton}
                    onPress={() => {
                      router.push("/login");
                      setShowMenu(false);
                    }}
                  >
                    <Text style={styles.profileButtonText}>Login</Text>
                  </Pressable>
                </View>
              </View>
            </MotiView>
          </View>
        </View>
      )}

      {/* ✅ Header Bar */}
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Back Icon */}
          {displayGoBack && showBackIcon && (
            <Pressable onPress={() => router.push("/")}>
              <MaterialIcons
                name="arrow-back-ios"
                size={28}
                color={"#539DF3"}
              />
            </Pressable>
          )}

          {showLogo && displayLogo && (
            <Text style={styles.logo}>Logo Here</Text>
          )}

          {/* room title only on chat room */}
          {pathname.startsWith("/room/") && (
            <Text style={styles.logo}>
              {currentRoomTitle || fallbackRoomTitle}
            </Text>
          )}

          {/* exit room (only on room) */}
          {pathname.startsWith("/room/") && (
            <View>
                <Text>Sair</Text>
            </View>
          )}

          {/* Menu Icon */}
          {/* {showMenuIcon && (
            <Pressable onPress={() => setShowMenu(true)}>
            <MaterialIcons name="menu" size={28} color={"red"} />
            </Pressable>
            )} */}

          {/* show profile picture/menu icon*/}
          {profileImage && displayProfileImage && (
            <Pressable onPress={() => setShowMenu(true)}>
              <Image
                source={
                  user?.currentUser?.profileImage
                    ? { uri: user.currentUser.profileImage }
                    : placeholder
                }
                style={styles.profileMenuImage}
              />
            </Pressable>
          )}

          {settingsGear && displaySettingsGear &&(
            <Pressable onPress={() => router.push("/SettingsMain")}>
              <Text>Settings</Text>
            </Pressable>
          )}

        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fullScreenSafeArea: {
    flex: 1,
    backgroundColor: "transparent", // deixa o fundo intacto
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 300,
  },

  safeAreaMenu: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  menuWrapper: {
    flex: 0.9, // 90% da tela
    backgroundColor: "white",
  },

  container: {
    width: "100%",
    // backgroundColor: "#1E1E1E",
    backgroundColor: "#fff",
    zIndex: 200, // ✅ Keeps it above other elements
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 0.5,
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
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  /** ✅ FULL-SCREEN MENU **/
  sideMenu: {
    flex: 1,
    flexDirection: "row", // divide 90%/10%
    backgroundColor: "rgba(0,0,0,0.5)", // overlay
    width: "100%",
    justifyContent: "flex-end",
  },
  menuContent: {
    width: "100%", // ✅ só 90% da tela
    height: "100%",
    backgroundColor: "white",
    padding: 20,
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
    fontSize: 50,
  },

  textStyle: {
    fontSize: 16,
    lineHeight: 30,
  },

  openMenuProfile: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },

  menuContentBottom: {},

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
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: "#eee"
  },

  logoutBtn: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Header;
