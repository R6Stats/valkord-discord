import { ValkordModule } from '../../application/modules'
import { PingCommand } from './commands/ping.command'
import { HelpCommand } from './commands/help.command'
import { InviteCommand } from './commands/invite.command'
import { StatsCommand } from './commands/stats.command'
import { OperatorStatsCommand } from './commands/operator-stats.command'
import { Constructor } from '../../types'
import { ClientCommand } from '../../application/commands'

export class R6StatsModule extends ValkordModule {
  public getName = (): string => 'R6Stats'

  public getCommands = (): Constructor<ClientCommand>[] => [
    PingCommand,
    HelpCommand,
    InviteCommand,
    StatsCommand,
    OperatorStatsCommand,
  ]
}
