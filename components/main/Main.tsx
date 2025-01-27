"use client";

import React from "react";
import NowWeather from "./NowWeather";
import HourlyWeather from "./HourlyWeather";
import WeeklyWeather from "./WeeklyWeather";

function Main() {
  return (
    <main className="grid max-h-[635px] grid-cols-6 gap-5">
      <div className="col-span-4 flex flex-col gap-5">
        <NowWeather />
        <HourlyWeather />
      </div>
      <div className="col-span-2">
        <WeeklyWeather />
      </div>
    </main>
  );
}

export default Main;
