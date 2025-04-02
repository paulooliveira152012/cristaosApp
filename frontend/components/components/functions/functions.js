export const getRooms = async (setRooms) => {
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
      setRooms(data)
      return data;
    } catch (error) {
      console.error("❌ Erro em getRooms:", error);
      return null; // ou [] se quiser evitar erros no componente
    }
  };
  
  export const getListings = async (setListings) => {
    console.log("get listings function reached")
    try {
      const api = "http://localhost:5001/api/listings/getListings"
      const response = await fetch(api, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
      });

      if (!response.ok) {
        throw new Error(`Error fetching listings, ${error}`)
      }

      const data = await response.json();
      console.log("fetched listings:", data)

      setListings(data)
      return(data)
    } catch (error) {
      console.log("❌ error fetching listings", error)
      return null
    }
  }