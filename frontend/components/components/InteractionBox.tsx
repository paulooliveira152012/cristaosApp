import { View, Text, Pressable } from "react-native";
import React from "react";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ListingItemType } from "./Types/ListingTypes";

import { handleComment, handleLike, handleSave } from "./functions/functions";

// ✅ Props definition
type InteractionBoxProps = {
  liked: boolean;
  commented: boolean;
  saved: boolean;
  likesCount?: number;
  commentsCount?: number;
  listingId: string;
  userId: string;
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>;
};

const InteractionBox = ({
  liked,
  commented,
  saved,
  likesCount = 0,
  commentsCount = 0,
  listingId,
  userId, // ✅ agora estão no escopo
  setListings, // 👈 agora está disponível
}: InteractionBoxProps) => {
  return (
    <View style={{ ...styles.container }}>
      {/* ❤️ Likes */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Pressable onPress={() => handleLike(listingId, userId, setListings)}>
          <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={23}
            color={liked ? "red" : "gray"}
          />
        </Pressable>
        {likesCount > 0 && <Text>{likesCount}</Text>}
      </View>

      {/* 💬 Comments */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Pressable onPress={handleComment}>
          <MaterialCommunityIcons
            name="comment-processing"
            size={23}
            color={commented ? "gray" : "gray"}
          />
        </Pressable>
        {commentsCount > 0 && <Text>{commentsCount}</Text>}
      </View>

      <View style={styles.bookmark}>
        {/* BookmarkOutline */}
        <Pressable onPress={handleSave}>
          <MaterialCommunityIcons
            name="bookmark"
            size={23}
            color={saved ? "#539DF3" : "gray"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  bookmark: {
    position: "absolute",
    right: 0,
  },
});

export default InteractionBox;
