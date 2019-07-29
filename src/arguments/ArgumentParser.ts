import { CommandSignature } from './CommandSignature'
import { injectable, inject } from 'inversify'
import { ServiceTypes } from '../types'
import ArgumentRegistrar from './ArgumentRegistrar'
import InvalidArgumentException from '../exceptions/InvalidArgumentException'
import BotException from '../exceptions/BotException'
import { ParsedArguments } from '../CommandContext'

interface IArgumentParser {
  parse (signature: CommandSignature, args: string[]): ParsedArguments;
}

@injectable()
class ArgumentParser implements IArgumentParser {
  private registrar: ArgumentRegistrar<any>

  public constructor (
    @inject(ServiceTypes.ArgumentRegistrar) argumentRegistar: ArgumentRegistrar<any>
  ) {
    this.registrar = argumentRegistar
  }

  public parse (signature: CommandSignature, args: string[]): ParsedArguments {
    const actualArguments = signature.arguments
    const values: ParsedArguments = {}

    let curIndex = 0
    for (const arg of actualArguments) {
      const argumentType = this.registrar.getTypeForIdentifier(arg.type)

      if (!argumentType) throw new BotException(`No ArgumentType registered for '${argumentType}'`)

      const val = argumentType.parse(args, curIndex)

      if (!val.value && !arg.optional) throw new InvalidArgumentException(val.errorMessage)
      values[arg.key] = val.value
      curIndex += val.length
    }

    return values
  }

}

export default ArgumentParser
