import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { useUser } from "context/UserContext";

export default function Profile() {
    const { currentUser, logout } = useUser(); // ✅ Extract `currentUser` & `logout`

    console.log("User in profile page:", currentUser);

    return (
        <SafeAreaView style={styles.container}>
            <ThemedText style={styles.title}>Profile</ThemedText>

            {currentUser ? (
                <View style={styles.profileCard}>
                    {/* Profile Picture */}
                    <Image 
                        source={
                            currentUser.profileImage 
                            ? { uri: currentUser.profileImage } 
                            : require("../../assets/default-avatar.png") // ✅ Default Avatar
                        } 
                        style={styles.avatar} 
                    />

                    {/* Username */}
                    <ThemedText style={styles.username}>
                        {currentUser.username}
                    </ThemedText>

                    {/* Email */}
                    <Text style={styles.email}>
                        {currentUser.email}
                    </Text>

                    {/* Logout Button */}
                    <Pressable style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </Pressable>
                </View>
            ) : (
                <ThemedText>No user logged in</ThemedText>
            )}
        </SafeAreaView>
    );
}

// ✅ Styles for the Profile Page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    profileCard: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Android Shadow
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#6c757d",
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    logoutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
