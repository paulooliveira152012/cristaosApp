import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

// Mocked notifications
const notifications = [
  {
    id: '1',
    type: 'friend_request',
    user: 'Gabi',
    message: 'sent you a friend request',
    time: '2 min ago',
  },
  {
    id: '2',
    type: 'comment',
    user: 'Paulo',
    message: 'commented on your post',
    time: '10 min ago',
  },
  {
    id: '3',
    type: 'mention',
    user: 'Lulu Xibiu',
    message: 'mentioned you in a post',
    time: '30 min ago',
  },
  {
    id: '4',
    type: 'like',
    user: 'Pedro',
    message: 'liked your post',
    time: '1h ago',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'friend_request':
      return 'user-plus';
    case 'comment':
      return 'message-circle';
    case 'mention':
      return 'at-sign';
    case 'like':
      return 'heart';
    default:
      return 'bell';
  }
};

const Notification = () => {
  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
      }}
    >
      <Feather
        name={getIcon(item.type) as any}
        size={20}
        color="#539DF3"
        style={{ marginRight: 12 }}
      />
      <View>
        <Text style={{ fontSize: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.user}</Text> {item.message}
        </Text>
        <Text style={{ fontSize: 13, color: '#999' }}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Notificações</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notification;
