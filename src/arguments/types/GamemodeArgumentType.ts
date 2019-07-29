import { Gamemode } from '../../types/Resolvable'
import { resolveGamemode } from '../../utilities/resolvers'
import GenericArgument from '../GenericArgument'
import { ArgumentType } from './ArgumentType'

class GamemodeArumentType extends ArgumentType<Gamemode> {
  public identifier: string = 'gamemode'

  public parse (args: string[], begin: number): GenericArgument<Gamemode> {
    const raw = args[begin]

    const gamemode = resolveGamemode(raw)

    return new GenericArgument(gamemode, gamemode ? 1 : 0, `Gamemode ${raw} not supported. Valid options: ranked, casual, overall`)
  }

}

export default GamemodeArumentType
