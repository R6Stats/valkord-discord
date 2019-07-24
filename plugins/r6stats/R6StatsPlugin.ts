import BotPlugin from '../BotPlugin';
import StatsCommand from './commands/StatsCommand';
import OperatorStatsCommand from './commands/OperatorStatsCommand';
import RankCommand from './commands/RankCommand';
import { ICommand } from '../../BaseCommand';

class R6StatsPlugin extends BotPlugin {
  public commands: ICommand[] = [
    StatsCommand,
    OperatorStatsCommand,
    RankCommand
  ]
}
