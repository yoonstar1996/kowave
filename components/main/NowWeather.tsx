import React, { useEffect, useState } from "react";
import { Card } from "../ui";
import axios from "axios";
import Image from "next/image";
import { useLocationStore } from "@/store/useLocationStore";

interface WeatherData {
  temp: number;
  app_temp: number;
  city_name: string;
  clouds: number;
  precip: number;
  rh: number;
  sunrise: string;
  sunset: string;
  weather: {
    code: number;
    description: string;
    icon: string;
  };
  wind_cdir: string;
  wind_dir: number;
  wind_spd: number;
}

function NowWeather() {
  const { lat, lon, setLocation } = useLocationStore();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchTodayWeather = async () => {
      try {
        const response = await axios.get<{ data: WeatherData[] }>(
          `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.NEXT_PUBLIC_WEATHER_BIT_API}`,
        );
        setWeatherData(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodayWeather();
  }, [lat, lon]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(latitude, longitude);
        console.log(`📍 현재 위치: lat=${latitude}, lon=${longitude}`);
      },
      (error) => {
        console.error("현재 위치를 가져오는 중 오류 발생:", error);
        alert("위치 정보를 가져오는 데 실패했습니다.");
      },
    );
  };

  if (!weatherData) return <div>Loading...</div>;

  const weatherInfo = [
    { label: "습도", value: weatherData.rh, unit: "%" },
    { label: "구름량", value: weatherData.clouds, unit: "%" },
    { label: "체감온도", value: weatherData.app_temp, unit: "℃" },
    { label: "바람", value: weatherData.wind_spd, unit: "m/s" },
    { label: "일출", value: weatherData.sunrise },
    { label: "일몰", value: weatherData.sunset },
  ];

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">TODAY {weatherData.city_name}</h2>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleGetCurrentLocation}
        >
          현재 위치
        </button>
      </div>
      <div>오늘의 현재 날씨를 조회합니다.</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-[1] items-center">
          <Image
            width={32}
            height={32}
            src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather?.icon}.png`}
            alt="weather icon"
          />

          <div className="flex flex-col gap-[1px]">
            <div className="flex items-center gap-1">
              <div className="text-[17px] font-semibold">
                {weatherData.temp}
              </div>
              <p className="text-sm">℃</p>
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
