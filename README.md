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
  - [Setup (yarn)](#setup-yarn)
  - [Run the bot (prod)](#run-the-bot-prod)
  - [Run the bot (dev)](#run-the-bot-dev)
  - [Dependencies](#dependencies)

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

- Windows: Good luck with [that](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

## .env file

```js
BOT_TOKEN=
WEATHER_API_KEY=
OWNER_ID=
PREFIX=!
```

## Setup (yarn)

```
yarn install
```

## Run the bot (prod)

```
npm run start
```

## Run the bot (dev)

```
npm run dev
```

## Dependencies

child_process:
    - https://www.npmjs.com/package/child_process
discord.js:
    - https://www.npmjs.com/package/discord.js
dotenv:
    - https://www.npmjs.com/package/dotenv
mariadb:
    - https://www.npmjs.com/package/mariadb
nodemon:
    - https://www.npmjs.com/package/nodemon
ts-node:
    - https://www.npmjs.com/package/ts-node
typescript:
    - https://www.npmjs.com/package/typescript
node-fetch:
    - https://www.npmjs.com/package/node-fetch