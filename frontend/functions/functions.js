import * as ImagePicker from "expo-image-picker";
import { getBaseApi } from "utils/getBaseApi";

import Constants from "expo-constants";


const baseApi = getBaseApi()


export const handleSubmitNewListing = async (listingData) => {
  console.log("Submitting new listing", listingData);

  const baseListing = {
    createdAt: new Date().toISOString(),
    createdBy: listingData.createdBy,
    type: listingData.type,
  };

  let finalData = { ...baseListing };
  let endpoint = `${baseApi}/api/listings/newListing`; // 👈 default

  switch (listingData.type) {
    case "Thought":
      finalData = {
        ...finalData,
        title: listingData.title?.trim(),
        content: listingData.content?.trim(),
      };
      break;

    case "Image":
      finalData = {
        ...finalData,
        image: listingData.image,
        caption: listingData.imageDescription?.trim(),
      };
      break;

    case "Poll":
      finalData = {
        ...finalData,
        question: listingData.question?.trim(),
        options: listingData.poolOptions || [],
      };
      break;

    case "Link":
      finalData = {
        ...finalData,
        link: listingData.link?.trim(),
        linkDescription: listingData.linkDescription?.trim(),
      };
      break;

    case "Chat":
      finalData = {
        ...finalData,
        title: listingData.chatTitle?.trim(),
        chat: {
          supportsText: true,
          supportsAudio: true,
          description: listingData.chatDescription?.trim(),
        },
      };
      break;

    case "Group":
      endpoint = `${baseApi}/api/groups/newGroup`; // 👈 muda a rota
      finalData = {
        name: listingData.groupTitle?.trim(),
        description: listingData.groupDescription?.trim(),
        createdBy: listingData.createdBy,
        chatType: "text",
      };
      break;

    default:
      console.warn("Tipo de listagem não reconhecido:", listingData.type);
      return;
  }

  console.log("📦 Data to be submitted:", finalData);
  console.log("📨 Endpoint being used:", endpoint);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Created successfully:", data);
    } else {
      console.error("❌ Failed to create:", data.message);
    }
  } catch (error) {
    console.error("❌ Error submitting:", error);
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
