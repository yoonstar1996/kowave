import { DailyWeather, HourlyWeather, NowWeather } from "@/type/WeatherType";

/**
 * 개발 시에는 .env에 넣고 진행했으나
 * 과제 제출 후, 실행 시에 번거로움이 생길 것 같아서 직접 가져와 사용하였습니다.
 */

const API_KEY = "4a5a870dd6c24923ace54c2ba304e9ea";

export const fetchTodayWeather = async (
  lat: number,
  lon: number,
): Promise<NowWeather> => {
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const result: { count: number; data: NowWeather[] } = await response.json();

  if (!result.data || result.data.length === 0) {
    throw new Error("날씨 데이터를 가져오지 못했습니다.");
  }

  return result.data[0];
};

export const fetchHourlyWeather = async (
  lat: number,
  lon: number,
): Promise<HourlyWeather[]> => {
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=${API_KEY}&hours=12`,
  );

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const result: { data: HourlyWeather[] } = await response.json();

  if (!result.data || result.data.length === 0) {
    throw new Error("시간별 날씨 데이터를 가져오지 못했습니다.");
  }

  return result.data; // ✅ 전체 배열 반환
};

export const fetchDailyWeather = async (
  lat: number,
  lon: number,
): Promise<DailyWeather[]> => {
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const result: { data: DailyWeather[] } = await response.json();

  if (!result.data || result.data.length === 0) {
    throw new Error("주간 날씨 데이터를 가져오지 못했습니다.");
  }

  return result.data; // ✅ 7일치 데이터 배열 반환
};
