import React from "react";

interface HourWeatherCardProps {
  hour?: string;
  icon?: string;
  temp?: number;
  precip?: number;
  rh?: number;
}

function HourlyWeatherCard({
  hour,
  icon,
  temp,
  precip,
  rh,
}: HourWeatherCardProps) {
  return (
    <div className="flex min-w-[80px] flex-shrink-0 flex-col items-center rounded-lg bg-white p-2 dark:bg-gray-800">
      {/* 시간 */}
      {hour && (
        <span className="text-sm font-medium">
          {new Date(hour).getHours()}시
        </span>
      )}
      {icon && temp && (
        <div className="flex flex-col items-center gap-10">
          {/* 날씨 아이콘 */}
          <img
            src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
            alt={icon}
            className="h-10 w-10"
          />

          {/* 기온 */}
          <span className="text-lg font-semibold">{temp} °C</span>
        </div>
      )}
      {/* 강수량 */}
      {precip && <span className="text-xs">{precip}</span>}

      {/* 습도 */}
      {rh && <span className="text-xs">{rh}</span>}
    </div>
  );
}

export default HourlyWeatherCard;
