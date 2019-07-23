import BaseCommand from '../BaseCommand'
import MessageContext from '../MessageContext'
import { Message } from 'discord.js'

class PingCommand extends BaseCommand {

  command: string = 'ping'
  category: string = 'Other'

  invoke (ctx: MessageContext): Promise<void|Message|Message[]> {
    return ctx.reply('Pong!')
  }

}

export default PingCommand
