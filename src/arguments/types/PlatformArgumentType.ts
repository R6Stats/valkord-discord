import { ArgumentType } from "./ArgumentType";
import { resolvePlatform } from '../../utilities/resolvers';
import { Platform } from '../../types/Resolvable';
import GenericArgument from '../GenericArgument'

class PlatformArgumentType extends ArgumentType<Platform> {
  identifier: string = 'platform'

  parse (args: string[], begin: number): GenericArgument<Platform> {
    const raw = args[begin]

    const platform = resolvePlatform(raw)

    return new GenericArgument(platform, platform ? 1 : 0, `Platform ${raw} not supported. Valid options: xbox, ps4, pc`)
  }

}

export default PlatformArgumentType
