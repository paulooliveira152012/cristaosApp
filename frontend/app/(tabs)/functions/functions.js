import * as ImagePicker from "expo-image-picker";

export const handleSubmitNewListing = async (listingData) => {
    console.log("Submitting new listing", listingData);
  
    const baseListing = {
      createdAt: new Date().toISOString(),
      createdBy: listingData.createdBy,
      type: listingData.type,
    };
  
    let finalListing = { ...baseListing };
  
    switch (listingData.type) {
      case "Post":
        finalListing = {
          ...finalListing,
          title: listingData.title?.trim(),
          content: listingData.content?.trim(),
        };
        break;
  
      case "Imagem":
        finalListing = {
          ...finalListing,
          image: listingData.image,
          caption: listingData.imageDescription?.trim(),
        };
        break;
  
      case "Enquete":
        finalListing = {
          ...finalListing,
          question: listingData.question?.trim(),
          options: listingData.poolOptions || [],
        };
        break;
  
      case "Link":
        finalListing = {
          ...finalListing,
          link: listingData.link?.trim(),
          linkDescription: listingData.linkDescription?.trim(),
        };
        break;
  
      case "Chat":
        finalListing = {
          ...finalListing,
          title: listingData.chatTitle?.trim(),
          chat: {
            supportsText: true,
            supportsAudio: true,
            description: listingData.chatDescription?.trim(), // ✅ Correct field
          },
          description: groupDescription
        };
        break;
  
        case "Grupo":
          finalListing = {
            ...finalListing,
            title: listingData.groupTitle?.trim(),
            group: {
              name: listingData.groupTitle?.trim(),
              description: listingData.groupDescription?.trim(), // Ensure this is included
              chatType: "text",
            },
          };
          break;
        
  
      default:
        console.warn("Tipo de listagem não reconhecido:", listingData.type);
        return;
    }
  
    console.log("📦 Listing to be submitted:", finalListing);
  
    try {
      const api = "http://localhost:5001/api/listings/newListing";
  
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalListing),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ Listing created:", data);
      } else {
        console.error("❌ Failed to create listing:", data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting listing:", error);
    }
  };
  
  
export const handleSelectImage = async (setImage) => {
    console.log("selecting image");
  
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }
  
    // Launch picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ correct
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      console.log("image selected:", selectedUri);
      setImage(selectedUri);
    }
  };