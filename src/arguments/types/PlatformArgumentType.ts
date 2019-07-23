import ArgumentType from "./ArgumentType";
import { Platform } from "../../types/Resolvable";
import { resolvePlatform } from "../../utilities/resolvers";

class PlatformArgumentType extends ArgumentType<Platform> {
  identifier: string = 'platform'

  parse (args: string[], begin: number): GenericArgument<Platform> {
    let argument = args[begin]

    const platform = resolvePlatform(argument)

    return platform ? new GenericArgument(platform) : null
  }

}

export default PlatformArgumentType
