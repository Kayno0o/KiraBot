import Discord from "discord.js";

export interface Command {
    name: string;
    aliases: string[];
    description: string;
    usage: string;
    category: string;
    
    execute(message: Discord.Message, args: string[], client: Discord.Client): void;
}