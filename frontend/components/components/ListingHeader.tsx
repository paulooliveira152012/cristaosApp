import { router } from "expo-router";
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

interface Props {
  userId?: string;
  name?: string;
  username?: string;
  createdAt?: string;
  profileImage?: string;
}

const ListingHeader: React.FC<Props> = ({
  userId,
  name,
  username,
  profileImage,
  createdAt,
}) => {
  const handleNavigate = () => {
    console.log("navigating...")
    if (userId) {
      router.push(`/profile/${userId}`);
      console.log("✅ Navegação para o perfil iniciada");
    }
  };

  return (
    <View style={styles.listingHeader}>
      <Pressable style={styles.profileNavigationClickArea} onPress={handleNavigate}>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        )}
        <Text style={styles.listedByLinkDate}>@{username}</Text>
      </Pressable>
      <Text style={styles.listedByLinkDate}>· {createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileNavigationClickArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  listedByName: {
    fontWeight: "500",
  },
  listedByLinkDate: {
    color: "#687684",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
});

export default ListingHeader;
