import dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import fs from "fs";
import { Command } from "./Interfaces/Command";
import path from 'path';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX;

let commands: Map<string, Command> = new Map();

client.on('ready', () => {
    console.log(`\n   Logged in as ${client.user?.tag}`);

    reloadCommands(path.join(__dirname, 'Commands'));
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase().replace(/\s/g, ' ');
    let args = msg.split(' ');
    const command = args.shift();

    if (typeof command == "string" && typeof prefix == "string") {

        if (command.startsWith(prefix)) {
            let cmd = command.slice(prefix.length);

            if (commands.has(cmd)) {
                try {
                    commands.get(cmd)?.execute(message, args, client);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
})

function reloadCommands(filePath: string) {
    commands = new Map();
    console.log(`\n   Reloading commands\n`);
    loadCommands(filePath);
    console.log(`\n   Reloaded ${commands.size} commands!`);
}

function loadCommands(filePath: string) {
    let i = 0;

    fs.readdirSync(filePath).forEach(file => {
        if (file.endsWith('.js') || file.endsWith('.ts')) {
            loadCommand(`${filePath}/${file}`);
            i++;
        }

        if (fs.lstatSync(`${filePath}/${file}`).isDirectory()) {
            loadCommands(`${filePath}/${file}`);
        }
    });
}

function loadCommand(filePath: string) {
    delete require.cache[require.resolve(filePath)];
    const { command } = require(filePath);
    const cmd: Command = new command();

    console.log(`   Loaded ${cmd.name}!`);

    commands.set(cmd.name, cmd);
    cmd.aliases.forEach(alias => {
        commands.set(alias, cmd);
    });
}

client.login(process.env.BOT_TOKEN);