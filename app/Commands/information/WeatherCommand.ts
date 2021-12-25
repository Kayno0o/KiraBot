import { Command } from '../../Interfaces/Command';
import {Message, Client, ColorResolvable, MessageEmbed, HexColorString} from 'discord.js';
import { WeatherApi } from '../../Interfaces/Weather/WeatherApi';

class WeatherCommand implements Command {
    name = 'weather';
    aliases = ['getweather', 'gw'];
    description = 'Get the weather for a city.';
    usage = '<city>';
    category = 'Information';

    async execute(message: Message, args: string[], client: Client) {
        if (args.length === 0) {
            return message.channel.send(message.member?.displayName + ', please provide a city name.');
        }

        const weather = new WeatherApi(args.join(' '));
        await weather.fetchAPI();

        const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
            .setTitle(`${weather.city.name} - ${weather.city.country}`)
            .setURL(`https://openweathermap.org/city/${weather.city.id}`)
            .setThumbnail(weather.weathers[0].iconURL)

            .setDescription(`${weather.weathers[0].description}`)

            .addField('Time', `${weather.weathers[0].time}`)

            .addField('Temperature', `${weather.weathers[0].temp}°C`, true)
            .addField('Humidity', `${weather.weathers[0].humidity}%`, true)
            .addField('Wind Speed', `${weather.weathers[0].wind_speed}m/s`, true)
            // .addField('Min Temperature', `${weather.weathers[0].temp_min}°C`, true)
            // .addField('Max Temperature', `${weather.weathers[0].temp_max}°C`, true)
            // .addField('Wind Direction', `${weather.weathers[0].wind_direction}°`, true)

            .setColor(weather.weathers[0].color)

            .setFooter(`Powered by OpenWeatherMap`, `https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
}

export { WeatherCommand as command };