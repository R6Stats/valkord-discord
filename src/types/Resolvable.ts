export enum ResolvableType {
  PLATFORM = 'PLATFORMS',
  GAMEMODE = 'GAMEMODES',
  ROLE = 'ROLES',
}

interface Resolvable {
  key: string
  name: string
}

export interface Platform extends Resolvable {
  logo: string
}

export interface Gamemode extends Resolvable {}

export interface OperatorRole extends Resolvable {}
