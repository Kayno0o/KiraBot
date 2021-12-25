import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config();

import { Weather } from "./Weather";
import { City } from "./City";

export class WeatherApi {
    q: string;
    units: string;
    cnt: number;
    city: City = new City();
    weathers: Weather[] = [];

    constructor(q: string, units: string = "metric", cnt: number = 1) {
        this.q = q;
        this.units = units;
        this.cnt = cnt;
    }

    buildURL(): string {
        return `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.WEATHER_API_KEY}&q=${this.q}&units=${this.units}&cnt=${this.cnt}`;
    };

    async fetchAPI() {
        const response = await fetch(this.buildURL());
        const json: any = await response.json();

        this.city = new City(
            json.city.id, json.city.name, json.city.country, json.city.population, json.city.timezone
        );

        json.list.forEach((weather: any) => {
            this.weathers.push(
                new Weather(
                    weather.main.temp, weather.main.temp_min, weather.main.temp_max, weather.main.humidity,
                    weather.weather[0].main, weather.weather[0].description, weather.weather[0].icon,
                    weather.wind.speed, weather.wind.deg, weather.dt_txt
                )
            );
        });
    }
}