"use client";

import React from "react";
import { SearchBar } from "../ui";
import { useLocationStore } from "@/store/useLocationStore";

const LOCATIONS = [
  { name: "강원도", latitude: 37.8228, longitude: 128.1555 },
  { name: "경기도", latitude: 37.4138, longitude: 127.5183 },
  { name: "경상남도", latitude: 35.2374, longitude: 128.6922 },
  { name: "경상북도", latitude: 36.2486, longitude: 128.6647 },
  { name: "광주시", latitude: 35.1595, longitude: 126.8526 },
  { name: "대구시", latitude: 35.8714, longitude: 128.6014 },
  { name: "대전시", latitude: 36.3504, longitude: 127.3845 },
  { name: "부산시", latitude: 35.1796, longitude: 129.0756 },
  { name: "서울시", latitude: 37.5665, longitude: 126.978 },
  { name: "세종시", latitude: 36.4875, longitude: 127.2817 },
  { name: "울산시", latitude: 35.5384, longitude: 129.3114 },
  { name: "인천시", latitude: 37.4563, longitude: 126.7052 },
  { name: "전라남도", latitude: 34.8679, longitude: 126.991 },
  { name: "전라북도", latitude: 35.7175, longitude: 127.153 },
  { name: "충청남도", latitude: 36.5184, longitude: 126.8 },
  { name: "충청북도", latitude: 36.6357, longitude: 127.4917 },
];

function Header() {
  const setLocation = useLocationStore((state) => state.setLocation);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = LOCATIONS.find(
      (loc) => loc.name === event.target.value,
    );
    if (selectedLocation) {
      setLocation(selectedLocation.latitude, selectedLocation.longitude);
      console.log(
        `📍 선택된 지역: ${selectedLocation.name}, 위도: ${selectedLocation.latitude}, 경도: ${selectedLocation.longitude}`,
      );
    }
  };

  return (
    <header>
      <div className="flex w-1/2 items-center gap-3">
        <div className="flex items-center gap-2">
          <div>이미지</div>
          <div className="text-lg font-bold">KOWAVE</div>
        </div>

        {/* <SearchBar
          className="flex-1 text-black"
          placeholder="검색할 지역 이름을 영어로 입력하세요."
        /> */}
        <select
          className="border p-2 text-black"
          onChange={handleSelectChange}
          defaultValue=""
        >
          <option value="" disabled>
            지역을 선택하세요
          </option>
          {LOCATIONS.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
