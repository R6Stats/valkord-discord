import { ArgumentType } from './ArgumentType'
import { resolveGamemode } from '../../utilities/resolvers'
import { Gamemode } from '../../types/Resolvable'
import GenericArgument from '../GenericArgument'

class GamemodeArumentType extends ArgumentType<Gamemode> {
  identifier: string = 'gamemode'

  parse (args: string[], begin: number): GenericArgument<Gamemode> {
    const raw = args[begin]

    const gamemode = resolveGamemode(raw)

    return new GenericArgument(gamemode, gamemode ? 1 : 0, `Gamemode ${raw} not supported. Valid options: ranked, casual, overall`)
  }

}

export default GamemodeArumentType
