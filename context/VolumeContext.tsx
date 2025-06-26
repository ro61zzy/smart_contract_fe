"use client";

import { createContext, useContext, useState } from "react";

type VolumeEntry = {
  timestamp: string;
  volume: number;
};

const VolumeContext = createContext<{
  volumeHistory: VolumeEntry[];
  addVolume: (entry: VolumeEntry) => void;
}>({
  volumeHistory: [],
  addVolume: () => {},
});

export const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [volumeHistory, setVolumeHistory] = useState<VolumeEntry[]>([]);

  const addVolume = (entry: VolumeEntry) => {
    setVolumeHistory((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((e) => e.timestamp === entry.timestamp);
      if (idx !== -1) {
        updated[idx].volume += entry.volume;
      } else {
        updated.push(entry);
      }
      return updated;
    });
  };

  return (
    <VolumeContext.Provider value={{ volumeHistory, addVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolume = () => useContext(VolumeContext);
