import BotPlugin from '../BotPlugin';
import StatsCommand from './commands/StatsCommand';
import OperatorStatsCommand from './commands/OperatorStatsCommand';
import RankCommand from './commands/RankCommand';
import { IBotCommand, BotCommand } from '../../BotCommand';

class R6StatsPlugin extends BotPlugin {
  public commands: IBotCommand[] = [
    StatsCommand,
    OperatorStatsCommand,
    RankCommand
  ]

}
