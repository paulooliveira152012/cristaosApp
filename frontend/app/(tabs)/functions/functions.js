import * as ImagePicker from "expo-image-picker";

export const handleSubmitNewListing = async (listingData) => {
    console.log("Submitting new listing", listingData);
  
    let listing = {
      createdAt: new Date().toISOString(),
      createdBy: listingData.createdBy,
      type: listingData.type,
    };
  
    switch (listingData.type) {
      case "Post":
        listing.title = listingData.title;
        listing.content = listingData.content;
        break;
  
      case "Imagem":
        listing.image = listingData.image;
        listing.title = listingData.imageDescription;
        break;
  
      case "Enquete":
        listing.question = listingData.question;
        listing.options = listingData.poolOptions || [];
        break;
  
      case "Link":
        listing.link = listingData.link;
        listing.content = listingData.linkDescription;
        break;
  
      case "Chat":
        listing.title = listingData.chatTitle;
        listing.chat = {
          supportsText: true,
          supportsAudio: true, // ou false, dependendo da lógica do app
        };
        break;
  
      case "Grupo":
        listing.title = listingData.groupTitle;
        listing.content = listingData.groupDescription;
        listing.group = {
          chatType: "text", // ou "audio", ou ambos
          members: [], // adiciona se necessário
        };
        break;
  
      default:
        console.warn("Tipo de listagem não reconhecido:", listingData.type);
    }
  
    console.log("📦 Listing to be submitted:", listing);
  
    try {
      const api = "http://localhost:5001/api/listings/newListing";
  
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
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