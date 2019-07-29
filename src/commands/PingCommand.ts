import { BotCommand } from '../BotCommand'
import { ICommandContext } from '../CommandContext'
import { Message } from 'discord.js'

class PingCommand extends BotCommand {

  command: string = 'ping'
  category: string = 'Other'

  invoke (ctx: ICommandContext): Promise<void|Message|Message[]> {
    return ctx.reply('Pong!')
  }

}

export default PingCommand
