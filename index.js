const Discord = require('discord.js');
const client = new Discord.Client();

// var R6Stats = require('r6stats');

const config = require('./config');

import StatsCommand from './src/commands/StatsCommand'
import HelpCommand from './src/commands/HelpCommand'

// var r6client = new R6Stats({
// 	username: config.r6stats.username,
// 	password: config.r6stats.password,
// 	user_agent: config.r6stats.user_agent
// });

client.on('ready', () => {
	console.log('Client connected!');
});

const commands = [
  StatsCommand,
  HelpCommand
]

const supportedResponders = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6'];

client.on('message', messageHandler)
client.login(config.discord.token);

function messageHandler (message) {

	if (message.author.bot) return;

  if (!isOurCommand(message.content)) return

	let split = message.content.split(' ');
	if (split.length <= 1) return;
	let command = split[1].toLowerCase();
	let args = split.slice(2);

  for (let cmd of commands) {

    let cmdInstance = new cmd({ args, message, command })
    if (cmdInstance.shouldInvoke()) {
      cmdInstance.invoke()
      break
    }
  }
}

function isOurCommand(str) {
  for (let responder of supportedResponders) {
		if (str.startsWith(responder)) {
			return true
		}
	}
}
