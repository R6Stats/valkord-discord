import { BotCommand } from '../BotCommand'
import { ICommandContext } from '../CommandContext'
import { Message } from 'discord.js'

class PingCommand extends BotCommand {
  public command: string = 'ping'
  public category: string = 'Other'

  public invoke (ctx: ICommandContext): Promise<void|Message|Message[]> {
    return ctx.reply('Pong!')
  }
}

export default PingCommand
