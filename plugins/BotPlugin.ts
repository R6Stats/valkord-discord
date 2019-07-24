import { ICommand } from '../BaseCommand';
import Provider from '../Provider';
import EventHandler from '../handlers/EventHandler';

class BotPlugin {
  public name: string;
  public description: string;

  public commands: ICommand[] = [
    // ...
  ]

  public providers: typeof Provider[] = [
    // ...
  ]

  public handlers: typeof EventHandler[] = [
    // ...
  ]

  public register () {

  }

  public boot () {

  }

}

export default BotPlugin
