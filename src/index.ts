import 'reflect-metadata'
import { CopperClient } from './client'
import { CommandSignatureArgumentTypeString } from './commands/command'
import { InviteCommand } from './commands/invite.command'
import { StatsCommand } from './commands/stats.command'
import { OperatorStatsCommand } from './commands/operator-stats.command'
import { Container } from './container'
import { PingCommand } from './commands/ping.command'

const run = async () => {
  const container = new Container()

  const bot = container.resolve<CopperClient>(CopperClient)

  container.bootModules()

  await bot.setup()

  const handler = bot.getCommandRegistry()

  handler.registerArgumentType(CommandSignatureArgumentTypeString)

  handler.registerCommand(StatsCommand)
  handler.registerCommand(OperatorStatsCommand)
  handler.registerCommand(InviteCommand)
  handler.registerCommand(PingCommand)

  await bot.connect()
}

run()
