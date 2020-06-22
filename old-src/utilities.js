const getPlatform = (platform) => {
	let name, image
	switch(platform) {
		case 'xbox':
		case 'xone':
		case 'xbl':
		case 'xboxone':
		name = 'xone'
		image = 'https://r6stats.com/img/platforms/xbox_logo.png'
		break
		case 'uplay':
		case 'steam':
		case 'pc':
		name = 'uplay'
		image = 'https://r6stats.com/img/platforms/pc_logo.png'
		break
		case 'psn':
		case 'playstation':
		case 'ps4':
		name = 'ps4'
		image = 'https://r6stats.com/img/platforms/ps4_logo.png'
		break
		default:
    return null
	}

	return { name, image }
}

const getGamemode = (gamemode) => {
	switch(gamemode) {
		case 'general':
		case 'overall':
		gamemode = 'general'
		break
		case 'ranked':
		gamemode = 'ranked'
		break
		case 'casual':
		gamemode = 'casual'
		break
		default:
		gamemode = null
	}

	return gamemode
}

const getRole = (role) => {
	switch(role) {
		case 'atk':
		case 'attacker':
		case 'attack':
			role = 'atk'
			break
		case 'def':
		case 'defender':
		case 'defend':
		case 'denfense':
			role = 'def'
			break
		default:
			role = null
	}
	return role
}

const playtime = (seconds, timeView) => {
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

module.exports = { getPlatform, getGamemode, getRole, playtime }
