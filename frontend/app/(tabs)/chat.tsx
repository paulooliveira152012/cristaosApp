import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

// 🔧 Mock de chats
const chats = [
  {
    id: '1',
    name: 'Gabi',
    type: 'private',
    lastMessage: 'Te mandei o design!',
    time: '2 min ago',
    image: require('../../assets/Gabi.jpg'),
  },
  {
    id: '2',
    name: 'Nova Team',
    type: 'group',
    lastMessage: 'Paulo: Bora subir o projeto hoje?',
    time: '10 min ago',
    image: require('../../assets/placeholder.jpg'),
  },
  {
    id: '3',
    name: 'Lulu Xibiu 🐶',
    type: 'private',
    lastMessage: 'Au au au!',
    time: '30 min ago',
    image: require('../../assets/Lulu.jpg'),
  },
  {
    id: '4',
    name: 'Gabriel',
    type: 'request',
    lastMessage: 'wants to start a conversation',
    time: '1h ago',
    image: require('../../assets/profile.jpg'),
  },
];

const Chat = () => {
  const renderItem = ({ item }: { item: typeof chats[0] }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
      }}
    >
      <Image
        source={item.image}
        style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
        <Text
          style={{
            color: item.type === 'request' ? '#539DF3' : '#777',
            fontSize: 14,
            marginTop: 2,
          }}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 12, color: '#999' }}>{item.time}</Text>
        {item.type === 'request' && (
          <Feather name="mail" size={16} color="#539DF3" style={{ marginTop: 4 }} />
        )}
        {item.type === 'group' && (
          <Feather name="users" size={16} color="#aaa" style={{ marginTop: 4 }} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Conversas</Text>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chat;
