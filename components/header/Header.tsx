import React from "react";
import { SearchBar } from "../ui";

function Header() {
  return (
    <header>
      <div className="flex w-1/2 items-center gap-3">
        <div className="flex items-center gap-2">
          <div>이미지</div>
          <div className="text-lg font-bold">KOWAVE</div>
        </div>

        <SearchBar
          className="flex-1 text-black"
          placeholder="검색할 지역 이름을 영어로 입력하세요."
        />
      </div>
    </header>
  );
}

export default Header;
