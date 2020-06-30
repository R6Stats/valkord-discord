import { Client } from 'discord.js'
import { ConfigService } from './application/config/config.service'
import { Injectable } from './application/container'
import { Container } from './application/container/container'
import { CommandRegistrar } from './application/commands'
import { CommandHandler } from './handlers/command.handler'
import { ModuleLoader } from './application/modules'
import { ReadyHandler } from './handlers/ready.handler'

@Injectable()
export class ValkordClient {
  private client: Client
  private config: ConfigService
  private handler: CommandHandler
  private commands: CommandRegistrar
  private container: Container
  private modules: ModuleLoader

  public constructor (config: ConfigService, container: Container) {
    this.config = config
    this.container = container

    this.client = new Client()
  }

  public async setup (): Promise<void> {
    this.handler = this.container.resolve(CommandHandler)
    this.commands = this.container.resolve(CommandRegistrar)
    this.modules = this.container.resolve(ModuleLoader)

    this.container.resolve(ReadyHandler)
  }

  public async connect (): Promise<string> {
    const token = this.config.get<string>('token')

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

  public getModuleLoader (): ModuleLoader {
    return this.modules
  }

}
