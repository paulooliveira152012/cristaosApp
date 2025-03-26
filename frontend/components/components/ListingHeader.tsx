// components/ListingHeader.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  name?: string;
  username?: string;
  createdAt?: string;
}

const ListingHeader: React.FC<Props> = ({ name, username, createdAt }) => {
  return (
    <View style={styles.listingHeader}>
      <Text style={styles.listedByName}>{name} </Text>
      <Pressable onPress={() => console.log("hey")}>
        <Text style={styles.listedByLinkDate}>@{username} </Text>
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
  listedByName: {
    fontWeight: "500",
  },
  listedByLinkDate: {
    color: "#687684",
  },
});

export default ListingHeader;
