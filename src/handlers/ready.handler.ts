import { Injectable } from '../application/container'
import { ValkordClient } from '../client'
import { Logger } from '../utils/logger'
import { Handler } from './handler'
import { Client } from 'discord.js'

@Injectable()
export class ReadyHandler extends Handler {
  private readonly client: Client

  private readonly logger = new Logger(ValkordClient.name)

  public constructor (client: Client) {
    super()

    this.client = client
  }

  public setup (): void {
    this.client.on('ready', () => {
      if (this.client.shard) {
        this.logger.log(`Shard ${this.client.shard.ids} online and ready to handle ${this.client.guilds.cache.size} guilds!`)
      } else {
        this.logger.log(`Bot is online and ready to handle ${this.client.guilds.cache.size} guilds!`)
      }
    })
  }
}
