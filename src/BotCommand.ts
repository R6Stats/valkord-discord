import { injectable } from 'inversify'
import ParsedCommandContext from './CommandContext'
import { Message } from 'discord.js'
import { CommandSignature } from './arguments/CommandSignature'

interface IBotCommand {
  readonly command: string
  readonly signature?: string
  readonly parsedSignature?: CommandSignature
  readonly category?: string
  readonly name?: string
  readonly usage?: string
  readonly aliases?: string[]

  shouldInvoke (ctx: ParsedCommandContext): boolean

  invoke (ctx: ParsedCommandContext): Promise<void|Message|Message[]>

}

@injectable()
abstract class BotCommand implements IBotCommand {
  public readonly command: string
  public readonly signature?: string
  public readonly parsedSignature?: CommandSignature
  public readonly category?: string
  public readonly name?: string
  public readonly usage?: string
  public readonly aliases?: string[] = []

  constructor () {
    if (this.signature) this.parsedSignature = new CommandSignature(this.signature)
  }

  public shouldInvoke (ctx: ParsedCommandContext): boolean {
    return ctx.commandStr === this.command || this.aliases.some((alias) => alias === ctx.commandStr)
  }

  public abstract async invoke (ctx: ParsedCommandContext): Promise<void|Message|Message[]>

}

export { IBotCommand, BotCommand }
