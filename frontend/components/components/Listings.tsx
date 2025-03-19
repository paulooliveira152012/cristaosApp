import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React from 'react';

/* 
    Type of listings:
    - Blog
    - Image
    - Video
    - Poll
*/

// ✅ Define TypeScript interface for listings
interface ListingItemType {
    type: "Blog" | "Image" | "Video" | "Poll"; // ✅ Restrict possible values
    title: string;
    image?: any; // ✅ Type for require() images
    content?: string;
    videoUrl?: string;
    options?: string[];
}

// ✅ Define listing data with proper typing
const ListingsList: ListingItemType[] = [
    { 
        type: "Blog",
        title: "My Photo",
        image: require("../../assets/profile.jpg"),
        content: "My name is Paulo Oliveira. I am a programmer and entrepreneur based in Linden, NJ. I run Nova, a digital agency creating high-quality websites. I also work on a delivery app, explore APIs, and trade. My girlfriend, Gabriella, is a designer, and we are in the K1 visa process. We share a love for tech, business, and our dog Lua."
    },
    {
        type: "Image",
        title: "Beautiful Sunset",
        image: require("../../assets/sunset.jpg"),
        content: "Captured this amazing sunset in São Paulo! 🌅"
    },
    {
        type: "Video",
        title: "React Native Tips",
        videoUrl: "https://www.example.com/video.mp4",
        content: "Check out my latest tips on React Native development! 🚀"
    },
    {
        type: "Poll",
        title: "What's your favorite programming language?",
        options: ["JavaScript", "Python", "C++", "Go"]
    }
];

// ✅ Define ListingItem component with proper typing
const ListingItem: React.FC<{ item: ListingItemType }> = ({ item }) => {
    return (
        <View style={styles.listingContainer}>
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
                    {item.options.map((option: string, index: number) => (
                        <Text key={index} style={styles.pollOption}>🔹 {option}</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

// ✅ Main Listings Component
const Listings: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={ListingsList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ListingItem item={item} />}
            />
        </View>
    );
};

// ✅ Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    listingContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    content: {
        fontSize: 14,
        color: "#333",
        marginTop: 5
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginTop: 10
    },
    pollOption: {
        fontSize: 16,
        marginVertical: 2,
        color: "#007bff"
    }
});

export default Listings;
