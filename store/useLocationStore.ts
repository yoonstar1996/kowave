import { create } from "zustand";

interface LocationState {
  lat: number;
  lon: number;
  setLocation: (lat: number, lon: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: 37.5665, // 기본값: 서울
  lon: 126.978,
  setLocation: (lat, lon) => set({ lat, lon }),
}));
