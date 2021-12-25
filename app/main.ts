import dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import fs from "fs";
import { Command } from "./Interfaces/Command";
import path from 'path';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX;

const commandsPath = path.join(__dirname, 'Commands');
let commands: Map<string, Command> = new Map();

client.on('ready', () => {
    console.log(`\n   Logged in as ${client.user?.tag}`);

    reloadCommands(commandsPath);
    watchCommands(commandsPath);
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
                commands.get(cmd)?.execute(message, args, client);
            }
        }
    }
})

function watchCommands(filePath: string) {
    fs.readdirSync(filePath).forEach(file => {
        if (file.endsWith('.ts')) {
            fs.watch(path.join(filePath, file), (event, filename) => {
                if (filename) {
                    loadCommand(path.join(filePath, file), true);
                }
            });
        }

        if (fs.lstatSync(`${filePath}/${file}`).isDirectory()) {
            watchCommands(`${filePath}/${file}`);
        }
    });
}

function reloadCommands(filePath: string) {
    console.log(`\n   Loading commands`);
    commands = new Map();
    let loaded = loadCommands(filePath);
    console.log(`   Loaded ${loaded} commands and ${commands.size - loaded} aliases!\n`);
}

function loadCommands(filePath: string, i = 0) {
    fs.readdirSync(filePath).forEach(file => {
        if (file.endsWith('.js') || file.endsWith('.ts')) {
            loadCommand(`${filePath}/${file}`);
            i++;
        }

        if (fs.lstatSync(`${filePath}/${file}`).isDirectory()) {
            i += loadCommands(`${filePath}/${file}`);
        }
    });
    return i;
}

function loadCommand(filePath: string, reload = false) {
    delete require.cache[require.resolve(filePath)];
    const { command } = require(filePath);
    const cmd: Command = new command();

    if (!reload) {
        console.log(`   Loaded ${cmd.name}!`);
    } else {
        console.log(`   Reloaded ${cmd.name}!`);
    }

    commands.set(cmd.name, cmd);
    cmd.aliases.forEach(alias => {
        commands.set(alias, cmd);
    });
}

client.login(process.env.BOT_TOKEN);