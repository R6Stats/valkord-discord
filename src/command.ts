export abstract class Command {
  protected command: string = ''
  protected aliases: string[] = []
  protected signature: string | undefined

  public getAliases (): string[] {
    return this.aliases
  }

  public getCommand (): string {
    return this.command
  }

  public hasCommand (input: string): boolean {
    return this.command === input || this.aliases.some(a => a === input)
  }

  public getRawSignature (): string | undefined {
    return this.signature
  }
}
