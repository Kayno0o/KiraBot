# Presentation
KiraBot is the bot I always dreamt to code...\
I really want to put effort on it (or maybe I will give up as always, we'll see...)

I want it to be a multi-purpose bot.\
And by that, I mean **multi-purpose**.

Weather, maths, random fact, moderation, gifs, horoscope, anime, ...

And yes... I know a lot of bots already do that, but I wanna do it in my own way. ;)

Feel free to send me suggestions on my [Discord](https://discord.gg/v3gWmCrvNf)

# Table of contents
- [Presentation](#presentation)
- [Table of contents](#table-of-contents)
- [Setup](#setup)
  - [Prerequisite](#prerequisite)
  - [.env file](#env-file)
- [Start the bot](#start-the-bot)
  - [Running the bot](#running-the-bot)
  - [Reloading the bot](#reloading-the-bot)
  - [Stopping the bot](#stopping-the-bot)

# Setup

## Prerequisite

- Debian
    ```
    sudo apt install nodejs yarn
    ```
- Arch (yay)
    ```
    yay -S nodejs yarn
    ```

I think that's all, or at least for those 2 linux distro

## .env file

```js
BOT_TOKEN=
WEATHER_API_KEY=
OWNER_ID=
PREFIX=;
```

# Start the bot

## Running the bot

The bot runs in two parts :
1. `run.ts`: creates the command to reload (`./scripts/reload.sh`) the bot (after crash or edit)
2. `./app/main.ts`: the bot itself

```bash
# this runs the script that starts the bot
./scripts/run.sh
```

If you can't run the script, maybe you need to set the permission to execute it:
```bash
chmod +x ./run.sh
```

## Reloading the bot

You can reload the bot either by typing the command `;;reload` directly in Discord\
(if you specified your uID in the .env file, and you have to double your prefix, ex: `;` => `;;`)

## Stopping the bot

You can stop safely all bot instance via the command `;;stop` in Discord\
(again, double your prefix)

Or by running this script `.scripts/stop.sh`\
(it kills every node instance, so if you have something else running, pay attention)