import { Injectable } from '../decorators/injectable.decorator'
import { Command, CommandContext } from './command'
import { Message } from 'discord.js'

@Injectable()
export class PingCommand extends Command {
  public readonly command = 'ping'
  public readonly name = 'Ping'
  public readonly group = 'Other'
  public readonly shortHelp = 'r6s ping'

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    return ctx.reply('Pong!')
  }
}
