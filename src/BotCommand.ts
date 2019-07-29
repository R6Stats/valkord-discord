import { injectable } from 'inversify'
import { Message } from 'discord.js'
import { CommandSignature } from './arguments/CommandSignature'
import { IMessageContext, ICommandContext } from './CommandContext';

interface IBotCommand {
  readonly command: string
  readonly signature?: string
  readonly parsedSignature?: CommandSignature
  readonly category?: string
  readonly name?: string
  readonly usage?: string
  readonly aliases?: string[]

  shouldInvoke (ctx: IMessageContext): boolean

  invoke (ctx: ICommandContext): Promise<void|Message|Message[]>

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
    console.log(this.command)
    if (this.signature) {
      console.log('parsing', this)
      this.parsedSignature = new CommandSignature(this.signature)
    }
  }

  public shouldInvoke (ctx: IMessageContext): boolean {
    return ctx.commandStr === this.command || this.aliases.some((alias) => alias === ctx.commandStr)
  }

  public abstract async invoke (ctx: ICommandContext): Promise<void|Message|Message[]>

}

export { IBotCommand, BotCommand }
