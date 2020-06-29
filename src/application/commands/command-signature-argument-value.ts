import { CommandSignatureArgument } from './command-signature-argument'

export class CommandSignatureArgumentValue<T = any> {
  public readonly value: T
  private readonly length: number
  private readonly arg: CommandSignatureArgument

  public constructor (value: T, length: number, arg: CommandSignatureArgument) {
    this.value = value
    this.length = length
    this.arg = arg
  }

  public getValue (): T {
    return this.value
  }

  public getLength (): number {
    return this.length
  }

  public getArgument (): CommandSignatureArgument {
    return this.arg
  }
}
