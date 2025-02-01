"use client";

import React, { useMemo } from "react";
import { Card } from "../ui";
import Image from "next/image";
import Title from "../common/Title";
import { HourlyWeather as IHourlyWeather } from "@/type/WeatherType";

interface Props {
  data: IHourlyWeather[];
}

function HourlyWeather({ data: hourlyWeather }: Props) {
  const tableRows = useMemo(() => {
    return [
      {
        label: "날씨",
        render: (data: IHourlyWeather) => (
          <Image
            width={32}
            height={32}
            src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
            alt={data.weather.description}
            className="mx-auto h-8 w-8"
          />
        ),
      },
      {
        label: `온도 ${"\u2103"}`,
        render: (data: IHourlyWeather) => `${data.temp}`,
      },
      {
        label: "강수확률 (%)",
        render: (data: IHourlyWeather) => `${data.pop}`,
      },
      {
        label: "강수량 (mm)",
        render: (data: IHourlyWeather) => `${data.precip.toFixed(2)}`,
      },
      {
        label: "바람 (m/s)",
        render: (data: IHourlyWeather) => `${data.wind_spd.toFixed(2)}`,
      },
      { label: "습도 (%)", render: (data: IHourlyWeather) => `${data.rh}` },
    ];
  }, []);

  if (hourlyWeather.length === 0) return null;

  return (
    <Card className="p-4">
      <Title title="시간별 날씨" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 p-2 dark:border-gray-700">
                시간
              </th>
              {hourlyWeather.map((hour, index) => (
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
                {hourlyWeather.map((data, index) => (
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
