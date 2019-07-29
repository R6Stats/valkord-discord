import container from '../inversify.config'
import { decorate, injectable } from 'inversify'
import { ServiceTypes } from './types'

import { Client } from 'discord.js'

import BotConfig from './BotConfig'

import ConfigProvider from './providers/ConfigProvider'
import CommandRegistrar from './CommandRegistrar'

import CommandHandler from './handlers/CommandHandler'
import ErrorHandler from './handlers/ErrorHandler'
import ReadyHandler from './handlers/ReadyHandler'
import PluginRegistrar from './plugins/PluginRegistrar';
import ProviderRegistrar from './ProviderRegistrar';
import R6StatsPlugin from './plugins/r6stats/R6StatsPlugin';
import ArgumentRegistrar from './arguments/ArgumentRegistrar';
import ArgumentParser from './arguments/ArgumentParser';
import ArgumentProvider from './arguments/ArgumentProvider';
import CommandContextFactory from './CommandContextFactory';

class R6StatsBot {
  client: Client

  constructor () {
    this.client = new Client()

    decorate(injectable(), Client)

    container.bind<Client>(ServiceTypes.DiscordClient).toConstantValue(this.client)
    container.bind<ProviderRegistrar>(ServiceTypes.ProviderRegistrar).to(ProviderRegistrar)
    container.bind<CommandRegistrar>(ServiceTypes.CommandRegistrar).toConstantValue(new CommandRegistrar())
    container.bind<ArgumentRegistrar<any>>(ServiceTypes.ArgumentRegistrar).toConstantValue(new ArgumentRegistrar<any>())
    container.bind<ArgumentParser>(ServiceTypes.ArgumentParser).to(ArgumentParser)
    container.bind<CommandContextFactory>(ServiceTypes.CommandContextFactory).to(CommandContextFactory)
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

  setupHandlers () {
    container.get<CommandHandler>(CommandHandler).setup()
    container.get<ErrorHandler>(ErrorHandler).setup()
    container.get<ReadyHandler>(ReadyHandler).setup()
  }

  registerProviders () {
    const providerRegistrar = container.get<ProviderRegistrar>(ServiceTypes.ProviderRegistrar)
    const PROVIDERS = [
      ConfigProvider,
      ArgumentProvider
    ]

    PROVIDERS.forEach(c => providerRegistrar.register(c))
  }

  registerPlugins () {
    const pluginRegistrar = container.get<PluginRegistrar>(ServiceTypes.PluginRegistrar)
    pluginRegistrar.register(R6StatsPlugin)
  }

  login () {
    const config = container.get<BotConfig>(ServiceTypes.Config)
    this.client.login(config.discordToken)
  }

  async loadCommands () {
    const registrar = container.get<CommandRegistrar>(ServiceTypes.CommandRegistrar)

    await registrar.registerDirectory('commands')
  }

}

export default new R6StatsBot()
