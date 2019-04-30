# R6Stats Discord Bot

This bot is built with [discordjs](https://discord.js.org/#/) to retrieve and display Rainbow Six: Siege stats from [R6Stats](https://r6stats.com)

## Installation
First-time run installation

### Install Yarn
Go to [yarn download page](https://yarnpkg.com/en/docs/install#windows-stable) and choose the platform that fits your needs, for example Windows.

### Run Yarn in the project
Go into the folder where you placed the bot using a command-line tool and run (freshly opened after installing yarn)
```bash
yarn
```

### Setup the config
Copy the `config.example.js` and create a `config.js`
replace `login` with your uplay email adres
replace `password` with your uplay password
replace `base_url` with the API endpoint of r6stats
replace `token` with your discord bot token, if you do not have one, create one [here](https://discordapp.com/developers/applications/)

## Running in Production

```bash
yarn start
```

## Development & Testing

```bash
yarn run dev
```

## Debugging
If you run into an error that says
```
The term 'yarn' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

Check your PATH system enviroment variables.
Make sure you closed all the command-lines.

If the error still accures, restart your device, it should work after.
