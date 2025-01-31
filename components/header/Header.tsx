"use client";

import React from "react";
import { useLocationStore } from "@/store/useLocationStore";
import { LOCATIONS } from "@/data/Locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";

function Header() {
  const setLocation = useLocationStore((state) => state.setLocation);

  // 🔥 onValueChange의 올바른 타입 적용
  const handleSelectChange = (value: string) => {
    const selectedLocation = LOCATIONS.find((loc) => loc.name === value);
    if (selectedLocation) {
      setLocation(selectedLocation.lat, selectedLocation.lon);
      console.log(
        `📍 선택된 지역: ${selectedLocation.name}, 위도: ${selectedLocation.lat}, 경도: ${selectedLocation.lon}`,
      );
    }
  };

  return (
    <header className="mb-5">
      <div className="flex w-1/2 items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">KOWAVE</div>
        </div>

        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[150px] border bg-white p-2 text-black">
            <SelectValue placeholder="지역을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((location) => (
              <SelectItem key={location.name} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

export default Header;
