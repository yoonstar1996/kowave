"use client";

import React from "react";
import NowWeather from "./NowWeather";
import HourlyWeather from "./HourlyWeather";

function Main() {
  return (
    <main className="flex flex-col gap-5">
      <NowWeather />
      <HourlyWeather />
    </main>
  );
}

export default Main;
