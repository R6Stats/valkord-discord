import { Injectable } from './decorators/injectable.decorator'
import { Client } from 'discord.js'
import { ConfigService } from './services/config/config.service'
import { CommandHandler } from './handlers/command.handler'
import { Container } from './container'

@Injectable()
export class CopperClient {
  private client: Client
  private config: ConfigService
  private handler: CommandHandler
  private container: Container

  public constructor (config: ConfigService, container: Container) {
    this.config = config
    this.container = container

    this.client = new Client()
  }

  public async setup () {
    this.handler = this.container.resolve(CommandHandler)
  }

  public async connect (): Promise<string> {
    const token = this.config.get('token')

    return this.client.login(token)
  }

  public getClient (): Client {
    return this.client
  }

  public getCommandHandler (): CommandHandler {
    return this.handler
  }

}
