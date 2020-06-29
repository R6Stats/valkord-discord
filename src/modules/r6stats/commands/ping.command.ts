import { Message } from 'discord.js'
import { Injectable } from '../../../application/container'
import { ClientCommand, CommandContext } from '../../../domain/commands'

@Injectable()
export class PingCommand extends ClientCommand {
  public readonly command = 'ping'
  public readonly name = 'Ping'
  public readonly group = 'Other'
  public readonly shortHelp = 'r6s ping'

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    return ctx.reply('Pong!')
  }
}
