import { exec } from "child_process";

import dotenv from "dotenv";
import { Client, Intents } from "discord.js";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX + "" + process.env.PREFIX;
const uID = process.env.OWNER_ID;

client.on('ready', () => {
    console.log(`\n ---- Started monitor! ---- \n`);
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.author.id !== uID) return;

    const msg = message.content.toLowerCase();
    let args = msg.split(' ');
    const command = args.shift();

    if (typeof command == "string" && typeof prefix == "string") {

        if (command.startsWith(prefix)) {
            let cmd = command.slice(prefix.length);

            console.log(`${message.author.username} ran command: ${cmd}`);

            switch (cmd) {
                case 'reload':
                    exec("./scripts/reload.sh", (err, stdout, stderr) => {});
                    console.log(`\n ---- Reloaded! ---- \n`);
                    message.delete();
                    break;
                case 'stop':
                    console.log(`\n ---- Stopped! ---- \n`);
                    message.delete();
                    process.exit(0);
                    break;
            }
        }
    }
})

client.login(process.env.BOT_TOKEN);