"use client";

import React, { useMemo } from "react";
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
  const { lat, lon, setLocation } = useLocationStore();

  const handleSelectChange = (value: string) => {
    const selectedLocation = LOCATIONS.find((loc) => loc.name === value);
    if (selectedLocation) {
      if (lat === selectedLocation.lat && lon === selectedLocation.lon) return;
      setLocation(selectedLocation.lat, selectedLocation.lon);
    }
  };

  const locationsList = useMemo(
    () =>
      LOCATIONS.map((location) => (
        <SelectItem key={location.name} value={location.name}>
          {location.name}
        </SelectItem>
      )),
    [],
  );

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
          <SelectContent>{locationsList}</SelectContent>
        </Select>
      </div>
    </header>
  );
}

export default Header;
