import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

/* 
    Listing Details Page
*/

// ✅ Define TypeScript interface for listings
interface ListingItemType {
    type: "Blog" | "Image" | "Video" | "Poll";
    title: string;
    image?: any;
    content?: string;
    videoUrl?: string;
    options?: string[];
}

// ✅ Define navigation type
type RootStackParamList = {
    Listings: undefined;
    ListingDetails: { item: ListingItemType };
};

// ✅ Get route props
const ListingDetails: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, "ListingDetails">>();
    const { item } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>

            {item.type === "Blog" && item.image && (
                <>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.content}>{item.content}</Text>
                </>
            )}

            {item.type === "Image" && item.image && (
                <>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.content}>{item.content}</Text>
                </>
            )}

            {item.type === "Video" && item.videoUrl && (
                <Text style={styles.content}>🎥 Video: {item.videoUrl}</Text>
            )}

            {item.type === "Poll" && item.options && (
                <View>
                    {item.options.map((option, index) => (
                        <Text key={index} style={styles.pollOption}>🔹 {option}</Text>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

// ✅ Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    content: {
        fontSize: 16,
        color: "#333",
        marginTop: 10
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 10
    },
    pollOption: {
        fontSize: 18,
        marginVertical: 5,
        color: "#007bff"
    }
});

export default ListingDetails;
