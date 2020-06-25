import { Message } from 'discord.js'
import { Injectable } from '../decorators/injectable.decorator'
import { Command, CommandContext } from './command'
import { StatsService } from '../services/stats.service'

@Injectable()
export class PingCommand extends Command {
  public command = 'ping'
  public signature = '<username:string> <platform:string>'

  private readonly stats: StatsService

  public constructor (stats: StatsService) {
    super()

    this.stats = stats
  }

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    const { username, platform } = ctx.signature.get()

    console.log(username, platform)

    try {
      const { data: { data } } = await this.stats.search(username.getValue(), platform.getValue())
      return ctx.reply(data)

    } catch (e) {
      console.log(e.response.data)
    }


  }
}
