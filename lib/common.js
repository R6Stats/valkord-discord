var ex = {};

ex.getPlatform = function (plat) {
	var platform, platformImg;
	switch(plat) {
		case 'xbox':
		case 'xone':
		case 'xbl':
		case 'xboxone':
		platform = 'xone';
		platformImg = 'https://beta.r6stats.com/static/platform-icons/xone_logo.png'
		break;
		case 'uplay':
		case 'steam':
		case 'pc':
		platform = 'uplay';
		platformImg = 'https://beta.r6stats.com/static/platform-icons/uplay_logo.png'
		break;
		case 'psn':
		case 'playstation':
		case 'ps4':
		platform = 'ps4';
		platformImg = 'https://beta.r6stats.com/static/platform-icons/ps4_logo.png'
		break;
		default:
		platform = null;
	}

	return {
		name: platform,
		image: platformImg
	};
}

ex.getGamemode = function(gamemode) {
	switch(gamemode) {
		case "general":
		case "overall":
		gamemode = "general"
		break
		case "ranked":
		gamemode = "ranked"
		break
		case "casual":
		gamemode = "casual"
		break
		default:
		gamemode = null
	}

	return gamemode;
}

ex.playtime = function(seconds, timeView) {
  let hours
  let minutes
  let days
  let timeStr = ''

  minutes = Math.floor(seconds / 60)
  hours = Math.floor(minutes / 60)
  days = Math.floor(hours / 24)

  minutes %= 60

  if (timeView === 'days') {
    hours %= 24
    if (days) timeStr += days + 'd '
  }

  if (hours) timeStr += hours + 'h '
  if (minutes) timeStr += minutes + 'm'

  return timeStr.length > 0 ? timeStr : 'N/A'
}


module.exports = ex;