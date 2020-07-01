import { Client } from 'discord.js'
import { Injectable } from './application/container'
import { Container } from './application/container/container'
import { CommandRegistrar } from './application/commands'
import { CommandHandler } from './handlers/command.handler'
import { ModuleLoader } from './application/modules'
import { ReadyHandler } from './handlers/ready.handler'
import { DefaultValkordConfig, ConfigLoader } from './application/config'

@Injectable()
export class ValkordClient {
  private config: DefaultValkordConfig
  private loader: ConfigLoader
  private handler: CommandHandler
  private commands: CommandRegistrar
  private container: Container
  private modules: ModuleLoader

  public constructor (container: Container) {
    this.container = container

    this.container.instance(Client, new Client())
  }

  public async setup (): Promise<void> {
    this.loader = this.container.resolve(ConfigLoader)
    this.config = await this.loader.load<DefaultValkordConfig>(DefaultValkordConfig)

    this.handler = this.container.resolve(CommandHandler)
    this.commands = this.container.resolve(CommandRegistrar)
    this.modules = this.container.resolve(ModuleLoader)

    this.container.resolve(ReadyHandler)
  }

  public async connect (): Promise<string> {
    const client = this.container.resolve<Client>(Client)
    const token = this.config.get('token')

    return client.login(token)
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
