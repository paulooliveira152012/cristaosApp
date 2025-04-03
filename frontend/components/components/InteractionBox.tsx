import { View, Text, Pressable } from "react-native";
import React from "react";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { 
  handleComment,
  handleLike,
  handleSave
 } from "./functions/functions";

// ✅ Props definition
type InteractionBoxProps = {
  liked: boolean; // whether the user has liked
  commented: boolean; // whether the user has commented
  saved: boolean;
  likesCount?: number; // total likes
  commentsCount?: number; // total comments
};

const InteractionBox = ({
  liked,
  commented,
  saved,
  likesCount = 0,
  commentsCount = 0,
}: InteractionBoxProps) => {
  return (
    <View style={{ ...styles.container }}>
      {/* ❤️ Likes */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Pressable onPress={handleLike}>
          {liked ? (
            <IconSymbol
              size={23}
              name="heart.fill"
              color="red"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 5, // needed for Android
              }}
            />
          ) : (
            <IconSymbol size={23} name="heart" color="gray" />
          )}
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
