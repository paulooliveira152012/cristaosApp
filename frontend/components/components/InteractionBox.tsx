import { View, Text } from 'react-native';
import React from 'react';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ✅ Props definition
type InteractionBoxProps = {
  liked: boolean;             // whether the user has liked
  commented: boolean;         // whether the user has commented
  likesCount?: number;        // total likes
  commentsCount?: number;     // total comments
};

const InteractionBox = ({
  liked,
  commented,
  likesCount = 0,
  commentsCount = 0,
}: InteractionBoxProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
      {/* ❤️ Likes */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {liked ? (
          <IconSymbol size={28} name="heart.fill" color="red" />
        ) : (
          <IconSymbol size={28} name="heart" color="gray" />
        )}
        {likesCount > 0 && <Text>{likesCount}</Text>}
      </View>

      {/* 💬 Comments */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <MaterialCommunityIcons
          name="comment-processing"
          size={28}
          color={commented ? 'blue' : 'gray'}
        />
        {commentsCount > 0 && <Text>{commentsCount}</Text>}
      </View>
    </View>
  );
};

export default InteractionBox;
