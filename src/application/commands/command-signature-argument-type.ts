import { CommandSignatureArgument } from './command-signature-argument'
import { CommandSignatureArgumentValue } from './command-signature-argument-value'

export abstract class CommandSignatureArgumentType {
  protected readonly key: string

  abstract parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null

  public getKey (): string {
    return this.key
  }
}
