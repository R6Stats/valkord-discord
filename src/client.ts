import { Client } from 'discord.js'
import { Container } from './container'
import { Injectable } from './decorators/injectable.decorator'
import { CommandHandler } from './handlers/command.handler'
import { ConfigService } from './services/config/config.service'
import { CommandRegistrar } from './commands/command'

@Injectable()
export class CopperClient {
  private client: Client
  private config: ConfigService
  private handler: CommandHandler
  private commands: CommandRegistrar
  private container: Container

  public constructor (config: ConfigService, container: Container) {
    this.config = config
    this.container = container

    this.client = new Client()
  }

  public async setup (): Promise<void> {
    this.handler = this.container.resolve(CommandHandler)
    this.commands = this.container.resolve(CommandRegistrar)
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

  public getCommandRegistry (): CommandRegistrar {
    return this.commands
  }

}
