import React, { createContext, useContext, useState } from "react";

type RoomContextType = {
  currentRoomTitle: string;
  setCurrentRoomTitle: (title: string) => void;
};

const RoomContext = createContext<RoomContextType>({
  currentRoomTitle: "",
  setCurrentRoomTitle: () => {},
});

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRoomTitle, setCurrentRoomTitle] = useState("");

  return (
    <RoomContext.Provider value={{ currentRoomTitle, setCurrentRoomTitle }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
