# R6Stats Discord Bot

This bot is built with [discordjs](https://discord.js.org/#/) to retrieve and display Rainbow Six: Siege stats from [R6Stats](https://r6stats.com)

## Installation
First-time run installation

## Configuring the Bot

```bash
DISCORD_TOKEN=    # the discord client token
PREFIXES=r6s,r6   # the prefixes that activate the bot
R6STATS_API_KEY=  # the r6stats public api key
```

## Running in Production

```bash
# compile the files to js and run
npm run build
npm run start:compiled

# or run ts directly with ts-node
npm run start
```

## Development & Testing

```bash
npm run dev
```
