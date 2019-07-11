import { RESOLVABLES } from "../constants"
import { ResolvableType, Platform, Gamemode, OperatorRole } from "../types/Resolvable";

const resolveType = (alias: string, type: ResolvableType) => {
  const opts = RESOLVABLES[type]

  for (const x of opts) {
    if (x.aliases.includes(alias)) return x.data
  }

  return null
}

export const resolvePlatform = (platform: string): Platform => {
  return <Platform>resolveType(platform, ResolvableType.PLATFORM)
}

export const resolveGamemode = (gamemode: string): Gamemode => {
  return <Gamemode>resolveType(gamemode, ResolvableType.GAMEMODE)
}

export const resolveOperatorRole = (role: string): OperatorRole => {
  return <OperatorRole>resolveType(role, ResolvableType.ROLE)
}
