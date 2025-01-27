import { useLocationStore } from "@/store/useLocationStore";
import React, { useEffect, useState } from "react";
import { Card, ScrollArea } from "../ui";
import Title from "../common/Title";

interface DailyWeatherData {
  datetime: string;
  min_temp: number;
  max_temp: number;
  temp: number;
  precip: number;
  pop: number;
  weather: {
    icon: string;
    description: string;
  };
}

function WeeklyWeather() {
  const { lat, lon } = useLocationStore();

  const [weatherData, setWeatherData] = useState<DailyWeatherData[]>([]);

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${process.env.NEXT_PUBLIC_WEATHER_BIT_API}`,
      );
      const data = await response.json();
      console.log("data: ", data);
      setWeatherData(data.data);
    }
    fetchWeather();
  }, [lat, lon]);

  return (
    <Card className="px-0 py-4 text-black">
      <Title title="주간별 날씨" className="px-4" />
      {/* 상단 카드 (오늘, 내일) */}
      <ScrollArea className="h-[557px] px-4">
        <div className="mb-4 flex flex-col items-center gap-4">
          {weatherData.slice(0, 2).map((day, index) => {
            const formattedDate = new Date(day.datetime).toLocaleDateString(
              "ko-KR",
              {
                month: "numeric",
                day: "numeric",
              },
            );
            return (
              <div
                key={index}
                className="flex w-full items-center gap-5 rounded-xl border bg-white p-4 shadow-md"
              >
                <div className="flex flex-col items-center gap-1">
                  <h3 className="font-bold">{index === 0 ? "오늘" : "내일"}</h3>
                  <p className="text-sm text-gray-600">{formattedDate}</p>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                    alt={day.weather.description}
                    className="h-12 w-12"
                  />
                  <div className="my-2 flex flex-col items-center">
                    <p className="text-center">{day.weather.description}</p>
                    <p className="text-center text-gray-500">
                      강수 확률: {day.pop}%
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-[2px] font-medium text-blue-600">
                      <p className="text-center text-lg">{day.min_temp}</p>
                      <p>{"\u2103"}</p>
                    </div>

                    <p className="font-medium">/</p>
                    <div className="flex items-center gap-[2px] font-medium text-red-600">
                      <p className="text-center text-lg">{day.max_temp}</p>
                      <p>{"\u2103"}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 리스트 (2일 후부터) */}
        <div className="flex flex-col items-center gap-4">
          {weatherData.slice(2).map((day, index) => {
            const formattedDate = new Date(day.datetime).toLocaleDateString(
              "ko-KR",
              {
                month: "numeric",
                day: "numeric",
              },
            );
            return (
              <div
                key={index}
                className="flex w-full items-center gap-5 rounded-xl border bg-white p-4 shadow-md"
              >
                <div className="flex flex-col items-center gap-1">
                  <h4 className="text-sm font-semibold">
                    {new Date(day.datetime).toLocaleDateString("ko-KR", {
                      weekday: "short",
                    })}
                  </h4>
                  <p className="text-sm text-gray-600">{formattedDate}</p>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                    alt={day.weather.description}
                    className="h-12 w-12"
                  />
                  <div className="my-2 flex flex-col items-center">
                    <p className="text-center">{day.weather.description}</p>
                    <p className="text-center text-gray-500">
                      강수 확률: {day.pop}%
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-[2px] font-medium text-blue-600">
                      <p className="text-center text-lg">{day.min_temp}</p>
                      <p>{"\u2103"}</p>
                    </div>

                    <p className="font-medium">/</p>
                    <div className="flex items-center gap-[2px] font-medium text-red-600">
                      <p className="text-center text-lg">{day.max_temp}</p>
                      <p>{"\u2103"}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

export default WeeklyWeather;
