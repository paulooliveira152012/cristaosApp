import { Platform } from "react-native";

const LOCAL_API = "http://localhost:5001";
const NGROK_API = "https://5fa0-2601-8c-4c80-5f70-418d-a4a-d148-b16a.ngrok-free.app";


export const getBaseApi = () => {
    console.log("🌐 API usada no app:", LOCAL_API);

  // Simulador usa localhost
  if (Platform.OS === "ios" || Platform.OS === "android") {
    const isDevice = typeof navigator !== "undefined" && !navigator.product?.includes("ReactNativeWeb");
    if (!isDevice) return LOCAL_API; // simulador
  }

  // return NGROK_API; // celular real
  return LOCAL_API 
};
