import { CommandSignatureArgumentType } from './command-signature-argument-type'

export class CommandSignatureArgument<T extends CommandSignatureArgumentType = CommandSignatureArgumentType> {
  private readonly type: T
  private readonly key: string
  private readonly optional: boolean

  public constructor (type: T, key: string, optional: boolean) {
    this.type = type
    this.key = key
    this.optional = optional
  }

  public getType (): T {
    return this.type
  }

  public getKey (): string {
    return this.key
  }

  public isOptional (): boolean {
    return this.optional
  }
}
