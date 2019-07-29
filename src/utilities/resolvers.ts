import { RESOLVABLES } from '../constants'
import { ResolvableType, Resolvable, Platform, Gamemode, OperatorRole, RankedRegion } from '../types/Resolvable'

const resolveType = (alias: string, type: ResolvableType, def?: Resolvable): Resolvable => {
  if (!alias) return def

  alias = alias.toLowerCase()
  const opts = RESOLVABLES[type]

  for (const x of opts) {
    if (x.aliases.includes(alias)) return x.data
  }

  return def
}

export const resolvePlatform = (platform: string, def?: Platform): Platform => {
  return resolveType(platform, ResolvableType.PLATFORM, def) as Platform
}

export const resolveGamemode = (gamemode: string, def?: Gamemode): Gamemode => {
  return resolveType(gamemode, ResolvableType.GAMEMODE, def) as Gamemode
}

export const resolveOperatorRole = (role: string, def?: OperatorRole): OperatorRole => {
  return resolveType(role, ResolvableType.ROLE, def) as OperatorRole
}

export const resolveRankedRegion = (region: string, def?: RankedRegion): RankedRegion => {
  return resolveType(region, ResolvableType.REGION, def) as RankedRegion
}
