"use client";

import React, { useEffect, useState } from "react";
import NowWeather from "./NowWeather";
import HourlyWeather from "./HourlyWeather";
import DailyWeather from "./WeeklyWeather";
import {
  NowWeather as INowWeather,
  HourlyWeather as IHourlyWeather,
  DailyWeather as IDailyWeather,
} from "@/type/WeatherType";
import {
  fetchDailyWeather,
  fetchHourlyWeather,
  fetchTodayWeather,
} from "@/utils/fetchWeather";
import { useLocationStore } from "@/store/useLocationStore";

function Main() {
  const { lat, lon } = useLocationStore();

  const [nowWeather, setNowWeather] = useState<INowWeather | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<IHourlyWeather[]>([]);
  const [dailyWeather, setDailyWeather] = useState<IDailyWeather[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nowWeather, hourlyWeatherData, dailyWeather] = await Promise.all(
          [
            fetchTodayWeather(lat, lon),
            fetchHourlyWeather(lat, lon),
            fetchDailyWeather(lat, lon),
          ],
        );

        setNowWeather(nowWeather);
        setHourlyWeather(hourlyWeatherData);
        setDailyWeather(dailyWeather);
      } catch (error) {
        console.error("날씨 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [lat, lon]);

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <div className="col-span-1 flex flex-col gap-5 xl:col-span-2">
        <NowWeather data={nowWeather} />
        <HourlyWeather data={hourlyWeather} />
      </div>
      <div className="col-span-1 xl:col-span-1">
        <DailyWeather data={dailyWeather} />
      </div>
    </section>
  );
}

export default Main;
