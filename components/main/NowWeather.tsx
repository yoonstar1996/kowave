"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Card } from "../ui";
import Image from "next/image";
import { useLocationStore } from "@/store/useLocationStore";
import { fetchTodayWeather } from "@/utils/fetchWeather";
import { NowWeather as INowWeather } from "@/type/WeatherType";

function NowWeather() {
  const { lat, lon, setLocation } = useLocationStore();
  const [nowWeather, setNowWeather] = useState<INowWeather | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodayWeather(lat, lon);
        if (isMounted) setNowWeather(data);
      } catch (error) {
        console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [lat, lon]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (latitude === lat && longitude === lon) return;
        setLocation(latitude, longitude);
      },
      (error) => {
        console.error("현재 위치를 가져오는 중 오류 발생:", error);
        alert("위치 정보를 가져오는 데 실패했습니다.");
      },
    );
  };

  const weatherInfo = useMemo(
    () =>
      nowWeather
        ? [
            { label: "습도", value: nowWeather.rh, unit: "%" },
            { label: "구름량", value: nowWeather.clouds, unit: "%" },
            { label: "체감온도", value: nowWeather.app_temp, unit: "℃" },
            { label: "바람", value: nowWeather.wind_spd, unit: "m/s" },
            { label: "일출", value: nowWeather.sunrise },
            { label: "일몰", value: nowWeather.sunset },
          ]
        : [],
    [nowWeather],
  );

  if (isLoading || !nowWeather) return <div>현재 날씨 데이터 로딩중...</div>;

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">TODAY {nowWeather.city_name}</h2>
        <Button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleGetCurrentLocation}
        >
          현재 위치
        </Button>
      </div>
      <div>오늘의 현재 날씨를 조회합니다.</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-[1] items-center">
          <Image
            width={32}
            height={32}
            src={`https://www.weatherbit.io/static/img/icons/${nowWeather.weather?.icon}.png`}
            alt="weather icon"
          />

          <div className="flex flex-col gap-[1px]">
            <div className="flex items-center gap-1">
              <div className="text-[17px] font-semibold">{nowWeather.temp}</div>
              <p className="text-sm">{"\u2103"}</p>
            </div>
          </div>
        </div>
        <div className="flex-[3]">
          <div className="grid grid-cols-3">
            {weatherInfo.map((item, index) => (
              <WeatherItem
                key={index}
                label={item.label}
                value={item.value}
                unit={item.unit}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default NowWeather;

const WeatherItem = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit?: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center gap-[3px]">
        <div className="text-[17px] font-semibold">{value}</div>
        {unit && <p className="text-sm">{unit}</p>}
      </div>
    </div>
  );
};
