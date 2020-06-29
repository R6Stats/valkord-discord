import { CommandSignatureArgument } from './command-signature-argument'

export class CommandSignature {
  private readonly args: CommandSignatureArgument[]

  public constructor (args: CommandSignatureArgument[]) {
    this.args = args
  }

  public getArguments (): CommandSignatureArgument[] {
    return this.args
  }

  public getUserReadableString (): string {
    return this.args.map(a => `${a.isOptional() ? '{' : '<'}${a.getKey()}${a.isOptional() ? '}' : '>'}`).join(' ')
  }
}
