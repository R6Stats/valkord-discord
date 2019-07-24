import { injectable } from 'inversify'
import MessageContext from './MessageContext'
import { Message } from 'discord.js'
import { CommandSignature } from './arguments/CommandSignature';

interface IBotCommand {}

@injectable()
abstract class BotCommand implements IBotCommand {
  private _booted: boolean = false

  public command: string
  public signature: string
  public parsedSignature: CommandSignature
  public category: string
  public name: string
  public usage: string
  public aliases: string[] = []

  shouldInvoke (ctx: MessageContext): boolean {
    return ctx.command === this.command || this.aliases.some((alias) => alias === ctx.command)
  }

  abstract invoke (ctx: MessageContext): Promise<void|Message|Message[]>

  boot () {
    this.parseSignature()

    this._booted = true
  }

  isBooted () {
    return this._booted
  }

  private parseSignature () {
    if (this.signature) {
      this.parsedSignature = new CommandSignature(this.signature)
    }
  }
}

export { IBotCommand, BotCommand }

// export default BaseCommand
