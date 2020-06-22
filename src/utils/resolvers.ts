export const getGamemode = (gamemode: string): string => {
  switch (gamemode) {
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

export const getRole = (role: string): string => {
  switch (role) {
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
