import { Client } from 'discord.js'
import { decorate, injectable } from 'inversify'
import container from '../inversify.config'
import ArgumentParser from './arguments/ArgumentParser'
import ArgumentProvider from './arguments/ArgumentProvider'
import ArgumentRegistrar from './arguments/ArgumentRegistrar'
import BotConfig from './BotConfig'
import CommandRegistrar from './CommandRegistrar'
import ContextFactory from './ContextFactory'
import CommandHandler from './handlers/CommandHandler'
import ErrorHandler from './handlers/ErrorHandler'
import ReadyHandler from './handlers/ReadyHandler'
import PluginRegistrar from './plugins/PluginRegistrar'
import R6StatsPlugin from './plugins/r6stats/R6StatsPlugin'
import ProviderRegistrar from './ProviderRegistrar'
import ConfigProvider from './providers/ConfigProvider'
import { ServiceTypes } from './types'

class R6StatsBot {
  public client: Client

  public constructor () {
    this.client = new Client()

    decorate(injectable(), Client)

    container.bind<Client>(ServiceTypes.DiscordClient).toConstantValue(this.client)
    container.bind<ProviderRegistrar>(ServiceTypes.ProviderRegistrar).to(ProviderRegistrar)
    container.bind<CommandRegistrar>(ServiceTypes.CommandRegistrar).toConstantValue(new CommandRegistrar())
    container.bind<ArgumentRegistrar<any>>(ServiceTypes.ArgumentRegistrar).toConstantValue(new ArgumentRegistrar<any>())
    container.bind<ArgumentParser>(ServiceTypes.ArgumentParser).to(ArgumentParser)
    container.bind<ContextFactory>(ServiceTypes.CommandContextFactory).to(ContextFactory)
    container.bind<PluginRegistrar>(ServiceTypes.PluginRegistrar).to(PluginRegistrar)
    container.bind<CommandHandler>(CommandHandler).toSelf()
    container.bind<ErrorHandler>(ErrorHandler).toSelf()
    container.bind<ReadyHandler>(ReadyHandler).toSelf()

    this.setupHandlers()
    this.registerProviders()
    this.loadCommands()
    this.registerPlugins()
    this.login()
  }

  public setupHandlers (): void {
    container.get<CommandHandler>(CommandHandler).setup()
    container.get<ErrorHandler>(ErrorHandler).setup()
    container.get<ReadyHandler>(ReadyHandler).setup()
  }

  public registerProviders (): void {
    const providerRegistrar = container.get<ProviderRegistrar>(ServiceTypes.ProviderRegistrar)
    const PROVIDERS = [
      ConfigProvider,
      ArgumentProvider
    ]

    PROVIDERS.forEach((c): void => providerRegistrar.register(c))
  }

  public registerPlugins (): void {
    const pluginRegistrar = container.get<PluginRegistrar>(ServiceTypes.PluginRegistrar)
    pluginRegistrar.register(R6StatsPlugin)
  }

  public login (): void {
    const config = container.get<BotConfig>(ServiceTypes.Config)
    this.client.login(config.discordToken)
  }

  public async loadCommands (): Promise<void> {
    const registrar = container.get<CommandRegistrar>(ServiceTypes.CommandRegistrar)

    await registrar.registerDirectory('commands')

    registrar.bootAll()
  }
}

export default new R6StatsBot()
