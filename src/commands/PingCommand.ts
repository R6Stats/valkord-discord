import { BotCommand } from '../BotCommand'
import MessageContext from '../MessageContext'
import { Message } from 'discord.js'

class PingCommand extends BotCommand {

  command: string = 'ping'
  category: string = 'Other'

  invoke (ctx: MessageContext): Promise<void|Message|Message[]> {
    return ctx.reply('Pong!')
  }

}

export default PingCommand
