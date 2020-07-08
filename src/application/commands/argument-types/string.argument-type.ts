import { CommandSignatureArgument } from '../command-signature-argument'
import { CommandSignatureArgumentType } from '../command-signature-argument-type'
import { CommandSignatureArgumentValue } from '../command-signature-argument-value'

export const QUOTE_CHARACTERS = ['\'', '"', '‘', '’', '“', '”']

export class CommandSignatureArgumentTypeString extends CommandSignatureArgumentType {
  protected readonly key: string = 'string'

  public parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null {
    let value = args[index]
    let i = index

    if (!value) {
      return new CommandSignatureArgumentValue(null, 0, arg)
    }

    if (this.startsWith(value, QUOTE_CHARACTERS)) {
      while (!this.endsWith(value, QUOTE_CHARACTERS) && i + 1 < args.length) {
        i++
        value += ' ' + args[i]
      }

      value = value.substr(1, value.length - 1)

      if (this.hasLastChar(value, QUOTE_CHARACTERS)) {
        value = value.substr(0, value.length - 1)
      }
    }

    const length = i - index + 1

    return new CommandSignatureArgumentValue(value, length, arg)
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
