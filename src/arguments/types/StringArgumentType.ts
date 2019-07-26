import { ArgumentType } from "./ArgumentType";
import GenericArgument from '../GenericArgument'

class StringArgumentType extends ArgumentType<string> {
  identifier = 'string'

  parse (args: string[], begin: number): GenericArgument<string> {
    return new GenericArgument(args[begin], 1)
  }

}

export default StringArgumentType
