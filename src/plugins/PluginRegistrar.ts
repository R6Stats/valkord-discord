import GenericRegistrar from "../GenericRegistrar"
import { BotPlugin } from "./BotPlugin"
import { injectable, inject } from "inversify"
import { ServiceTypes } from "../types"
import CommandRegistrar from "../CommandRegistrar"
import ProviderRegistrar from "../ProviderRegistrar"
import chalk from 'chalk'

@injectable()
class PluginRegistrar implements GenericRegistrar<new () => BotPlugin> {
  public registry: any[];
  private cmds: CommandRegistrar
  private providers: ProviderRegistrar

  public constructor (
    @inject(ServiceTypes.CommandRegistrar) cmdRegistrar: CommandRegistrar,
    @inject(ServiceTypes.ProviderRegistrar) providerRegistrar: ProviderRegistrar
  ) {
    this.cmds = cmdRegistrar
    this.providers = providerRegistrar
  }

  public register (clazz: new () => BotPlugin): void {
    console.log(chalk.cyan(`Registering plugin ${clazz.name}...`))
    const plugin = new clazz()
    const pluginProviders = plugin.getProviders()
    const pluginCommands = plugin.getCommands()

    pluginProviders.forEach((p): void => this.providers.register(p))
    pluginCommands.forEach((c): void => this.cmds.register(c))
    console.log(chalk.green(`Registered plugin ${clazz.name}!`))
  }


  public unregister (): void {
    throw new Error("Method not implemented.")
  }


}

export default PluginRegistrar
