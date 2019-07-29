import { EventHandler } from './EventHandler'
import { Client } from 'discord.js'
import { ServiceTypes } from '../types'
import { inject, injectable } from 'inversify'

@injectable()
class ReadyHandler extends EventHandler {
  private client: Client

  public constructor (
    @inject(ServiceTypes.DiscordClient) client: Client
  ) {
    super()

    this.client = client
  }

  public setup (): void {
    this.client.on('ready', (): void => this.handleReady())
  }

  public handleReady (): void {
    if (this.client.shard) {
      console.log(`Shard ${this.client.shard.id} online and ready to handle ${this.client.guilds.size} guilds!`)
    } else {
      console.log('Bot connected!')
    }
  }
}

export default ReadyHandler
