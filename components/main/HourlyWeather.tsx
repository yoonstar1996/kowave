"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui";
import axios from "axios";
import Image from "next/image";

interface HourlyWeatherData {
  timestamp_local: string;
  temp: number;
  pop: number;
  precip: number;
  wind_spd: number;
  rh: number;
  weather: {
    icon: string;
    description: string;
  };
}

function HourlyWeather() {
  const [hourlyData, setHourlyData] = useState<HourlyWeatherData[]>([]);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        const response = await axios.get<{ data: HourlyWeatherData[] }>(
          `https://api.weatherbit.io/v2.0/forecast/hourly?lat=37.5665&lon=126.978&key=${process.env.NEXT_PUBLIC_WEATHER_BIT_API}&hours=12`,
        );
        // console.log("response.data.data: ", response.data.data);
        setHourlyData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHourlyWeather();
  }, []);

  const tableRows: {
    label: string;
    render: (data: HourlyWeatherData) => React.ReactNode;
  }[] = [
    {
      label: "날씨",
      render: (data: HourlyWeatherData) => (
        <Image
          width={32}
          height={32}
          src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
          alt={data.weather.description}
          className="mx-auto h-8 w-8"
        />
      ),
    },
    { label: "온도 (°C)", render: (data: HourlyWeatherData) => `${data.temp}` },
    {
      label: "강수확률 (%)",
      render: (data: HourlyWeatherData) => `${data.pop}`,
    },
    {
      label: "강수량 (mm)",
      render: (data: HourlyWeatherData) => `${data.precip}`,
    },
    {
      label: "바람 (m/s)",
      render: (data: HourlyWeatherData) => `${data.wind_spd.toFixed(2)}`,
    },
    { label: "습도 (%)", render: (data: HourlyWeatherData) => `${data.rh}` },
  ];

  return (
    <Card className="p-4">
      <h2 className="mb-4 text-lg font-semibold">시간별 날씨</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 p-2 dark:border-gray-700">
                시간
              </th>
              {hourlyData.map((hour, index) => (
                <th
                  key={index}
                  className="border border-gray-300 p-2 dark:border-gray-700"
                >
                  {new Date(hour.timestamp_local).getHours()}시
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 p-2 text-center dark:border-gray-700">
                  <p>{row.label.split(" ")[0]}</p>
                  <p className="text-sm text-gray-500">
                    {row.label.split(" ")[1]}
                  </p>
                </td>
                {hourlyData.map((data, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 p-2 text-center font-semibold dark:border-gray-700"
                  >
                    {row.render(data)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default HourlyWeather;
