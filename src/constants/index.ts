export enum ResolvableType {
  PLATFORM = 'PLATFORMS',
  GAMEMODE = 'GAMEMODES',
  ROLE = 'ROLES',
}

export const PLATFORMS = [
  [{ name: 'xone', logo: 'https://r6stats.com/img/platforms/xbox_logo.png'}, ['xbox', 'xbone', 'xone', 'xboxone', 'xbl']],
  [{ name: 'ps4', logo: 'https://r6stats.com/img/platforms/ps4_logo.png'}, ['psn', 'ps', 'playstation', 'ps4']],
  [{ name: 'pc', logo: 'https://r6stats.com/img/platforms/pc_logo.png' }, ['steam', 'pc', 'uplay']],
]

export const GAMEMODES = [
  ['overall', ['general', 'overall']],
  ['ranked', ['ranked']],
  ['casual', ['casual']],
]

export const ROLES = [
  ['atk', ['atk', 'attacker', 'attack']],
  ['def', ['def', 'defender', 'defend']],
]

export const RESOLVABLES = { PLATFORMS, ROLES, GAMEMODES }
