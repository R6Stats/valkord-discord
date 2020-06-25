import { Message } from 'discord.js'
import { Injectable } from '../decorators/injectable.decorator'
import { Command, CommandContext } from './command'

@Injectable()
export class PingCommand extends Command {
  protected command = 'ping'

  public handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    return ctx.reply('Pong!')
  }
}
