import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui";
import { getWindDirection } from "@/utils/getWindDirection";
import { formatTime24H } from "@/utils/formatTime24H";

interface WeatherData {
  clouds: {
    all: number;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    deg: number;
    speed: number;
  };
}

function NowWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.978&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}&lang=kr`,
      );
      console.log("response.data: ", response.data);
      setWeatherData(response.data);
    };
    fetchWeather();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  const weatherInfo = [
    { label: "습도", value: weatherData.main.humidity, unit: "%" },
    { label: "구름량", value: weatherData.clouds.all, unit: "%" },
    {
      label: "체감온도",
      value: (weatherData.main.feels_like - 273.15).toFixed(2),
      unit: "℃",
    },
    {
      label: getWindDirection(weatherData.wind.deg),
      value: weatherData.wind.speed,
      unit: "m/s",
    },
    { label: "일출", value: formatTime24H(weatherData.sys.sunrise) },
    { label: "일몰", value: formatTime24H(weatherData.sys.sunset) },
  ];

  return (
    <Card className="col-span-2">
      <div>TODAY {weatherData.name}</div>
      <div>오늘의 현재 날씨를 조회합니다.</div>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <div>이미지</div>

          <div className="flex items-center gap-[1px]">
            <div className="text-[17px] font-semibold">
              {(weatherData.main.temp - 273.15).toFixed(2)}
            </div>
            <p className="text-sm">&#8451;</p>
          </div>
        </div>
        <div className="flex-1">
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
      <div className="flex items-center gap-[2px]">
        <div className="text-[17px] font-semibold">{value}</div>
        {unit && <p className="text-sm">{unit}</p>}
      </div>
    </div>
  );
};
