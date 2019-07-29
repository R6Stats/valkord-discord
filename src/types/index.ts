const ServiceTypes = {
  R6StatsAPI: Symbol('R6StatsAPI'),
  Config: Symbol('Config'),
  Command: Symbol('Command'),
  CommandRegistrar: Symbol('CommandRegistrar'),
  ProviderRegistrar: Symbol('ProviderRegistrar'),
  PluginRegistrar: Symbol('PluginRegistrar'),
  ArgumentParser: Symbol('ArgumentParser'),
  ArgumentRegistrar: Symbol('ArgumentRegistrar'),
  CommandContextFactory: Symbol('CommandContextFactory'),
  CommandHandler: Symbol('CommandHandler'),
  DiscordClient: Symbol('DiscordClient'),
}

export interface IBotConfig {
  [key: string]: any;
}

export { ServiceTypes }
