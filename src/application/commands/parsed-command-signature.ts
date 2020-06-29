import { CommandArguments } from './client-command'
import { CommandSignatureArgumentValue } from './command-signature-argument-value'

export class ParsedCommandSignature {
  private readonly values: CommandSignatureArgumentValue[]

  public constructor (values: CommandSignatureArgumentValue[]) {
    this.values = values
  }

  public getValues (): CommandSignatureArgumentValue[] {
    return this.values
  }

  public get <T extends CommandArguments = Record<string, CommandSignatureArgumentValue>>(): T {
    return this.values.reduce((carry, val) => {
      carry[val.getArgument().getKey()] = val

      return carry
    }, {} as T)
  }
}
