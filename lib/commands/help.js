var common = require('../common');
var constants = require('../constants');


function HelpCommand() {
}

var p = {};

p.invoke = function(msg, args) {
	msg.channel.send({
		embed: {
			color: 3447003,
			title: 'R6Stats Help',
			description: 'Parameters enclosed in **<  >** are required while those within **{   }** are optional. \nDo not include these symbols.',
			fields: [
			{
				name: 'Usage',
				value: '**r6s stats <player> <platform> {general|ranked|casual}**: Get the stats of a player\n'
				+ '**r6s operator <operator> <player> <platform> **: Get the stats of a single operator\n'
				+ '**r6s help**: Display this help screen\n'
			},
			{
				name: 'Examples',
				value: '**r6s stats Zed_AU uplay**\n'
				+ '**r6s stats Zed_AU uplay ranked**\n'
				+ '**r6s operator Jager Dfletcher ps4 **\n'
			}
			],
			footer: {
				icon_url: 'https://beta.r6stats.com/static/large-logo-100.png',
				text: "Stats Provided by R6Stats.com",
				url: 'https://r6stats.com'
			}
		}
	});

}

HelpCommand.prototype = p;

module.exports = HelpCommand;