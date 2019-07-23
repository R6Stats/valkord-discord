const PLATFORMS = {
  XBOX_ONE: { key: 'xone', name: 'Xbox One', logo: 'https://r6stats.com/img/platforms/xbox_logo.png'},
  PS4: { key: 'ps4', name: 'PS4', logo: 'https://r6stats.com/img/platforms/ps4_logo.png'},
  PC: { key: 'pc', name: 'PC', logo: 'https://r6stats.com/img/platforms/pc_logo.png' },
}

const RESOLVABLE_PLATFORMS = [
  { aliases: ['xbox', 'xbone', 'xone', 'xboxone', 'xbl'], data: PLATFORMS.XBOX_ONE },
  { aliases: ['psn', 'ps', 'playstation', 'ps4'], data: PLATFORMS.PS4 },
  { aliases: ['steam', 'pc', 'uplay'], data: PLATFORMS.PC },
]

const GAMEMODES = {
  OVERALL: { key: 'overall', name: 'Overall' },
  RANKED: { key: 'ranked', name: 'Ranked' },
  CASUAL: { key: 'casual', name: 'Casual' },
}

const RESOLVABLE_GAMEMODES = [
  { aliases: ['general', 'overall'], data: GAMEMODES.OVERALL  },
  { aliases: ['ranked'], data: GAMEMODES.RANKED },
  { aliases: ['casual'], data: GAMEMODES.CASUAL },
]

const RESOLVABLE_ROLES = [
  { aliases: ['atk', 'attacker', 'attack'], data: { key: 'atk', name: 'Attack' } },
  { aliases: ['def', 'defender', 'defend'], data: { key: 'def', name: 'Defense' } }
]

const RESOLVABLE_REGIONS = [
  { aliases: ['eu', 'emea', 'europe'], data: { key: 'emea', name: 'Europe' } },
  { aliases: ['na', 'ncsa'], data: { key: 'ncsa', name: 'Americas' } },
  { aliases: ['asia', 'apac'], data: { key: 'apac', name: 'Asia' } },
]

const RESOLVABLES = {
  PLATFORMS: RESOLVABLE_PLATFORMS,
  ROLES: RESOLVABLE_ROLES,
  GAMEMODES: RESOLVABLE_GAMEMODES,
  REGIONS: RESOLVABLE_REGIONS
}

const RANKS = [
  { name: 'Unranked', img: 'unranked.svg' },
  { name: 'Copper IV', img: 'copper-4.svg' },
  { name: 'Copper III', img: 'copper-3.svg' },
  { name: 'Copper II', img: 'copper-2.svg' },
  { name: 'Copper I', img: 'copper-1.svg' },
  { name: 'Bronze IV', img: 'bronze-4.svg' },
  { name: 'Bronze III', img: 'bronze-3.svg' },
  { name: 'Bronze II', img: 'bronze-2.svg' },
  { name: 'Bronze I', img: 'bronze-1.svg' },
  { name: 'Silver IV', img: 'silver-4.svg' },
  { name: 'Silver III', img: 'silver-3.svg' },
  { name: 'Silver II', img: 'silver-2.svg' },
  { name: 'Silver I', img: 'silver-1.svg' },
  { name: 'Gold IV', img: 'gold-4.svg' },
  { name: 'Gold III', img: 'gold-3.svg' },
  { name: 'Gold II', img: 'gold-2.svg' },
  { name: 'Gold I', img: 'gold-1.svg' },
  { name: 'Platinum III', img: 'platinum-3.svg' },
  { name: 'Platinum II', img: 'platinum-2.svg' },
  { name: 'Platinum I', img: 'platinum-1.svg' },
  { name: 'Diamond', img: 'diamond.svg' }
]

export { PLATFORMS, GAMEMODES, RESOLVABLES, RANKS }
