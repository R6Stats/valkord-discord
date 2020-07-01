import { ValkordModule } from '../../application/modules'
import { PingCommand } from './commands/ping.command'
import { HelpCommand } from './commands/help.command'
import { InviteCommand } from './commands/invite.command'
import { StatsCommand } from './commands/stats.command'
import { OperatorStatsCommand } from './commands/operator-stats.command'
import { Constructor } from '../../types'
import { ValkordCommand } from '../../application/commands'
import { env } from '../../utils/env'

export interface R6StatsModuleConfig {
  r6stats_token: string
}

export class R6StatsModule extends ValkordModule<R6StatsModuleConfig> {
  public getName = (): string => 'R6Stats'

  public getCommands = (): Constructor<ValkordCommand>[] => [
    PingCommand,
    HelpCommand,
    InviteCommand,
    StatsCommand,
    OperatorStatsCommand,
  ]

  public loadConfig = (): R6StatsModuleConfig => ({
    r6stats_token: env('R6STATS_API_TOKEN')
  })
}
