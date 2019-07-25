import { IBotCommand } from '../BotCommand'
import { IProvider } from '../Provider'
import { IEventHandler } from '../handlers/EventHandler'


class BotPlugin {
  public name: string;
  public description: string;

  public commands: IBotCommand[] = [
    // ...
  ]

  public providers: IProvider[] = [
    // ...
  ]

  public handlers: IEventHandler[] = [
    // ...
  ]

  public register () {

  }

  public boot () {

  }

}

export default BotPlugin
