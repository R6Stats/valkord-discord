import { BotPlugin, PluginClass } from '../BotPlugin'
import StatsCommand from './commands/StatsCommand'
import OperatorStatsCommand from './commands/OperatorStatsCommand'
import RankCommand from './commands/RankCommand'
import { IProvider } from '../../Provider';
import R6StatsAPIProvider from './providers/R6StatsAPIProvider';
import { BotCommand } from '../../BotCommand';

class R6StatsPlugin extends BotPlugin {
  public commands: PluginClass<BotCommand>[] = [
    StatsCommand,
    OperatorStatsCommand,
    RankCommand
  ]

  public providers: PluginClass<IProvider>[] = [
    R6StatsAPIProvider
  ]

}

export default R6StatsPlugin
