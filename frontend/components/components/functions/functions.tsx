import Listings from "../Listings";
import { ListingItemType } from "../Types/ListingTypes";
import Constants from "expo-constants"; // ✅ certo
import { getBaseApi } from "utils/getBaseApi";


const baseApi = getBaseApi()
  
// const baseApi = 
//   Constants.expoConfig?.extra?.apiUrl ?? "https://67bd-2601-8c-4c80-5f70-418d-a4a-d148-b16a.ngrok-free.app/";

console.log("🔗 baseApi:", baseApi);



var environment = "production"

// const baseApi = environment === "development" ? 
//   "http://localhost:5001" : 
//   "https://1b9a-2601-8c-4c80-5f70-207d-abab-7889-aaa8.ngrok-free.app"


export const getRooms = async (setRooms: (rooms: any[]) => void) => {
  console.log("📡 Fetching all rooms...");

  try {
    const api = `${baseApi}/api/rooms/getRooms`;
    const response = await fetch(api, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar salas: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Salas encontradas:", data);
    setRooms(data);
    return data;
  } catch (error) {
    console.error("❌ Erro em getRooms:", error);
    return null; // ou [] se quiser evitar erros no componente
  }
};

export const getListings = async (setListings: (listings: any[]) => void) => {
  console.log("get listings function reached");
  try {
    const api = `${baseApi}/api/listings/getListings`;
    const response = await fetch(api, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (!response.ok) {
        throw new Error(`Error fetching listings, status ${response.status}`);
      }
    }

    const data = await response.json();
    console.log("1️⃣ fetched listings:", data);

    setListings(data);
    return data;
  } catch (error) {
    console.log("❌ error fetching listings", error);
    return null;
  }
};

// interaction funcitons
export const handleLike = async (
  listingId: string,
  userId: string,
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>,
  commentId?: string // 👈 novo argumento opcional
) => {
  console.log("🧠 liking/unliking listing");
  console.log("commentId? :", commentId);

  try {
    const api = commentId
      ? `${baseApi}/api/listings/likeComment`
      : `${baseApi}/api/listings/likeListing`;

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingId,
        userId,
        commentId,
      }),
    });

    const data = await response.json();
    console.log("🔁 API like response:", data);

    if (response.ok) {
      if (commentId) {
        // Atualiza comentários do listing
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === listingId
              ? { ...data.updatedListing } // 👈 atualiza tudo (incluindo commentedBy)
              : listing
          )
        );
      } else if (data.likedBy) {
        // Atualiza apenas likedBy do listing
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === listingId
              ? { ...listing, likedBy: data.likedBy }
              : listing
          )
        );
      }
    } else {
      console.warn("❌ Failed to like listing:", data.message);
    }
  } catch (error) {
    console.error("❌ Error liking listing:", error);
  }
};

export const handleComment = async (
  commentText: string,
  listingId: string,
  userId: string,
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>
) => {
  console.log("✍️ commenting listing", { commentText, listingId, userId });

  try {
    const api = `${baseApi}/api/listings/addComment`;

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentText, listingId, userId }),
    });

    if (!response.ok) {
      throw new Error(`Error commenting listings, status ${response.status}`);
    }

    const newComment = await response.json(); // comentário populado
    console.log("✅ Novo comentário:", newComment);

    // Atualiza listagem com novo comentário
    setListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing._id === listingId) {
          return {
            ...listing,
            commentedBy: [...(listing.commentedBy || []), newComment],
          };
        }
        return listing;
      })
    );
  } catch (error) {
    console.log("❌ Erro ao comentar:", error);
  }
};


export const handleReply = async (
  replyText: string,
  parentCommentId: string,
  listingId: string,
  userId: string,
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>
) => {
  try {
    const res = await fetch(`${baseApi}/api/listings/replyComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        replyText,
        parentCommentId,
        listingId,
        userId,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setListings((prev: ListingItemType[]) =>
        prev.map((listing) =>
          listing._id === listingId ? data.updatedListing : listing
        )
      );
    } else {
      console.warn("❌ Failed to reply:", data.message);
    }
  } catch (error) {
    console.error("❌ Error replying to comment:", error);
  }
};



export const handleSave = async (
  userId: string, 
  listingId: string, 
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>
) => {
  console.log("🔖 saving/unsaving listing");
  console.log("Saving listing:", listingId, "to user:", userId);

  try {
    const api = `${baseApi}/api/listings/saveListing`;

    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, listingId }),
    });

    const data = await response.json();
    console.log("✅ Response from backend:", data);

    if (!response.ok) {
      console.error("❌ Failed to save listing:", data.message);
      return;
    }

    // ✅ Atualiza a listing no estado com o novo savedBy
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing._id === listingId
          ? { ...listing, savedBy: data.listingSavedBy }
          : listing
      )
    );
  } catch (error) {
    console.error("❌ Error saving listing:", error);
  }
};
