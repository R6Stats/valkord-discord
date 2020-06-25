import { Message } from 'discord.js'

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

  public shouldHandle (ctx: CommandContext): boolean {
    return this.command === ctx.command
  }

  abstract handle (ctx: CommandContext): Promise<void | Message | Message[]>
}


export class CommandContext {
  public readonly original: Message
  public readonly command: string
  public readonly args: string[]

  public constructor (original: Message, command: string, args: string[]) {
    this.original = original
    this.command = command
    this.args = args
  }

  public async reply (message: Message | string): Promise<Message> {
    return this.original.reply(message)
  }
}
