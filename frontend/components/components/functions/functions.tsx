import { ListingItemType } from "../Types/ListingTypes";

export const getRooms = async (setRooms: (rooms: any[]) => void) => {
  console.log("📡 Fetching all rooms...");

  try {
    const api = "http://localhost:5001/api/rooms/getRooms";
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
    const api = "http://localhost:5001/api/listings/getListings";
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
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>
) => {
  console.log("🧠 liking/unliking listing");

  try {
    const response = await fetch(
      "http://localhost:5001/api/listings/likeListing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId, userId }),
      }
    );

    const data = await response.json();
    console.log("🔁 API like response:", data);

    if (response.ok && data.likedBy) {
      // Atualiza o estado local
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? { ...listing, likedBy: data.likedBy }
            : listing
        )
      );
    } else {
      console.warn("❌ Failed to like listing:", data.message);
    }
  } catch (error) {
    console.error("❌ Error liking listing:", error);
  }
};

export const handleComment = async (commentText: string, listingId: string, userId: string,) => {
  console.log("commenting listing");
  console.log("commentText", commentText);
  console.log("listingId:", listingId)
  console.log("userId:", userId);

  try {
    const api = "http://localhost:5001/api/listings/addComment";

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ 
        commentText,
        listingId,
        userId, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Error commenting listings, status ${response.status}`);
    }

    const data = await response.json();
    console.log("1️⃣ comment:", data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const handleSave = () => {
  console.log("saving/unsaving listing");
};
