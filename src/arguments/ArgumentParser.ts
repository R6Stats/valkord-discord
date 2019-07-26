import { CommandSignature } from './CommandSignature'
import { injectable, inject } from 'inversify'
import { ServiceTypes } from '../types';
import ArgumentRegistrar from './ArgumentRegistrar';
import InvalidArgumentException from '../exceptions/InvalidArgumentException';
import GenericArgument from './GenericArgument'
import BotException from '../exceptions/BotException';

interface IArgumentParser {
  registrar: ArgumentRegistrar<any>

  parse (signature: CommandSignature, args: string[]): Map<string, GenericArgument<any>>
}

@injectable()
class ArgumentParser {
  private registrar: ArgumentRegistrar<any>

  constructor (
    @inject(ServiceTypes.ArgumentRegistrar) argumentRegistar: ArgumentRegistrar<any>
  ) {
    this.registrar = argumentRegistar
  }

  public parse (signature: CommandSignature, args: string[]): Map<string, GenericArgument<any>> {
    const actualArguments = signature.arguments
    const values: Map<string, GenericArgument<any>> = new Map()

    let curIndex = 0
    for (const arg of actualArguments) {
      const argumentType = this.registrar.getTypeForIdentifier(arg.type)

      if (!argumentType) throw new BotException(`No ArgumentType registered for '${argumentType}'`)

      const val = argumentType.parse(args, curIndex)

      if (!val.value && !arg.optional) throw new InvalidArgumentException(val.errorMessage)

      values.set(arg.key, val.value)
      curIndex += val.length
    }

    return values
  }

}

export default ArgumentParser
