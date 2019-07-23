import { RESOLVABLES } from '../constants'
import { ResolvableType, Resolvable, Platform, Gamemode, OperatorRole, RankedRegion } from '../types/Resolvable'

const resolveType = (alias: string, type: ResolvableType, def?: Resolvable) => {
  if (!alias) return def

  alias = alias.toLowerCase()
  const opts = RESOLVABLES[type]

  for (const x of opts) {
    if (x.aliases.includes(alias)) return x.data
  }

  return def
}

export const resolvePlatform = (platform: string, def?: Platform): Platform => {
  return <Platform>resolveType(platform, ResolvableType.PLATFORM, def)
}

export const resolveGamemode = (gamemode: string, def?: Gamemode): Gamemode => {
  return <Gamemode>resolveType(gamemode, ResolvableType.GAMEMODE, def)
}

export const resolveOperatorRole = (role: string, def?: OperatorRole): OperatorRole => {
  return <OperatorRole>resolveType(role, ResolvableType.ROLE, def)
}

export const resolveRankedRegion = (region: string, def?: RankedRegion): RankedRegion => {
  return <RankedRegion>resolveType(region, ResolvableType.REGION, def)
}
