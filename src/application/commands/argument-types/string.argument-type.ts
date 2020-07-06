import { CommandSignatureArgument } from '../command-signature-argument'
import { CommandSignatureArgumentType } from '../command-signature-argument-type'
import { CommandSignatureArgumentValue } from '../command-signature-argument-value'

export const QUOTE_CHARACTERS = ['\'', '"', '‘', '’', '“', '”']

export class CommandSignatureArgumentTypeString extends CommandSignatureArgumentType {
  protected readonly key: string = 'string'

  public parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null {
    let check = args[index]
    let i = index

    if (this.startsWith(check, QUOTE_CHARACTERS)) {
      while (!this.endsWith(check, QUOTE_CHARACTERS) && i < args.length) {
        check += ' ' + args[i]
        i++
      }

      check = check.substr(1, check.length - 1)

      if (this.hasLastChar(check, QUOTE_CHARACTERS)) {
        check = check.substr(0, check.length - 1)
      }
    }

    return new CommandSignatureArgumentValue(args[index], 1, arg)
  }

  private startsWith (input: string, chars: string[]): boolean {
    return chars.some(s => input.startsWith(s))
  }

  private endsWith (input: string, chars: string[]): boolean {
    return chars.some(s => input.endsWith(s))
  }

  private hasLastChar (input: string, chars: string[]): boolean {
    return chars.some(s => input.charAt(input.length - 1) === s)
  }
}
