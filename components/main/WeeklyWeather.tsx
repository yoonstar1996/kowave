"use client";

import { useLocationStore } from "@/store/useLocationStore";
import React, { useEffect, useMemo, useState } from "react";
import { Card, ScrollArea } from "../ui";
import Title from "../common/Title";
import { fetchDailyWeather } from "@/utils/fetchWeather";
import { DailyWeather as IDailyWeather } from "@/type/WeatherType";
import Image from "next/image";

function DailyWeather() {
  const { lat, lon } = useLocationStore();
  const [dailyWeather, setDailyWeather] = useState<IDailyWeather[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDailyWeather(lat, lon);
        if (isMounted) setDailyWeather(data);
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

  const todayAndTomorrow = useMemo(
    () => dailyWeather.slice(0, 2),
    [dailyWeather],
  );
  const twoDaysAfter = useMemo(() => dailyWeather.slice(2), [dailyWeather]);

  if (isLoading || !dailyWeather)
    return <div>주간별 날씨 데이터 로딩중...</div>;

  return (
    <Card className="px-0 py-4 text-black">
      <Title title="주간별 날씨" className="px-4" />
      {/* 스크롤을 이용하여 볼 수 있도록 하였습니다. */}
      <ScrollArea className="h-[557px] px-4">
        {/* 상단 카드 (오늘, 내일) */}
        <div className="mb-4 flex flex-col items-center gap-4">
          {todayAndTomorrow.map((day, index) => {
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
                  <Image
                    width={48}
                    height={48}
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
          {twoDaysAfter.map((day, index) => {
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
                  <Image
                    width={48}
                    height={48}
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

export default DailyWeather;
