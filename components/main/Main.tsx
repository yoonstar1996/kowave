"use client";

import React from "react";
import NowWeather from "./NowWeather";
import HourlyWeather from "./HourlyWeather";
import DailyWeather from "./WeeklyWeather";

function Main() {
  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <div className="col-span-1 flex flex-col gap-5 xl:col-span-2">
        <NowWeather />
        <HourlyWeather />
      </div>
      <div className="col-span-1 xl:col-span-1">
        <DailyWeather />
      </div>
    </section>
  );
}

export default Main;
