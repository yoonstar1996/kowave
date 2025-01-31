export interface NowWeather {
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

export interface HourlyWeather {
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

export interface DailyWeather {
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
