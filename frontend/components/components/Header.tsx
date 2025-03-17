import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import React from "react";

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute", // ✅ Keeps it at the top
    top: 0,
    width: "100%",
    zIndex: 10, // ✅ Ensures it stays above other elements
    
  },
  header: {
    width: "100%",
    backgroundColor: "#1E1E1E", 
    paddingVertical: 15, // ✅ Adds some padding inside the header
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
