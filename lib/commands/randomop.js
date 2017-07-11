var common = require('../common');
var constants = require('../constants');

var ATTACKERS = [
'Ash', 'Blackbeard', 'Blitz', 'Buck', 'Capitão', 'Fuze', 'Glaz',
'Hibana', 'IQ', 'Jackal', 'Sledge', 'Thatcher', 'Thermite', 'Twitch'
];

var DEFENDERS = [
'Bandit', 'Castle', 'Caveira', 'Doc', 'Echo', 'Frost', 'Jäger', 'Kapkan',
'Mira', 'Montagne', 'Mute', 'Pulse', 'Rook', 'Smoke', 'Tachanka', 'Valkyrie'
];

var OPERATORS = [].concat(ATTACKERS).concat(DEFENDERS);

function RandomOperatorCommand() {
}

var p = {};

p.invoke = function(msg, args) {
	var role;

	if (args.length === 1) {
		role = common.getRole(args[0]);

		if (!role) return msg.reply('Invalid role!');

		return chooseOperator(role === 'atk' ? ATTACKERS : DEFENDERS, msg);
	}

	chooseOperator(OPERATORS, msg);


}

function chooseOperator(arr, msg) {
	var random = arr[Math.random(Math.floor(Math.random()*arr.length))];
	msg.channel.send({
		embed: {
			color: 3447003,
			title: 'Random Operator',
			fields: [
			{
				name: 'Chosen Operator',
				inline: true,
				value: '**Name**: ' + random + '\n'
			}
			]
		}
	})
}

RandomOperatorCommand.prototype = p;

module.exports = RandomOperatorCommand;