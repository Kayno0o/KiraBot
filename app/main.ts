import dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import fs from "fs";
import { Command } from "./Interfaces/Command";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX;
const uID = process.env.OWNER_ID;

client.on('ready', () => {
    console.log(`\n - Logged in as ${client.user?.tag}! - `);
})

client.on('messageCreate', async (message ) => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase().replace(/\s/g, ' ');
    let args = msg.split(' ');
    const command = args.shift();

    if (typeof command == "string" && typeof prefix == "string") {

        if (command.startsWith(prefix)) {
            let cmd = command.slice(prefix.length);
        }
    }
})

client.login(process.env.BOT_TOKEN);