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

var equivalents = {
	'jager': 'Jäger',
	'capitao': 'Capitão'
}

var operators = [].concat(DEFENDERS).concat(ATTACKERS).concat(Object.keys(equivalents));

function OperatorCommand(players) {
	this.api = players;
}

var p = {};

p.invoke = function(msg, args) {
	var operator, username, platform;

	if (args.length !== 3) {
		return msg.reply('Incorrect usage! `r6s operator <operator name> <username> <platform>');
	}

	var operator = args[0];
	var username = args[1];
	var platform = args[2];

	var found = operators.find(function(op) {
		return op.toLowerCase() === operator.toLowerCase();
	});

	if (!found) {
		return msg.reply('operator not found!');
	}

	var platformData = common.getPlatform(platform);
	console.log(platformData)
	platform = platformData.name;
	if (!platform) {
		return msg.reply('Invalid platform! Valid options are: *xone*, *uplay*, or *ps4*');
	}
	var platformImg = platformData.image;
	console.log(platform)

	this.api.getOperators(username, platform)
		.then(function(res) {
			var opresult;
			if (equivalents.hasOwnProperty(operator)) {
				operator = equivalents[operator];
			}
			console.log(operator)
			for (var op of res) {
				if (op.operator.name.toLowerCase() === operator.toLowerCase()) {
					opresult = op;
					break;
				}
			}
			if (!opresult) {
				msg.reply('an error occurred..')
			} else {
				var or = opresult;
				var name, role, ctu, kills, deaths, kd, wins, losses, wl, playtime, specials;

				name = op.operator.name;
				role = op.operator.role;
				ctu = op.operator.ctu;
				kills = op.stats.kills;
				deaths = op.stats.deaths;
				wins = op.stats.wins;
				losses = op.stats.losses
				playtime = op.stats.playtime;
				specials = op.stats.specials;

				kd = deaths > 0 ? (kills / deaths).toFixed(2) : 'N/A'
				wl = losses > 0 ? (wins / losses).toFixed(2) : 'N/A'

				kills = kills.toLocaleString();
				deaths = deaths.toLocaleString();
				wins = wins.toLocaleString();
				losses = losses.toLocaleString();

				playtime = common.playtime(playtime, 'days');

				var specialLine = "";

				var keys = Object.keys(specials);

				for (var k in keys) {
					var key = keys[k];
					var translation = constants.operator_stats[key];
					var value = specials[key].toLocaleString();
					specialLine += '*' + translation + '*: ' + value + '\n';
				}

				msg.channel.send({
				embed: {
					color: 3447003,
				    author: {
				      name: username + ' Operator Stats',
				      url: 'https://r6stats.com/stats/' + platform + '/' + username,
				      icon_url: platformImg
				    },
				    thumbnail: {
				    	url: op.operator.images.badge
				    },
				    fields: [
				    	{
				    		name: 'About',
				    		inline: true,
				    		value: '**Operator**: ' + name + '\n'
				    			+ '**Role**: ' + (role === 'def' ? 'Defender' : 'Attacker') + '\n'
				    			+ '**CTU**: ' + ctu + '\n'
				    			+ '**Playtime** ' + playtime + '\n' 
				    	},
				    	{
				    		name: 'Kill/Death',
				    		inline: true,
				    		value: '**Kills**: ' + kills + '\n'
				    			+ '**Deaths**: ' + deaths + '\n'
				    			+ '**K/D**: ' + kd + '\n'
				    	},
				    	{
				    		name: 'Win/Loss',
				    		inline: true,
				    		value: '**Wins**: ' + wins + '\n'
				    			+ '**Losses**: ' + losses + '\n'
				    			+ '**W/L**: ' + wl + '\n'
				    	},
				    	{
				    		name: 'Specials',
				    		inline: true,
				    		value: specialLine
				    	}
				    ],
				    footer: {
				      icon_url: 'https://beta.r6stats.com/static/large-logo-100.png',
				      text: "Stats Provided by R6Stats.com",
				      url: 'https://r6stats.com'
				    }
				}
			})
			}
		})
		.catch(function(err) {
			console.log(err)
			msg.reply('player not found!')
		});
}

OperatorCommand.prototype = p;

module.exports = OperatorCommand;