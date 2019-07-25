const ServiceTypes = {
  R6StatsAPI: Symbol('R6StatsAPI'),
  Config: Symbol('Config'),
  Command: Symbol('Command'),
  CommandRegistrar: Symbol('CommandRegistrar'),
  ProviderRegistrar: Symbol('ProviderRegistrar'),
  PluginRegistrar: Symbol('PluginRegistrar'),
  CommandHandler: Symbol('CommandHandler'),
  DiscordClient: Symbol('DiscordClient'),
}

export interface IBotConfig {}

export { ServiceTypes }
