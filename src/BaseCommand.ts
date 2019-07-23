import { injectable } from 'inversify'
import MessageContext from './MessageContext'
import { Message } from 'discord.js'

@injectable()
abstract class BaseCommand {
  abstract shouldInvoke (ctx: MessageContext): boolean
  abstract invoke (ctx: MessageContext): Promise<void|Message|Message[]>
}

export default BaseCommand
