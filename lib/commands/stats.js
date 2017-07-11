var common = require('../common');


function StatsCommand(players) {
	this.api = players;
}

var p = {};

p.invoke = function(msg, args) {

	var player, platform, gamemode, platformImg;

	if (args.length >= 2) {
		player = args[0];
		plat = args[1];
		console.log(plat)
		var data = common.getPlatform(plat);
		platformImg = data.image;
		platform = data.name;

		if (platform === null) {
			return msg.reply('Invalid platform! Valid options are: *xone*, *uplay*, or *ps4*');
		}
	} else {
		return msg.reply('Incorrect usage! r6s stats <username> <platform>');
	}

	if (args.length === 3) {
		gamemode = common.getGamemode(args[2]);

		if (gamemode === null) {
			return msg.reply('Invalid gamemode! Valid options are: overall, ranked, or casual');
		}
	} else {
		gamemode = "general";
	}



	console.log(player, platform);

	this.api.getPlayer(player, platform)
		.then(function(res) {
			var kills, deaths, assists, kd, wins, losses, wlr, shotsFired, shotsHit, accuracy, headshots, headshotPercentage,
				revives, suicides, barricades, reinforcements, melee, penetration;

			if (gamemode === "general") {
				kills = res.stats.ranked.kills + res.stats.casual.kills;
				deaths = res.stats.ranked.deaths + res.stats.casual.deaths;
				wins = res.stats.ranked.wins + res.stats.casual.wins;
				losses = res.stats.ranked.losses + res.stats.casual.losses;
			} else if (gamemode === "ranked") {
				kills = res.stats.ranked.kills;
				deaths = res.stats.ranked.deaths;
				wins = res.stats.ranked.wins;
				losses = res.stats.ranked.losses;
			} else if (gamemode === "casual") {
				kills = res.stats.casual.kills;
				deaths = res.stats.ranked.deaths;
				wins = res.stats.casual.wins;
				losses = res.stats.ranked.losses;
			}


			assists = res.stats.overall.assists.toLocaleString();
			kd = deaths > 0 ? (kills / deaths).toFixed(2) : 'N/A';
			wlr = losses > 0 ? (wins / losses).toFixed(2) : 'N/A';
			shotsFired = res.stats.overall.bullets_fired;
			shotsHit = res.stats.overall.bullets_hit;
			headshots = res.stats.overall.headshots;
			headshotPercentage = (headshots / kills).toFixed(2);
			accuracy = (shotsHit / shotsFired).toFixed(2);
			revives = res.stats.overall.revives.toLocaleString();
			suicides = res.stats.overall.suicides.toLocaleString();
			barricades = res.stats.overall.barricades_built.toLocaleString();
			reinforcements = res.stats.overall.reinforcements_deployed.toLocaleString();
			melee = res.stats.overall.melee_kills.toLocaleString();
			penetration = res.stats.overall.penetration_kills.toLocaleString();

			shotsFired = shotsFired.toLocaleString();
			shotsHit = shotsHit.toLocaleString();
			headshots = headshots.toLocaleString();
			kills = kills.toLocaleString();
			deaths = deaths.toLocaleString();
			wins = wins.toLocaleString();
			losses = losses.toLocaleString();

			var title = gamemode.charAt(0).toUpperCase() + gamemode.slice(1);
			msg.channel.send({
				embed: {
					color: 3447003,
				    author: {
				      name: res.username,
				      url: 'https://r6stats.com/stats/' + platform + '/' + player,
				      icon_url: platformImg
				    },
				    title: title + ' Player Stats',
				    fields: [
				    	{
				    		name: 'Kill/Deaths',
				    		inline: true,
				    		value: '**Kills**: ' + kills + '\n'
				    			+ '**Deaths**: ' + deaths + '\n'
				    			+ '**Assists**: ' + assists + '\n'
				    			+ '**K/D**: ' + kd + '\n'
				    	},
				    	{
				    		name: 'Win/Loss',
				    		inline: true,
				    		value: '**Wins**: ' + wins + '\n'
				    			+ '**Losses**: ' + losses + '\n'
				    			+ '**W/L**: ' + wlr + '\n'
				    	},
				    	{
				    		name: 'Accuracy',
				    		inline: true,
				    		value: '**Shots Fired**: ' + shotsFired + '\n'
				    			+ '**Shots Hit**: ' + shotsHit + '\n'
				    			+ '**Accuracy**: ' + accuracy + '\n'
				    			+ '**Headshots**: ' + headshots + '\n'
				    			+ '**Headshot %**: ' + headshotPercentage + '\n'
				    	},
				    	{
				    		name: 'Misc.',
				    		inline: true,
				    		value: '**Revives**: ' + revives + '\n'
				    			+ '**Suicides**: ' + suicides + '\n'
				    			+ '**Barricades**: ' + barricades + '\n'
				    			+ '**Reinforcements**: ' + reinforcements + '\n'
				    			+ '**Melee Kills**: ' + melee + '\n'
				    			+ '**Penetration Kills**: ' + penetration + '\n'
				    	},
				    ],
				    footer: {
				      icon_url: 'https://beta.r6stats.com/static/large-logo-100.png',
				      text: "Stats Provided by R6Stats.com",
				      url: 'https://r6stats.com'
				    }
				}
			});
		})
		.catch(function(err) {
			console.log(err);
			msg.reply('player not found!')
		});
}

StatsCommand.prototype = p;

module.exports = StatsCommand;