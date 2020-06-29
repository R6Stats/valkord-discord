import { CommandSignatureArgument } from '../command-signature-argument'
import { CommandSignatureArgumentType } from '../command-signature-argument-type'
import { CommandSignatureArgumentValue } from '../command-signature-argument-value'

export class CommandSignatureArgumentTypeString extends CommandSignatureArgumentType {
  protected readonly key: string = 'string'

  public parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null {
    return new CommandSignatureArgumentValue(args[index], 1, arg)
  }
}
