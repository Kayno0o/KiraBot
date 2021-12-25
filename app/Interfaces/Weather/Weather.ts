import { HexColorString } from "discord.js";
import { WeatherColorEnum } from "./WeatherColorEnum";

export class Weather {
    temp: number;
    temp_min: number;
    temp_max: number;

    humidity: number;

    sky: string;
    description: string;
    iconURL: string;
    color: HexColorString;

    wind_speed: string;
    wind_direction: string;

    time: string;

    constructor(temp: number, temp_min: number, temp_max: number, humidity: number, sky: string, description: string, icon: string, windSpeed: string, windDirection: string, time: string) {
        this.temp = temp;
        this.temp_min = temp_min;
        this.temp_max = temp_max;

        this.humidity = humidity;

        this.sky = sky;
        this.description = description;

        if (icon.length == 3) {
            this.iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        } else {
            this.iconURL = icon;
        }
        
        // if WeatherColorEnum has the key icon, then return the value, else return the default value
        this.color = WeatherColorEnum[icon as keyof typeof WeatherColorEnum] as HexColorString || "#0099ff";

        this.wind_speed = windSpeed;
        this.wind_direction = windDirection;

        this.time = time;
    }
}