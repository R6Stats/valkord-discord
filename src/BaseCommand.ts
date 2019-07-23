import { injectable } from 'inversify'
import MessageContext from './MessageContext'
import { Message } from 'discord.js'

@injectable()
abstract class BaseCommand {
  command: string
  category: string
  help: string
  aliases: string[] = []

  shouldInvoke (ctx: MessageContext): boolean {
    return ctx.command === this.command || this.aliases.some((alias) => alias === ctx.command)
  }

  abstract invoke (ctx: MessageContext): Promise<void|Message|Message[]>
}

export default BaseCommand
