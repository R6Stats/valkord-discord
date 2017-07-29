var Discord = require('discord.js');
var client = new Discord.Client();

var R6Stats = require('r6stats');

var config = require('./config');

var StatsCommand = require('./lib/commands/stats');
var OperatorCommand = require('./lib/commands/operator');
var RandomOperatorCommand = require('./lib/commands/randomop');
var HelpCommand = require('./lib/commands/help');


var r6client = new R6Stats({
	username: config.r6stats.username,
	password: config.r6stats.password,
	user_agent: config.r6stats.user_agent
});


var players = new r6client.services.PlayerService(r6client);

client.on('ready', () => {
	console.log('Client connected!');
});

var commands = {
	'stats': new StatsCommand(players),
	'operator': new OperatorCommand(players),
	'randomop': new RandomOperatorCommand(),
	'help': new HelpCommand()
}

client.on('message', message => {
	var responders = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6'];

	if (message.author.bot) return;

	var found = false;
	for (var x of responders) {
		if (message.content.startsWith(x)) {
			found = true;
			break;
		}
	}

	if (!found) return;

	var split = message.content.split(' ');
	if (split.length <= 1) return;
	var command = split[1].toLowerCase();
	var args = split.slice(2);

	console.log(command, args);

	if (commands.hasOwnProperty(command)) {
		var cmd = commands[command];

		cmd.invoke(message, args);
	}
});

client.login(config.discord.token);