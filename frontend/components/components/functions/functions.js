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
  