import { ValkordModule } from '../../application/modules'
import { PingCommand } from './commands/ping.command'
import { HelpCommand } from './commands/help.command'
import { InviteCommand } from './commands/invite.command'
import { StatsCommand } from './commands/stats.command'
import { OperatorStatsCommand } from './commands/operator-stats.command'
import { Constructor } from '../../types'
import { ValkordCommand } from '../../application/commands'
import { env } from '../../utils/env'
import { ValkordConfig } from '../../application/config'

export interface R6StatsModuleConfigOptions {
  r6stats_token: string
}

export class R6StatsModuleConfig extends ValkordConfig<R6StatsModuleConfigOptions> {
  public load = (): R6StatsModuleConfigOptions => ({
    r6stats_token: env('R6STATS_API_TOKEN')
  })
}

export class R6StatsModule extends ValkordModule<R6StatsModuleConfig> {
  public getName = (): string => 'R6Stats'

  public getConfig = (): Constructor<R6StatsModuleConfig> => R6StatsModuleConfig

  public getCommands = (): Constructor<ValkordCommand>[] => [
    PingCommand,
    HelpCommand,
    InviteCommand,
    StatsCommand,
    OperatorStatsCommand,
  ]
}
