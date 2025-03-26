import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, Pressable, Linking, ScrollView } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useUser } from "context/UserContext";

import Header from "../components/components/Header";

export default function Profile() {
    const { currentUser, logout } = useUser(); // ✅ Extract `currentUser` & `logout`

    console.log("User in profile page:", currentUser);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header /> */}
            <ThemedText style={styles.title}>Profile</ThemedText>

            {currentUser ? (
                <ScrollView style={{ width: "100%"}}>
                    <View style={styles.profileCardContainer}>
                <View style={styles.profileCard}>
                    {/* Profile Picture */}
                    <Image 
                        source={
                            currentUser.profileImage 
                            ? { uri: currentUser.profileImage } 
                            : require("../assets/default-avatar.png") // ✅ Default Avatar
                        } 
                        style={styles.avatar} 
                    />

                    {/* Name */}
                    <ThemedText style={styles.name}>
                        {currentUser.firstName} {currentUser.lastName}
                    </ThemedText>

                    {/* Username */}
                    <ThemedText style={styles.username}>
                        @{currentUser.username}
                    </ThemedText>

                    {/* Email */}
                    <Text style={styles.email}>
                        📧 {currentUser.email}
                    </Text>

                    {/* Phone Number */}
                    {currentUser.phoneNumber && (
                        <Text style={styles.info}>
                            📞 {currentUser.phoneNumber}
                        </Text>
                    )}

                    {/* Church */}
                    {currentUser.church && (
                        <Text style={styles.info}>
                            ⛪ {currentUser.church}
                        </Text>
                    )}

                    {/* Ministry Involvement */}
                    {currentUser.ministry && (
                        <Text style={styles.info}>
                            🙏 Ministry: {currentUser.ministry}
                        </Text>
                    )}

                    {/* Bio */}
                    {currentUser.bio && (
                        <Text style={styles.bio}>
                            📝 {currentUser.bio}
                        </Text>
                    )}

                    {/* Social Media */}
                    <View style={styles.socialContainer}>
                        {currentUser.twitterHandle && (
                            <Pressable 
                                onPress={() => Linking.openURL(`https://twitter.com/${currentUser.twitterHandle}`)}
                                style={styles.socialButton}
                            >
                                <Text style={styles.socialText}>🐦 Twitter: @{currentUser.twitterHandle}</Text>
                            </Pressable>
                        )}

                        {currentUser.instagramHandle && (
                            <Pressable 
                                onPress={() => Linking.openURL(`https://instagram.com/${currentUser.instagramHandle}`)}
                                style={styles.socialButton}
                            >
                                <Text style={styles.socialText}>📷 Instagram: @{currentUser.instagramHandle}</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Logout Button */}
                    <Pressable style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>🚪 Logout</Text>
                    </Pressable>
                </View>
                </View>
                </ScrollView>
            ) : (
                <ThemedText>No user logged in</ThemedText>
            )}
        </SafeAreaView>
    );
}

// ✅ Updated Styles for the Profile Page
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

    profileCardContainer: {
        // backgroundColor: "green",
        display: "flex",
        alignItems: "center",
        flex: 1,
        minHeight: "95%",
        justifyContent: "center"
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
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
    },
    username: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: "#6c757d",
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        color: "#444",
        marginBottom: 5,
    },
    bio: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#666",
        marginVertical: 10,
        textAlign: "center",
    },
    socialContainer: {
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    socialButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        width: "100%",
        alignItems: "center",
    },
    socialText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    logoutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
