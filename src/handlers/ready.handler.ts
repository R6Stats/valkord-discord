import { Injectable } from '../application/container'
import { Container } from '../application/container/container'
import { ValkordClient } from '../client'
import { Logger } from '../utils/logger'
import { Handler } from './handler'

@Injectable()
export class ReadyHandler extends Handler {
  private readonly container: Container

  private readonly logger = new Logger(ValkordClient.name)

  public constructor (container: Container) {
    super()

    this.container = container
  }

  public setup (): void {
    const client = this.container.resolve<ValkordClient>(ValkordClient).getClient()

    client.on('ready', () => {
      if (client.shard) {
        this.logger.log(`Shard ${client.shard.ids} online and ready to handle ${client.guilds.cache.size} guilds!`)
      } else {
        this.logger.log(`Bot is online and ready to handle ${client.guilds.cache.size} guilds!`)
      }
    })
  }
}
