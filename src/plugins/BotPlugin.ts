import { BotCommand } from '../BotCommand'
import { IProvider } from '../Provider'
import { EventHandler } from '../handlers/EventHandler'

type PluginClass<T> = new (...args: any[]) => T

interface IBotPlugin {
  name: string;
  description: string;
  commands: PluginClass<BotCommand>[];
  providers: PluginClass<IProvider>[];
  handlers: PluginClass<EventHandler>[];

  getCommands (): PluginClass<BotCommand>[];
  getProviders (): PluginClass<IProvider>[];

  register (): void;
  boot (): void;
}

class BotPlugin implements IBotPlugin {
  public name: string;
  public description: string;

  public commands: PluginClass<BotCommand>[] = [
    // ...
  ]

  public providers: PluginClass<IProvider>[] = [
    // ...
  ]

  public handlers: PluginClass<EventHandler>[] = [
    // ...
  ]

  public getCommands (): PluginClass<BotCommand>[] {
    return this.commands
  }

  public getProviders (): PluginClass<IProvider>[] {
    return this.providers
  }

  public register (): void {

  }

  public boot (): void {

  }

}

export { BotPlugin, PluginClass }
